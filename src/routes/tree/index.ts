import { Router } from 'express';
const app = Router();

import tree from './tree';

app.use('/', tree);

export default app;
