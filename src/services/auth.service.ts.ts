import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";


const authService = (username: string) => UserModel.findOne({ username: username }).select('+password')

const generateToken = (id: string,remember?:boolean) => {
    return jwt.sign({ id: id }, `${process.env.SECRET_JWT}`, { expiresIn: remember==true?604800:5})  //remember-me 4 dias , sem remember 12 hrs 43200000
}

export { authService, generateToken }