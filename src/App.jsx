import { useEffect, useState } from 'react'
import CreateTask from './CreateTask'
import TasksContainer from './TasksContainer'
import EditTask from './EditTask'
import Rodape from './Rodape'

//isto pode ser melhor usando ids individual e imutavel, de forma que os componentes não rebuildem se foi removido apenas um,
// isso é possivel graças ao key que é passado

var idCurrent = 0;
var autoSaved = false;
var isStart = true;
var firstLoad = true;

export default function App() {

    //apenas para experiencia de desenvolvimento 
    //let tasksDefault = [{ id: 0, value: 'Fazer a tarefa', done:false }, { id: 1, value: 'Cozinhar minha comida' , done:false}];
    let tasksSaved = [];

    //pega as informações salvadas 
    if (isStart) {
        getSavedData();
        isStart = false;
    }


    //lista de tarefas 
    const [tasks, setTask] = useState(tasksSaved);

    //se edit task esta sendo mostrado 
    const [isShowEditTask, setShowEditTask] = useState(false);

    //estado do input text do edit text
    const [taskEditTask, setTaskEditTask] = useState({});

    //se definido se vai salvar automaticamente
    // const [isAutoSaved, setAutoSaved] = useState(autoSaved);

    //se as informações já estão guardadas
    const [isSaved, setSaved] = useState(true);

    const [isAutoSaved, setAutoSaved] = useState(autoSaved);

    useEffect(() => {
        if (firstLoad) {
            firstLoad = false;
            return;
        }

        if (isAutoSaved) {
            saveData();
        }
        else {
            setSaved(false);
        }
    }, [isAutoSaved, tasks]);

    return (
        <div className="container">
            <div className="title">Lista de tarefas</div>
            <CreateTask addTask={addTask} />

            <TasksContainer tasks={tasks}
                onDoneTask={doneTask} removeTask={removeTask}
                onShowEditTask={showEditTask}
            />

            <Rodape autoSaved={isAutoSaved}
                changeAutoSaved={changeAutoSaved}
                isSaved={isSaved}
                saveFun={saveData}
            />

            <EditTask closeEditTask={closeEditTask}
                onEditTask={editTask}
                task={taskEditTask}
                showState={isShowEditTask} />
        </div>
    );

    function addTask(value) {
        setTask([...tasks, { id: idCurrent, value: value, done: false }]);
        idCurrent++;
    }

    function removeTask(id) {
        id = getId(id);

        if (id == -1) {
            console.log('aconteceu um problema');
            return;
        }

        let newArray = [...tasks];

        newArray.splice(id, 1);

        setTask(newArray);
       
    }

    function doneTask(id) {
        id = getId(id);

        if (id == -1) {
            console.log('aconteceu um problema');
            return;
        }

        let newArray = [...tasks];

        newArray[id].done = !newArray[id].done;
        setTask(newArray);
    }

    function showEditTask(id) {
        id = getId(id);

        if (id == -1) {
            console.log('aconteceu um problema');
            return;
        }

        setTaskEditTask(tasks[id]);
        setShowEditTask(true);
    }

    function closeEditTask() {
        setShowEditTask(false);
        setTaskEditTask({});
    }

    function editTask(value, id) {
        id = getId(id);

        if (id == -1) {
            console.log('aconteceu um problema');
            return;
        }

        let newArray = [...tasks];
        newArray[id].value = value;
        setTask(newArray);
        closeEditTask();
    }

    //pega id real do array 
    function getId(id) {
        for (let x = 0; x < tasks.length; x++) {
            if (tasks[x].id == id) {
                return x;
            }
        }

        return -1;
    }

    //auto save
    function changeAutoSaved() {
        //atualizar esta informação e salvar as informações não guardas
        
        setAutoSaved(!isAutoSaved);

    }

    function saveData() {

        let json = JSON.stringify(
            {
                idCurrent: idCurrent,
                autoSaved: isAutoSaved,
                tasks: tasks
            }
        );


        localStorage.setItem('data', json);

        if (!isSaved) {
            setSaved(true);
        }

    }
    //sistema de salvamento

    function getSavedData() {
        let data = localStorage.getItem('data');

        if (!data) {
            return;
        }

        try {
            data = JSON.parse(data);
        }
        catch {
            logErrorData();
            return;
        }


        if (!data.tasks || data.idCurrent == undefined || data.autoSaved == undefined) {
            logErrorData();
            return;
        }

        let dataTasks = data.tasks;

        if (!Array.isArray(dataTasks) || !Number.isInteger(data.idCurrent)) {
            logErrorData();
            return;
        }

        let tasksTemp = [];

        for (let item of dataTasks) {
            if (item.id == undefined || !item.value || item.done == undefined) {
                logErrorData();
                return;
            }

            else {
                tasksTemp.push(item);
            }
        }

        tasksSaved = tasksTemp;

        idCurrent = data.idCurrent;
        autoSaved = data.autoSaved;

        tasksTemp = null;
    }


    function logErrorData() {
        localStorage.removeItem('data');
        console.error('O dados armazenados foram corrompidos!')
        console.warn('Mais já foram corrigidos');
    }
}

