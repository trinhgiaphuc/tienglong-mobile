import * as React from 'react';

import { auth } from '.';
import { onAuthStateChanged } from '@firebase/auth';
import { getUserDetails } from './api';

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, logout, selectAuth } from '../redux/slice/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAuth);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async userCred => {
      if (userCred) {
        const userDetails = await getUserDetails(userCred.uid);

        dispatch(login(userDetails));
      } else {
        dispatch(logout());
      }
    })

    return () => unsub();
  }, []);

  return { status };
}
