import { FormEvent, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { db, addDoc, collection } from '../../services/firebase';

type AddProps = {
    readTasks: () => Promise<void>;
    popupAddChangeState: (origin: boolean) => void;
}

const PopupAdd = ({ readTasks, popupAddChangeState }: AddProps) => {
    const [task, setTask] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState({ display: 'none' });

    //Const responsável pela adição das tarefas no Firebase.
    const addTask = async (e: FormEvent) => {
        e.preventDefault();
        const lengthTextValid = task.length >= 5 && task.length <= 1024;
        if (lengthTextValid) {
            setAlertMessage({ display: 'none' })
            try {
                await addDoc(collection(db, "tasks"), { task })
                    .then(() => setTask(''));
                readTasks();
            } catch (err) {
                console.log(err);
            }
        } else {
            setAlertMessage({ display: 'block' })
        }

    }

    const changeValidation = (e: FormEvent) => {
        const origin = (e.target as Element).classList[0];
        if (origin == 'popup-inner') {
            popupAddChangeState(true);
        }
    }

    return (
        <div
            className="popup-inner w-screen h-screen bg-grey21_op80 fixed top-0 left-0 overflow-y-hidden flex justify-center items-center"
            onClick={e => changeValidation(e)}
        >
            <div className="w-[600px] bg-grey01 rounded-xl relative">
                <button
                    className='absolute top-3 right-3 text-3xl text-gray-300'
                    onClick={() => popupAddChangeState(true)}
                >
                    <AiFillCloseCircle />
                </button>
                <form
                    className='flex flex-col p-4'
                    onSubmit={(e) => addTask(e)}
                >
                    <h1 className='text-4xl font-bold text-center mt-2 select-none'>Cologue abaixo a tarefa</h1>
                    <input
                        type="text"
                        placeholder='Adicione uma tarefa'
                        className='bg-grey21 mt-10 h-14 rounded-lg pl-4'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <span style={alertMessage} className='mt-2 ml-1 text-xs text-[#FF0000] select-none'>
                        Tamanho de texto inválido. O texto precisa estar entre 5 e 1024 caracteres.
                    </span>
                    <button
                        className='bg-grey21 h-10 rounded-lg font-black my-8 hover:bg-grey31 transition duration-500'
                        type='submit'
                    >
                        Adicionar
                    </button>
                </form>
            </div>
        </div>
    )
};

export default PopupAdd;