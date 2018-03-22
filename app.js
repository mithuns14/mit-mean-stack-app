const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');

mongoose.connect(config.database).then(()=>{
    console.log('Connected to Remote DB :) ');
}).catch(()=>{
    
   console.log('Error Connecting DB :( ');
});
 
// mongoose.connection.on('connected',()=>{
//     console.log('Connected to Remote DB '+config.database);
// });

const app=express();

const port=process.env.PORT || 5000;

const usersRoute=require('./routes/users');

//Middleware CORS
app.use(cors());

//Set Static Files
app.use(express.static(path.join(__dirname,'public')));

//Middleware Body Parser
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use('/users',usersRoute);

//Index Route
app.get('/',(req,res)=>{
    res.send('You are in Home Page');
});

app.get('*',(req,res)=>{
    res.sendfile(path.join(__dirname,'public/index.html'));
})

app.get('/getAPI',(req,res)=>{
    console.log(req.body);
    res.send({"status":"success","mode":"get"});
});

app.post('/postAPI',(req,res)=>{
    console.log(req.body);
    res.send({"status":"success","mode":"post"});
});

app.listen(port,()=>{
    console.log('Server listening to '+port);
});
