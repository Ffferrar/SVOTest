import React, {Component, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Service from "./Service";
class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            task:[]
        }
    }

    async componentDidMount() {
        Service.getOnlyTasks().then((response) => {
            this.setState({ task: response.data})
        });;
    }

  render() {
    const {task} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Clients</h2>

              {task.map(task =>
                  <div key={task.id}>
                    {task.startTime} ({task.startTime})

                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;