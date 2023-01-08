import { Dispatch, FormEvent, SetStateAction } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TaskDataProps } from '../../@types/TaskData';
import { db, doc, updateDoc } from '../../services/firebase';

type EditProps = {
    readTasks: () => Promise<void>;
    popupEditChangeState: (origin: boolean) => void;
    taskInfo: TaskDataProps;
    setTaskInfo: Dispatch<SetStateAction<TaskDataProps>>;
}

const PopupEditTask = ({ readTasks, popupEditChangeState, taskInfo, setTaskInfo }: EditProps) => {
    const updateTask = async (e: FormEvent) => {
        e.preventDefault();
        popupEditChangeState(true);
        try {
            await updateDoc(doc(db, "tasks", taskInfo.id), { task: taskInfo.task });
            readTasks();
        } catch (err) {
            console.log("Error when updating", err);
        }
    }

    const changeValidation = (e: FormEvent) => {
        const origin = (e.target as Element).classList[0];
        if (origin == 'popup-inner') {
            popupEditChangeState(true);
        }
    }

    return (
        <div
            className="popup-inner w-screen h-screen bg-[rgb(67,67,67,.8)] absolute top-0 left-0 flex justify-center items-center"
            onClick={e => changeValidation(e)}
        >
            <div className="w-[600px] bg-[#1A1A1A] rounded-xl relative">
                <button
                    className='absolute top-3 right-3 text-3xl text-gray-300'
                    onClick={() => popupEditChangeState(true)}
                >
                    <AiFillCloseCircle />
                </button>
                <form
                    className='flex flex-col p-4 gap-8'
                    onSubmit={(e) => updateTask(e)}
                >
                    <h1 className='text-4xl font-bold text-center mt-2'>Edite abaixo a tarefa</h1>
                    <input
                        type="text"
                        placeholder='Edite a tarefa'
                        className='bg-[#353535] mt-5 h-14 rounded-lg placeholder:pl-4'
                        value={taskInfo.task}
                        onChange={(e) => setTaskInfo(prevState => {
                            return { ...prevState, task: e.target.value }
                        })}
                    />
                    <button
                        className='bg-[#353535] h-10 rounded-lg font-black mb-6'
                        type='submit'
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    )
};

export default PopupEditTask;