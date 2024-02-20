export const validateRegister = (req,res,next) =>{
    const {username, email, password, fullname} = req.body;
    if(!username) throw Error(400,"Username is required");
    else if (!email || !password || !fullname) throw Error(400,'Email,Password,Fullname are required');
    next();
}

export const validateLogin = (req,res,next) =>{
    const {username, email, password} = req.body;
    if(!username &&  !email ) throw  Error(401,'Invalid Credentials');
    if(!password) throw  Error(400,'Password is required');
    next();
}

export const validateRefresh = (req,res,next) =>{
    const {refreshToken} = req.body;
    if (!refreshToken) throw new Error('Refresh token is required');
}