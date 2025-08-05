import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    bio: {
        require: true,
        type: String
    }
})

const Users = model('User', userSchema);

export default Users