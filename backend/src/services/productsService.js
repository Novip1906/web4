const fileService = require('./fileService');

let dataFilePath;

function init(filePath) {
    dataFilePath = filePath;
}

function findAll(title) {
    const products = fileService.readData(dataFilePath);
    if (!title) return products;
    const lower = title.toLowerCase();
    return products.filter(p => p.title.toLowerCase().includes(lower));
}

function findOne(id) {
    const products = fileService.readData(dataFilePath);
    return products.find(p => p.id === Number(id)) || null;
}

function create(data) {
    const products = fileService.readData(dataFilePath);
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct = { id: maxId + 1, ...data };
    products.push(newProduct);
    fileService.writeData(dataFilePath, products);
    return newProduct;
}

function update(id, data) {
    const products = fileService.readData(dataFilePath);
    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) return null;
    products[index] = { ...products[index], ...data, id: products[index].id };
    fileService.writeData(dataFilePath, products);
    return products[index];
}

function remove(id) {
    const products = fileService.readData(dataFilePath);
    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) return false;
    products.splice(index, 1);
    fileService.writeData(dataFilePath, products);
    return true;
}

module.exports = { init, findAll, findOne, create, update, remove };
