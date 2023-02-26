/* istanbul ignore next */
import { HttpException } from "@nestjs/common";

/**
 * Hata kodları burada mevcuttur.
 * https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
 */
export enum PrismaErrors{
    P2000='Veri çok uzun',
    P2002='Veri zaten kayıtlı',
    P2025='Kayıt bulunamadı',
    P1017='Database bağlantısı sağlanamadı',
    P2003='Hatalı parametre girdiniz',
    P2005='Hatalı veri tipi',
    P2011='Veri null olamaz',
    P2012='Zorunlu veri eksik',
    P2021='Tablo bulunamadı',
    P2022='Sutün bulunamadı'
}

export enum DbForeignList {
    'courier_equipment_pickup_equipment_id_4cc0e3b5_fk_equipment_id (index)'= 'Ekipman',
}


export class PrismaException extends HttpException {
    constructor(e: any) {

        let error_code = 'VALIDATION_ERROR';
        let message = 'Geçersiz Parametre';

        if(e.code && PrismaErrors[e.code]){
            message = PrismaErrors[e.code];
        }

        super({error_code, message }, 422);
    }
}


