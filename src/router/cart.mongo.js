import { Router } from "express";
import * as cartController from "../controllers/cart.contollers.js";

const routerCart = Router();

routerCart.post("/add/:productId", cartController.addToCart); //Agrega a carrito por id de producto auto genera id de carrito
routerCart.get("/", cartController.getAll); //te muestra carrito completo
routerCart.delete("/:cartItemId", cartController.deleteProduct); //elimina por id de cart producto individual
routerCart.delete("/", cartController.clearCart); //Vacia Carrito

export default routerCart;
