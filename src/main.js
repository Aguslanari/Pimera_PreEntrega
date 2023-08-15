import { Router } from 'express'
import express from 'express'
import { promises as fs } from 'fs'
import routerProd from './routes/products.routes.js'
import routerChart from './routes/chart.routes.js'

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/products', routerProd)
app.use('/api/charts', routerChart)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})