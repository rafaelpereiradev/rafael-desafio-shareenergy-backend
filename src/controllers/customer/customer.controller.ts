import axios from 'axios';
import  { Request, Response } from 'express'
import { ConflictError } from '../../helpers/api-errors';
import CustomerModel from '../../models/customer.model';
import { findByCPF, findByEmail } from '../../services/customer.service';



const CustomerController = {

    async getAll(req: Request, res: Response) {
        let allCustomers = await CustomerModel.find()
        return res.status(200).json(allCustomers)
    },

    async create(req: Request, res: Response) {
        const { email, cpf } = req.body
        const customerCPFExist = await findByCPF(cpf)
        const customerEmailExist = await findByEmail(email)

        if (customerCPFExist) {
            throw new ConflictError('Já existe um cliente com este CPF cadastrado ')
        } 
        if (customerEmailExist) {
            throw new ConflictError('Já existe um cliente com este e-mail cadastrado ')
        }
        let newCustomer = await CustomerModel.create(req.body)

        return res.status(201).json(newCustomer)

    },

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { email, cpf } = req.body
        const customerCPFExist = await findByCPF(cpf)
        const customerEmailExist = await findByEmail(email)

        // if (customerCPFExist?.id !== id) {
        //     throw new ConflictError('Já existe um cliente com este CPF cadastrado ')
        // }
        // else if (customerEmailExist?.id !== id) {
        //     throw new ConflictError('Já existe um cliente com este e-mail cadastrado ')
        // }
        let customerUpdated = await CustomerModel.findByIdAndUpdate(id, req.body)

        return res.status(200).json(customerUpdated)
    },
    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        let customer = await CustomerModel.findByIdAndDelete(id)
        return res.json(customer)
    },

}

export default CustomerController