import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom';

class NewTweet extends Component {
  // This is a Controlled state to manage the Submit Button enabling
  // It is used only within this Component
  // So it does not need to be in Redux Store
  state = {
    text: '',
    toHome: false
  };
  handleChangeText = (e) => {
    const text = e.target.value;
    this.setState(() => ({text}));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    // The ID property is the ReplyingTo Tweet ID, if any
    const { dispatch, id } = this.props;
    dispatch(handleAddTweet(text, id));
    this.setState(() => ({
      text: '',
      toHome: id ? false : true // If replying, stays in TweetPage
    }));
  }
  render() {
    const { text, toHome } = this.state;
    const tweetCharactersLeft = 280 - text.length;
    if(toHome){
      return <Redirect to='/' />
    }
    return(
      <div>
        <h3 className='center'>
          Compose New Tweet
        </h3>
        <form
          className='new-tweet'
          onSubmit={this.handleSubmit}
        >
          <textarea
            className='textarea'
            value={text}
            onChange={this.handleChangeText}
            placeholder="What's happening?"
            maxLength={280}
          />
          {tweetCharactersLeft <= 100 && (
            <div className='tweet-length'>
              {tweetCharactersLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet);