import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Customer } from "src/cases/customers/customer.entity";

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order)
        private repository: Repository<Order>
    ) { }


    findAll(custommer?: Customer): Promise<Order[]> {
        console.log("custommer no order.service: " + custommer)
        if (!custommer) {
            return this.repository.find();
        } else {
            return this.repository.find({
                where: {
                    custommer: custommer
                }
            });
        }

    }

    findById(id: string): Promise<Order | null> {
        return this.repository.findOneBy({ id: id });
    }

    save(order: Order): Promise<Order> {
        const total = order.items.reduce((sum, item) => {
            return sum + Number(item.quantity) * Number(item.value)
        }, 0)

        order.total = total;

        return this.repository.save(order);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async listEntregues(idUser: string): Promise<Order[]> {
        console.log('listEntregues chamado no service')
        return this.repository.find({
            where: { status: 'DELIVERED', custommer: { id: idUser } },
            relations: ['items'] 
        });
    }
}