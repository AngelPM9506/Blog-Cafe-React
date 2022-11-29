import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPrueba, incrementX, removePrueba, selectPrueba } from 'src/store/reducer/prueba';
import ScrollToTopOnMount from '../modules/ScrollToTopOnMount';

export const Pruebas = () => {
  const testCount = useSelector(selectPrueba);
  const dispatch = useDispatch();
  const [internalState, setInternalState] = useState(0);
  const getValInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInternalState(parseInt(value))
  }
  const sendValue = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(incrementX(internalState))
  }
  useEffect(() => { window.scrollTo(0, 0) }, []);
  return (
    <main>
      <ScrollToTopOnMount />
      <h2>Pruebas</h2>
      <button onClick={() => dispatch(removePrueba())}>-</button>
      <p>{testCount}</p>
      <button onClick={() => dispatch(addPrueba())}>+</button>
      <div className="">
        <input type="number" name="numToAdd" onChange={getValInput} />
        <br />
        <button onClick={sendValue}>ADD Count</button>
      </div>
      <p>{internalState}</p>
    </main>
  )
}