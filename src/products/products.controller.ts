import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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

  //  When it's @Query, its come of part of url, http://localhost:3000/api/products?page=2&limit=4
  //  When it's @Body, its come of post, patch petition,
  //  When it's @Param, its come of url's segments, api/products/1

  @Get()  
  findAllProducts(@Query() paginationDto: PaginationDto) {
    // return this.productsClient.send({ cmd: 'find_all_products' }, { limit: 2, page: 2 } //manual)
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto)
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
    @Param('id') id: string,
    @Body() body: any) {
    return `this function update product ${id}`
  }


}

