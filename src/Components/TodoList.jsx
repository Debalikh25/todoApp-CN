

const TodoList = (props) => {

     const {todos , deleteTodo , completeTodo , transferTodoHelper} = props.data
  
   
  return (
    <div className="container">

      {todos.map((todo) => {
        return (
          <div className="card mt-3">
            <div class="card-body">
              <div className="row">
                  <div className="col-md-4">
                  <p className={todo.completed ?  'scratch-text' : null}>{todo.title}</p>
                    </div>

                    <div className="col-md-3">
                         {todo.completed ? (<span className="completed">Completed</span>) : (<div> 
                             
                            <input type="checkbox" name="completed" onClick={()=>completeTodo(todo.id)} /> completed  


                         </div>)}
                      </div>

                      <div className="col-md-2">
                        <button className="btn btn-primary" onClick={()=>transferTodoHelper(todo) }>Edit</button>
                        </div>

                        <div className="col-md-2">
                        <button className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>Delete</button>
                        </div>
                </div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
