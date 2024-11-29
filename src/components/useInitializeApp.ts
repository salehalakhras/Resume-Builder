import React from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from '../store/resumeSlice'; // Import your initialize action

function useInitializeApp() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);
}

export default useInitializeApp;