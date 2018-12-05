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

    selectedTaskStatus = (TaskId, e) => {
        // console.log(e, id)
        this.props.handleTaskStatus(TaskId);
        // console.log(this.state.users)
    }

    assignUser = (idUser, idTask, action) => {
        // console.log({idUser, idTask, action})
        this.props.assignHandler({idUser, idTask, action})
    }

    listTasks = (d) => {
        // console.log(d)
        let taskList = [];

        this.props.tasks.forEach(task => {
            let activeClass = '';
            let activeTaskTxt = '';
            activeClass = task.status ? 'active' : 'notactive';
            activeTaskTxt = task.status ? 'done' : 'undone';
            // console.log(user)
            taskList.push(
                <li key={task.id}  className={activeClass}>{task.name}
                    <button className="btn" onClick={() => this.selectedTaskStatus(task.id, this)}>{activeTaskTxt}</button>
                    <AssignedUsers assignedUsers={task.users} users={this.props.users} task={task} handleAssign={this.assignUser}/>
                </li>)
        });
        return taskList;
    };

    render() {
        return (
            <div>
                <ul className="board">
                    {this.listTasks(this.props.tasks)}

                </ul>
                <ul className="board">
                    {this.listTasks(this.props.tasks)}

                </ul>
            </div>
        );
    }
}

export default Tasks;