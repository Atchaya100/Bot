import * as mongoose from 'mongoose';
export const StorySchema=new mongoose.Schema({
    msg:String,
    msg_id:Number
})
export const UserSchema=new mongoose.Schema({
    username:String,
    user_id:Number
})
export interface Message{
    msg:string,
    msg_id:Number
}
export interface Users{
    user_id:Number,
    username:string
}

