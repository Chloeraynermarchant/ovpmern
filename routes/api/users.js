const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Import schema
const User = require('../../models/User');


//@route    POST api/users
//@         Register user
//@access   Public
router.post(
    '/',[
        check('name', 'Name is required')
        .not()
        .isEmpty(),
        check('email', 'A valid email is required').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    async (req, res) => {
                const errors = validationResult(req);

                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()});
                }

                const { name, email, password,role } = req.body;

                try{

                // See if user exists

                let user = await User.findOne({ email: email});

                if(user){
                    return res.status(400).json({ errors: [ {msg: 'User already exists'}]});
                }

                // Get users gravatar - based on their emails profile
                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                  });

                  user = new User ({
                      name,
                      email,
                      avatar,
                      password,
                      role
                  })
               
                // Encrypt the password using Bcrypt 
                const salt = await bcrypt.genSalt(10);

                user.password = await bcrypt.hash(password, salt);

                await user.save();

                // Return jsonwebtoken
                const payload = {
                    user: {
                        //Receive user ID from mongoDB
                        id: user.id,
                        //Receive user role from mongoDB
                        role: user.role
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