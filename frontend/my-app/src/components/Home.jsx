import { use, useEffect, useState } from 'react';
import Signin from '../AlwaysUse/Signin';
import AddWork from '../AlwaysUse/AddWork';

var count = 0;


function Home(){
  var [Login,setLogin] = useState(false);
  var [LoginData,setLoginData] = useState({Name:"",Email:"",Password:"" });
  var [Work,setWork] = useState(false);  

  useEffect(() => {
    if(Login) count++;
    console.log(count);
  }, [Login]);

   return(
    <>
     <div className={`${(Login && count === 0) ? 'blur-sm pointer-events-none select-none' : ''}`}>
       <div className='flex justify-center mt-10'>
        <img className=' h-10 w-10 rounded-full bg-amber-50'
        src="#" />
        ,<button className='w-2xl bg-amber-200 rounded-md'
        onClick={() => {
          setLogin(true);
          if (!Work) setWork(true);
        }}>
        Add Work</button>
       </div>
     <div className='flex mt-10 justify-evenly box-border rounded-md h-96 w-full'>
      <div className='border-2 border-black rounded-md h-96 w-1/5'>
          <div>
              <p>Profile</p>
          </div>
      </div>
      <div className='border-2 border-black rounded-md h-96 w-1/5'>
        <p>Network</p>
      </div>
      <div className='border-2 border-black rounded-md h-96 w-1/5'>
        <p>Extra</p>
      </div>
    </div>
     </div>
    {(Login && count === 0) &&
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <button className='absolute top-10 right-10 cursor-pointer bg-red-500 rounded-md min-w-5 min-h-5'
          onClick={() => setLogin(false)}>
            X</button>
        <Signin setLoginData={setLoginData} setWork ={setWork}/>
      </div>
    }
    {(Work && count !== 0) && <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50'>
    <button className='absolute top-10 right-10 cursor-pointer bg-red-500 rounded-md min-w-5 min-h-5'
        onClick={() => setWork(false)}>X</button>
    <AddWork setWork={setWork}/>
    </div>}
    </>
  )}

export default Home;