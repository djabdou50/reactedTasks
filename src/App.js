import React, { Component } from 'react';
// import Selector from './Components/selector';
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
                {name: 'abdeltif', id: 5},
                {name: 'abdelhadi', id: 6},
                {name: 'anna', id: 7},
            ],
            tasks: [
                {name: 'do something', id: 1, users: [1,2], status: true},
                {name: 'do another thing', id: 2, users: [2], status: false},
                {name: 'do everything', id: 3, users: [3], status: true},
                {name: 'dont do anything', id: 4, users: [3,1,4], status: false},
            ],
            tasksStatus: ['todo', 'doing', 'done']
        };
    }

    taskStatusHandle = (d) => {

        let changed = this.state.tasks;
        changed.map(task => {
            if(task.id === d){
                task.status = task.status ? false : true;
            }

            return task;
        });

        this.setState({
            tasks: changed
        });
    };

    manageTasks = (data)=> {
        let allTasks = this.state.tasks;
        // console.log(data)
        allTasks.push({
            name : data,
            id: uuid.v4(),
            users: [],
            done: false
        })

        // console.log(allTasks)

        this.setState({
            tasks : allTasks,
        })
    };

    assingUsers = (data) => {
        // console.log(data)
        let taskz = this.state.tasks;

        //add item to users array
        taskz.map( task => {
            if( task.id === data.idTask){
                // add
                if(!task.users.includes(data.idUser)){
                    task.users.push(data.idUser)
                }
                //remove
                if(data.action === "remove") {
                    task.users = task.users.filter(item => item !== data.idUser)
                }
            }
            return task;
        });
        // console.log(taskz)

        this.setState({
            tasks : taskz,
        })
    };


    render() {
        return (
          <div className="App">

            <section className="App-header">
                {/*<Selector users={this.state.users} handleSelect={this.selectedHndle}/>*/}
                <Tasks tasks={this.state.tasks} users={this.state.users} handleTaskStatus={this.taskStatusHandle} assignHandler={this.assingUsers}/>
                <Input handleAdd={this.manageTasks}/>

            </section>
          </div>
        );
  }
}

export default App;