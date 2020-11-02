import React, { Component } from 'react';
import config from '../config';
import './DeleteButton.css';

class DeleteButton extends Component {
  state = {
    error: null
  }
  handleClick() {
    const bm_id = this.props.bm_id;

    fetch(`${config.API_ENDPOINT}/${bm_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return true;
      })
      .then(() => {
        this.props.onDeleteBookmark(bm_id);
      })
      .catch(error => {
        this.setState({ error });
      })

  }
  render() {
    return (
      <button onClick={() => this.handleClick()}>Delete</button>
    )
  }
}

export default DeleteButton;