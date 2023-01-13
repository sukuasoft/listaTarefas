import { useState } from 'react'
import CreateTask from './CreateTask'
import TasksContainer from './TasksContainer'
import LegendPage from './LegendPage'
import EditTask from './EditTask'

//styles
import './css/App.css'

//isto pode ser melhor usando ids individual e imutavel, de forma que os componentes não rebuildem se foi removido apenas um,
// isso é possivel graças ao key que é passado

var idCurrent = 0;
export default function App() {

    //apenas para experiencia de desenvolvimento 
    //let tasksDefault = [{ id: 0, value: 'Fazer a tarefa', done:false }, { id: 1, value: 'Cozinhar minha comida' , done:false}];
    
    const [tasks, setTask] = useState([]);
    const [isShowEditTask, setShowEditTask] = useState(false);

    //estado do input text do edit text
    const [taskEditTask, setTaskEditTask] =useState({});
   
    return (
        <div className="container">
            <div className="title">Lista de tarefas</div>
            <CreateTask addTask={addTask} />
            <TasksContainer tasks={tasks} 
            onDoneTask={doneTask} removeTask={removeTask}
                onShowEditTask={showEditTask}
            />
            <LegendPage/>
            <EditTask closeEditTask={closeEditTask} 
            onEditTask={editTask}
            task={taskEditTask}
             showState={isShowEditTask}/>         
        </div>
    );

  
    function addTask(value) {
        setTask([...tasks, { id: idCurrent, value: value, done:false}]);
        idCurrent++;
    }

    function removeTask(id) {
        id = getId(id);
    
        if(id == -1){
            console.log('aconteceu um problema');
            return;
        }
    
        let newArray = [...tasks];
 
        newArray.splice(id, 1);

        setTask(newArray);
    }

    function doneTask(id){
        id =getId(id);

        if(id == -1){
            console.log('aconteceu um problema');
            return;
        }

        let newArray = [...tasks];

        newArray[id].done = !newArray[id].done;
        setTask(newArray);
    }

    function showEditTask(id){
        id = getId(id);

        if(id==-1){
            console.log('aconteceu um problema');
            return;
        }

        setTaskEditTask(tasks[id]);
       setShowEditTask(true);
    }

    function closeEditTask(){
        setShowEditTask(false);
        setTaskEditTask({});
    }

    function editTask(value, id){
        id =getId(id);

        if(id==-1){
            console.log('aconteceu um problema');
            return;
        }

        let newArray = [...tasks];
        newArray[id].value = value;
        setTask(newArray);
        closeEditTask();

    }

    //pega id real do array 
    function getId(id){
        for (let x = 0; x < tasks.length; x++) {
            if (tasks[x].id == id) {
                return x;
            }
        }

        return -1;
    }

}

