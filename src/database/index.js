import Sequelize from 'sequelize';
/* Importa as configuracoes de conexao com o banco de dados */
import databaseConfig from '../config/database';
/* Importa o modelo do usuario da aplicacao */
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // Instancia a conexao com o banco de dados
  init() {
    this.connection = new Sequelize(databaseConfig);

    // Cria uma conexao para cada requisicao do banco de dados
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
