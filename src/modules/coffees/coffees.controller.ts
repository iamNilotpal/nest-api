import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CoffeeResponseDto } from './dto/coffee-response.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const coffees = await this.coffeeService.findAll(paginationQuery);
    return coffees.map((coffee) => new CoffeeResponseDto(coffee));
  }

  @Get('flavours')
  async getFlavours() {
    return await this.coffeeService.getFlavours();
  }

  @Get(':id')
  async findCoffee(@Param('id') id: string) {
    const coffee = await this.coffeeService.findCoffee(id);
    return new CoffeeResponseDto(coffee);
  }

  @Post()
  async createCoffee(@Body() body: CreateCoffeeDto) {
    const coffee = await this.coffeeService.createCoffee(body);
    return new CoffeeResponseDto(coffee);
  }

  @Patch(':id')
  async updateCoffee(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    const coffee = await this.coffeeService.updateCoffee(id, body);
    return new CoffeeResponseDto(coffee);
  }

  @Delete(':id')
  async removeCoffee(@Param('id') id: string) {
    const coffee = await this.coffeeService.removeCoffee(id);
    return new CoffeeResponseDto(coffee);
  }
}
