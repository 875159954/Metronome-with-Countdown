import css from "../UI/JobList.module.scss";

import React, { useState } from "react";
import { GiCheckMark, GiHamburgerMenu } from "react-icons/gi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
export default function JobList(props) {
  const [newTaskName, setNewTaskName] = useState("");
  const { lists, currentList, toggleMenu, setLists } = props;
  // console.log(lists);
  function toggleCheck(e) {
    const index = Number(e.currentTarget.dataset.index);
    const hash = {
      done: "waiting",
      waiting: "done",
    };
    lists[currentList][index][1] = hash[lists[currentList][index][1]];
    console.log(lists[currentList][index][1]);
    setLists({ ...lists });
  }

  function handleDelete(e) {
    e.stopPropagation();
    const index = Number(e.currentTarget.dataset.index);
    console.log(`remove index ${index} on ${currentList}`);
    lists[currentList] = [
      ...lists[currentList].slice(0, index),
      ...lists[currentList].slice(index + 1),
    ];
    setLists({ ...lists });
  }
  function handleAdd(e) {
    e.preventDefault();
    if (newTaskName == "") return;
    setLists({
      ...lists,
      [currentList]: lists[currentList].concat([[newTaskName, "waiting"]]),
    });
    setNewTaskName("");
  }

  return (
    <div className={css.container}>
      <nav className={css.title}>
        <span>{currentList}</span>
        <button onClick={toggleMenu}>
          <GiHamburgerMenu />
        </button>
      </nav>
      <ul className={css.listContainer}>
        {lists &&
          lists[currentList].map((item, index) => (
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
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />

        <button>
          <span>
            <GrAdd />
          </span>
        </button>
      </form>
    </div>
  );
}

function ListItem(props) {
  console.log("render", props.name);
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
