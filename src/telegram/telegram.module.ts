import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { StorySchema, UserSchema } from './telegram.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'msg',schema:StorySchema},{name:'users',schema:UserSchema}])],
  providers: [TelegramService],
  controllers: [TelegramController]
})
export class TelegramModule {}
