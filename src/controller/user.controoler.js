const express = require("express")
const User = require("../model/user")
const generateRandomAlphaNumeric = require("../services/commonsevisec")


exports.register = async (req, res) => {
    try {
        const { username, email, referralCode } = req.body;

        if (!referralCode) {
            return res.status(400).json({
                status: 400,
                message: 'Referral code is required'
            });
        }

        const referringUser = await User.findOne({ referralCode });

        if (!referringUser) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid referral code'
            });
        }

        const newReferralCode = generateRandomAlphaNumeric(6);

        const newUser = new User({
            username,
            email,
            referralCode: newReferralCode,
            referredBy: referringUser._id,
            referralByCode: referringUser.referralCode,
        });

       

        await newUser.save();

        return res.status(201).json({
            status:201, 
            message: 'User registered successfully' 
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred during user registration'
        });
    }
};



exports.find = async (req, res) => {
    try {
        const { referredBy } = req.body;

        const user = await User.find({ referredBy });

        if (!user||user.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }else{
        const totalCount = user.length; 
        return res.status(200).json({
            status: 200,
            totalCount,
            user
        });
    }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching user by referral code'
        });
    }
};