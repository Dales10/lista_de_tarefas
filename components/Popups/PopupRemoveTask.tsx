import { MouseEvent } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TaskDataProps } from '../../@types/TaskData';
import { db, deleteDoc, doc } from '../../services/firebase';

type EditProps = {
    readTasks: () => Promise<void>;
    popupRemoveChangeState: (origin: boolean) => void;
    taskInfo: TaskDataProps;
}

const PopupRemoveTask = ({ readTasks, popupRemoveChangeState, taskInfo }: EditProps) => {
    const deleleTask = async () => {
        try {
            await deleteDoc(doc(db, "tasks", taskInfo.id));
            readTasks();
        } catch (err) {
            console.log("Error when deleting", err);
        }
    }


    const changeValidation = (e: MouseEvent) => {
        const origin = (e.target as Element).classList[0];
        if (origin == 'popup-inner') {
            popupRemoveChangeState(true);
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
                    onClick={() => popupRemoveChangeState(true)}
                >
                    <AiFillCloseCircle />
                </button>
                <div className='flex flex-col p-4 gap-8'>
                    <h1 className='text-4xl font-bold text-center mt-4'>Tem certeza que quer excluir a tarefa?</h1>
                    <button
                        className='bg-[#353535] h-10 rounded-lg font-black mb-6'
                        type='submit'
                        onClick={() => { deleleTask(); popupRemoveChangeState(true); }}
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PopupRemoveTask;