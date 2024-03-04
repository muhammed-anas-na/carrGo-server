import jwt from 'jsonwebtoken';

export const createToken = (
    user: Object,
    AccessTokenscretkey: string,
)=>{
    const token = jwt.sign({user} , AccessTokenscretkey , {expiresIn : '15s'});
    console.log("Token created =>" , token);
    return token;
}

export const createRefreshToken = (
    user: object,
    AccessTokenscretkey: string,
)=>{
    return jwt.sign({user} , AccessTokenscretkey);
}