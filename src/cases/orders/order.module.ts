import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";

import { OrderItem } from "./entities/order-item.entity";
import { OrderService } from "./service/order.service";
import { OrderItemService } from "./service/order-item.service";
import { CustomerModule } from "../customers/customer.module";
import { OrderItemController } from "./controllers/order-item.controller";
import { OrderController } from "./controllers/order.controller";


@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderItem]),
    CustomerModule
],

    providers: [OrderService, OrderItemService],
    controllers: [OrderController, OrderItemController]
})
export class OrderModule {}