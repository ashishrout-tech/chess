"use client"

import TypewriterComponent from 'typewriter-effect';
import Room from './Room';

export default function Page() {
  return (
    <div>
      <div className='mt-36'>
        <h1 className=" text-blue-300 text-center text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Chess Mania
        </h1>
      </div>
      <div className=" tracking-wider leading-10 font-light pl-7 text-5xl py-2 mt-28 sm:text-6xl text-center bg-gradient-to-r from-indigo-400 via-violet-600 to-cyan-400 bg-clip-text text-transparent">
        <TypewriterComponent
          options={{
            strings: ['Play.', 'Challenge.', 'Enjoy.'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <p className=' italic text-xs sm:text-sm text-center text-muted-foreground'>Absolutely for free</p>
      <div className=' mt-24 sm:mt-20 flex justify-center'>
        <Room />
      </div>
    </div>
  );
}
