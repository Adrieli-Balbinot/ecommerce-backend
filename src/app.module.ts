import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'aws-0-sa-east-1.pooler.supabase.com',
            port: +'5432', 
            username: 'postgres.euxgtjxwwscqqzgobwlj',
            password: '@Drieli123*',
            database: 'postgres', 
            autoLoadEntities: true,
        }),
    ],
})
export class AppModule { }