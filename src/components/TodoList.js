import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./TodoList.css";

import tick from "../images/tick.svg";
import check from "../images/check.svg";

class TodoList extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.onItemClick = this.onItemClick.bind(this);
  //   }
  //   onItemClick() {
  //     console.log(this.props.item);
  //   }
  render() {
    const { item, onClick, Remove } = this.props;
    let url = tick;
    if (!item.isComplete) {
      url = check;
    }
    return (
      <div className={classNames("TodoItem", { complete: item.isComplete })}>
        <img src={url} alt="url" onClick={onClick} />
        <p>{item.title}</p>
        <button onClick={Remove}>X</button>
      </div>
    );
  }
}
TodoList.propTypes = {
  item: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  Remove: PropTypes.func,
};
export default TodoList;
