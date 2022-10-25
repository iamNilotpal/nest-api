export class CoffeeResponseDto {
  id: string;
  name: string;
  brand: string;
  flavours: string[];

  constructor(coffee: any) {
    this.id = coffee._id;
    this.name = coffee.name;
    this.brand = coffee.brand;
    this.flavours = coffee.flavours;
  }
}
