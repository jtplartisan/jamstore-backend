const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const authRoute = require('./routes/Auth.route');
const vendorRoute = require('./routes/vendors.route');
const cors = require('cors');
const usersRoute = require('./routes/users.route');
const { DbConnect } = require('./config/db.config');
const { Category } = require('./models/Categories.model');

const morgan = require('morgan');

app.use(express.json())

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(cors()) 
DbConnect()
app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)

app.use('/api/vendor',vendorRoute)

app.get('/test', (req, res) => {
  res.send('Hello, Express!');
});

// app.post ('/category',async (req,res)=>{
//     try {
//         const {category} = req.body 
//         const resp = await Category.create({category})
//         res.status(200).json({message:"category added !"})
//     } catch (error) {
//         res.status(500).json({message:"error!"})
        
//     }
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
