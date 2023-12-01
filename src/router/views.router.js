import { Router } from "express";
import { getProducts } from "../daos/fileSystem/manager/productsManager.js";
import ProductMongoDB from "../daos/mongoseDb/Products/products.mongose.js";
import CartMongoDB from "../daos/mongoseDb/Products/carts.mongose.js"
const prodDao = new ProductMongoDB();
const cartDao = new CartMongoDB();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await prodDao.getAll();
        const products = result.payload.products;
        // console.log(products);
        res.render('partials/home', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/product', async (req, res) => {
    res.render('partials/realTimeProducts');
});

router.get('/contact', (req, res) => {
    res.render('partials/contact');
});

router.get('/cart', async (req, res) => {
    try {
        const products = await cartDao.getCart();
        const productsPlain = products.map(product => Object.assign({}, product.toJSON()));
        // console.log(productsPlain)
        res.render('partials/cart', { carts: productsPlain });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/user', async (req, res) => {
    res.render('partials/login');
});

router.get('/register', async (req, res) => {
    res.render('partials/register');
});
export default router;

