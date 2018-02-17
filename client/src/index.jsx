import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: ['this renders']
    }
  }

  getRequest() {
    alert(`request has been sent, your repos are incoming!`);
    $.ajax({
      url: `/repos`,
      type: `GET`,
      contentType: `FILL_ME_IN`,
      success: (data) => {
        console.log(`success: `, data);
      },
      error: (data) => {
        console.log(`error: `, data);
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: `/repos`,
      type: `POST`,
      data: term,
      contentType: `text/plain`,
      success: (data) => {
        console.log('success', data);
      },
      error: (data) => {
        console.log('error', data);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
