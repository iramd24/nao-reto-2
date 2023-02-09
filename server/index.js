import config from 'dotenv';
import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import capacityRoutes from './routes/capacities.js';
import loginRoutes from './routes/loginRoutes.js';


import User from './models/user.js'


const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(bodyparser.json({limit: "3mb", extended:"true"}));
app.use(bodyparser.urlencoded({limit: "3mb", extended:"true"}));
app.use(cors(corsOptions));
app.use(express.json());

const CONNECTION_URL = 'mongodb+srv://naodbadmin:naodbadmin123@cluster0.fgokoxi.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

//ROUTES
app.use('/capacities', capacityRoutes);
app.use('/login', loginRoutes);


app.post('/loginTest', (req, res)  => {
    
        const {email,password} =req.body;
         User.findOne({email:email},(err,user)=>{
            if(user){
               if(password === user.password){
                   res.send({message:"login sucess",user:user})
               }else{
                   res.send({message:"wrong credentials"})
               }
            }else{
                res.send("not register")
            }
        });

});
