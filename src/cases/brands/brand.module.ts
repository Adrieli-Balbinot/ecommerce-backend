import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Brand } from "./brand.entity";
import { BrandService } from "./brand.service";
import { BrandController } from "./brand.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Brand])],
    providers: [BrandService],
    controllers: [BrandController],
})
export class BrandModule { }