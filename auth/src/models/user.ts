import mongoose from "mongoose";
import { Password } from "../services/password";

// Interface that describes the props 
// required to create (build) a new user
interface UserAttrs{
    email: string;
    password: string
}

// An interface that describes the props
// that a user Model has (overall db schema)
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

// Interface that desribe the props
// that a User Document has (specific to document)
interface UserDoc extends mongoose.Document{
    email: string;
    password: string; 
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.password;
            delete ret.__v;
        }
    }
})

// async () => would execute in the context of this file
userSchema.pre('save', async function(done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc,UserModel>('User', userSchema);

export {User};