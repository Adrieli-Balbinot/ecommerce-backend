import { Customer } from "src/cases/customers/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from './../../products/product.entity';
import { Order } from "./order.entity";

@Entity('order')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Product, { eager: true, nullable: false })
    product: Product;

    @Column({ nullable: false })
    quantity: number;

    @Column('decimal', { nullable: false, precision: 10, scale: 2 })
    value: number;
}