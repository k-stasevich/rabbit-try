import { connect, Connection } from 'amqplib';
import { logger } from '../helpers/logger';

class RabbitBoss {
  connection: Connection | null = null;

  async connect() {
    this.connection = await connect('amqp://localhost');
    logger.info('Rabbitmq is connected');
  }
}

export const rabbitBoss = new RabbitBoss();
