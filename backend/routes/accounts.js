const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const { startSession, default: mongoose } = require("mongoose");
const router  = express.Router();


router.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Account.findOne({userId: req.userId})

    res.json({
        balance: account.balance
    })
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    console.log("hi")
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body
    const account = await Account.findOne({userId: req.userId}).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session)
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            masg:"Invalid Account"
        })
    }
    console.log(account.balance);
    console.log(toAccount.balance);

    await Account.updateOne({userId:account.userId},{$inc : {balance: -amount}}).session(session);
    await Account.updateOne({userId:to},{$inc : {balance: amount}}).session(session);

    console.log(account.balance);
    console.log(toAccount.balance);

    await session.commitTransaction();

    res.status(200).json({
        msg: "Transfer Successfull!"
    })
})




module.exports = router;

