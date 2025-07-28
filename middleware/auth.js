const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const authHeader = req.header('Authorization');
    if(!authHeader){
        console.log('missing auth header');
        return res.status(401).json({msg: 'missing auth header'});
    }
    const token = authHeader.split(' ')[1];
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
        // console.log(JSON.stringify(req.user));
        next();
    } catch(error){
        res.status(401).json({msg: 'invalid token'});
        console.log(error);
    }
}