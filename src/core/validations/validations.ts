import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException } from "@nestjs/common";
interface Error {
    error_code: string
    message: string
}

export class ValidationException extends BadRequestException {
    constructor(public validationErrors: Error[]) {
        super();
    }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) : any {
        const context = host.switchToHttp();
        const response = context.getResponse();
        return response.status(422).json(exception.validationErrors[0])
    }
}