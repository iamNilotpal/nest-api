import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find({}).skip(offset).limit(limit).lean().exec();
  }

  async findCoffee(id: string) {
    this.isValidId(id);
    const coffee = await this.coffeeModel.findOne({ _id: id }).lean().exec();
    if (!coffee)
      throw new NotFoundException(`Coffee with id ${id} doesn't exist.`);
    return coffee;
  }

  async createCoffee(createCoffeeDto: CreateCoffeeDto) {
    const coffee = await this.coffeeModel.create(createCoffeeDto);
    return coffee;
  }

  async updateCoffee(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    this.isValidId(id);
    const coffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .lean()
      .exec();

    if (!coffee)
      throw new NotFoundException(`Coffee with id ${id} doesn't exist.`);
    return coffee;
  }

  async removeCoffee(id: string) {
    this.isValidId(id);
    const coffee = await this.coffeeModel
      .findOneAndDelete({ _id: id })
      .lean()
      .exec();
    if (!coffee)
      throw new NotFoundException(`Coffee with id ${id} doesn't exist.`);
    return coffee;
  }

  async getFlavours() {
    const coffees = await this.coffeeModel.find().lean().exec();
    return coffees.map((coffee) => ({
      coffeeId: coffee._id,
      flavours: coffee.flavours,
    }));
  }

  private isValidId(id: string) {
    const isValid = isValidObjectId(id);
    if (!isValid) throw new BadRequestException('ID must be valid.');
  }
}
