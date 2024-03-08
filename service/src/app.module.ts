import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './modules/api/api.module';
import { ApiController } from './modules/api/api.controller';
import { ApiService } from './modules/api/api.service';

@Module({
  imports: [ApiModule],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {}
