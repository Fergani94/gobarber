import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  // Cria uma nova sessao
  async store(req, res) {
    const { email, password } = req.body;
    // Verifica se email digitado eh um email valido no db
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const { id, name } = user;
    // Faz a criacao do JWT
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Insere as informacoes no Payload
      // O segundo parametro tem que ser uma String unica no mundo todo
      // Ou seja, uma string aleatoria criptografada
      // Terceiro parametro eh uma data de expiracao do token
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
