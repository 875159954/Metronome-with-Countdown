import css from "../UI/Todo.module.scss";
import JobList from "./JobList";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "/hooks/useLocalStorage";
export default function Todo() {
  const [lists, update] = useLocalStorage("Todo");
  const [currentList, setCurrentList] = useState("");
  useEffect(() => {
    if (lists) setCurrentList(Object.keys(lists)[0]);
  }, [lists]);

  function add(name, newJob) {
    let newList = lists[name].slice();
    newList.push([newJob, "waiting"]);
    update(name, newList);
  }
  function remove(name, index) {
    console.log(`remove index ${index} on ${name}`);
    index = Number(index);
    let newList = lists[name].slice();
    newList = [...newList.slice(0, index), ...newList.slice(index + 1)];
    update(name, newList);
  }
  function check(name, index) {
    let newList = lists[name].slice();

    const hash = {
      done: "waiting",
      waiting: "done",
    };
    index = Number(index);
    newList[index][1] = hash[newList[index][1]];
    update(name, newList);
  }
  return (
    <div className={css.container}>
      <JobList
        list={lists && currentList ? lists[currentList] : []}
        title={currentList}
        update={update}
        add={add}
        remove={remove}
        check={check}
      />
    </div>
  );
}

// "Todo-List":{
//   ListA:[['JobA','done'],['JobB','wait']],
//   ListB:[['JobA','done'],['JobB','wait']]
// }
