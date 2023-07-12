import {OnftTokenAmount} from '@layerzerolabs/ui-bridge-onft';
import {compact} from 'lodash-es';

import {onftStore} from '../stores/onftStore';

export function usePendingAssets(): OnftTokenAmount[] {
  return compact(onftStore.inflight.flatMap((t) => t.assets));
}
