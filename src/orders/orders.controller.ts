import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
//import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  // constructor(private readonly ordersService: OrdersService) {}
  constructor(
    
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,

   ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    
    return this.ordersClient.send(
      'createOrder',
     createOrderDto
    )
  }

  @Get()
findAllOrders(@Query() paginationDto: PaginationDto) {
    
    return this.ordersClient.send(
      'findAllOrders',
      paginationDto
    )
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.ordersClient.send(
      'findOneOrder',
      {id}
    ).pipe(
      catchError(err => {throw new RpcException(err)})
    )

  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
