import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [Showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const manageEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    settodos(newTodos)
    savetoLS()
  }

  const manageDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    settodos(newTodos)
    savetoLS()
  }

  const managesave = (params) => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetoLS()
  }

  const managechange = (e) => {
    settodo(e.target.value)
  }

  const managecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    settodos(newTodos)
    savetoLS()
  }

  const ToggleEvent = (e) => {
    setShowfinished(!Showfinished)
  }


  return (
    <>
      <Navbar />
      <div className="container md:w-1/2 bg-cyan-200 h-[85vh] border-1 m-2 rounded-2xl mx-3 md:mx-auto border-amber-50">
<div className="font-bold text-2xl text-center m-2"> MyTask- Manage Your Todos At One Place</div>
        <div className="addTodo">
          <h2 className='font-medium text-xl m-3 mx-4'>Add a Todo</h2>
          <div className="flex flex-col">
          <input className='bg-amber-50 my-3 mx-5 rounded-lg p-1' onChange={managechange} value={todo} type="text" />
          <button onClick={managesave} disabled={todo.length <= 3} className='bg-blue-400 my-2 mx-5 p-1 px-3 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer font-medium'>Save</button>
          </div>
        </div>
          <input type="checkbox" checked={Showfinished} className='mx-6' onChange={ToggleEvent} />
          Show Finished
        <h2 className='font-medium text-xl m-3 mx-4'>Your Todos</h2>
        {todos.length === 0 && <div className='mx-10'>No Todos to display.</div>}
        <div className="todos">
          {todos.map(item => {

            return (Showfinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between w-full md:w-1/2 m-2 mx-6">
              <div className="flex gap-5 items-center">
                <input name={item.id} onChange={managecheckbox} type="checkbox" checked={item.iscompleted} />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { manageEdit(e, item.id) }} className='bg-blue-400 p-1 px-3 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer mx-1'><FaRegEdit /></button>
                <button onClick={(e) => { manageDelete(e, item.id) }} className='bg-blue-400 p-1 px-3 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

      <footer className='text-center'>
        Copyright &copy; Karan | Handcrafted with &hearts;
      </footer>

    </>
  )
}

export default App
