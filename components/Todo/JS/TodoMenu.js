import css from "../UI/TodoMenu.module.scss";
import listStyle from "../UI/JobList.module.scss";
import React, { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBin7Line } from "react-icons/ri";

export default function TodoMenu(props) {
  const { toggleMenu, lists, setCurrentList, setLists } = props;
  const [newListName, setNewListName] = useState();
  const container = useRef();
  function toggle() {
    let cur = container.current;
    if (cur.classList.contains(css.out)) return;
    cur.parentElement.replaceChild(cur, cur);
    cur.classList.add(css.out);
    setTimeout(() => toggleMenu(), 500);
  }
  function handleAdd(e) {
    e.preventDefault();
    setNewListName("");
    if (newListName != "") setLists({ ...lists, [newListName]: [] });
  }
  function handleDelete(e) {
    e.stopPropagation();
    e.preventDefault();
    const listName = e.currentTarget.dataset.listname;
    console.log(listName);
    delete lists[listName];
    console.log("after delete", lists);
    setCurrentList("今日待办");
    setLists({ ...lists });
  }
  function handleClick(e) {
    e.preventDefault();
    setCurrentList(e.currentTarget.dataset.listname);
    toggle();
  }
  return (
    <div className={css.menu} ref={container}>
      <button onClick={toggle} className={css.closeButton}>
        <GiHamburgerMenu />
      </button>
      <span className={css.title}>Tasks will be unchecked tomorrow</span>
      <div className={listStyle.listContainer}>
        {lists &&
          Object.keys(lists).map((name, index) => (
            <ListItem
              name={name}
              key={index}
              handleClick={handleClick}
              handleDelete={handleDelete}
            />
          ))}
        <form onSubmit={handleAdd} className={listStyle.form}>
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />

          <button>
            <span>+</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function ListItem(props) {
  const { handleClick, handleDelete } = props;
  const { name } = props;
  return (
    <div
      className={listStyle.listItem}
      data-listname={name}
      onClick={handleClick}
    >
      <span style={{ maxWidth: "none" }}>{name}</span>
      {name != "今日待办" ? (
        <button data-listname={name} onClick={handleDelete}>
          <RiDeleteBin7Line />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
