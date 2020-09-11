const router = require('express').Router();
const User = require('../models/User');
//const {regesterValidation, loginValidation} =require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../config/config')
var env_config = config.get_active_config();


//ROUTE TO SIGNUP(REGISTER)
// router.post('/register', async(req, res) => {

//     //validation of the data

//     // user alredy exist
//     const emailExist = await User.findOne({ email: req.body.email });
//     if (emailExist) return res.status(400).send({ mes: "email alredy exist" });

//     //ecryption of the password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.confirmPassword, salt);

//     const user = new User({
//         email: req.body.email,
//         password: hashPassword
//     })
//     console.log(user);
//     try {
//         const savedUser = await user.save();
//         const token = jwt.sign({ _id: user._id, email: user.email }, env_config.jwt_secret);
//         res.status(200).send({ token });
//         //  res.status(200).send({ id: user._id, name: user.name});
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });
//ROUTE TO LOGIN
router.post('/login', async(req, res) => {

    //checking if the email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password do not exist');

    //passwors is correct or not
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) return res.status(400).send('invalid password');

    //create and assign token
    const token = jwt.sign({ _id: user._id, email: user.email }, env_config.jwt_secret);
    res.status(200).send({ token, status: "login succesful" });
    //res.send("loged in !!!")

});

router.get('/all/user', async(req, res) => {

    try {
        const all_users = await User.find();
        res.status(200).send(all_users);

    } catch (err) {
        return res.status(500).send({ err });
    }

})

module.exports = router;