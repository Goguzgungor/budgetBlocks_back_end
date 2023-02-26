export enum FranchiseTypeDto {
  F001 = 'Bayilerini kendisi yönetiyor: Her bayi aynı ticari firmaya bağlı',
  F002 = 'Bayilerini kendi takip etmiyor. Her bayi ayrı bir ticari firma',
  F003 = 'Bazı şubeler kendisinin bazıları ayrı',
}
export enum BrandStatusDto {
  new = 'Yeni',
  welcomeok = 'Welcome araması yapıldı',
  catalog = 'Katalog Girişi Yapılıyor',
  customersend = 'Müşteri onayına gönderildi',
  customerok = 'Müşteri Onayladı',
  customerreject = 'Müşteri onaylamadı',
  passive = 'Pasif',
  ok = 'Onaylandı / Aktif',
}
export enum BrandImageType {
  mobile_cover_image = 'mobile_cover_image',
  list_image = 'list_image',
  logo_image = 'logo_image',
}

export enum BrandImageSizeId {
  dealer_cover_image = 'dealer_cover_image',
  dealer_list_image = 'dealer_list_image',
  dealer_logo_image = 'dealer_logo_image',
}
