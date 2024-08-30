const bcryptjs = require('bcryptjs')
const UserModel = require('../models/UserModel')

async function registerUser(req,res) {
    try{
        const {name,email ,password, profile_pic} = req.body;

        const checkEmail = await UserModel.findOne({email})

        if(checkEmail){
            return res.status(400).json({
                message:'User already exists',
                error:true,
            })
        }

        // pass to hashpass
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password ,salt);

        const payload = {
            name, email , profile_pic,password:hashpassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(201).json({
            message:'User created successfully',
            data: userSave,
            success:true
        })

    }catch(error){
        return res.status(500).json({
            message:error.message || error,
            success:false
        })
    }
}

module.exports = registerUser