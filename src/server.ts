import express from 'express';
import router from './router'; 
import morgan from 'morgan'; //lo uso per i middleware, è un pacchetto che mi fa accedere alla req in modo più semplice
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';


const app = express();
const customLogger = (message) => (req, res, next) => {
console.log('Hello TU!')
next()

}

app.use(cors());
app.use(morgan('dev')); //sto dicendo di usare questo middleware per tutte le req. Ogni req passa attraverso morgan
app.use(express.json());// permette al client di mandare un json
app.use(express.urlencoded({extended:true}));// permette di mandare dei parametri di query

app.use(customLogger('EHi ehi!'));



app.use((req, res, next) => {

    req.shhh_secret = "doggy";
    next(); //middleware non bloccante perchè ha il metodo next();

    // res.status(401)
    // res.send('Nope');
})


app.get("/", (req, res) => {
	console.log("Hello from express");
	res.status(200);
	res.json({ message: req.shhh_secret});
});


app.use("/api", protect, router)//configurazioni globali per un certo path
app.post("/signin", signin);
app.post("/user", createNewUser);

export default app;