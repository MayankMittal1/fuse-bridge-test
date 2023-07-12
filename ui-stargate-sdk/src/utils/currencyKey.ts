import {Currency, Token} from '@layerzerolabs/ui-core';

export function currencyKey(currency: Currency): string {
  return [currency.chainId, currency.symbol, (currency as Token).address].join(':');
}
