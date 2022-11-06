import React, {Component, useEffect, useState} from 'react';
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
        Service.getTable().then((response) => {
            this.setState({ task: response.data})
        });;
    }

  render() {
    const {task} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Clients</h2>
                {Object.keys(task).map(key =>
                    <h2>
                        <div key={key.id}>
                            {key}
                        </div>)
                    {
                        task[key].map(test => (
                            <div key={test.id}>
                                {test.flight}
                            </div>)
                        )
                    }
                    </h2>
                )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;