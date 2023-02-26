import { ValidationError } from "@nestjs/common";
import { ValidationException } from "./validations";

export default () => ({
    stopAtFirstError: true,
    exceptionFactory: (errors: ValidationError[]) => {

        let messages;
        if(errors && Array.isArray(errors) && errors.length > 0){
          messages = errors.map((error) => {
            if(error.children.length && !error.constraints){
              if(error.children[0] && error.children[0].constraints){
                return {
                  error_code: error?.contexts?.isLength?.code || 'VALIDATION_ERROR',
                  message: Object.values(error.children[0].constraints).join('')
                }
              }else{
                return {
                  error_code: error?.contexts?.isLength?.code || 'VALIDATION_ERROR',
                  message: Object.values(error.children[0].children[0].constraints).join('')
                }
              }
            }else{
              return {
                error_code: error?.contexts?.isLength?.code || 'VALIDATION_ERROR',
                message: Object.values(error.constraints).join(''),
              }
            }
          })
        }else{
          messages = [
            {
              error_code: 'VALIDATION_ERROR',
              message: 'Geçersiz Islem, Degerler dizi değil'
            }
          ]
        }

        return new ValidationException(messages);
    }
});