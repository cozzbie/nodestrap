var jwt = require("jsonwebtoken"),
    secret = require("../config/config").secret,
    UsersDAO = require("../models/UsersDAO").UsersDAO,
    bcrypt = require("bcrypt-nodejs");

function AuthHandler(db) {

    var users = new UsersDAO(db);
    var _self = this;

    this.login = function (q, p) {
        var password = q.body.password;

        users.login(credentials, function (err, doc) {
            if (err) throw err;
            var response = {
                success: false,
                message: "User credentials are incorrect."
            };

            if (doc) {
                bcrypt.compare(password, doc.password, function (err, res) {
                    if (err) throw err;

                    if (res) {
                        delete doc["password"]; //You dont want to send back passwords.
                        response = _self.processTokenRequest(doc); //Create a token.
                        return p.send(response);
                    } else {
                        return p.send(response);
                    }
                });
            } else {
                return p.send(response);
            }
        });

    }

    this.processTokenRequest = function (doc) {
        if (!doc) {
            return {
                success: false
            };
        } else {
            return _self.createToken(doc);
        }
    }

    this.createToken = function (doc) {
        var token = jwt.sign(
            {
                username: doc.username,
                _id: doc._id
            },
            secret
        );

        return {
            success: true,
            user: doc,
            token: token
        };
    }
}

module.exports = AuthHandler;