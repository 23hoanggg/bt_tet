export const asynCatch = (fn) => async(req,res,next)=>{
    try{
        await fn(req, res, next);
    }catch(e){
        res.status(500).send(e.message);
        next(e);
    }
};