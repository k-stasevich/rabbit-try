import { connect, Connection } from 'amqplib';

class RabbitBoss {
  connection: Connection | null = null;

  async connect() {
    this.connection = await connect('amqp://localhost');
  }
}

export const rabbitBoss = new RabbitBoss();
