import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  async findAll() {
    return await this.coffeeService.findAll();
  }

  @Get('flavours')
  async getFlavours() {
    return await this.coffeeService.getFlavours();
  }

  @Get(':id')
  async findCoffee(@Param('id') id: string) {
    return await this.coffeeService.findCoffee(id);
  }

  @Post()
  async createCoffee(@Body() body: CreateCoffeeDto) {
    return await this.coffeeService.createCoffee(body);
  }

  @Patch(':id')
  async updateCoffee(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return await this.coffeeService.updateCoffee(id, body);
  }

  @Delete(':id')
  async removeCoffee(@Param('id') id: string) {
    return await this.coffeeService.removeCoffee(id);
  }
}
