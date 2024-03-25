const user = require("../models/user")
const bcrypt = require('bcryptjs');

const test = async (req, res) =>{
    res.send("in controller we have saleh data")
}

const GetAllUsers = async (req, res) => {

    let users;
    try{
        users = await user.find()
    } catch {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null})
    }

    return res.status(200).json({success: true, messsage: 'users was found', data: users})
    
}

const CreateUser = async (req, res) => {
    
    const { email, name, cin } = req.body;

    const NewUser = new user({
        email,
        name,
        cin
    })
    
    try{
        await NewUser.save()
    } catch {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null})
    }
    
    return res.status(201).json({success: true, messsage: 'user was added successfully', data: NewUser})
}

const Register = async (req, res) => {
    // req= {body: {email:"", name:"", cin:''}}
    const { email, name, cin, password } = req.body;
    
    let existUser;
    try {
        existUser = await user.findOne({ email: email});
    } catch (error) {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null});
    }
    
    if(existUser){
        return res.status(401).json({success: false, messsage: 'User Already Exist!!', data: existUser});
    } 

    const hashedPass = await bcrypt.hash(password, 10);
    
    const NewUser = new user({
        email,
        name,
        cin,
        password:hashedPass
    })
    
    try{
        await NewUser.save();
    } catch {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null})
    }
    
    return res.status(201).json({success: true, messsage: 'user was added successfully', data: NewUser})

}

const Login = async (req, res) => {
    const { email, password } = req.body;

    let existUser;
    try {
        existUser = await user.findOne({ email: email});
    } catch (error) {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null});
    }
    
    if(!existUser){
        return res.status(401).json({success: false, messsage: 'User Doesn"t have an account!!', data: null});
    } 
    
    let verif = await bcrypt.compare(password, existUser.password);
    
    if (!verif) {
        return res.status(401).json({success: false, messsage: 'password incorrect', data: null});
    }

    return res.status(200).json({success: true, messsage: `Welcome Mr(s) ${existUser.name} `, data: existUser})

}

const Update = async (req, res) => {
    const { name, cin } = req.body;
    const { id } = req.params;

    let existUser;
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null});
    }
    
    if(!existUser){
        return res.status(401).json({success: false, messsage: 'User Doesn"t exist!!', data: null});
    }

    existUser.name = name;
    existUser.cin = cin;

    try{
        await existUser.save();
    } catch {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null})
    }
    
    return res.status(200).json({success: true, messsage: 'user was updated successfully', data: existUser})

}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existUser;
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null});
    }
    
    if(!existUser){
        return res.status(401).json({success: false, messsage: 'User Doesn"t exist!!', data: null});
    }

    try{
        await existUser.deleteOne();
    } catch {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null})
    }
    
    return res.status(200).json({success: true, messsage: 'user was deleted successfully', data: null})
}

exports.test = test
exports.CreateUser = CreateUser
exports.GetAllUsers = GetAllUsers
exports.Register = Register
exports.Login = Login
exports.Update = Update
exports.Delete = Delete