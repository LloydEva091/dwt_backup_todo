import React, { useState, useEffect } from "react";

function Form(props) {
    const [addition, setAddition] = useState(false);
    const [name, setName] = useState('');

    useEffect(()=>{
        if(addition){
            console.log('useEffect detected addition')
            props.geoFindMe();
            setAddition(false);
        }
    },[addition])

    const handleChanged = (e) => {
        setName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name.trim()){
            return
        }
        setAddition(true);
        props.addTask(name);
        setName('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChanged}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;
