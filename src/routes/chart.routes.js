import { ChartManager } from "../controllers/ChartManager.js";
import { Router } from 'express'

const routerChart = Router();
const chartController = new ChartManager('src/models/charts.json');

routerChart.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit);
    let charts = await chartController.getAll(limit);
    if (charts) 
        return res.status(200).send(charts);

    return res.status(404).send("No hay carritos");
})

routerChart.get('/:cid', async (req, res) => {
    const chartId = parseInt(req.params.cid);
    const chart = await chartController.getById(chartId);
    if (chart)
        return res.status(200).send(chart);

    res.status(404).send("Carrito no encontrado");
})

routerChart.post('/', async (req, res) => {
    const products = req.body;
    const chart = await chartController.create(products);
    if (chart)
        return res.status(200).send(chart);

    res.status(400).send("No se pudo crear el carrito");
})

routerChart.post('/:cid/product/:pid', async (req, res) => {
    const chartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const chart = await chartController.addProduct(chartId, productId);
    if (chart)
        return res.status(200).send(chart);

    res.status(404).send("No se pudo crear el carrito");
})

export default routerChart