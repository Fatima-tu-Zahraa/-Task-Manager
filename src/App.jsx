 import { useState } from "react";
 function App(){
   const[tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
   })
   const [input , setInput] = useState("")
   const [filter , setFilter] = useState("All")
   
   const addTask = () => {
    if (!input.trim()) return
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: input, completed: false}
    ]
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
    setInput("")
   }

   const toggleTask = (id) => {
      const updated = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed }: t
      )
      setTasks(updated)
    localStorage.setItem("tasks", JSON.stringify(updated))
   }

   const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !==id)
    setTasks(updated)
    localStorage.setItem("tasks",JSON.stringify(updated))
   }

   const filtered = filter === "All" ? tasks
   : filter === "Active" ? tasks.filter(t => !t.completed)
   : tasks.filter(t => t.completed)

   return (
     <div className="min-h-screen bg-grey-100 p-4 md:p-8">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Task Manager
        </h1>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow">
             <p className="text-2xl font-bold text-purple-600">{tasks.length}</p>
             <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow">
            <p className="text-2xl font-bold text-green-500">
              {tasks.filter(t => t.completed).length}
            </p>
            <p className="text-xs text-gray-500">Done</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow">
            <p className="text-2xl font-bold text-orange-400">
              {tasks.filter(t => !t.completed).length}
            </p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow mb-6">
          <h2 className="text-lg font-semibold text-grey-700 mb-3">
            Add New Task
          </h2>
          <div className="flex gap-2">
            <input type="text" placeholder="Enter task..." value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>e.key === "Enter" && addTask()}
            className="flex-1 border border-grey-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
             <button onClick={addTask} className="bg-purple-600 text-white px-4 rounded-lg font-semibold hover-bg-purple-700 transition">
              Add
             </button>
          </div>
        </div>

        <div className="flex gap-2 mb-">
          {["All" , "Active" , "Completed"].map((f)=> (
            <button
              key={f}
               onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                filter === f
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-purple-50"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Tasks {filter !== "All" && `— ${filter}`}
          </h2>
          {filtered.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No tasks yet!</p>
          ) : (
            filtered.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b py-3 last:border-none"
              >
              <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <p className={`text-gray-800 ${task.completed ? "line-through text-gray-400" : ""}`}>
                    {task.text}
                  </p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
         
      </div>
     </div>
   )
   
 }
 export default App
  