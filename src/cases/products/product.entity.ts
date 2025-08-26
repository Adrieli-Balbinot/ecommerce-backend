import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { Brand } from "../brands/brand.entity";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('decimal', {nullable: false, precision: 10, scale: 2})
    price: number;

    @Column('boolean', {nullable: false, default: true})
    active: boolean;

    @ManyToOne(() => Category, {eager: true, nullable: false})
    category: Category;

    @ManyToOne(() => Brand, {eager: false, nullable: true})
    brand: Brand;
}