
const {User} = require('../models')
const {verifyToken} = require('../services/authentication.service')


 function authenticated (role = 'athenticated') {
    return async function (req, res, next) {
        try {
            const Authorization = (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
            if (Authorization) {
                const verificationResponse =  await verifyToken(Authorization);
                const userId = verificationResponse.id;
                const findUser = await User.findOne({_id:userId}).select('-password');
                if (findUser && findUser.role == role) {
                    req.user = findUser;
                    next();
                } else {
                    res.status(401).send("Invalid authentication token...");
                }
            } else {
                res.status(500).send("Authentication token missing");
            }
        } catch (err) {
            console.log('err',err);
            res.status(400).send("Wrong authentication token");
        }
    }
}

module.exports =  authenticated