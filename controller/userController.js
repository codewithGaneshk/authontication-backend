const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.getUser = async (req, res) => {
    try {
        const data = await User.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}
exports.postUser = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) return res.status(500).json({ errors: true, message: "user already exist" })

        req.body.password = await bcrypt.hash(req.body.password,10)
        const data = await User.create(req.body)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message })
    }
}

exports.login = async (req,res)=>{
    try {
        const userExist = await User.findOne({email:req.body.email})
        if (!userExist) return res.status(500).json({errors:true,message:"email or password is invalid"})

            const veryfyPassword = await bcrypt.compare(req.body.password,userExist.password)
            if(!veryfyPassword) return res.status(500).json({errors:true,message:"email or password is invalid"})

                const token = await jwt.sign({_id:userExist._id},process.env.SEC)
                return res.json({errors:false,data:{token:token,user:userExist}})


    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}