import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, getRepos } from '../../app/reposSlice';
import styles from './Pagination.module.css';
const getPagination = ({ current, total, setCurrent }) => {
  let arr = [];

  if (total < 8) {
    for (let i = 0; i < total; i++) {
      arr.push(i + 1);
    }
  } else if (
    current === 1 ||
    current === 2 ||
    current === 3 ||
    current === total ||
    current === total - 1 ||
    current === total - 2
  ) {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push('...');
    arr.push(total - 2);
    arr.push(total - 1);
    arr.push(total);
  } else {
    arr.push(1);
    arr.push('...');
    arr.push(current - 1);
    arr.push(current);
    arr.push(current + 1);
    arr.push('...');
    arr.push(total);
  }
  return arr.map((el, idx) => (
    <p key={idx} onClick={el !== '...' ? () => setCurrent(el) : undefined} className={el === current ? styles.active : ''}>
      {el}
    </p>
  ));
};

const Pagination = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.reposReducer.pagination.currentPage);
  const total = useSelector((state) => state.reposReducer.pagination.totalPages);
  const repos =  useSelector((state) => state.reposReducer.repos);

  const getNextPageRepos = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(getRepos());
  };

  if(repos.length) {
    return (
    <div className={styles.pagination}>
      <button
        type='button'
        onClick={current !== 1 ? () => getNextPageRepos(current-1) : undefined}
        disabled={current === 1}
      >
        Previos
      </button>
      {getPagination({
        current,
        total,
        setCurrent: (page) => getNextPageRepos(page),
      })}
      <button
        type='button'
        onClick={current !== total ? () => getNextPageRepos(current+1) : undefined}
        disabled={current === total}
      >
        Next
      </button>
    </div>
  );
    } else {
      return <></>
    }
};

export default Pagination;
