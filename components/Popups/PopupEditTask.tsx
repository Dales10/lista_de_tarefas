import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
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
    const [alertMessage, setAlertMessage] = useState({ display: 'none' });

    const updateTask = async (e: FormEvent) => {
        e.preventDefault();
        const lengthTextValid = (taskInfo.task).length >= 5 && (taskInfo.task).length <= 1024;
        if (lengthTextValid) {
            popupEditChangeState(true);
            setAlertMessage({ display: 'none' })
            try {
                await updateDoc(doc(db, "tasks", taskInfo.id), { task: taskInfo.task });
                readTasks();
            } catch (err) {
                console.log("Error when updating", err);
            }
        } else {
            setAlertMessage({ display: 'block' })
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
            className="popup-inner w-screen h-screen bg-grey21_op80 absolute top-0 flex justify-center items-center mx-2"
            onClick={e => changeValidation(e)}
        >
            <div className="w-[600px] bg-grey01 rounded-xl relative">
                <button
                    className='absolute top-3 right-3 text-3xl text-gray-300'
                    onClick={() => popupEditChangeState(true)}
                >
                    <AiFillCloseCircle />
                </button>
                <form
                    className='flex flex-col p-4'
                    onSubmit={(e) => updateTask(e)}
                >
                    <h1 className='text-4xl font-bold text-center mt-2 select-none'>Edite a tarefa abaixo</h1>
                    <textarea
                        placeholder='Edite a tarefa'
                        className='bg-grey21 mt-10 h-14 rounded-lg pl-4 pt-4'
                        value={taskInfo.task}
                        onChange={(e) => setTaskInfo(prevState => {
                            return { ...prevState, task: e.target.value }
                        })}
                    ></textarea>
                    <span style={alertMessage} className='mt-2 ml-1 text-xs text-[#FF0000] select-none'>
                        Tamanho de texto inválido. O texto precisa ter entre 5 e 1024 caracteres.
                    </span>
                    <button
                        className='bg-grey21 h-10 rounded-lg font-black my-8 hover:bg-grey31 transition duration-500'
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