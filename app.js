const express  = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
var cors = require('cors');

const PORT = process.env.PORT;

// connecting mongo with server
mongoose.connect(process.env.MONGO_URI,{
    dbName : process.env.DB_NAME,
    useNewUrlParser: true, 
    useUnifiedTopology: true  
}).then(()=>{
    console.log('connected!!');
    app.listen(PORT,()=>console.log(`running on port ${PORT}`));
}).catch((err)=>console.log(err.message))

// Initalization
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/certificate',require('./routes/user.route')); // for certificate + (some) admin routers
app.use('/api',require('./routes/authenticate.route')); // for authentication routers
app.use('/admin',require('./routes/admin.route')); // for admin panel routers