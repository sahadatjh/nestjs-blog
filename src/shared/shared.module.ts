import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './services/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Global()
@Module({
    providers:[DatabaseService],
    imports:[ConfigModule],
    exports:[DatabaseService],
    controllers:[]
})
export class SharedModule {
    constructor(private readonly configService: ConfigService){}
}
