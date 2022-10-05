import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  @Get('flavours')
  getFlavours() {
    return this.coffeeService.getFlavours();
  }

  @Get(':id')
  findCoffee(@Param('id') id: number) {
    return this.coffeeService.findCoffee(id);
  }

  @Post()
  createCoffee(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(body);
  }

  @Patch(':id')
  updateCoffee(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
    return this.coffeeService.updateCoffee(id, body);
  }

  @Delete(':id')
  removeCoffee(@Param('id') id: number) {
    return this.coffeeService.removeCoffee(id);
  }
}
