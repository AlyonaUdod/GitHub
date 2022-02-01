import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  repos: [],
  query: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    prevCurrent: 1,
  },
  isLoading: false,
  isError: null,
};

// Reducer
export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    addRepos: (state, action) => {
      state.repos = action.payload.items;
      state.pagination.totalPages = Math.ceil(action.payload.total_count / 20);
    },
    setIsError: (state, action) => {
      state.pagination.currentPage = state.pagination.prevCurrent;
      state.isError = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.prevCurrent = state.pagination.currentPage;
      state.pagination.currentPage = action.payload;
    },
  },
});

// Selectors
export const selectRepos = (state) => state.reposReducer.repos;
export const selectIsLoading = (state) => state.reposReducer.isLoading;
export const selectIsError = (state) => state.reposReducer.isError;

// Actions
const { setIsError, addRepos, setIsLoading } = reposSlice.actions;
export const { setQuery, setCurrentPage } = reposSlice.actions;

export const getRepos = () => (dispatch, getState) => {
  const state = getState();
  const { query, isError, pagination } = state.reposReducer;

  if (isError) {
    dispatch(setIsError(null));
  }

  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://api.github.com/search/repositories?q=${query ? query : 'react'}&per_page=20&page=${
        pagination.currentPage
      }`,
      {
        accept: 'application/vnd.github.v3+json',
      },
    )
    .then((res) => {
      if (isError) {
        dispatch(setIsError(null));
      }
      dispatch(addRepos(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setIsError(err.response.data.message));
      } else {
        dispatch(setIsError('Ooops, something went wrong...'));
      }
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export default reposSlice.reducer;
