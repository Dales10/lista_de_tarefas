import { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../services/firebase';
import { TaskDataProps } from '../@types/TaskData';
//Componentes dos popups
import PopupAddTask from '../components/Popups/PopAddTask';
import PopupEditTask from '../components/Popups/PopupEditTask';
import PopupRemoveTask from '../components/Popups/PopupRemoveTask';
import ReadTasks from '../components/ReadTasks';

const Home = () => {
  const [taskInfo, setTaskInfo] = useState<TaskDataProps>({task: '', id: ''});
  const [tasks, setTasks] = useState<TaskDataProps[]>([]);
  //useStates responsáveis pela mostragem ou não dos popups de adição de tarefa, atualização e remoção.
  const [popupAdd, setPopupAdd] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupRemove, setPopupRemove] = useState(false);

  //Responsável pela leitura das tarefas no Firebase.
  const readTasks = async () => {
    try {
      const test: any = []
      await getDocs(collection(db, "tasks"))
        .then((data) => {
          data.docs.forEach((item) => {
            test.push({ ...item.data(), id: item.id })
          });
        })
      setTasks(test);
    } catch (err) {
      console.log(err);
    }
  };

  //Fará a leitura das tarefas no Firebase sempre que o projeto for carregado.
  useEffect(() => {
    readTasks();
  }, [])

  //Irão atualizar o estado das popups (mostra-las ou não) quando chamados.
  const popupAddChangeState = (origin: boolean) => {
    if (origin) setPopupAdd(!popupAdd);
  }
  const popupEditChangeState = (origin: boolean) => {
    if (origin) setPopupEdit(!popupEdit)
  }
  const popupRemoveChangeState = (origin: boolean) => {
    if (origin) setPopupRemove(!popupRemove)
  }

  //Caso uma das popups esteja aberta, o scroll vertical é oculto. Se caso for fechada o scroll vertical volta a ficar visível.
  useEffect(() => {
    if (popupAdd || popupEdit || popupRemove) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }, [popupAdd, popupEdit, popupRemove])

  return (
    <>
      <header className="h-24 w-screen text-[#CACACA] bg-[#0D0E11] flex justify-left items-center">
        <h1 className="text-3xl sm:text-4xl font-black ml-6 sm:m-10 select-none">Lista de Tarefas</h1>
      </header>
      <main className="flex justify-center my-14">
        <div className=" w-[800px] bg-[#1A1A1A] rounded-[40px]" >
          <div className='w-full flex mt-5 justify-center'>
            <button
              className='bg-[#353535] w-[calc(100%_-_4rem)] h-10 rounded-lg font-bold flex justify-center items-center select-none'
              onClick={() => popupAddChangeState(true)}
            >
              Adicionar tarefa
              <span className='font-black ml-2 text-2xl'>+</span>
            </button>
          </div>

          <ReadTasks tasks={tasks} setPopupEdit={setPopupEdit} setPopupRemove={setPopupRemove} setTaskInfo={setTaskInfo} />
        </div>

        {popupAdd && (
          <PopupAddTask readTasks={readTasks} popupAddChangeState={popupAddChangeState} />
        )}

        {popupEdit && (
          <PopupEditTask readTasks={readTasks} popupEditChangeState={popupEditChangeState} taskInfo={taskInfo} setTaskInfo={setTaskInfo} />
        )}

        {popupRemove && (
          <PopupRemoveTask readTasks={readTasks} popupRemoveChangeState={popupRemoveChangeState} taskInfo={taskInfo} />
        )}
      </main>
    </>
  );
};

export default Home;
