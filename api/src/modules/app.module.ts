import { Module } from '@nestjs/common';
import {ChatModule} from "./domian/chat/chat.module";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule ,ChatModule],
})
export class AppModule {}
