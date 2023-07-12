import {observer} from 'mobx-react';

import {Bridge} from '@/bridge/ui/Bridge';
import {BridgeTracker} from '@/bridge/ui/BridgeTracker';
import {CustomHtmlHead} from '@/core/ui/CustomHtmlHead';
import {AppFooter, AppHeader} from '@/core/ui/Layout';
import {PageLayout} from '@/core/ui/PageLayout';
import {Panel} from '@/core/ui/Panel';

import {NextPageWithLayout} from '../../types/next';

const BridgePage: NextPageWithLayout = () => {
  return (
    <>
      <Panel>
        <BridgeTracker />
      </Panel>
      <Bridge />
    </>
  );
};

BridgePage.getLayout = (page) => (
  <PageLayout centered header={<AppHeader />} footer={<AppFooter />}>
    <CustomHtmlHead title='Bridge' />
    {page}
  </PageLayout>
);

export default observer(BridgePage);
