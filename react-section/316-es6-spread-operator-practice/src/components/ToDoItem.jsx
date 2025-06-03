import React, { useState } from "react";

const ToDoItem = ({ onChecked, id, text }) => {
  return <li onClick={() => onChecked(id)}>{text}</li>;
};

export default ToDoItem;
