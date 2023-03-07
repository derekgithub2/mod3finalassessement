import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
    this.addNewURL = this.addNewURL.bind(this)
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({urls: data.urls})
    })
    .catch(error => this.setState({error: `${error}`}))
  }

  addNewURL(newurl) {
    console.log(newurl)

    this.setState({ urls: [...this.state.urls, newurl] });
    // console.log("this.state: ", this.state)
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewURL={this.addNewURL} urls={this.state.urls}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
