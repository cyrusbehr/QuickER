/**
 *
 * Asynchronously loads the component for MainApp
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
