import JWT from 'jsonwebtoken';

export const requireSignIn =async(req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET_KEY );
        req.user =decode; // attach user info to request object
        next();
    } catch (error) {
        console.log(error);
    }
};
 