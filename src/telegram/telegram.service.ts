import { Injectable } from '@nestjs/common'
const TelegramBot = require('node-telegram-bot-api')
const weather  = require('coding-weather')
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message, Users } from './telegram.model'
@Injectable()
export class TelegramService {
    constructor(@InjectModel('msg') private msgModel:Model<Message>,@InjectModel('users') private userModel:Model<Users>){}
     bot = new TelegramBot('6053505020:AAGsnBwvBvzIto9oMnpSN4R9yq9h4esj7r0', { polling: true })
     WId=-1001927745958
     msg:Message[]=[]
     user:Users[]=[]
     startBot(){
        this.bot.onText(/\/start/,(msg)=>{
            this.bot.sendMessage(msg.chat.id, `Welcome to the Weather bot ${msg.from.first_name}.\nType Weather to subscribe for daily weather updates.\nEnter city name to get Weather details.`)
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
                const cityName = msg.text
                try{
                    const a=await weather.weather(cityName, undefined, 'en')
                    this.bot.sendMessage(chatId,`Location:${a.location.name}\nTemperature:${a.current.temp_f} F\nHumidity:${a.current.humidity}\nMain:${a.weather.main}`,
                    )
                }
                catch(error){
                    this.bot.sendMessage(chatId,'Enter correct city name')
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
    async getMsg(){
      this.msg= await this.msgModel.find()
       return this.msg
    }
    async getUser(){
        this.user= await this.userModel.find()
         return this.user
    }  
   
}
