import express, { response } from 'express';
import cors from 'cors';

let app = express();

let port = process.env.PORT || 3010;

let router = express.Router();

app.use(express.static('../client/build'));
app.use(express.json());
app.use(cors());

import authentication from './routes/authentication.js';
app.use("/api", authentication.router);

import shopping from './routes/shopping.js';
app.use("/api", authentication.isUserLogged, shopping);


app.listen(port, () => {
    console.log('Listening on port ', port);
});