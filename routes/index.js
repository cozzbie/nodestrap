var jwt = require("jsonwebtoken"),
    secret = require("../config/config").secret,
    AuthHandler = require("./auth");

module.exports = exports = function (app, db) {

    var auth = new AuthHandler(db);

    app.get(function (q, p) {
        return p.sendFile("/index.html");
    });

    app.post("/login", auth.login);

    app.use(function (q, p, n) {

        var token = q.headers["x-access-token"];

        if (token) {
            jwt.verify(
                token,
                secret,
                function (err, decoded) {
                    if (err) {
                        return p.status(403).send(
                            {
                                success: false,
                                message: "You aren't authorized to access this application."
                            }
                        );
                    }

                    q.decoded = decoded;
                    n();
                }
            );

        } else {
            return p.status(403).send(
                {
                    success: false,
                    message: "No token provided"
                }
            );
        }
    });

    app.use(function (q, p, n) {
        //check stuff like menu and information access.
        n();
    });

    //something
    app.route("/something")
        .get(school.all)
        .post(school.create)
        .put(school.update)
        .delete(school.remove);
}