import { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { getRC, shuffle } from './functions';
import styled from 'styled-components';
import party from 'party-js';

const Container = styled.div`
  background-color: ${props => props.bg}
`

const Box = styled.div`
  background-color: ${props => props.bg}
`

function App() {
  const [menu, setMenu] = useState(false);
  const [currentColor, setCurrentColor] = useState(getRC());
  const [otherColors, setOtherColors] = useState([getRC(), getRC()]);
  const [score, setScore] = useState(0);
  const [correctColors, setCorrectColors] = useState([]);
  const [message, setMessage] = useState('');

  const options = [ ...otherColors, currentColor ];
  let shuffled = shuffle(options);

  const hc = (e) => {
    if (currentColor != e.target.value) { 
      setMessage('Not quite... try again!'); 
      setTimeout(() => {setMessage('')}, 1000) 
    } else {
      party.confetti(e.target);
      setMessage('');
      setScore(prev => prev + 1);
      setCorrectColors(prev => [...prev, currentColor]);
      setCurrentColor(getRC());
      setOtherColors([getRC(), getRC()]);
    }


  };

  const title = () => {
    const title = 'Color Quiz';
    const array = [];
    
    for (let i = 0; i < title.length; i++) {
      array.push(<span key={`${title[i]}.${Math.floor(Math.random() * 99999)}`} style={{color: getRC()}}>{title[i]}</span>)
    }

    return array;
  };

  console.log(`Since you were going to find out anyways, the answer is ${currentColor}.`);

  return (
    <Container bg={currentColor} className="bg-[lightblue] flex flex-col min-h-screen justify-center items-center">

      <div className={`fixed p-4 trans drop-shadow-xl bg-white w-screen ${message.length > 0 ? 'top-0' : 'top-[-1000px]'}`}>
            <h2 className='font-black text-center text-2xl tracking-tight'>{message}</h2>
      </div>
      
      <div className={`w-11/12 z-0 min-h-[500px] ${menu && 'opacity-10'} trans max-w-lg rounded-xl drop-shadow-2xl bg-white text-center flex flex-col justify-center items-center`}>

          <div className={`flex flex-col mb-10 mt-10 w-inherit`}>
              <h1 className='pb-4 font-black text-6xl'>{title()}</h1>
              <Box onClick={(e) => party.confetti(e.target)} bg={currentColor} children={score} className={`w-full flex flex-col justify-center items-center text-8xl font-thin rounded-md h-[200px]`} />
              <div className='flex gap-2 w-full justify-center items-center'>
                  {shuffled.map((color) => {
                    return <button onClick={hc} value={color} children={color}
                      className={'p-4 bg-gray-200 hover:scale-110 trans border mt-2 w-1/3 rounded-md uppercase text-xl font-medium tracking-wide'}
                    />
                  })}
              </div>
              <button onClick={() => {setMenu(!menu);}} className={`uppercase trans tracking-widest opacity-50 hover:scale-110 hover:font-black hover:opacity-100 mt-10`} children={'Show Correct Guesses'} />
          </div>

      </div>

      <div className={`${!menu ? 'left-[-1000px]' : 'left-0'} trans fixed flex flex-col top-0 h-screen w-[400px] drop-shadow-2xl z-20 bg-white`}>
            
            <button onClick={() => {setMenu(!menu)}} className='text-4xl font-black text-right m-5 mb-4' children={'X'} />

            <div className='w-10/12 self-center flex flex-col-reverse gap-2'>
              
                {correctColors.length > 0 ? correctColors.map(color => {
                  return <Box className='rounded-xl uppercase font-black w-[full] h-[50px] flex flex-col items-center justify-center' bg={color}>{color}</Box>
                }) : <h1 className='text-xl text-center font-black'>You haven't guessed any correctly yet! Keep trying...</h1>}

                <button onClick={() => {if(!window.confirm('Clear game?')) return; setMenu(false); setScore(0); setCorrectColors([]);}} className={`uppercase p-6 hover:text-red-500 trans tracking-widest opacity-50 hover:scale-110 hover:font-black hover:opacity-100`} children={'Reset'} />

            </div>

      </div>

      <div className='fixed bottom-0 p-10 text-4xl text-center uppercase tracking-widest font-black hover:opacity-100 hover:cursor-pointer opacity-0 trans'>
          <h2>Designed by Joshua Cooper</h2>
      </div>

    </Container>
  );
}

export default App;
