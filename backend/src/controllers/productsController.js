const productsService = require('../services/productsService');

function getAllProducts(req, res) {
    const products = productsService.findAll(req.query.title);
    res.status(200).json(products);
}

function getProductById(req, res) {
    const product = productsService.findOne(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Продукт не найден' });
    }
    res.status(200).json(product);
}

function createProduct(req, res) {
    const { src, title, text } = req.body;
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    const product = productsService.create(req.body);
    res.status(201).json(product);
}

function updateProduct(req, res) {
    const product = productsService.update(req.params.id, req.body);
    if (!product) {
        return res.status(404).json({ error: 'Продукт не найден' });
    }
    res.status(200).json(product);
}

function deleteProduct(req, res) {
    const success = productsService.remove(req.params.id);
    if (!success) {
        return res.status(404).json({ error: 'Продукт не найден' });
    }
    res.status(204).send();
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
