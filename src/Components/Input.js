/**
 * Created by Abdeltif Bouziane on 22/11/2018.
 */
import React, {Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputData : '',
        };
    }

    inputHndel =(e)=> {
        // console.log(e.target.value)
        this.setState({
            inputData : e.target.value,
        });
    };

    setContent = () => {
        this.props.handleAdd(this.state.inputData);
        this.setState({
            inputData : "",
        })
    };



    render() {
        return (
            <div>
                <input onChange={this.inputHndel} value={this.state.inputData} type="text"/>
                <button type="submit" onClick={this.setContent}>Add</button>
            </div>
        );
    }
}

export default Input;
