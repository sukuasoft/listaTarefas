import Task from "./Task";

export default function TasksContainer(props){
    
    return(
        <div className="tasksContainer">
            <div className="title">Tarefas</div>

            <div className="tasks">
                {props.tasks.map((value)=>(
                    <Task 
                    key={value.id} id={value.id} doneState={value.done}
                     removeTask={props.removeTask}
                     onDoneTask={props.onDoneTask}
                     onShowEditTask={props.onShowEditTask}
                    >

                        {value.value}
                    </Task>
                ))}
            </div>
        </div>
    );
}
