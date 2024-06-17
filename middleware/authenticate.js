import jwt from 'jsonwebtoken';
import USER from '../models/userSchema.js';

const secretKey = "nitinnandanbtechecefinalyeartwok";
// const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(token, secretKey);
        console.log(verifyToken);

        const rootUser = await USER.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) { throw new Error("user not found") };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized : No token provided");
        console.log(error);

    }
};

export default authenticate;