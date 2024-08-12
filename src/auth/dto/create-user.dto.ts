// import { OrderStatus } from "@prisma/client";
// import { OrderStatusList } from "../enum/order.enum";

import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";

//import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
      
   
    public name: string;
    
}


