import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // jQuery.post( url [, data ] [, success ] [, dataType ] )
    $.post('/repos', {username: term}, (data => {
      console.log(`SUCCESS: Client received ${data}`);
      $.get('/repos', (data => {
        data.sort((a, b) => {
          return a.forks_count - b.forks_count;
        });

        let top25 = [];
        let counter = 0;
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i] && counter < 25) {
            top25.push(data[i]);
            counter++;
          } else {
            i = -1;
            counter = 25;
          }
        }
        this.setState((state) => {
          return {repos: top25};
        });
      }));
    }))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));