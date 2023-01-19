import axios from 'axios';
import { Request, Response } from 'express'
import { InternalServerError, NotFoundError } from '../../helpers/api-errors';

const APIControler = {

    async httpCat(req: Request, res: Response) {

        const { code } = req.body
        await axios.get(`https://http.cat/${code}`, { responseType: 'arraybuffer' }).then((resp) => {
            let imgBase64 = Buffer.from(resp.data).toString('base64');
            res.status(200).json(imgBase64)
        }).catch((err) => {
           if(err.response.status == 404){
            throw new NotFoundError('Não há uma foto relacionada ao código selecionado')
           }
           return
        })

    },

    async randomUser(req: Request, res: Response) {
        await axios.get('https://randomuser.me/api/?results=60').then((resp) => {
            const { data } = resp
            res.status(200).json(data)
        }).catch((err) => {
            if(err.response.status == 404){
             throw new InternalServerError('Não foi possível processar a solicitação')
            }
            return
         })
    },

    async randomDog(req: Request, res: Response) {
        await axios.get(`https://random.dog/woof?include=jpg,png`).then((resp) => {
            
            axios.get(`https://random.dog/${resp.data}`, { responseType: 'arraybuffer' }).then((buff) => {
                let imgBase64 = Buffer.from(buff.data).toString('base64');
                res.status(200).json(imgBase64)
            })
        }).catch((err) => {
            throw new InternalServerError('Internal server error')
        })

    }
}

export default APIControler