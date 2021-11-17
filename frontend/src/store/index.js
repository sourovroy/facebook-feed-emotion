import { configureStore } from '@reduxjs/toolkit';

import processReducer from './processReducer';

export default configureStore({
  reducer: {
    process: processReducer,
  },
})
