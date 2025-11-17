import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderItem } from "./entities/order-item.entity";
import { OrderItemController } from "./controllers/order-item.controller";
import { OrderService } from "./service/order.service";
import { OrderItemService } from "./service/order-item.service";

@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderItem])],
    providers: [OrderService, OrderItemService],
    controllers: [OrderController, OrderItemController]
})
export class OrderModule {}