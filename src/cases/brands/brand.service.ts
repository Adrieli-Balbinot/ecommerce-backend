import { Repository } from "typeorm";
import { Brand } from "./brand.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BrandService {

    constructor(
        @InjectRepository(Brand)
        private repository: Repository<Brand>
    ) { }

    findAll(): Promise<Brand[]> {
        return this.repository.find();
    }

    findByID(id: string): Promise<Brand | null> {
        return this.repository.findOneBy({ id: id });
    }

    save(brand: Brand): Promise<Brand> {
        return this.repository.save(brand);
    }

    async remove(id: string) {
        await this.repository.delete(id);
    }
}