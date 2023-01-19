import mongoose, { Schema } from 'mongoose';

const CustomerModel = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true,
        unique: true

    }
}, {
    timestamps: true,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})
export default mongoose.model('Customer', CustomerModel)
