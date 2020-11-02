import React, { Component } from 'react';
import BookmarkForm from './BookmarkForm/BookmarkForm';
import BookmarkList from './BookmarkList/BookmarkList';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks,
    error: null,
  };


  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })
  }

  deleteBookmark = bm_id => {
    this.setState({
      bookmarks: [...this.state.bookmarks.filter(bm => bm.bm_id !== bm_id)]
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BrowserRouter>
          <Nav clickPage={this.changePage} />
          <div className='content' aria-live='polite'>
            <Switch>
              <Route 
                path='/add'
                render={ () =>
                  <BookmarkForm
                    onAddBookmark={this.addBookmark}
                  />}
              />
              <Route
                exact path='/'
                render={ () =>
                  <BookmarkList
                    onDeleteBookmark={this.deleteBookmark}
                    bookmarks={bookmarks}
                  />
                }
              />
              <Route
                path='/edit/:bm_id'
                render={ (routeProps) =>
                  <BookmarkForm
                    onEditBookmark={this.editBookmark}
                    bm_id={routeProps.match.params.bm_id}
                  />
                }
              />
            </Switch>
          </div>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
