import prisma from "../db";
import { comparePassword, createJWT, hashPassword} from '../modules/auth';

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
        },
    });

    const token = createJWT(user);
    res.json({token}); //restituisco un json comn proprietà token e valore token. Quando due proprietà sono uguali, se ne può scrivere solo uan {token, token} => {token}

};

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    });

    const isValid = await comparePassword(req.body.password, user.password); //comparePassword lavora in asincrono

    if(!isValid){
        res.status(401);
        res.json({message: "Not Authorized"});
        return;
    }

    const token = createJWT(user);
    res.json({token});
}