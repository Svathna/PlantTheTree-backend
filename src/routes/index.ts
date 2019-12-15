import { Router } from 'express';
const app = Router();

import user from './user';
import tree from './tree';

app.use('/user', user);
app.use('/tree', tree);


export default app;
