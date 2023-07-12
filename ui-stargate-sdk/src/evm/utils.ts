const regexp = /(stargate:\s?.*)/gim;

export function parseStargateError(error?: unknown) {
  const reason = (error as any)?.reason;

  if (typeof reason === 'string') {
    regexp.lastIndex = 0; // reset reg-exp
    const stargateError = regexp.exec(reason)?.[1];
    if (stargateError) return stargateError;
  }

  const message = (error as any)?.error?.message;
  if (typeof message === 'string') {
    regexp.lastIndex = 0; // reset reg-exp
    const stargateError = regexp.exec(message)?.[1];
    if (stargateError) return stargateError;
  }

  return undefined;
}
