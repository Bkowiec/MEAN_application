const User = require('../models/user');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        // req.body.email;
        // req.body.username;
        // req.body.password;
        if (!req.body.email) {
            res.json({
                succes: false,
                message: 'You must provide an e-mail'
            });
        } else {
            if (!req.body.username) {
                res.json({
                    succes: false,
                    message: 'You must provide an username'
                });
            } else {
                if (!req.body.password) {
                    res.json({
                        succes: false,
                        message: 'You must provide an password'
                    });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({
                                    succes: false,
                                    message: 'Username or e-mail already exists'
                                });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({
                                            succes: false,
                                            message: err.errors.email.message
                                        });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({
                                                succes: false,
                                                message: err.errors.username.message
                                            });
                                        } else {
                                            if (err.errors.password) {
                                                res.json({
                                                    succes: false,
                                                    message: err.errors.password.message
                                                });
                                            } else {
                                                res.json({
                                                    succes: false,
                                                    message: err
                                                });
                                            }
                                        }
                                    }
                                } else {
                                    res.json({
                                        succes: false,
                                        message: 'Could not save user. Error: ', err
                                    });
                                }
                            }
                        } else {
                            res.json({
                                succes: true,
                                message: 'Acount registered!' 
                            });
                        }
                    });
                }
            }
        }
    });

    return router;
}