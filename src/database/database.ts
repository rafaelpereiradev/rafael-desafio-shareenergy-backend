import mongoose from "mongoose";

const connectDatabase = () => {
    console.log('Wait connecting to the database...');

    mongoose.set("strictQuery", false);
    mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => console.log('Database connected!'))
        .catch((error) => console.log('Error to connect to database', error.message))

}

export { connectDatabase }