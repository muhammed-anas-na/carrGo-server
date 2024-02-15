import jwt from 'jsonwebtoken';

export const createToken = (
    user: Object,
    AccessTokenscretkey: string,
)=>{
    const token = jwt.sign({user} , AccessTokenscretkey , {expiresIn : '30d'});
    console.log("Token created =>" , token);
    return token;
}