const express = require("express");
const { User, Account } = require("../db");
const zod = require("zod");
const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/middleware");
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signup",async (req,res)=>{
    console.log("hi post!");
    const body = req.body;
    const {success} = signupSchema.safeParse(body)
    if(!success){
        return res.status(411).json({
            msg: "INCORRECT INPUT"
        })
    }
    const user = await User.findOne({
        username:body.username
    })
    // console.log(user);
    if(user!=null){
        console.log(user);
        return res.json({
            msg: "User Already EXISTS!"
        })
    }
    const newUser = await User.create(body);


    // ------ACCOUNTS

    Account.create({
        userId: newUser._id,
        balance :  1 + (Math.random()*10000)
    })
    const jwttoken = jwt.sign({
        userId: newUser._id
    },JWT_SECRET);


    res.status(200).json({
        msg: "user created successfully",
        token: jwttoken
    })
})
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
})
router.post("/signin",async (req,res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg: "INCORRECT INPUT"
        })
    }
    const user =await User.findOne({
        username:body.username,
        password: body.password
    })
    console.log(user)
    if(!user){
        return res.status(411).json({
            msg: "User doesn't EXISTS!"
        })
    }
    const token = jwt.sign({
        userId: user._id
    },JWT_SECRET);
    res.json({
        token: token
    })

})

const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()

})
router.put("/",authMiddleware,async (req,res)=>{
    const body = req.body;
    const {success}= updateSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg: "INVALID INPUT!"
        })
    }
    const user = User.updateOne(body,
        {_id: req.userId}
    )
    res.status(200).json({
        message: "Updated successfully"
    })

})
router.get("/bulk" ,async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[
            {firstName:{"$regex": filter}},
            { lastName:{"$regex": filter}}
        ],
    })
    res.status(200).json({
        user: users.map((user)=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })),
    })
})
module.exports = router;