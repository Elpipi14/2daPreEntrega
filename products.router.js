import { Router } from "express";
const router = Router();

import { ProductManager } from "../daos/fileSystem/manager/productsManager.js";
const productsManager = new ProductManager('./src/daos/fileSystem/data/products.json');

import { productValidation } from "../middlewares/productValidation.js";

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productsManager.getAll();
        console.log();
        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit));
            res.status(200).json(limitedProducts);
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Not Found' });
    }
});

router.post('/', productValidation, async (req, res) => {
    try {
        // console.log(req.body);
        const product = { ...req.body }
        console.log(product);
        const productCreated = await productsManager.createProduct(product);
        const { title, description, code, price, status, stock, category, thumbnails } = productCreated;
        res.status(200).json(productCreated);
    } catch (error) {
        res.status(500).json(error.menssage);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsManager.getProductById(Number(id));
        if (!product) res.status(404).json({ menssage: 'product not found' });
        else res.status(200).json(product)
        return product
    } catch (error) {
        res.status(500).json(error.menssage);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const product = { ...req.body };
        // console.log('product', product);
        const { id } = req.params;
        const idNumber = Number(id);
        const productOk = await productsManager.getProductById(idNumber);
        if (!productOk) res.status(404).json({ message: 'product not found' });
        else
            await productsManager.updateProduct(product, idNumber);
        res.status(200).json({ message: `product id: ${id} updated` })
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);
        await productsManager.deleteProduct(idNumber)
        res.json({ message: `product id: ${idNumber} deleted` })
    } catch (error) {
        res.status(500).json(error.massage);
    }
});

export default router;