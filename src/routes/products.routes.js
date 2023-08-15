import { ProductManager } from "../controllers/ProductManager.js";
import { Router } from 'express'

const routerProd = Router()
const manager = new ProductManager('src/models/products.json');

routerProd.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit);
    let productos = await manager.getAll(limit);
    if (productos) 
        return res.status(200).send(productos);

    return res.status(204).send("not found");
})

routerProd.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await manager.getById(id)
    if (product)
        return res.status(200).send(product);

    return res.status(404).send("Producto no encontrado");
})

routerProd.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = req.body;
    const success = await manager.udpate(id, product);
    if (success)
        return res.status(200).send("Producto actualizado correctamente");

    return res.status(404).send("No se pudo actulizar el producto");
})

routerProd.post('/', async (req, res) => {
    const product = req.body;
    const success = await manager.add(product);
    if (success)
        return res.status(200).send();

    return res.status(400).send("No se pudo agregar el producto");
})

routerProd.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await manager.delete(id)
    if (product)
        return res.status(200).send();

    return res.status(404).send("Producto no encontrado");
})

export default routerProd