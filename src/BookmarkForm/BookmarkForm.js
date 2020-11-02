import React, { Component } from 'react';
import config from '../config'
import './BookmarkForm.css';

const Required = () => (
  <span className='BookmarkForm__required'>*</span>
)

class BookmarkForm extends Component {
  static defaultProps = {
    onBookmarkForm: () => { },
    bookmark: null
  };

  state = {
    error: null,
    bookmark: {
      bm_title: {
        value: '',
        touched: false
      },
      bm_url: {
        value: 'https://',
        touched: false
      },
      bm_description: {
        value: '',
        touched: false
      },
      bm_rating: {
        value: '',
        touched: false
      }
    }
  }

  onFieldChange = (target) => {
    const bookmark = { ...this.state.bookmark };
    const field = target.name;
    const value = target.value
    bookmark[field] = { value, touched: true }
    this.setState({ bookmark })
  }

  handleSubmit = e => {
    e.preventDefault()
    // const bookmark = {
    //   bm_title: this.state.bookmark.bm_title.value,
    //   bm_url: this.state.bookmark.bm_url.value,
    //   bm_description: this.state.bookmark.bm_description.value,
    //   bm_rating: this.state.bookmark.bm_rating.value
    // }
    const bookmark = {};
    Object.keys(this.state.bookmark).forEach(k => {
      if (this.state.bookmark[k].touched){
        bookmark[k] = this.state.bookmark[k].value
      }
    })
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        const bookmark = { ...this.state.bookmark };
        Object.keys(bookmark).forEach(k => bookmark[k].touched = false)
        this.setState({ bookmark })
        this.props.onAddBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  // componentDidMount() {

  // }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className='BookmarkForm'>
        <h2>Create a bookmark</h2>
        <form
          className='BookmarkForm__form'
          onSubmit={this.handleSubmit}
        >
          <div className='BookmarkForm__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='bm_title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='bm_title'
              id='bm_title'
              placeholder='Great website!'
              required
              value={this.state.bookmark.bm_title.value}
              onChange={e => this.onFieldChange(e.target)}
            />
          </div>
          <div>
            <label htmlFor='bm_url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='bm_url'
              name='bm_url'
              id='bm_url'
              placeholder='https://www.great-website.com/'
              required
              value={this.state.bookmark.bm_url.value}
              onChange={e => this.onFieldChange(e.target)}
            />
          </div>
          <div>
            <label htmlFor='bm_description'>
              Description
            </label>
            <textarea
              name='bm_description'
              id='bm_description'
              value={this.state.bookmark.bm_description.value}
              onChange={e => this.onFieldChange(e.target)}
            />
          </div>
          <div>
            <label htmlFor='bm_rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='bm_rating'
              id='bm_rating'
              min='1'
              max='5'
              required
              value={this.state.bookmark.bm_rating.value}
              onChange={e => this.onFieldChange(e.target)}
            />
          </div>
          <div className='BookmarkForm__buttons'>
            <button type='button' onClick={onClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default BookmarkForm;
