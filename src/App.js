import React, { Component } from 'react';
import { Router } from 'director/build/director';
import logo from './logo.svg';
import './App.css';
import TodoFooter from './footer.js'
import TodoItem from './TodoItem.js'
import TodoModel from './TodoModel.js'
import Utils from './utils.js'

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

const ENTER_KEY = 13;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          nowShowing: ALL_TODOS,
          editing: null,
          newTodo: ''
        }
  }

  componentDidMount(){
    let router = Router({
      '/': this.setState.bind(this, {nowShowing: ALL_TODOS}),
      '/active': this.setState.bind(this, {nowShowing: ACTIVE_TODOS}),
      '/completed': this.setState.bind(this, {nowShowing: COMPLETED_TODOS}),
    });
    router.init('/');
  }
  componentWillUpdate(){
    console.log("componentWillUpdate App");
	}

  handleChange = (ev) => {
    this.setState({newTodo: ev.target.value});
    console.log("handleChange");
  }

  handleNewTodoKeyDown = (ev) => {
    if (ev.keyCode !== ENTER_KEY) {
      return;
    }
    ev.preventDefault();

    let val = this.state.newTodo.trim();
    if (val) {
      this.props.model.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  toggleAll = (ev) => {
    this.props.model.toggleAll(ev.target.checked);
    this.setState({});
  }

  toggle = (todoToToggle) => {
    this.props.model.toggle(todoToToggle);
    this.setState({});
  }

  destroy = (todo) => {
    this.props.model.destroy(todo);
    this.setState({newTodo: ''});
  }

  edit = (todo) => {
    this.setState({editing: todo.id});
  }

  save = (todoToSave, text) => {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  }

  cancel = () => {
    this.setState({editing: null});
  }

  clearCompleted = () => {
    this.props.model.clearCompleted();
    this.setState({});
  }

  render() {
    let todos = this.props.model.todos;

    let shownTodos = todos.filter(todo => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    let todoItems = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    }, this);

    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1
    }, 0);

    let completedCount = todos.length - activeTodoCount;

    // if(activeTodoCount || completedCount) {}
    let footer = (
        <TodoFooter
            count={activeTodoCount}
            completedCount={completedCount}
            nowShowing={this.state.nowShowing}
            onClearCompleted={this.clearCompleted}
        />
      )


      let main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      )


    return (
      <div className="App">
        <header className="header">
  			  <h1>todos</h1>
  				<input
  							className="new-todo"
  							placeholder="What needs to be done?"
  							value={this.state.newTodo}
  							onKeyDown={this.handleNewTodoKeyDown}
  							onChange={this.handleChange}
  							autoFocus={true}
  				/>
  				</header>
  				{main}
  				{footer}
      </div>
    );
  }
  // let model = new TodoModel('react-todos');
}

export default App;
