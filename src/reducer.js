import React from 'react'
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH
}
  from './actions';

const reducer = (state, action) => {

  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      const { hits, nbPages } = action.payload;
      return {
        ...state,
        nbPages, hits, isLoading: false
      }
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload
      }
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter(story => story.objectID !== action.payload)
      }
    case HANDLE_PAGE:
      let val;
      switch (action.payload) {
        case 'inc':
          val = state.page + 1;
          if (val === state.nbPages) val = 0
          return {
            ...state, page: val
          }
        case 'dec':
          val = state.page - 1;
          if (val < 0) val = state.nbPages - 1
          return {
            ...state, page: val
          }
        default:
          return
      }

    default:
      throw new Error(`Action type ${action.type} does not match.`)
  }

}

export default reducer