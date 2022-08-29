import css from "../UI/JobList.module.scss";

import React, { useRef, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { RiDeleteBin7Line } from "react-icons/ri";
export default function JobList(props) {
  const [name, setName] = useState("");
  const [time, setTime] = useState(15);
  let { list, title, add, remove, check } = props;
  function toggleCheck(e) {
    console.log("check");
    const index = e.currentTarget.dataset.index;
    console.log(title, index);
    check(title, index);
  }
  /**
   * @param {Event} e
   */
  function handleDelete(e) {
    e.stopPropagation();
    const index = e.currentTarget.dataset.index;
    remove(title, index);
  }
  function handleAdd(e) {
    e.preventDefault();
    add(title, name);
  }

  console.log(list);
  return (
    <div className={css.container}>
      <nav className={css.title}>
        <span>{title}</span>
        <button>menu</button>
      </nav>
      <ul className={css.listContainer}>
        {list.map((item, index) => (
          <li key={index}>
            <ListItem
              name={item[0]}
              status={item[1]}
              toggleCheck={toggleCheck}
              index={index}
              handleDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className={css.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button>Add</button>
      </form>
    </div>
  );
}

function ListItem(props) {
  console.log("render ");
  const { name, status, toggleCheck, handleDelete, index } = props;
  return (
    <div className={css.listItem} onClick={toggleCheck} data-index={index}>
      <div className={css.square}>
        {status == "done" ? (
          <div className={css.check}>
            <GiCheckMark />
          </div>
        ) : (
          <></>
        )}
      </div>
      <span> {name}</span>
      <button data-index={index} onClick={handleDelete}>
        <RiDeleteBin7Line />
      </button>
    </div>
  );
}
