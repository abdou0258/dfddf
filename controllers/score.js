const { StatusCodes } = require('http-status-codes')
const Score = require('../models/score')
require('http-status-codes')
const { NotFoundError } = require("../errors");

const getScore=async(req,res)=>{
    const {user:{userId}} = req
    const score = await Score
  .findOne({ earnedBy: userId })
  .sort({ createdAt: -1 }) 
  .limit(1);
   
    res.status(StatusCodes.OK).json({score})
}

const storeScore=async(req,res)=>{
    req.body.earnedBy = req.user.userId
    const score = await Score.create( req.body)
    res.status(StatusCodes.CREATED).json({score})
}




module.exports = {storeScore,getScore}