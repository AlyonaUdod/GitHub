import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Repos from './features/repos/Repos';
import Pagination from './features/pagination/Pagination';
import { getRepos, setCurrentPage } from './app/reposSlice';
import styles from './App.module.css'

const App = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const current = useSelector((state) => state.reposReducer.pagination.currentPage);
  const isError = useSelector((state) => state.reposReducer.isError);

  useEffect(() => {
    dispatch(getRepos('react'))
  }, []);

  useEffect(() => {
    dispatch(getRepos(query ? query : 'react'))
  }, [current]);

  useEffect(() => {
    if(current !== 1) {
      dispatch(setCurrentPage(1));
    };
    dispatch(getRepos(query ? query : 'react'))
  }, [query]);

  return (
    <div className={styles.appWrapper}>
      <input
        placeholder='Search'
        className={styles.search}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isError && <p className={styles.errorMsg}>{isError}</p>}
      <Repos/>
      <Pagination/>
    </div>
  );
};

export default App;