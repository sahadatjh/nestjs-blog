import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class ResponseTransformerInterceptor implements NestInterceptor{
    private readonly logger:Logger = new Logger(ResponseTransformerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const {statusCode} = context.switchToHttp().getResponse();

        return next.handle().pipe(map(responseData => {
            return {
                status: statusCode,
                msg: '',
                data: responseData
            }
        }))
    }
    
}