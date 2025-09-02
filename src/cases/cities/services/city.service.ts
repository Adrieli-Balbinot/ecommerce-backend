import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { City } from "../entities/city.entity";

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private repository: Repository<City>
    ) { }

    findAll(): Promise<City[]> {
        return this.repository.find();
    }

    findByID(id: string): Promise<City | null> {
        return this.repository.findOneBy({ id: id });
    }

    save(state: City): Promise<City> {
        return this.repository.save(state);
    }

    async remove(id: string) {
        await this.repository.delete(id);
    }
}