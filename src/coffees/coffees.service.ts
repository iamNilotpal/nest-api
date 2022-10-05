import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Coffee #1',
      brand: 'Some brand',
      flavours: ['Flavour #1', 'Flavour #2'],
    },
    {
      id: 2,
      name: 'Coffee #2',
      brand: 'Some brand',
      flavours: ['Flavour #1', 'Flavour #2'],
    },
    {
      id: 3,
      name: 'Coffee #3',
      brand: 'Some brand',
      flavours: ['Flavour #1', 'Flavour #2'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findCoffee(id: number) {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee)
      throw new NotFoundException(`Coffee with id ${id} doesn't exist.`);
    return coffee;
  }

  createCoffee(createCoffeeDto: CreateCoffeeDto) {
    const coffee = { ...createCoffeeDto, id: this.coffees.length + 1 };
    this.coffees.push(coffee);
    return coffee;
  }

  updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = this.findCoffee(id);
    const updatedCoffee = { ...coffee, ...updateCoffeeDto };
    this.coffees = this.coffees.map((c) => (c.id === id ? updatedCoffee : c));
    return updatedCoffee;
  }

  removeCoffee(id: number) {
    const coffee = this.findCoffee(id);
    this.coffees = this.coffees.filter((c) => c.id !== id);
    return coffee;
  }

  getFlavours() {
    return this.coffees.map((coffee) => ({ [coffee.id]: coffee.flavours }));
  }
}
