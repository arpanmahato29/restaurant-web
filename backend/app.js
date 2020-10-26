require('dotenv').config();
//package imports
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//express config
const app = express();
//Route imports
const authRoute = require('./routes/authentication');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const restaurantRoute = require('./routes/restaurant');
const productRoute = require('./routes/product');
const offerRoute =require('./routes/offer');
//Database Connection
dbConnection = process.env.DATABASE;
mongoose.connect(dbConnection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(() => console.log(`${dbConnection} CONNECTED`));
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes
app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",restaurantRoute);
app.use("/api",productRoute);
app.use("/api",offerRoute);
//Port
const port = process.env.PORT || 8000;
//Starting the server
app.listen(port,() => console.log(`Backend running at ${port}`));