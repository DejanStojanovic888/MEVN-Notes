const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true }, // za username ne valja unique al ajde :)
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{   
    timestamps: true,
    toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;