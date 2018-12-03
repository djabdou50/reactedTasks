/**
 * Created by Abdeltif Bouziane on 21/11/2018.
 */
import React, {Component} from 'react';

class Selector extends Component {

    constructor(props) {
        super(props);
        // this.listUsers = this.listUsers.bind(this);
        this.state = {
            users : props.users
        };
    }

    selectedUser = (e) => {
        // console.log(e)
        this.props.handleSelect(e);
        // console.log(this.state.users)
    }

    listUsers = (d) => {
        // console.log(d)
        let userList = [];

        this.props.users.forEach(user => {
            let activeClass = '';
            activeClass = user.active ? 'active' : 'notactive';
            // console.log(user)
            userList.push(<li key={user.id} onClick={()=>this.selectedUser(user.id)} className={activeClass}>{user.name}</li>)
        });
        return userList;
    };

    render() {
        return (
            <div>
                <ul>
                    {this.listUsers(this.props.users)}

                </ul>
            </div>
        );
    }
}

export default Selector;