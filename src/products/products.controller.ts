import { Body, Controller,Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }


  @Get()
  findAllProducts() {
  return this.productsClient.send( {cmd: 'find_all_products' }, {})    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} product`;
  }


  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `This action removes a #${id} product`;
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id : string,
    @Body() body: any) {
    return `this function update product ${id}`
  }


}

