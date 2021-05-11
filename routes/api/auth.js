const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route    GET api/auth
//@         desc
//@access   Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@route    POST api/auth
//@         Login and Autheniticate user
//@access   Public
router.post(
    '/',[
        check('email', 'A valid email is required').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
                const errors = validationResult(req);

                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()});
                }

                const { email, password } = req.body;

                try{

                // See if user exists

                let user = await User.findOne({ email: email});

                if(!user){
                    return res
                    .status(400)
                    .json({ errors: [ {msg: 'Invalid credentials'}]});
                }

                // Verify user and password match
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch){
                    return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials'}] });
                }



                // Return jsonwebtoken
                const payload = {
                    user: {
                        //Receive user ID from mongoDB
                        id: user.id
                    }
                }

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 360000 },
                    (err, token) => {
                      if (err) throw err;
                      res.json({ token });
                    }
                  );
                } catch (err) {
                  console.error(err.message);
                  res.status(500).send('Server error');
                }
              }
            );


module.exports = router; 