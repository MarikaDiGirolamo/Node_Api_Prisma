import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}; //ritorna una promise

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5); //5 si chiama salt, livello di difficoltà
};//ritorna una promise


export const createJWT = (user) => {
    const token = jwt.sign(
        {id: user.id, username: user.username},
    process.env.JWT_SECRET
    );
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer){
        res.status(401);
        res.json({message: "Not Authorized"});
        return;
    }

    const [, token] = bearer.split(" "); // const token = bearer.split(" ")[1]
    //Bearer 3g3qijhjg3qjt09qttg3qjg3q'3gj
    //["Bearer", "ebaeieeoaibhaoeiga"]
    //const [, token]deconstructoring

    if (!token) {
        res.status(401);
        res.json({message: "Not valide token"});
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);// confronta il token con SECRET e verifica che siano collegati e creato il token a partire dalla parola segreta e lo valda e restituisce i pezzi da cui è stato composto
        req.user = user; //aggiunge alla request il risultato della verifica fatta, quindi lo user. Una volta che l'utente è autenticato e la verifica ci restituisce i suoi paramentri, nonc i sarà più bisogno di controllare la validaità del token. 1- controlla token, 2 restituisce dati utente, 3 attacca i dati alla request in modo che tutte le rotte successive abbiamo a disposizione user id e username.
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({message: "not valid token"});
        return;
    }
}