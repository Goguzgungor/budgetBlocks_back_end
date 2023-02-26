export enum CompanyTypeDto {
  ltd = 'Limited Şirket',
  as = 'Anonim Şirket',
  shs = 'Şahıs',
  stk = 'Stk',
  kamu = 'KamuKurumu',
  university = 'University',
  irtibat = 'Irtibat',
}

export enum InvoiceTypeDto {
  E_ARCHIVE = 'e-Arşiv',
  E_INVOICE = 'e-Fatura',
}
export enum IntegrationStatusDto {
  ACTIVE = 'Aktif',
  TEMP = 'Yeni alındı',
  INFO = 'Beklemede',
  CANCEL_DEPT = 'Borcundan dolayı iptal',
  CANCEL_CUSTOMER = 'Müşteri isteği nednei ile iptal\n',
  PAUSE_DEPT = 'Borcundan dolayı durduruldu',
  PAUSE_CUSTOMER = 'Müşteri isteği ile durduruldu\n',
}
export enum DepartmentDto {
  MANAGEMENT = 'Yönetim',
  OPERATION = 'Operasyon',
  FRANCHISE = 'Franchise Geliştirme',
  TECHNICAL = 'Teknik',
  MARKETING = 'Pazarlama',
  PURCHASE = 'Satınalma',
}
