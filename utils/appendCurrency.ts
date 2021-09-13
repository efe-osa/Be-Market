export const CURRENCIES = {
  gbp: {
    locale: 'en-GB',
  },
  usd: {
    locale: 'en-US',
  },
  eur: {
    locale: 'en-IE',
  }
};

const appendCurrency = (amount: number, currency: string = 'usd') => {
  return new Intl.NumberFormat(CURRENCIES[currency.toLowerCase() as 'gbp' | 'usd' | 'eur'].locale, {
    style: 'currency',
    currency: currency.toLocaleUpperCase(),
  }).format(amount || 0);
};
 export default appendCurrency