import * as dotenv from "dotenv";
dotenv.config(); //l'index è la prima porta che viene avviata
//in tutti gli altri filele variabili d'ambiente saranno accessibili
import app from "./server";

app.listen(3001, () => {
	console.log(`Listening on http://localhost:3001`);
});