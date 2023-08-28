import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './services/database.service';



@Global()
@Module({
    providers:[DatabaseService],
    exports:[DatabaseService],
    controllers:[]
})
export class SharedModule {
    constructor(){}
}
