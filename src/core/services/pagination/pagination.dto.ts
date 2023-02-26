import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

export class PaginationRequest {

    @ApiProperty({ type: Number, required: true, description: 'Mevcut sayfa', default: 1})
    @Type(() => Number)
    page: number = 1;

    @ApiProperty({ type: Number, required: true, description: 'Sayfa başı gösterilecek kayıt, En fazla 500', default: 12, maximum: 500})
    @Type(() => Number)
    limit: number = 12;

    @ApiProperty({ type: String, required: false, description: 'Aranacak kelime'})
    @IsOptional()
    keyword?: string;

}

export class PaginateFilterItem{
    
    @ApiProperty({ type: Array, required: false, description: ''})
    search?: Array<string>;

    @ApiProperty({ type: String, required: false, description: ''})
    sort?: string;

}

export class PaginationResponse {
    
    @ApiProperty({ type: Array, required: true, description: 'Data List', isArray: true})
    @IsArray()
    data: Array<any>;

    @ApiProperty({ type: Number, required: true, description: 'Mevcut sayfa'})
    @Type(() => Number)
    page: number = 1;

    @ApiProperty({ type: Number, required: true, description: 'Sayfa başı gösterilecek kayıt'})
    @Type(() => Number)
    limit: number = 12;

    @ApiProperty({ type: Number, required: true, description: 'Toplam kayıt sayısı'})
    @Type(() => Number)
    total_count: number;

    @ApiProperty({ type: Number, required: true, description: 'Önceki Sayfa'})
    @Type(() => Number)
    prev_page?: number;

    @ApiProperty({ type: Number, required: true, description: 'Sonraki Sayfa'})
    @Type(() => Number)
    next_page?: number;

    @ApiProperty({ type: Number, required: true, description: 'Son Sayfa'})
    @Type(() => Number)
    last_page?: number;

    @ApiProperty({ type: Number, required: true, description: 'Toplam Sayfa sayısı'})
    @Type(() => Number)
    total_page?: number;


    constructor(params: any, pageInfo: any){

        this.data = params.data || [];
        this.total_count = params.total_count || 0;

        this.page = pageInfo.page || 1;
        this.limit = pageInfo.limit || 12;

        this.total_page = Math.ceil(this.total_count / this.limit);
        this.last_page = this.total_page;
        this.prev_page = this.page > 1 ? this.page - 1 : 1;
        this.next_page = this.page < this.last_page ? this.page + 1 : this.last_page;
        
    }

}
