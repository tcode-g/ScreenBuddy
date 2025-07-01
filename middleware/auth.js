const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('Authorization').split(' ')[1];
    if(!token){
        console.log('dont work');
        return res.status(401).json({msg: 'missing token'});
    }

    try
    {
        console.log('token: ' + token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
        console.log('works');
        req.user = decoded;
        next();
    } catch(error){
        res.status(401).json({msg: 'invalid token'});
        console.log(error);
    }
}