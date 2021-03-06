var UsersDAO = require("../models/UsersDAO").UsersDAO;
var Response = require("../utils/response");
var bcrypt = require("bcrypt-nodejs");

function UsersHandler(db){

    var users = new UsersDAO(db);
    var rp = new Response();

    this.create = function(q, p, n){
        var obj = q.body.user;

        bcrypt.hash("randompassword", null, null, function(err, hash) {
                if (err) {
                    return p.send(
                        {
                            success: false,
                            message: "Hashing error."
                        }
                    );
                }

                obj.password = hash;
                
                //save new user and return response
                return p.send(rp.plain(err, r));
            }
        );
    }

    this.all = function(q, p, n){
        staffs.all(function(err, r){
            return p.send(rp.plain(err, r));
        });
    }

    this.update = function(q, p, n){
        var user = q.body.user;

        //TODO: back up current details before updating
        users.update(user, function(err, r){
            return p.send(rp.plain(err, r));
        });
    }

    this.remove = function(q, p, n){
        var id = q.query.id;

        users.remove({id: id}, function(err, r){
            return p.send(rp.plain(err, r));
        });
    }
}

module.exports = UsersHandler;