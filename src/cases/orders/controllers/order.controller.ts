import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { validate as isUUID } from 'uuid';
import { OrderService } from "../service/order.service";
import { CustomerService } from "src/cases/customers/customer.service";
import { Order } from "../entities/order.entity";

@Controller('orders')
export class OrderController {

    constructor(
        private readonly customerService: CustomerService,
        private readonly service: OrderService
    ) { }

    @Get()
    async find(@Query('customerId') customerId: string): Promise<Order[]> {
        if (customerId && isUUID(customerId)) {
            const customer = await this.customerService.findById(customerId);
            if (!customer) {
                return [];
            }
            return this.service.findAll(customer);
        }

        return this.service.findAll();
    }

    @Get('entregues/:idUser')
    async listDelivered(@Param('idUser') idUser: string): Promise<Order[]> {
        return this.service.listEntregues(idUser);
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Post()
    create(@Body() order: Order): Promise<Order> {
        return this.service.save(order);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() order: Order): Promise<Order> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        order.id = id;

        return this.service.save(order);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return this.service.remove(id);
    }
}

