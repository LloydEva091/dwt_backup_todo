import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  // const [tasks,setTasks] = useState('tasks', []);
  // const [tasks, setTasks] = useState(
  //   localStorage.getItem('tasks') === null ? (localStorage.setItem('tasks', JSON.stringify(props.tasks))) : localStorage.getItem('tasks')
  //   );

  const [filter, setFilter] = useState("All");
  const [lastInsertedId, setLastInsertedId] = useState('')
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  // const [latitude, setLatitude] = useState(props.latitude || '##')
  // const [longitude, setLongitude] = useState(props.longitude || '##')
  // const [mapLink, setMapLink] = useState(props.mapLink || '#')

  const geoFindMe = () => {
    console.log("geoFindMe",lastInsertedId);
    function success(position){
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const mapLink =  `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      // console.log(mapLink)
      console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
      locateTask(lastInsertedId,{latitude:latitude, longitude:longitude, error:'', mapLink:mapLink});
    }
    function error(){
      console.log('Unable to retrieve your location');
    }
    if(!navigator.geolocation){
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition(success,error)
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const addTask = (name) => {
    const id = `todo-${nanoid()}`;
    const newTask = { id: id, name, completed: false , location:{latitude:'##',longitude:'##',error:'##', mapLink:'##'}};
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const locateTask = (id,location) =>{
    console.log('locate Task', id , 'before');
    console.log(location, tasks);
    const locatedTaskList = tasks.map(task => {
      if(id === task.id){
        return {...task, location: location}
      }
      return task;
    })
    console.log(locatedTaskList)
    setTasks(locatedTaskList)
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const taskList = tasks.map((task) => (
    <>
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      latitude={task.location.latitude}
      longitude={task.location.longitude}
      mapLink={task.location.mapLink}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
    </>
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} geoFindMe={geoFindMe}/>
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
