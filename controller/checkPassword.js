const UserModel = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function checkPassword(req,res) {
    try{
        const {password, userId} = req.body;

        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password ,user.password);

        if(!verifyPassword){
            return res.status(400).json({
                message:'Please check the password',
                error:true,
            })
        }
        
        const tokenData = {
            id: user._id,
            email:user.email
        }


        const token = await jwt.sign(tokenData , process.env.JWT_SECRET_KEY,{expiresIn: '1d'})

        const cookieOptions = {
            http:true,
            secure:true,
        }


        return res.cookie('token' , token , cookieOptions).status(200).json({
            message:'Logi successfully',
            success:true,
            token:token,
        })
    }catch(err){
        return res.status(500).json({
            message:err.message || err,
            error:true
        })
    }
}

module.exports = checkPassword