const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv')
const connectDb = require('./config/config')
// dotenv config
dotenv.config();

//db config
connectDb();

const app=express();

//middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'));


// routes
app.use('/api/items',require('./routes/itemRoutes'));
app.use('/api/users',require('./routes/userRoute'));
app.use('/api/bills',require('./routes/billsRoute'));



// port
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on port:${PORT}`);
})














