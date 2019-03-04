import { Router } from 'express';
// Register Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';


const swaggerRouter = Router();

swaggerRouter.use('/docs', swaggerUi.serve);
swaggerRouter.get('/docs', swaggerUi.setup(swaggerDocument));

export default swaggerRouter;