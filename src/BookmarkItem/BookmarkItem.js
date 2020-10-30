import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';

export default function BookmarkItem(props) {
  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.bm_url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.bm_title}
          </a>
        </h3>
        <Rating value={props.bm_rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.bm_description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => props.onClickDelete(props.bm_id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}
