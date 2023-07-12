import pools from './mainnet/pools.json';
import {toConfig} from '../utils/toConfig';

export const mainnet = toConfig({pools});
