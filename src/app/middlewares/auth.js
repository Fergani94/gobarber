import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Pega a informacao do header do browser para dar permissao ao usuario
  const authHeader = req.headers.authorization;

  // Retorna erro caso o token nao exista no header
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Exclui a palavra "Bearer" do retorno, pegando somente o token,
  // que eh o que a aplicacao precisa
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
