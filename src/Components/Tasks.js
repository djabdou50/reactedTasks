/**
 * Created by Abdeltif Bouziane on 21/11/2018.
 */
import React, {Component} from 'react';

class Tasks extends Component {

    constructor(props) {
        super(props);
        // this.listUsers = this.listUsers.bind(this);
        this.state = {
            users : props.users,
            tasks : props.tasks,
        };
    }

    selectedTask = (e) => {
        // console.log(e)
        this.props.handleTaskSelect(e);
        // console.log(this.state.users)
    }

    listTasks = (d) => {
        // console.log(d)
        let taskList = [];

        this.props.tasks.forEach(task => {
            let activeClass = '';
            activeClass = task.done ? 'active' : 'notactive';
            // console.log(user)
            taskList.push(<li key={task.id} onClick={()=>this.selectedTask(task.id)} className={activeClass}>{task.name} <span> Assign</span></li>)
        });
        return taskList;
    };

    render() {
        return (
            <div>
                <ul>
                    {this.listTasks(this.props.tasks)}

                </ul>
            </div>
        );
    }
}

export default Tasks;