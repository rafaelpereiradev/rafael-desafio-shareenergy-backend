import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { authService, generateToken } from '../../services/auth.service.ts';
import { NotFoundError } from '../../helpers/api-errors';

const AuthController = {

    async login(req: Request, res: Response) {
        const { username, password , remember} = req.body;

        const user = await authService(username)

        if (!user) {
           throw new NotFoundError('User or Password not found')
        }
        const passwordIsValid = await bcrypt.compare(password, `${user?.password}`)

        if (!passwordIsValid) {
            throw new NotFoundError('User or Password not found')
        }
        const token = generateToken(user.id,remember)
        res.send({token})
    },

}

export default AuthController