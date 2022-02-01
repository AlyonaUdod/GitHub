import React from 'react';
import { ReactComponent as NoImg } from '../../assets/img/no_image.svg';
import { ReactComponent as Star } from '../../assets/img/star.svg';
import { ReactComponent as Watchers } from '../../assets/img/watchers.svg';
import styles from './Repos.module.css';

const RepoItem = ({ item }) => {
  return (
    <div className={styles.repoItem}>
      <div className={styles.repoInfo}>
        {item.owner.avatar_url ? (
          <img src={item.owner.avatar_url} alt='repo-img' className={styles.repoItemImg} />
        ) : (
          <NoImg />
        )}
        <div className={styles.repoItemTextInfo}>
          <p>{item.name}</p>
          <span className={styles.repoItemTextInfoText}>{item.owner.login}</span>
          <span className={styles.repoItemTextInfoText}>{item.language}</span>
          <span className={styles.repoItemTextInfoDesc}>{item.description}</span>
        </div>
      </div>
      <div className={styles.repoRates}>
        <div className={styles.repoRatesItem}>
          <Star />
          <p>
            {item.stargazers_count} <span>stars</span>
          </p>
        </div>
        <div className={styles.repoRatesItem}>
          <Watchers />
          <p>{item.watchers} watchers</p>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
