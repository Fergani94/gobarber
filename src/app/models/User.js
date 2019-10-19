// Faz a traducao de JS pro db
import Sequelize, { Model } from 'sequelize';
/* Extensao que faz a criptografia da senha */
import bcrypt from 'bcryptjs';

/* Modelo da entidade */
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /* Hooks que sao executados em algum estado da aplicacao, nesse caso
    foi utilizado o Before Save.. ou seja, antes da aplicacao salvar algo
    seja um update ou um create essa funcao sera executada. */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        /* Criptografa o password */
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    // Retorna o que acabou de ser inicializado
    return this;
  }

  // Checa se o password passado como parametro bate com o Hash do db
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
