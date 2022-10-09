import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { CoffeeRatingModule } from './modules/coffee-rating/coffee-rating.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'NestApi',
    }),
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
  ],
})
export class AppModule {}
