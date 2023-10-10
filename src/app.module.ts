import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import {MongooseModule} from '@nestjs/mongoose'
@Module({
  imports: [TelegramModule,MongooseModule.forRoot("mongodb+srv://Atchaya:Magicshop*7@atlascluster.bwxgqge.mongodb.net/bot?retryWrites=true&w=majority")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
