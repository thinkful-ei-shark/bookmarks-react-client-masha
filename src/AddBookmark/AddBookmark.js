import React, { Component } from  'react';
import config from '../config'
import './AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class AddBookmark extends Component {
  static defaultProps = {
    onAddBookmark: () => {}
  };

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { bm_title, bm_url, bm_description, bm_rating } = e.target
    const bookmark = {
      bm_title: bm_title.value,
      bm_url: bm_url.value,
      bm_description: bm_description.value,
      bm_rating: bm_rating.value,
    }
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
        bm_title.value = ''
        bm_url.value = ''
        bm_description.value = ''
        bm_rating.value = ''
        this.props.onAddBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
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
            />
          </div>
          <div>
            <label htmlFor='bm_description'>
              Description
            </label>
            <textarea
              name='bm_description'
              id='bm_description'
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
              defaultValue='1'
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
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

export default AddBookmark;
