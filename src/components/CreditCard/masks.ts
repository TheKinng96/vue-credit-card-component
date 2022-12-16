import IMask from 'imask';

export const cardMasks = {
    mask: [
        {
            mask: '0000 000000 00000',
            regex: '^3[47]\\d{0,13}',
            cardtype: 'american express'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
            cardtype: 'discover'
        },
        {
            mask: '0000 000000 0000',
            regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
            cardtype: 'diners'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
            cardtype: 'mastercard'
        },
        {
            mask: '0000 000000 00000',
            regex: '^(?:2131|1800)\\d{0,11}',
            cardtype: 'jcb15'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:35\\d{0,2})\\d{0,12}',
            cardtype: 'jcb'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
            cardtype: 'maestro'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^4\\d{0,15}',
            cardtype: 'visa'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^62\\d{0,14}',
            cardtype: 'unionpay'
        },
        {
            mask: '0000 0000 0000 0000',
            cardtype: 'Unknown'
        }
    ],
    dispatch(appended: any, dynamicMasked: any) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');

        for (let i = 0; i < dynamicMasked.compiledMasks.length; i++) {
            const re = new RegExp(dynamicMasked.compiledMasks[i].regex);
            if (number.match(re) != null) {
                return dynamicMasked.compiledMasks[i];
            }
        }
    }
};

export const expirationMask = (isTwoDigitsYear: boolean) => {
    const fullYear = new Date().getFullYear();
    const twoDigitsYearString = fullYear.toString().slice(2);
    let twoDigitsYear = parseInt(fullYear.toString().slice(2));

    if (parseInt(twoDigitsYearString) > 50) {
        // Maximum credit card expiry date is 50 years
        twoDigitsYear = 0;
    }

    const year = isTwoDigitsYear ? {
        YY: {
            mask: IMask.MaskedRange,
            from: twoDigitsYear,
            to: 99
        }
    } : {
        YYYY: {
            mask: IMask.MaskedRange,
            from: fullYear,
            to: fullYear + 100
        }
    };

    return {
        mask: isTwoDigitsYear ? 'MM{/}YY' : 'MM{/}YYYY',
        blocks: {
            MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12
            },
            ...year
        }
    };
};

export const nameMask = {
    mask: /[a-z]/,
};

export const securityMask = {
    mask: '0000',
};
