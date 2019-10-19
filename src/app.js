import express from 'express';
import routes from './routes';

import './database';
/* Classe principal da aplicacao, essa e a classe que chama todos os
metodos e funcoes que serao criados */

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}
// Exporta nova instancia do express() para o server.js
export default new App().server;
