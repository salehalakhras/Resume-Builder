import { configureStore } from '@reduxjs/toolkit';
import resumeSlice from './resumeSlice';
import { Middleware } from '@reduxjs/toolkit';
import { ResumeData } from '../types';
import { loadResumes } from '../store/resumeSlice';

const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type  
 === 'yourApp/initialize') {
    const storedResumes = localStorage.getItem('resumes');
    if (storedResumes) {
      const parsedResumes: ResumeData[] = JSON.parse(storedResumes);
      store.dispatch(loadResumes(parsedResumes));
    }
  }
  return result;
};

const store = configureStore({
  reducer: {
    resumes: resumeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;