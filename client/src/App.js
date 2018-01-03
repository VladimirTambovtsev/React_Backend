import React, { Component } from 'react';
import './App.css';

import Item from './components/Item';
 

class App extends Component {

   constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.getList = this.getList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { 
    tasks: [],
    value: '' 
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
    fetch('/api/todos', {   // post new todo
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.value.charAt(0).toUpperCase() + this.state.value.slice(1)
      }),
    })
    .then(data => {
      this.getList();
    })
    .catch(err => {
      console.log(err);
    }); 
  }

  getList() {
    fetch('/api/todos')
      .then(res => res.json())
      .then(tasks => this.setState({
        tasks,
        value: ''
      }));
  }
 
  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <div>

        <header>
          <h1>todo <span>list</span></h1>
          <h2>A simple todo list app built with node</h2>
        </header>

        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" ref={(input) => { this.textInput = input; }} className="todoInput"  placeholder="Insert your task here.." value={this.state.value} onChange={this.handleChange} />
          <input type="submit" className="invisible" />
        </form>

        <ul className="list">
          {this.state.tasks.map(task => 
            <Item key={task._id} _id={task._id} name={task.name} completed={task.completed} />
          )}
        </ul>

      </div>
    );
  }
}

export default App;
