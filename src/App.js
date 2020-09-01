import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";

import tickAll from "./images/tick-all.svg";
import { Alert } from "reactstrap";
import { Button } from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      currentFilter: ["all", "active", "complete"],
      todoItems: [
        { title: "mua bim bim", isComplete: false },
        { title: "di nau com", isComplete: true },
        { title: "di dao", isComplete: false },
      ],
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
      //console.log(item);
    };
  }
  Remove(item) {
    return () => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      todoItems.splice(index, 1);
      this.setState({
        todoItems: todoItems,
      });
    };
  }
  setClick() {
    return () => {
      const { todoItems } = this.state;
      const isComplete = todoItems[0].isComplete;
      this.setState({
        todoItems: todoItems.map((item) => {
          item.isComplete = !isComplete;
          return item;
        }),
      });
    };
  }
  onKeyUp(event) {
    if (event.keyCode === 13) {
      //enter code
      let text = event.target.value;
      if (!text) {
        return;
      }
      text = text.trim(); //delete space
      if (!text) {
        return;
      }
      this.setState({
        newItem: "",
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems,
        ],
      });
    }
  }
  onChange(event) {
    this.setState({ newItem: event.target.value });
  }
  Filter(item) {
    const { todoItems } = this.state;
    return () => {
      if (item === "all") {
        this.setState({ todoItems: todoItems });
      }
      if (item === "active") {
        this.setState({
          todoItems: todoItems.filter((item) => {
            return item.isComplete === false;
          }),
        });
      }
      if (item === "complete") {
        this.setState({
          todoItems: todoItems.filter((item) => {
            return item.isComplete === true;
          }),
        });
      }
    };
  }
  render() {
    const { todoItems, newItem, currentFilter, isComplete } = this.state;
    return (
      <div className="App">
        <div className="header">
          <img
            src={tickAll}
            alt="tickAll"
            width={32}
            height={32}
            onClick={this.setClick()}
          />
          <input
            type="text"
            placeholder="Add a new item"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </div>
        {todoItems.length &&
          todoItems.map((item, index) => (
            <TodoList
              key={index}
              item={item}
              onClick={this.onItemClicked(item)}
              Remove={this.Remove(item)}
              isComplete={isComplete}
            />
          ))}
        <div className="footer">
          {currentFilter.map((item, index) => {
            return (
              <button id={item} key={index} onClick={this.Filter(item)}>
                {item}
              </button>
            );
          })}
        </div>
        <div>
          <Alert color="primary">This is a primary alert — check it out!</Alert>
          <Alert color="secondary">
            This is a secondary alert — check it out!
          </Alert>
          <Alert color="success">This is a success alert — check it out!</Alert>
          <Alert color="danger">This is a danger alert — check it out!</Alert>
          <Alert color="warning">This is a warning alert — check it out!</Alert>
          <Alert color="info">This is a info alert — check it out!</Alert>
          <Alert color="light">This is a light alert — check it out!</Alert>
          <Alert color="dark">This is a dark alert — check it out!</Alert>
        </div>
      </div>
    );
  }
}
export default App;
