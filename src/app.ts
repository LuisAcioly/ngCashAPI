import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express';
import * as cors from 'cors';
import { dataSource } from './database/data-source';
import routes from './routes';
import transactionsRoutes from './routes/transactions.routes';
import userRoutes from './routes/users.routes';

const app: express.Express = express();
const options: cors.CorsOptions = {
    methods: "GET, POST, PUT, DELETE",
    origin: "*",
}


app.use(cors(options));
app.use(express.json());
app.use(routes);
app.use(userRoutes);
app.use(transactionsRoutes)
dataSource.initialize().then(() => {
  app.listen(8000, () => {
    console.log('🏃 Running Server');
  });
}).catch(error => { console.log(error)})



export default app;