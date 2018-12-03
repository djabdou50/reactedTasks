import React, { Component } from 'react';
import Selector from './Components/selector';
import Tasks from './Components/Tasks';
import Input from './Components/Input';
import uuid from 'uuid';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {name: 'user 1', id: 1, active: true},
                {name: 'user 2', id: 2},
                {name: 'user 3', id: 3},
                {name: 'user 4', id: 4},
            ],
            tasks: [
                {name: 'do something user 1', id: 1, users: [1,2], done: true},
                {name: 'do something user 2', id: 2, users: [2], done: false},
                {name: 'do something user 1', id: 3, users: [1], done: true},
                {name: 'do something user 1', id: 4, users: [1], done: true},
            ]
        };
    }

    selecteTaskdHndle = (d) => {
        let changed = this.state.tasks;
        changed.map(task => {
            if(task.id === d){
                task.done = task.done ? false : true;
            }

            return task;
        });

        this.setState({
            users: changed
        });
    };

    addHndle = (d)=> {
        let allusers = this.state.users;
        // console.log(d)
        allusers.push({
            name : d,
            id: uuid.v4(),
        })

        this.setState({
            users : allusers,
        })
    };


    render() {
    return (
      <div className="App">

        <section className="App-header">
            {/*<Selector users={this.state.users} handleSelect={this.selectedHndle}/>*/}
            <Tasks tasks={this.state.tasks} users={this.state.users} handleTaskSelect={this.selecteTaskdHndle}/>
            <Input handleAdd={this.addHndle}/>

        </section>
      </div>
    );
  }
}

export default App;