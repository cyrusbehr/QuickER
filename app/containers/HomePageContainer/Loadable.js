/**
 *
 * Asynchronously loads the component for HomePageContainer
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
