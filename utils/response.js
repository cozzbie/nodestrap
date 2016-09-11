function Response() {
    if((this instanceof Response) === false){
        return new Response();
    }

    this.plain = function(err, r){
        var res = {
            success: true,
            data: r
        };

        if(err){
            res = {
                success: false,
                message: err
            }
        }

        return res;
    }
}

exports = module.exports = Response;