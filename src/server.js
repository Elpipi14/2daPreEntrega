import express from "express";
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import viewRouter from './router/views.router.js';
import { Server } from "socket.io"

//Conexion con mongo y logica para trabjar con post
import { initMongoDB } from "./daos/mongoseDb/connection.Mongose.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import routerMongo from "./router/product.route.js";
import routerCart from "./router/cart.route.js";

// Express conexion con public
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Handlebars
const hbs = handlebars.create({
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
});

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewRouter);
app.use(errorHandler);

//Router Mongo
initMongoDB()
app.use('/api/products', routerMongo);
app.use('/api/carts', routerCart);

// conexion HTTP
const httpSever = app.listen(8080, () => {
    console.log("escuchando al puerto 8080");
});


import cookieParser from "cookie-parser";
const secretKey = "1234"
app.use(cookieParser(secretKey));

app.get("/set-cookie", (req, res) => {
    res.cookies('idioma', 'ingles').json({ msg: "Ok" });
});

app.get("/cookie", (req, res) => {
    console.log(req.cookies);
    const { idioma } = req.cookies
    idioma === 'ingles' ? res.send('hello human') : res.send('hola humano')
});

app.get("/set-signed-cookie", (req, res) => {
    res.cookie("nombre", "andres", { signed: true }).json({ msg: "ok" })
})