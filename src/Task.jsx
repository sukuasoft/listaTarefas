
export default function Task(props){

    return(
        <div className={'task ' +(props.doneState ? 'task-done': '')}
            onClick={()=>{
                props.onShowEditTask(props.id);
            }}>
            <div className={'icon'} onClick={(ev)=>{
                ev.stopPropagation();
                props.onDoneTask(props.id);
            }}></div>
            <div className="task-title">{props.children}</div>
            <div className="btn-remove" onClick={(ev)=>{
                ev.stopPropagation();
                props.removeTask(props.id);
            }}></div>
        </div>
    );
}