import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Promise from 'bluebird';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  //invoke this func on click to send get request to have things render on the screen
  getRequest() {
    alert(`request has been sent, your repos are incoming!`);
    $.ajax({
      url: `/repos`,
      type: `GET`,
      success: (data) => {
        console.log(`success: `, data);
        let datum = [];
        data.forEach(element => {
          datum.push(element.html_url);
        })
        this.setState({
          repos: datum
        });
        datum = [];
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
        this.getRequest();
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
