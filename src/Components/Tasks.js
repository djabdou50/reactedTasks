/**
 * Created by Abdeltif Bouziane on 21/11/2018.
 */
import React, {Component} from 'react';
import AssignedUsers from './AssignedUsers';

class Tasks extends Component {

    constructor(props) {
        super(props);
        // this.listUsers = this.listUsers.bind(this);
        this.state = {
            users : props.users,
            tasks : props.tasks,
        };
        // this.assignUsers = this.assignUsers.bind(this);
    }

    selectedTaskStatus = (TaskId, boardID) => {
        console.log(boardID, TaskId);
        this.props.handleTaskStatus(TaskId, boardID);
        // console.log(this.state.users)
    }

    assignUser = (idUser, idTask, action) => {
        // console.log({idUser, idTask, action})
        this.props.assignHandler({idUser, idTask, action})
    }

    listBoards = (taskId) => {
        let boarsList = [];

        this.props.boards.forEach( board => {
            boarsList.push(
                <li
                    key={board.id}
                    className="dropdown-item"
                    onClick={(e) => this.selectedTaskStatus(taskId, board.id)}
                >{board.name}</li>
            )
        });
        return boarsList;
    }

    listTasks = () => {
        // console.log(d)

        let taskList = [];
        this.props.tasks.forEach(task => {
            let activeClass = '';
            let activeTaskTxt = '';
            activeClass = task.status ? 'active' : 'notactive';
            activeTaskTxt = task.status ? 'done' : 'undone';
            // console.log(user)
            taskList.push(
                <li key={task.id} className={activeClass + " taskbox"} draggable="true">{task.name}

                    <div className="dropdown text-right">
                        <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Status
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.listBoards(task.id)}
                        </ul>
                    </div>

                    <AssignedUsers
                        assignedUsers={task.users}
                        users={this.props.users}
                        task={task}
                        handleAssign={this.assignUser}
                    />
                </li>)
        });
        return taskList;
    };



    render() {
        return (

                <React.Fragment>
                    {this.listTasks()}
                </React.Fragment>

        );
    }
}

export default Tasks;