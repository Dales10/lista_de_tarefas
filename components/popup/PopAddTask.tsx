import { Dispatch, FormEvent, SetStateAction } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

type ModalProps = {
    task: string;
    setTask: Dispatch<SetStateAction<string>>;
    addTask: (e: FormEvent) => Promise<void>;
    popupAddChangeState: (origin: boolean) => void;
}

const PopupAdd = ({ task, setTask, addTask, popupAddChangeState }: ModalProps) => {
    const changeValidation = (e: FormEvent) => {
        const origin = (e.target as Element).classList[0];
        if (origin == 'popup-inner') {
            popupAddChangeState(true);
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
                    onClick={() => popupAddChangeState(true)}
                >
                    <AiFillCloseCircle />
                </button>
                <form
                    className='flex flex-col p-4 gap-8'
                    onSubmit={(e) => addTask(e)}
                >
                    <h1 className='text-4xl font-bold text-center mt-2'>Cologue abaixo a tarefa</h1>
                    <input
                        type="text"
                        placeholder='Adicione uma tarefa'
                        className='bg-[#353535] mt-5 h-14 rounded-lg placeholder:pl-4'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button
                        className='bg-[#353535] h-10 rounded-lg font-black mb-6'
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