import { applyDecorators, Delete, Get, HttpCode, Post, Put } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BadRequestDto, CompletedDto, DuplicateDto, ForbiddenDto, NotFoundDto, UnauthorizedDto, ValidationDto } from "./default-dto";
import { ClientPointEnum } from "./header-dto";


export function ApiDefaultHeader() {
    return applyDecorators(
        ApiHeader({name: 'clientpoint', required: true, example: 'CLIENT_WEB', enum: ClientPointEnum }),
    );
}


export function ApiResponseDefault(response?: any) {
    return applyDecorators(
        HttpCode(200),
        ApiResponse({ status: 200, description: "OK", type: response }),
        ApiResponse({ status: 400, description: "BAD_REQUEST", type: BadRequestDto }),
        ApiResponse({ status: 401, description: "UNAUTHORIZED", type: UnauthorizedDto }),
        ApiResponse({ status: 403, description: "FORBIDDEN", type: ForbiddenDto }),
        ApiResponse({ status: 404, description: "NOT_FOUND", type: NotFoundDto })
    );
}




export function ApiResponseDefaultDetail(body: any, response: any = CompletedDto) {
    return applyDecorators(
        ApiBody({ type: body }),
        ApiResponseDefault(response),
        ApiResponse({ status: 422, description: "Validation Error",  type: ValidationDto })
    );
}



//Default Api 
export function ApiGet(url: string = '/', summary: string = '', response?: any){
    return applyDecorators(
        Get(url),
        ApiOperation({ summary: summary }),
        ApiResponseDefault(response),
    );
}

export function ApiPost(url: string = '/', summary: string = '', response?: any){
    return applyDecorators(
        Post(url),
        ApiOperation({ summary: summary }),
        ApiResponseDefault(response),
        ApiResponse({ status: 409, description: "DUPLICATE_ERROR", type: DuplicateDto }),
        ApiResponse({ status: 422, description: "Validation Error",  type: ValidationDto })
    );
}

export function ApiPut(url: string = '/', summary: string = '', response?: any){
    return applyDecorators(
        Put(url),
        ApiOperation({ summary: summary }),
        ApiResponseDefault(response),
        ApiResponse({ status: 422, description: "Validation Error",  type: ValidationDto })
    );
}

export function ApiDelete(url: string = '/', summary: string = '', response?: any){
    return applyDecorators(
        Delete(url),
        ApiOperation({ summary: summary }),
        ApiResponseDefault(response),
        ApiResponse({ status: 422, description: "Validation Error",  type: ValidationDto })
    );
}
