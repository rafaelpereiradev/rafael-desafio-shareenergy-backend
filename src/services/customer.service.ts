import customerModel from "../models/customer.model";

const findByCPF = (cpf:string) => customerModel.findOne({cpf:cpf})
const findByEmail = (email:string) => customerModel.findOne({email:email})

export  {findByCPF,findByEmail}