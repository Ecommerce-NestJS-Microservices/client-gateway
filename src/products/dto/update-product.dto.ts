import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {


    // @IsNumber()
    // @IsPositive()
    // id: number;
// it's not necesary why we don't ask by the petition's body
}
