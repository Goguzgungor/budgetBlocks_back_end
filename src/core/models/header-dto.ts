import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";


export enum ClientPointEnum{
    MOBILE_APP,
    DEALER_WEB_APP,
    "WEB-APP"
}

export enum OrderPointEnum{
  TAKEOUT,
  TABLE,
  GETIN
}


export class HeaderParams {
  
  @ApiProperty({ type: String, required: false, description: 'Dil', default: 'tr'})
  lang?: string;

  @ApiProperty({ type: String, required: true, description: 'Client Point Belirtilmedi', default:'MOBILE_APP', enum: ClientPointEnum})
  @IsEnum(ClientPointEnum)
  clientpoint: string;

  @ApiProperty({ type: String, required: false, description: 'Order Point', default:'TAKEOUT', enum: OrderPointEnum})
  @IsEnum(OrderPointEnum)
  orderpoint?: string;
  
  @ApiProperty({ type: Number, required: false, description: 'Mahalle Id', example: 5512})
  neighborhoodid?: number;
  
  @ApiProperty({ type: Number, required: false, description: 'Adres Id', example: 27})
  addressid?: number;
  
  @ApiProperty({ type: String, required: false, description: 'Enlem boylam', default: '40.96082955771461,29.131917357444767'})
  latlng?: string;
  
}


export class LocationDto {
  
  @ApiProperty({ type: Number, required: true, description: 'Enlem'})
  lat: number;

  
  @ApiProperty({ type: Number, required: true, description: 'Boylan'})
  lon: number;
  
}