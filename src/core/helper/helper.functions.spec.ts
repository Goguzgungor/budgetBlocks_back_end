import { clearSpace, coordinatesIsValid, createOrderId, createPasswordHash, createVerificationCode, generateSmsCode, phoneFormat, textCapitalize, textLowercase, textParse, textUppercase, toSlug } from './helper.functions';

describe('HelperFunction', () => {

    it('generateSmsCode', async () => {
        expect(generateSmsCode()).toHaveLength(6);
    });


    it('phoneFormat : 5348893565', async () => {
        expect(phoneFormat('5348893565')).toEqual('+905348893565');
    });

    it('phoneFormat : 05348893565', async () => {
        expect(phoneFormat('5348893565')).toEqual('+905348893565');
    });

    it('phoneFormat : 905348893565', async () => {
        expect(phoneFormat('905348893565')).toEqual('+905348893565');
    });

    it('phoneFormat : empty', async () => {
        expect(phoneFormat('')).toEqual('');
    });



    it('toSlug', async () => {
        expect(toSlug('Senol SEREF')).toEqual('senol-seref');
    });

    it('textParse', async () => {
        expect(textParse("Senol SEREF")).toEqual("SEREF");
    });

    it('textParse : Boş', async () => {
        expect(textParse("")).toEqual("");
    });

    it('textCapitalize', async () => {
        expect(textCapitalize("senol")).toEqual("Senol");
    });
    

    it('textUppercase', async () => {
        expect(textUppercase("senol")).toEqual("SENOL");
    });

    it('textLowercase', async () => {
        expect(textLowercase("SEnol")).toEqual("senol");
    });

    it('clearSpace', async () => {
        expect(clearSpace("sen ol")).toEqual("senol");
    });
    

    it('createVerificationCode', async () => {
        expect(createVerificationCode()).toHaveLength(6);
    });


    it('createOrderId', async () => {
        expect(createOrderId());
    });


    it('createPasswordHash', async () => {
        expect(createPasswordHash('123456'));
    });
    

    it('createPasswordHash', async () => {
        expect(coordinatesIsValid('40.230300,23.392933'));
    });

    it('createPasswordHash - invalid', async () => {
        expect(coordinatesIsValid(''));
    });

    it('createPasswordHash - invalid', async () => {
        expect(coordinatesIsValid('40.9999'));
    });

});