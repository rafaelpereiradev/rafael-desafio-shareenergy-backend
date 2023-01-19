import userModel from "../models/user.model"

 interface IUser {
    id?:String,
    username: String,
    password: String
}

const create = (body: IUser) => userModel.create(body);

const findById = (id:any) => userModel.findById(id);

export = { create, findById}