import { useRef } from "react";

export default function CreateTask(props){
    const inputRef =   useRef(null);
    return (
        <div className='createTask'>
                <input ref={inputRef} onKeyDown={(ev)=>{
                    if(ev.keyCode == 13){
                         sendTask();
                    }
                }} placeholder="Insira aqui sua tarefa" type="text" />
                <button onClick={sendTask}>Criar</button>
        </div>
    );
    function sendTask(){
        let taskValue = inputRef.current.value;

        if(!taskValue){
            return;
        }
        
        props.addTask(taskValue);
        inputRef.current.value ='';
    }
}