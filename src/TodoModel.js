import React, { Component } from 'react';
import classNames from 'classnames';
import Utils from './utils';

class TodoModel {

	constructor (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.state = {};
	}


	inform () {
		Utils.store(this.key, this.todos);
	}

	addTodo (title) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false
		});
		this.inform();
	}

	toggleAll (checked) {
		this.todos = this.todos.map(todo => {
			return Utils.extend({}, todo, {completed: checked});
		});
		this.inform();
	}

	toggle (todoToToggle) {
		this.todos = this.todos.map(todo => {
			return (todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed}));
		});
		this.inform();
	}

	destroy (todo) {
		this.todos = this.todos.filter(candidate => {
			return candidate !== todo;
		});
		this.inform();
	}

	save (todoToSave, text) {
		this.todos = this.todos.map(todo => {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});
		this.inform();
	}

	clearCompleted () {
		this.todos = this.todos.filter(todo => {
			return !todo.completed;
		});
		this.inform();
	}
}

export default TodoModel;
