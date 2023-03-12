const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const Auth =require("./src/routes/auth")
const Products =require("./src/routes/products")


const app = express()
const port = 5000;

app.use(cors())
app.use(express.json())
app.use('/api/auth',Auth);
app.use('/api/products',Products);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
