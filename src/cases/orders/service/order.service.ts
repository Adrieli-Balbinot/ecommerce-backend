import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>
  ) {}

  findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Order | null> {
    return this.repository.findOneBy({id: id});
  }

  save(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}