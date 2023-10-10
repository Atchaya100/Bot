import { Injectable } from '@nestjs/common'
const TelegramBot = require('node-telegram-bot-api')
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message, Users } from './telegram.model'
@Injectable()
export class TelegramService {
    constructor(@InjectModel('msg') private msgModel:Model<Message>,@InjectModel('users') private userModel:Model<Users>){}
     bot = new TelegramBot('6053505020:AAGsnBwvBvzIto9oMnpSN4R9yq9h4esj7r0', { polling: true })
     WId=-1001927745958
    startBot(){
        this.bot.onText(/\/start/,(msg)=>{
            this.bot.sendMessage(msg.chat.id, `Welcome to the Weather bot ${msg.from.first_name}. Type Weather to subscribe for daily weather updates`)
        })
        this.bot.on('message',async (msg) => {
                const chatId = msg.chat.id;
        
                if(msg.text=="Weather"){
                    const data=await this.bot.sendMessage(chatId,"t.me/+W3WVtdvTGV0wMzhl")
                const username=data.chat.first_name
                
                const newUser=  new this.userModel({
                   username:username,
                   user_id:chatId
                })
                const k=await this.userModel.findOne({user_id:chatId})
                if(k==null){
                newUser.save()
                }
                }
          });
    }
    async addMessage(message:any){
        const data= await this.bot.sendMessage(this.WId,message)
        const id=data.message_id
        const newMsg=  new this.msgModel({
            msg:message,
            msg_id:id
        })
        newMsg.save()
       
    }
    async deleteMessage(id:Number){
        this.bot.deleteMessage(this.WId,id)
        const i=await this.msgModel.findOneAndDelete({msg_id:id})
    }
    async deleteUser(id:Number){
        this.bot.banChatMember(this.WId,id)
        const i=await this.userModel.findOneAndDelete({user_id:id})
    }
    
   
   
}


