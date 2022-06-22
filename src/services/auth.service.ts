import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UnauthorizedException from "../exceptions/unauthorized.exception"
import UserService from "./user.service"

class AuthService {
  async login(email: string, password: string) {
    // TODO: Verificar no banco de dados o email
    // Todo: Caso o usuário exista, encryptar o password e verificar se bate
    // TODO: criar o token caso o usuário exista e o password esteja correto
    const userService = new UserService()

    const user = await userService.getUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      throw new UnauthorizedException()
    }
    // Cria o token
    const token = jwt.sign({
      sub: user.id,
      iat: Date.now(),
      email: user.email
    }, 'ABCBANANA')

    return {
      token
    }
  }
}

export default AuthService
