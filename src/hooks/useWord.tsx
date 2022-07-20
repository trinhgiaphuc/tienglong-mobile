import * as React from 'react';

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getToday, getTrending, selectWord } from "../redux/slice/wordSlice";

const BASE_URL = 'https://tienglong.vercel.app/api/word';

export function useWord() {
  const dispatch = useAppDispatch();
  const { todayWords, trendingWords } = useAppSelector(selectWord);

  React.useEffect(() => {
    fetch(`${BASE_URL}/today-words`)
      .then(response => response.json())
      .then(({ todayWords }) => dispatch(getToday(todayWords)))
      .catch(console.error);
    fetch(`${BASE_URL}/trending-words`)
      .then(response => response.json())
      .then(({ trendingWords }) => dispatch(getTrending(trendingWords)))
      .catch(console.error);
  }, []);

  return { todayWords, trendingWords };
}
