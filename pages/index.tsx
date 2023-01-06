import { useState } from 'react';

const Home = () => {
  return (
    <>
      <header className="h-24 w-screen text-[#CACACA] bg-[#0D0E11] flex justify-left items-center">
        <h1 className="text-4xl font-black m-10">Lista de Tarefas</h1>
      </header>
      <main className="flex justify-center my-14 relative">
        <section className="h-[500px] w-[800px] bg-[#1A1A1A] rounded-[40px] flex justify-center">
          <div className='w-full'>
            <div className="w-full text-center">
              <input
                type="text"
                placeholder='Adicione uma tarefa'
                className='bg-[#353535] mt-5 w-[calc(calc(100%_-_10rem))] h-10 rounded-lg placeholder:m-6 pl-4'
              />
              <button
                className='bg-[#353535] h-10 w-8 rounded-lg ml-4 font-black'
              >
                +
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
