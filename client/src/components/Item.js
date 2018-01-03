import React, { Component } from 'react';


class Item extends Component {

   constructor(props) {
    super(props);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this); 
  }

  state = {
    clicked: false
  };

  updateTodo() {
    fetch(`/api/todos/${this.props._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !this.props.completed
      }),
    })
    .then(data => this.setState({
      clicked: !this.state.clicked
    }))
    .catch(err => {
      console.log(err);
    })
  }

  deleteTodo(event) {
    event.preventDefault();
    console.log(event.currentTarget);

    fetch(`/api/todos/${this.props._id}`, {
      method: 'DELETE',
    })
  }

  render() {
    var classDone = this.props.completed ? 'done ' : null;
    var clicked = this.state.clicked ? 'clicked' : false;
    return (
      <div>
        <li onClick={this.updateTodo} className={'task '+classDone+' '+clicked} >
          {this.props.name} <span onClick={this.deleteTodo}>X</span> 
        </li>
      </div>
    );
  }
}

export default Item;
