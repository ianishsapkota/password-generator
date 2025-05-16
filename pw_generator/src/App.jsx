import { useState , useCallback , useEffect ,useRef} from 'react'
import './App.css'

function App() {

  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [characterAllowed , setCharacterAllowed] = useState(false);
  const [password , setPassword] = useState('');

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  } , [password])
  
  const passGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz';
    if(numberAllowed) str += '0123456789';
    if(characterAllowed) str += '!@#$%^&*(){}:';

    for(let i = 1; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  } , [length , numberAllowed , characterAllowed , setPassword])

  useEffect(() => {
    passGenerator();
  } , [length , numberAllowed , characterAllowed , setPassword])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generater</h1>
        <div className='flex rounded-lg overflow-hidden mb-4'>
          <input type="text"
        value = {password}
        className='outline-none w-full py-1 px-3 bg-white'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard} 
        className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            className='cursor-pointer' />
          </div>
          <label>Length: {length}</label>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked = {numberAllowed}
           id='numberInput'
           onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="inputNumber">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked = {characterAllowed}
           id='characterInput'
           onChange={() => {setCharacterAllowed((prev) => !prev)}}
            />
            <label htmlFor="inputNumber">Character</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
