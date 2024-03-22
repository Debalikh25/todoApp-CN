import {React , useState , useEffect} from "react";

const AddTodo = (props) => {


  const [title , setTitle]  = useState("")
 
  const { addTodo, todos, editTodo, cancelEdit, t } = props.data;
   
   useEffect(()=>{
       if(t.edit){
        setTitle(t.title)
       }
   }, [t])

  const onAdd = (e) => {
    e.preventDefault();
    let todo = {
      title,
      completed: false,
      userId: Math.floor(Math.random() * 10) + 1,
      id: todos[todos.length - 1].id + 1,
    };

   setTitle("")

    addTodo(todo);
  };

  const onEdit = (e) => {
    e.preventDefault();
    editTodo({
      ...t,
      title,
    });
    setTitle("");
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            value={title}
            onChange = {(e)=>setTitle(e.target.value)}
            
            className="form-control"
            id="title"
            aria-describedby="todo title"
            required
          />
        </div>

        {t.edit ? (
          <>
            <button
              type="submit"
              onClick={(e) => onEdit(e)}
              className="btn btn-info"
            >
              Edit
            </button>

            <button onClick={ ()=> { 
              setTitle("") 
              cancelEdit()}} className="btn btn-warning ml-2">
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            onClick={(e) => onAdd(e)}
            className="btn btn-success"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTodo;
