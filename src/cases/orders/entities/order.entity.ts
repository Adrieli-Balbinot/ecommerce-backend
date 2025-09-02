import { Customer } from "src/cases/customers/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

enum OrderStatus {
    NEW = 'NEW',
    SEPARATION = 'SEPARATION',
    INVOINCED = '',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}


@Entity('order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { eager: true, nullable: false })
    custommer: Customer;

    @Column('decimal', { nullable: false, precision: 10, scale: 2 })
    shipping: number;

    @Column('enum', { enum: OrderStatus, default: OrderStatus.NEW })
    status: string;

    @Column({ length: 250, nullable: false })
    total: string;

    @OneToMany(() => OrderItem, (item) => item.order, {
        eager: true,
        cascade: true
    })
    items: OrderItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}