require('express');
require('mongodb');
const User = require("./models/user.js");

exports.setApp = function(app, client)
{   
    app.post('/api/register', async (req, res, next) =>
    {
        const {firstName, lastName, email, username, password} = req.body;
        const newUser = new User({firstName:firstName, lastName:lastName, email:email, username:username, password:password});
        var error = "";
        try{
            newUser.save();
        }
        catch(e)
        {
            error = e.toString();
        }
        var ret = {error: error};
        res.status(200).json(ret);
    });
}