import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRepos, selectIsLoading, selectIsError } from '../../app/reposSlice';
import RepoItem from './RepoItem';
import { ReactComponent as Spinner } from '../../assets/img/spinner.svg';
import styles from './Repos.module.css';

const Repos = () => {
  const repos = useSelector(selectRepos);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [repos]);

  if (!repos.length & !isLoading & !isError) {
    return <p className={styles.noRepos}>По Вашому запиту не знайдено жодного репозиторія</p>;
  } else if (!repos.length && !isError & isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className={styles.reposWrapper}>
        {repos.map((el) => (
          <RepoItem key={el.id} item={el} />
        ))}
      </div>
    );
  }
};

export default Repos;
