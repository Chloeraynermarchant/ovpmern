const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

//import controllers 
const qualifierController= require('./controllers/qualifierController');
const learningController= require('./controllers/learningController');
const bodyParser = require('body-parser');
const { use } = require('./controllers/qualifierController');


const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//Connect database 
connectDB()

// Init middleware
    app.use('/learning',learningController);
    app.use('/qualifier',qualifierController);

app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('API Running'));


//Define routes 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/qualifier', require('./routes/api/qualifier'));

if(process.env.NODE_ENV ==='production'){

    app.use(express.static('ui/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ui', 'build', 'index.html'));
    })


}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));