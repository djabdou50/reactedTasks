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
                {name: 'do something', id: 1, users: [1,2], status: 154545},
                {name: 'do another thing', id: 2, users: [2], status: 1554545},
                {name: 'do everything', id: 3, users: [3], status: 154545},
                {name: 'dont do anything', id: 4, users: [3,1,4], status: 5454},
            ],
            boards: [
                {name: "to do", id : 154545},
                {name: "doing", id : 5454},
                {name: "done", id : 1554545},
            ],
            drag : {
                taskBox : {},
            },
        };

    }


    componentDidMount() {
        this.DragNdrop.init();
    }


    componentDidUpdate() {

        let AppUi = {};

        AppUi.boxs = document.getElementsByClassName('task')
        console.log(AppUi.boxs)

        for(let box of AppUi.boxs) {
            box.addEventListener("dragstart", this.DragNdrop.dragstart)
            box.addEventListener("dragend", this.DragNdrop.dragend)
        }

        const containers = document.getElementsByClassName('board');
        console.log(containers)

        for(const container of containers) {
            container.addEventListener("dragover", App.dragover)
            container.addEventListener("dragenter", App.dragenter)
            container.addEventListener("dragleave", App.dragleave)
            container.addEventListener("drop", App.drop)
        }





        console.log(AppUi)

        this.DragNdrop.init();

    }
    
    // DragNDrop = {
    //     dragend : () => {
    //         console.log("dragend")
    //         this.className = "box"
    //     },
    //     dragstart : () => {
    //         console.log("dragstart")
    //         this.className += " held"
    //     }
    // }


    DragNdrop = {

        UIAPP : {
            dragTarget : '',
        },

        init : () => {
            this.DragNdrop.UIAPP = {};

            this.DragNdrop.UIAPP.boxs = document.getElementsByClassName('taskbox');
            // console.log(this.DragNdrop.UIAPP.boxs)
            for(let box of this.DragNdrop.UIAPP.boxs) {
                box.addEventListener("dragstart", (e) =>this.DragNdrop.dragstart(e))
                box.addEventListener("dragend", this.DragNdrop.dragend)
            }

            const containers = document.getElementsByClassName('taskholder');
            // console.log(containers)
            for(const container of containers) {
                container.addEventListener("dragover", this.DragNdrop.dragover)
                container.addEventListener("dragenter", this.DragNdrop.dragenter)
                container.addEventListener("dragleave", this.DragNdrop.dragleave)
                container.addEventListener("drop", (e) => this.DragNdrop.drop(container, this.DragNdrop.UIAPP.dragTarget))
            }
        },

        dragstart: (e) => {
            this.className += " held"

            setTimeout(()=>this.className="invisible", 0)

            console.log("trigered dragstart")
            // console.log(e.target)
            this.DragNdrop.UIAPP.dragTarget = e.target;
        },

        dragend: () => {
            this.className = "box"
            console.log("trigered dragend")
        },

        dragover : (e) => {
            e.preventDefault()
        },

        dragenter : (e) => {
            e.preventDefault()
            this.className += " hovered"
        },

        dragleave: () => {
            this.className = "holder"
        },

        drop: (that, box) => {
            console.log("drop event")
            // console.log({that, box})
            // this.className = "holder"
            that.append(box)

        }
    }



    taskStatusHandle = (TaskId, boardID) => {

        let changed = this.state.tasks;
        changed.map(task => {
            if(task.id === TaskId){
                task.status = boardID;
            }

            return task;
        });

        this.setState({
            tasks: changed
        });
    };

    manageTasks = (task, boardId)=> {
        let allTasks = this.state.tasks;
        console.log(task, boardId)
        allTasks.push({
            name : task,
            id: uuid.v4(),
            users: [],
            status: boardId
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

    listBoards = () => {
        let boards = [];
        this.state.boards.forEach( board => {
            let boardTasks = this.state.tasks.filter( task => task.status === board.id)
            boards.push(
                    <div className="board taskholder" key={board.id}>
                        <h1 className="boardtitle">{board.name}</h1>
                        <Input handleAdd={(task) => this.manageTasks( task, board.id )}/>
                        <Tasks
                            tasks={boardTasks}
                            users={this.state.users}
                            boards={this.state.boards}
                            board={board}
                            handleTaskStatus={this.taskStatusHandle}
                            assignHandler={this.assingUsers}
                        />

                    </div>
            )
        });
        return boards;
    };

    render() {
        return (
          <div className="App">
            <section className="App-header">
                {this.listBoards()}
            </section>
          </div>
        );
  }
}

export default App;