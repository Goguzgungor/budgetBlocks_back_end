import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GeneralErrorDto } from '../models/default-dto';
import { DbForeignList, PrismaErrors } from './prisma.exception';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown): string => {
  return String(exception);
};


export const getPrismaErrorMessage = (str: string) => {
  const defaultMessage = 'Hatalı parametre girdiniz';
  return (str) ? DbForeignList[str.replace(' (index)', '')] ||  defaultMessage : defaultMessage;
}


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = getStatusCode(exception);
    const message = getErrorMessage(exception);

    console.log(message);

    if(statusCode==500 && exception && exception['code'] && PrismaErrors[exception['code']]){

      if(exception['code'] == 'P2003' && exception.meta.field_name){

        response.status(422).json({
          error_code: 'VALIDATION_ERROR', 
          message: getPrismaErrorMessage(exception?.meta?.field_name)
        })

      }else{
        response.status(400).json({error_code: 'GENERAL_ERROR', message: PrismaErrors[exception['code']] || 'Genel Hata'})
      }
      
    }else if([500,502,503,504].includes(statusCode)){
      response.status(400).json(new GeneralErrorDto())
    }else{
      response.status(statusCode).json(exception.getResponse());
    }

  }
}