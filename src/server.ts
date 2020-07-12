import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

import { routes } from './routes';
import { logger } from './helpers/logger';
import { getEnv, getServerPort } from './helpers/env.helper';
import { globalErrorHandlerMiddleware } from './middlewares/global-error-handler.middleware';
import { rabbitBoss } from './services/rabbit-boss';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api', routes);
app.use(globalErrorHandlerMiddleware);
app.use('/api/static', express.static(path.join(__dirname, '/../static')));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = getServerPort();

Promise.all([
  rabbitBoss.connect(),
  //
  // connectToDb(process.env.DB_URL as string),
])
  .then(() => {
    app.listen(port, function () {
      const serverStartedMessage = `Server listening on port ${port}!`;
      logger.info(`env - ${getEnv()}`);
      logger.info(serverStartedMessage);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
