import { createHash, randomInt } from 'crypto';

//6 Haneli SMS codu Üretir
function generateSmsCode() {
  return randomInt(100000, 999999).toString();
}
export function generateRandomInt() {
  return randomInt(100000, 999999).toString();
}

//Telefon Numarası Formatlar
function phoneFormat(phonenum: any) {
  const cleanNumber = phonenum.replace(/[^0-9]+/gi, '');
  if (cleanNumber && cleanNumber.length >= 10) {
    if (cleanNumber.length == 10) {
      return '+90' + cleanNumber;
    } else if (cleanNumber.length == 11 && cleanNumber[0] == 0) {
      return '+9' + cleanNumber;
    } else {
      return '+' + cleanNumber;
    }
  }
  return '';
}

//SlugText
function toSlug(text: string) {
  const trMap = {
    çÇ: 'c',
    ğĞ: 'g',
    şŞ: 's',
    üÜ: 'u',
    ıİ: 'i',
    öÖ: 'o',
  };
  for (const key in trMap) {
    text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
  }
  return text
    .replace(/[^A-Z0-9\s]+/gi, '')
    .replace(/\s/gi, '-')
    .replace(/[-]+/gi, '-')
    .toLowerCase();
}

//String Parcalar. Örneğin: İsim soyisim yazılan bir string'i boşluga göre parçalar ve index'de belirtiğiniz değeri döner.
function textParse(str: string, index = 1) {
  if (!str) return '';

  const name = str.split(' ');
  const lastName = name.pop();
  const firstName = name.join(' ');
  return index == 1 ? lastName : firstName;
}

//TR: Karakterlerin ilk harfinin büyük yapar.
function textCapitalize(str) {
  return str
    .toLocaleLowerCase('tr-TR')
    .replace(/(?:^|\s|,|;|!|:|-|\.|\?)[a-z0-9ğçşüöı]/g, function (match) {
      return match.toLocaleUpperCase('tr-TR');
    });
}

//TR: Karakterleri büyük harfe çevirir
function textUppercase(str) {
  return str.toLocaleUpperCase('tr-TR');
}

//Karakterleri Küçük harfe çevirir.
function textLowercase(str) {
  return str.toLocaleLowerCase('tr-TR');
}

//Boşlukları temizle
function clearSpace(str) {
  return str.replace(/\s/g, '');
}

function createOrderId(prefix = '') {
  return (
    prefix +
    Math.floor(10 + randomInt(100000, 999999) * 99) +
    new Date().valueOf().toString().slice(-7) +
    Math.floor(+(100 + randomInt(100000, 999999) * 999)).toString()
  );
}

async function createPasswordHash(password) {
  return createHash('sha256').update(password).digest('hex');
}

function createVerificationCode() {
  return '123456';
  // return generateSmsCode()
}

function coordinatesIsValid(str?: string) {
  if (str && str.length > 3) {
    const parseStr = str.replace(/[^0-9,.]+/gi, '').split(',');

    if (
      Array.isArray(parseStr) &&
      parseStr.length == 2 &&
      parseStr[0] &&
      parseStr[1]
    ) {
      return parseStr.map((item) => {
        return parseFloat(item.trim());
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function coordinatesParseData(str: string) {
  const getCordinates = coordinatesIsValid(str);
  if (Array.isArray(getCordinates) && getCordinates.length == 2) {
    return {
      lat: getCordinates[0],
      lon: getCordinates[1],
    };
  } else {
    return false;
  }
}
export function randomStringGenerate(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}


export {
  phoneFormat,
  toSlug,
  textParse,
  textCapitalize,
  textUppercase,
  textLowercase,
  createOrderId,
  generateSmsCode,
  createPasswordHash,
  createVerificationCode,
  clearSpace,
  coordinatesIsValid,
  coordinatesParseData,
};
