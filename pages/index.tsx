import { FormEvent, useEffect, useState } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { addDoc, collection, db, getDocs } from '../services/firebase';
import PopupAddTask from '../components/popup/PopAddTask';
import styles from '../styles/home.module.scss'


type TasksProps = {
  task: string;
  id: string;
}

const Home = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<TasksProps[]>([{ task: 'Oi', id: "oi" }]);
  const [taskId, setTaskId] = useState<string>('');
  const [popupAdd, setPopupAdd] = useState(false);

  const addTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), { task })
        .then(() => setTask(''));
    } catch (err) {
      console.log(err);
    }
    readTasks();
  }

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

  useEffect(() => {
    //readTasks();
  }, [])

  /*   useEffect(() => {

    }, [taskId]) */

  const popupAddChangeState = (origin: boolean) => {
    if (origin) {
      setPopupAdd(!popupAdd);
    }
  }

  return (
    <>
      <header className="h-24 w-screen text-[#CACACA] bg-[#0D0E11] flex justify-left items-center">
        <h1 className="text-4xl font-black m-10 select-none">Lista de Tarefas</h1>
      </header>
      <main className="flex justify-center mt-14">
        <div className=" w-[800px] bg-[#1A1A1A] rounded-[40px]" >
          <div className='w-full flex mt-5 justify-center'>
            <button
              className='bg-[#353535] w-[calc(100%_-_10rem)] h-10 rounded-lg font-bold flex justify-center items-center select-none'
              onClick={() => popupAddChangeState(true)}
            >
              Adicionar tarefa
              <span className='font-black ml-2 text-2xl'>+</span>
            </button>
            <div className='flex ml-4'>
              <button
                className='w-8 h-10 bg-[#9d9d9d] rounded-lg flex justify-center items-center text-black text-xl'
              >
                <MdModeEditOutline />
              </button>
              <button
                className="w-8 h-10 bg-[#9d9d9d] rounded-lg flex justify-center items-center ml-2 text-black text-xl"
              >
                <MdDelete />
              </button>
            </div>
          </div>

          <div className='flex flex-col items-center mt-8'>
            {tasks?.map((elem, index) => {
              return <label htmlFor='checkbox1' key={index} className='flex items-center bg-[#212121] mb-4 w-[calc(100%_-_4.5rem)] rounded-[5px] h-14 cursor-pointer'>
                <div className='relative bg-[#9d9d9d] h-7 w-7 rounded-full ml-2'>
                  <input
                    type="checkbox"
                    id='checkbox1'
                    className='absolute opacity-0'
                  />
                  <span className={`${styles.cheched} absolute top-0 left-0 h-7 w-7 rounded-full checked:bg-blue-500`}></span>
                </div>
                <p key={index} className='ml-4 pb-1 select-none'>{elem.task}</p>
              </label>
            })}
          </div>
        </div>

        {popupAdd && (
          <PopupAddTask task={task} setTask={setTask} addTask={addTask} popupAddChangeState={popupAddChangeState} />
        )}
      </main>
    </>
  );
};

export default Home;
