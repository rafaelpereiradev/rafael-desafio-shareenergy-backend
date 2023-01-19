import { Request, Response } from 'express'
import { NotFoundError } from '../../helpers/api-errors'
import UserModel from '../../models/user.model'

const UserController = {

    async create(req: Request, res: Response): Promise<Response> {
        let newUser = await UserModel.create(req.body)
        return res.json({
            username: newUser.username,
            message: "Usuário criado com sucesso!"
        })
    },
    async findById(req: Request, res: Response) {
        let user = await UserModel.findById(req.body.userId)
        if(!user){
            new NotFoundError('Not Found')
        }
        return res.send(user)
    },
}

export default UserController