import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { Message } from './telegram.model';

@Controller('telegram')
export class TelegramController {
 constructor(private service:TelegramService){service.startBot()}
 @Post()
 add(@Body('msg') msg:string){
   this.service.addMessage(msg)
   return msg
 }
 @Delete('/:id')
 delete(@Param('id') id){
   this.service.deleteMessage(id)
 }
 @Delete('/user/:id')
 deleteUser(@Param('id') id){
   this.service.deleteUser(id)
 }
}
