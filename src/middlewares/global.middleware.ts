import dotenv from 'dotenv'
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { Unauthorized } from '../helpers/api-errors';
import UserService from '../services/user.service'

dotenv.config();

export interface IDecoded extends Request {
    id: String,
    iat: Number,
    exp: Number
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.sendStatus(401)
        }

        const parts = authorization.split(' ')
        const [schema, token] = parts;

        if (parts.length !== 2) {
            return res.sendStatus(401)
        }
        if (schema !== 'Bearer') {
            return res.sendStatus(401)
        }

        jwt.verify(token, `${process.env.SECRET_JWT}`, async (error, decoded: any) => {
            if (error) {
               return  res.sendStatus(401)
            }

            const user = await UserService.findById(decoded.id)


            if (!user || !user._id) {
                return res.status(401).json({ message: 'Invalid Token' })
            }

            req.body.userId = user._id
            return next();
        })


    } catch (err) {
        console.log(err)
        // return res.status(500).send(err)
    }



}