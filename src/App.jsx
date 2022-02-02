import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Repos from './features/repos/Repos';
import Pagination from './features/pagination/Pagination';
import { getRepos, setQuery } from './app/reposSlice';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.reposReducer.query);
  const isError = useSelector((state) => state.reposReducer.isError);

  useEffect(() => {
    dispatch(getRepos());
  }, [query]);

  useEffect(() => {
    if (isError) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isError]);

  return (
    <div className={styles.appWrapper}>
      <input
        placeholder='Search'
        className={styles.search}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      {isError && <p className={styles.errorMsg}>{isError}</p>}
      <Repos />
      <Pagination />
    </div>
  );
};

export default App;
