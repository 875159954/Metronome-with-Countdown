import css from "../UI/Todo.module.scss";
import JobList from "./JobList";
import React, { useState } from "react";
import { useLocalStorage } from "/hooks/useLocalStorage";
import TodoMenu from "./TodoMenu";

export default function Todo() {
  const [lists, setLists] = useLocalStorage("Todo", {
    今日待办: [
      ["Click me to check", "waiting"],
      ["Delete Me", "done"],
    ],
  });
  console.log(lists, "why");
  const [showMenu, setShowMenu] = useState(false);
  const [currentList, setCurrentList] = useState("今日待办");

  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  // console.log(lists);
  return (
    <div className={css.container}>
      <JobList
        lists={lists}
        currentList={currentList}
        setLists={setLists}
        toggleMenu={toggleMenu}
      />
      {showMenu && (
        <TodoMenu
          toggleMenu={toggleMenu}
          lists={lists}
          setLists={setLists}
          setCurrentList={setCurrentList}
        />
      )}
    </div>
  );
}
