// import { UpdateOrderDto } from './dto/update-order.dto';
//import { OrdersService } from './orders.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  // constructor(private readonly ordersService: OrdersService) {}
  constructor(

    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,

  ) { }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {

    return this.ordersClient.send(
      'createOrder',
      createOrderDto
    )
  }

  @Get()
  findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {

    //return orderPaginationDto
    return this.ordersClient.send(
      'findAllOrders',
      orderPaginationDto
    )

  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {

      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      );
      return order; 

    } catch (error) {
      throw new RpcException(error);
    }


    // return this.ordersClient.send(
    //   'findOneOrder',
    //   { id }
    // ).pipe(
    //   catchError(err => { throw new RpcException(err) })
    // )

  }
  @Get(':status')
  async findOneByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,

  ) {

    try {

      return this.ordersClient.send(
        'findAllOrders',
        {
          // page: paginationDto.page,
          // limit: paginationDto.limit,
          ...paginationDto,
          status: statusDto.status,

        }
      )


    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.ordersClient.send(
        'changeOrderStatus',
        {
          id: id,
          status: statusDto.status,
        })
    } catch (error) {
      throw new RpcException(error);

    }
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
