const config = require('../config/config')
const { verify, sign } = require('jsonwebtoken');

const secretKey = config.authentication.jwtSecret;


    const generateToken = async (user)=> {
        const dataStoredInToken = { id: user.id };
        const expiresIn = config.authentication.expiresIn;
        return sign(dataStoredInToken, secretKey, { expiresIn })
    }
    const verifyToken = async (Authorization)=> {
        return await verify(Authorization, secretKey)
    }

    module.exports = {
        generateToken,
        verifyToken
    }