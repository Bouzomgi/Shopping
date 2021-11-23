const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

//CONNECT TO MONGOOSE
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connected to DB');
});

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//ROUTES
const postRoute = require('./routes/posts');

//ROUTE MIDDLEWARES
app.use('/', postRoute);

app.listen(4000, () => {
  console.log("Listening on 4000")
});