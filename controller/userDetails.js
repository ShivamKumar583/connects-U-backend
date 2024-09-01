const bcryptjs = require('bcryptjs')
const UserModel = require('../models/UserModel');
const getUserDetailsFromToken = require('../helper/getUserDetailsFromToken');

async function userDetails(req,res) {
    try{
        const token = req.cookies.token || req.body.token || "" ;

        const user = await getUserDetailsFromToken(token) 

        
        return res.status(201).json({
            message:'User Details Fetched Successfully',
            data: user,
            success:true
        })

    }catch(error){
        return res.status(500).json({
            message:error.message || error,
            success:false
        })
    }
}

module.exports = userDetails
