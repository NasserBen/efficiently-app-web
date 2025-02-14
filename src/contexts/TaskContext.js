import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

export const TaskContext = React.createContext(null);

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  // screen name hook,
  const [SideBarName, setSideBarName] = useState("");

  // list type (inbox, star, ...) hook, required for filtering tasks in SectionTasks
  const pathName = window.location.pathname;
  const initialSection = pathName.substring(1);

  const [sectionType, setSectionType] = useState(initialSection); // set inital section to path name

  // save tasks locally
  const saveTasksLocally = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("ran saveTaskLocally()");
  };

  const getTasksLocally = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify());
      console.log("GetTasksLocally run");
    } else {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  };

  // intial loading of locally saved tasks
  useEffect(() => {
    getTasksLocally();
  }, []);

  // on task change re-save locally
  useEffect(() => {
    saveTasksLocally();
  }, [tasks]);

  const searchBarRef = useRef(null);
  const inboxRef = useRef(null);
  const starRef = useRef(null);
  const archiveRef = useRef(null);
  const upcomingRef = useRef(null);
  const todayRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // search related
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sectionTypeHandler = (e) => {
    setSectionType(e);
    setSearch("");
  };

  var todayDate = moment().format("YYYY-MM-D");

  const switchStar = (key) => {
    let newTasks = tasks.map((task) => {
      if (task.key === key) {
        task.star = !task.star;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const completeTask = (key) => {
    let newTasks = tasks.map((task) => {
      if (task.key === key) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const removeTask = (key) => {
    let newTasks = [...tasks].filter((task) => task.key !== key);
    setTasks(newTasks);
  };

  const editTask = (taskId, taskTitle) => {
    let newTasks = tasks.map((task) => {
      // map through tasks
      if (task.key === taskId) {
        // find key
        task.title = taskTitle; // update title
      }
      return task;
    });
    setTasks(newTasks); // update Tasks
  };

  // const editTask = (taskKey, newTitle) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.key === taskKey ? (task.title = newTitle) : (task.title = task)
  //     )
  //   );
  // };

  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        SideBarName,
        setSideBarName,
        sectionType,
        setSectionType,
        searchBarRef,
        inboxRef,
        starRef,
        archiveRef,
        upcomingRef,
        todayRef,
        searchRef,
        inputRef,
        search,
        setSearch,
        handleSearch,
        sectionTypeHandler,
        todayDate,
        completeTask,
        filteredTasks,
        editTask,
        switchStar,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
