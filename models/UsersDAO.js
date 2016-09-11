var ObjectId = require("mongodb").ObjectID;

function UsersDAO (db){
    if((this instanceof UsersDAO) === false){
        return new UsersDAO(db);
    }

    var users = db.collection("users");

    this.create = function(credentials, cb){
        users.insert(credentials, function(err, res){
            if(err){
                throw err;
            }
        });

        this.all(cb);
    }

    this.read = function(user, cb){
        var user = q.body.user;
        var id = new ObjectId(user);
        user.findOne({id: id}, function(err, r){
            cb(err, r);
        })

    }

    this.update = function(user, cb){
        var id = new ObjectId(users._id);

        delete staff["_id"];

        users.findOne({_id: id}, function(a, b){
            users.password = b.password;
            users.findAndModify({_id: id}, [], user, {new: true}, function(err, r){
                cb(err, r);
            });
        });
    }

    this.remove = function(cred, cb){
        var id = new ObjectId(cred.id);
        users.removeOne({_id: id}, function(err, r){
            if(err){
                throw err;
            }
        });

        this.all(cb);
    }
}

module.exports.UsersDAO = UsersDAO;