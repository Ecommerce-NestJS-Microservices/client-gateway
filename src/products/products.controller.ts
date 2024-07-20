import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { ProductsModule } from './products.module';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { number } from 'joi';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto
    )
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
  async findOne(@Param('id') id: string) {

    return this.productsClient.send({ cmd: 'find_one_products' }, { id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )

    // second way
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_products' }, { id })
    //   )
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);

    // first way
    // console.log(error);
    // throw new BadRequestException(error);

  }

  // return this.productsClient.
  //   send({ cmd: 'find_one_products' }, { id: id })
  // .subscribe(resp => {}) other way

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send(
      { cmd: 'delete_product' },
      { id: id } // is better a object instead string since is more hard change from string to object. and if we have object is more easy expand a object

    )
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto) {

    // return {id, updateProductDto}
    
    const updateProductPayload = { ...updateProductDto, id}

    return this.productsClient.send(
      { cmd: 'update_product' },
      updateProductPayload
    )
      .pipe(
        catchError(err => { throw new RpcException(err) })
      )
  }
}


