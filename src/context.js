import React, { useContext, useEffect, useReducer } from "react";
import reducer from './reducer';
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH
}
  from './actions';
const AppContext = React.createContext();
const API_ENDPOINT = 'http://hn.algolia.com/api/v1/search?';


const initialState = {
  isLoading: false,
  hits: [],
  nbPages: 0,
  page: 0,
  query: 'react'
}
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES, payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])

  function handleSearch(query) {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }
  function removeHandler(id) {
    dispatch({ type: REMOVE_STORY, payload: id })
  }
  function handlePage(actionType) {
    dispatch({ type: HANDLE_PAGE, payload: actionType })
  }
  return <AppContext.Provider value={{
    ...state,
    handleSearch,
    handlePage,
    removeHandler
  }}>
    {children}
  </AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext);
}
export { AppProvider, useGlobalContext }