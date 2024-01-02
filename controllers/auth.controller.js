const User = require("../models/Users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      alternatePhone,
      address,
      password,
      role, 
      gstNumber,
      shopName, 
      shopCategory, 
    } = req.body;

  console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email Already Registered!' });
    }

    const userRole = role || 'user';

    if (userRole === 'vendor' && (!gstNumber || !shopName || !shopCategory)) {
      return res.status(400).json({
        message: 'GST number, shop name, and shop category are required for vendors',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await User.create({
      username,
      email,
      phone,
      alternatePhone,
      address,
      password: hashedPassword,
      role: userRole,
      gstNumber: userRole === 'vendor' ? gstNumber : undefined,
      shopName: userRole === 'vendor' ? shopName : undefined,
      shopCategory: userRole === 'vendor' ? shopCategory : undefined,
    });

    const token = jwt.sign(
      { userId: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      userName: savedUser.username,
      email: savedUser.email,
      phone: savedUser.phone, 
      alternatePhone: savedUser?.alternatePhone,
      role: savedUser.role,
      gstNumber: savedUser.gstNumber,
      shopName: savedUser.shopName,
      shopCategory: savedUser.shopCategory,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.login= async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        const hashed = user.password
        const isLoggedIn = await bcrypt.compare(password,hashed)
        if (isLoggedIn) {
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
                );
               return res.status(201).json({ token,id:user._id, userName: user.username,email:user.email,phone:user.phone,alternatePhone:user?.alternatePhone , shopName:user.shopName,shopCategory:user.shopCategory});
            }
else{
    res.status(401).json({ message: 'Wrong password' });

}
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' ,error:error.message});
        
    }
}

