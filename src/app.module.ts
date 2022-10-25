import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'NestApi',
    }),
    CoffeesModule,
    CommonModule,
  ],
})
export class AppModule {}
