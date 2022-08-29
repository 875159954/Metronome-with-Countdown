import { useEffect, useState } from "react";

export function useLocalStorage(props) {
  const { key } = props;
  let [lists, setLists] = useState();
  useEffect(() => {
    let str = localStorage.getItem(key);
    console.log(str);
    if (!str)
      str =
        '{"今日待办":[["JobA","done"],["JobB","waiting"]], "ListB":[["JobA","done"],["JobB","waiting"]]}';
    const obj = JSON.parse(str);
    console.log(obj);
    setLists(obj);
  }, []);

  function update(whichList, newList) {
    setLists({
      ...lists,
      [whichList]: newList,
    });
  }
  //after update lists store it back to local storage
  useEffect(() => {
    if (lists == undefined) return;
    const store = JSON.stringify(lists);
    localStorage.setItem(key, store);
  }, [lists]);

  return [lists, update];
}
