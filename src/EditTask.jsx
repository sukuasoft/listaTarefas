import {memo, useRef, useEffect} from 'react'

function EditTask(props){
    const inputRef = useRef(null);
    
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.value = props.task.value;
        }
    }, [props.task]);

    return (
        <div className={"editTask " +
         (props.showState ? '': 'notShow') }>
            <div className="editTask-container">
                <div className='btn-exit'
                onClick={props.closeEditTask}>X</div>
                <div className="editTaskTitle">Editar tarefa</div>
                <input type="text" onKeyDown={(ev)=>{
                    if(ev.keyCode == 13){
                        editTask();
                   }
                }} ref={inputRef}/>
                <button onClick={editTask}>Atualizar</button>
            </div>
        </div>
    );

    function editTask(){
        if(!inputRef.current.value){
            return;
        }

        props.onEditTask(inputRef.current.value, props.task.id);
    }
}

export default memo(EditTask);