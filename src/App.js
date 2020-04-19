import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopHeadlines from './Components/topHeadlines'

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={ }
  }


  render() {
    return (
      <div>
        <TopHeadlines />
      </div>
    )
  }
}
