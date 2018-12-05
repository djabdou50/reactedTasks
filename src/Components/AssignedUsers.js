/**
 * Created by Abdeltif Bouziane on 03/12/2018.
 */

import React, {Component} from 'react';

class AssignedUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assining : "hidden",
            inputVal: '',
            foundUsers : [],
        };

        this.assignUsers = this.assignUsers.bind(this);
        this.handelInput = this.handelInput.bind(this);
        this.assignUsersValidate = this.assignUsersValidate.bind(this);
    }

    listUsers(taskId){
        // console.log(this.props.users)
        let users = [];
        this.props.assignedUsers.forEach(user => {
            let userd = this.props.users.filter(suser => suser.id === user)
            users.push(<li key={user}>{userd[0].name} <span className="delete" onClick={(e) => {this.removeUser(user, taskId)}}>X</span></li>);
            // console.log(userd)
        });
        // console.log(this.props.users)
        return users;
    };

    removeUser(userId, taskId){
        // console.log({userId, taskId})
        let action =  "remove";
        this.assignUsersValidate(userId, taskId, action)
    }


    assignUsers = (id,e) => {
        // console.log(this.state.assining)
        if(this.state.assining === "hidden"){
            this.setState({
                assining : "visible"
            })
        }
    };

    assignUsersValidate = (idUser, idTask, action) => {

        if(! action){
            action = 'add';
        }

        // console.log({idUser, idTask, action})

        // idUser = parseFloat(idUser);

        // if( ! isNaN(idUser)) {
        if( idUser) {
            // console.log(idUser)
            this.props.handleAssign(idUser, idTask, action)
        }

        if(this.state.assining === "visible"){
            this.setState({
                assining : "hidden",
                inputVal : '',
                foundUsers : [],
            })
        }
    };

    handelInput(e){
        // console.log(e.target.value)
        this.setState({
            inputVal: e.target.value,
        });

        let foundUsers = [];

        this.props.users.map(user => {

            let rgxp = new RegExp(e.target.value, "g");
            let found = user.name.match(rgxp);

            if(found){
                foundUsers.push(user);
            }
            return found;
        });

        this.setState({
            foundUsers : foundUsers,
        });

    };

    listFoundUsers(taskId){

        let users = [];
        this.state.foundUsers.forEach(user => {
            users.push(<li key={user.id} onClick={(e) => this.assignUsersValidate(user.id, taskId)}>{user.name} </li>)
            // console.log(user)
        });
        // console.log(users)
        return users;
    }


    render() {
        return (
            <div>
                <button className="btn" onClick={(e) => this.assignUsers(this.props.task.id, e)}>Assign</button>
                <input onChange={this.handelInput} className={this.state.assining} value={this.state.inputVal} type="text"/>
                <button onClick={(e) => this.assignUsersValidate(this.state.inputVal, this.props.task.id, e)} className={this.state.assining}>ok</button>
                <div className={this.state.assining}>
                    <ul>
                        {this.listFoundUsers(this.props.task.id)}
                    </ul>
                </div>
                <ul>
                    {this.listUsers(this.props.task.id)}
                </ul>
            </div>
        );
    }
}

export default AssignedUsers;