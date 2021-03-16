import { AsyncPage } from '@/components';

export default () => (
	<AsyncPage key="Dashboard" load={() => import('./Dashboard')} />
);
