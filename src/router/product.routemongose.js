import { Router } from "express";
import * as controller from "../controllers/products.controllers.js";

const routerMongo = Router();

routerMongo.get("/", controller.getAll); //muestra los productos

routerMongo.get("/:id", controller.getById); //busca por _id

routerMongo.post("/", controller.createProduct); //crea el producto

routerMongo.put("/:id", controller.updateProduct); //actualiza el producto

routerMongo.delete("/:id", controller.deleteProduct); //elimina el producto

export default routerMongo;