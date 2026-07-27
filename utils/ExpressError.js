class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        super.statusCode=statusCode;
        super.message=message;
    }
}

module.exports=ExpressError;
