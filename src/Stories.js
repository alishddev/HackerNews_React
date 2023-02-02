import React from 'react'
import { useGlobalContext } from './context'

function Stories() {
  const { hits, isLoading, removeHandler } = useGlobalContext();

  if (isLoading) {
    return <div className='loading'></div>
  }

  return <section className='stories'>
    {hits.map(story => {
      const {
        author,
        num_comments,
        objectID,
        points,
        title,
        url
      } = story;
      return <article className='story' key={objectID}>
        <h4>{title}</h4>
        <div className='story-info'>
          <p>{points}{' '}points by {author} | {num_comments} comments</p>
        </div>
        <div>
          <a href={url} className='read-link' target="_blank" rel="noopener noreferrer">read more</a>
          <button className='remove-btn'
            onClick={() => removeHandler(objectID)}>remove</button>
        </div>
      </article>
    })}
  </section>
}

export default Stories