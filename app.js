const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');
const authJwt = require('./helpers/jwt')

app.use(cors());
app.options('*', cors() )



// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(function (err, req, res, next)  {
    if(err){
        res.status(500).json({message: "error in the server"})
    }
})


//Routes
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const res = require('express/lib/response');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes)

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


// Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.log(err)
})

// Server
app.listen(3000, () => {
    console.log('server running on port 3000')
});