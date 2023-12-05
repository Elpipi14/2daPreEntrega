import { Router } from "express";
import { publicRoute, validateLogin } from "../middlewares/validateLogin.js";
import UserMongoDB from "../daos/mongoseDb/DB/user.mongose.js";
import ProductMongoDB from "../daos/mongoseDb/DB/products.mongose.js";
import CartMongoDB from "../daos/mongoseDb/DB/carts.mongose.js"
const prodDao = new ProductMongoDB();
const cartDao = new CartMongoDB();
const userDao = new UserMongoDB();
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

router.get('/products', async (req, res) => {
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

//Login
router.get('/login', publicRoute, async (req, res) => {
    res.render('partials/login');
});


router.get('/register', async (req, res) => {
    res.render('partials/register');
});

router.get('/profile', validateLogin, async (req, res) => {
    res.render('partials/profile');
});

router.get('/register-error', async (req, res) => {
    res.render('partials/register-error');
});

export default router;

