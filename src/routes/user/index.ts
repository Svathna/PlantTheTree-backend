import { Router } from 'express';
const app = Router();

import user from './user';

app.use('/', user);

export default app;
