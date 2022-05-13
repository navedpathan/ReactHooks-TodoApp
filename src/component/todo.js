import React, { useState, useEffect } from 'react'
import todo from "./todo.svg"

// to get the data from localStorage

const getLocalItems = () => {
    let list = localStorage.getItem("Naved");
    console.log(list);
    
    if (list) {
        return JSON.parse(localStorage.getItem("Naved"));
    }
    else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
alert("please fill the data");
        }
        else if (inputData && !toggleSubmit) {
            setItems(
                items.map((element) => {
                    if(element.id === isEditItem) {
                        return {...element, name: inputData}
                    }
                    return element;
                })
            )
            setToggleSubmit(true);

        setInputData("");

        setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData("");
        }
    }

    const deleteItem = (index) => {
            const updatedItems = items.filter((element) => {
                return index !== element.id;
            });

            setItems(updatedItems);
    }

// edit the Item
// When user click on edit button

// 1: get the id and name of the data which user clicked to edit
// 2: set the toggle mode to change the submit button into edit button
// 3: Now update the value of the setInput with the new updated value to edit
// 4: To pass the current element Id to new state variable for reference

    const editItem = (id) => {
        let newEditItem = items.find((element) => {
            return element.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);
    }

    const removeAll = () => {
        setItems([]);
    }

// save the data in localStorage

    useEffect(() => {
      localStorage.setItem("Naved", JSON.stringify(items))

    }, [items])
    
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder='✍ Add item...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)} />
                            {
                                toggleSubmit ? <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> : 
                                <i className='far fa-edit add-btn' title='Update Item' onClick={addItem}></i>
                            }
                    </div>

                    <div className="showItems">
                        {
                            items.map((element) => {
                                return (
                                    <div className="eachItem" key={element.id}>
                                        <h3>{element.name}</h3>
                                        <div className="todo-btn">
                                        <i className='far fa-edit add-btn' title='Edit Item' onClick={() => editItem(element.id)}></i>
                                        <i className='fas fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(element.id)}></i>
                                    </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    {/* clear All Items */}
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo