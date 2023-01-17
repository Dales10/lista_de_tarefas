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

    //Adiciona a tarefa enviada pelo usuário.
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
                console.log("Error when adding. Error: ", err);
            }
        } else {
            setAlertMessage({ display: 'block' })
        }
    }

    //Caso alguma região fora da pop-up tenha sido clicada, altera o estado de exibição da mesma.
    const changeValidation = (e: FormEvent) => {
        const origin = (e.target as Element).classList[0];
        if (origin == 'popup-inner')
            popupAddChangeState(true);
    }

    return (
        <div
            className="popup-inner w-screen h-screen bg-grey21_op80 fixed top-0 overflow-y-hidden flex justify-center items-center mx-2"
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
                    <textarea
                        placeholder='Adicione uma tarefa'
                        className='bg-grey21 mt-10 h-14 rounded-lg pl-4 pt-4'
                        value={task}
                        cols={10}
                        onChange={(e) => setTask(e.target.value)}
                    ></textarea>
                    <span style={alertMessage} className='mt-2 ml-1 text-xs text-[#FF0000] select-none'>
                        Tamanho de texto inválido. O texto precisa ter entre 5 e 1024 caracteres.
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
