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
      console.log("inside componentdidmount", this.state)
    })
    .catch(error => this.setState({error: `${error}`}))
  }

  addNewURL(newurl) {

    this.setState({ urls: [...this.state.urls, newurl] });

    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify({
        id: 2, 
        long_url: `${newurl.long_url}`, 
        short_url: "http://localhost:3001/useshorturl/2", 
        title: 'Awesome photo'}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
