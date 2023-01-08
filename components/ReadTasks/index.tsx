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
    <div className='flex flex-col items-center'>
      {tasks.map((elem, index) => {
        return <label
          htmlFor='checkbox1'
          key={index}
          className='block sm:flex justify-between items-center bg-[#212121] mb-4 w-[calc(100%_-_4.5rem)] rounded-md'
        >
          <p key={index} className='p-4 text-justify select-none'>{elem.task}</p>
          <div className='flex sm:flex-wrap sm:mr-4 sm:gap-2'>
            <button
              className='w-full sm:w-8 h-8 bg-darkGray rounded-bl-md border sm:border-none sm:rounded-full flex justify-center items-center text-black text-xl hover:bg-lightGrey transition duration-300'
              onClick={() => { setPopupEdit(true); setTaskInfo(elem) }}
            >
              <MdModeEditOutline />
            </button>
            <button
              className="w-full sm:w-8 h-8 bg-darkGray rounded-br-md border sm:border-none sm:rounded-full flex justify-center items-center text-black text-xl hover:bg-lightGrey transition duration-300"
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