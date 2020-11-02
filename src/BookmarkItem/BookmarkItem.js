import React from 'react';
import Rating from '../Rating/Rating';
import DeleteButton from '../DeleteButton/DeleteButton'
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
        <DeleteButton
          className='BookmarkItem__description'
          bm_id={props.bm_id}
          onDeleteBookmark={props.onDeleteBookmark}
        />
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  onDeleteBookmark: () => {},
}
