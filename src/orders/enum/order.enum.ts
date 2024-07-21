//import { OrderStatus } from "@prisma/client";
// this import only in microservice orders , here only enum

export enum OrderStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}
export const OrderStatusList = [

    OrderStatus.PENDING,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,


]