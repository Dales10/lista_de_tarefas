import { Dispatch, SetStateAction } from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { TaskDataProps } from '../../@types/TaskData';

type TasksProps = {
  tasks: TaskDataProps[];
  setPopupEdit: Dispatch<SetStateAction<boolean>>;
  setTaskInfo: Dispatch<SetStateAction<TaskDataProps>>;
  setPopupRemove: Dispatch<SetStateAction<boolean>>;
}

const ReadTasks = ({ tasks, setPopupEdit, setPopupRemove, setTaskInfo }: TasksProps) => {
  return (
    <div className='flex flex-col items-center mt-8 mb-2'>
      {tasks.map((elem, index) => {
        return <label
          htmlFor='checkbox1'
          key={index}
          className='block sm:flex justify-between items-center bg-[#212121] mb-4 w-[calc(100%_-_4.5rem)] rounded-md cursor-pointer'
        >
          <p key={index} className='sm:ml-4 p-4 text-justify select-none'>{elem.task}</p>
          <div className='flex sm:flex-wrap sm:mr-4 sm:gap-2'>
            <button
              className='w-full sm:w-8 h-8 bg-[#9d9d9d] rounded-bl-md border sm:border-none sm:rounded-full flex justify-center items-center text-black text-xl'
              onClick={() => { setPopupEdit(true); setTaskInfo(elem) }}
            >
              <MdModeEditOutline />
            </button>
            <button
              className="w-full sm:w-8 h-8 bg-[#9d9d9d] rounded-br-md border sm:border-none sm:rounded-full flex justify-center items-center text-black text-xl"
              onClick={() => { setPopupRemove(true); setTaskInfo(elem) }}
            >
              <MdDelete />
            </button>
          </div>
        </label>
      })}
    </div>
  );
};

export default ReadTasks;