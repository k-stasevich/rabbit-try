## Setup dev

1. pull rabbitmq docker image with management panel and run:
   `docker pull rabbitmq:3.7-management`
   `docker run -d --hostname my-rabbit --name rabbit-dev -p 8080:15672 rabbitmq:3.7-management`

## Rabbit dev panel

Visit http://localhost:8080. Creds - `guest/guest`
