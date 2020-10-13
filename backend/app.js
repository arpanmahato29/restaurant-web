require('dotenv').config();
//package imports
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { truncate } = require('lodash');
//express config
const app = express();
//Route imports
const authRoute = require('./routes/authentication');
const userRoute = require('./routes/user');
//Database Connection
dbConnection = process.env.DATABASE;
mongoose.connect(dbConnection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => console.log(`${dbConnection} CONNECTED`));
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes
app.use("/api",authRoute);
app.use("/api",userRoute)
//Port
const port = process.env.PORT || 8000;
//Starting the server
app.listen(port,() => console.log(`Backend running at ${port}`));