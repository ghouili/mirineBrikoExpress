const user = require("../models/user")


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
    
    const NewUser = new user({
        email:'test05@gmail.com',
        name:'test test',
        cin:12345678
    })
    
    try{
        await NewUser.save()
    } catch {
        return res.status(500).json({success: false, messsage: 'server ERROR', data: null})
    }
    
    return res.status(201).json({success: true, messsage: 'user was added successfully', data: NewUser})
}

exports.test = test
exports.CreateUser = CreateUser
exports.GetAllUsers = GetAllUsers