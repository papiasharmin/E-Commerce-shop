import React,{FormEvent,useRef, useState,useEffect} from 'react'
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { cartaction } from '@/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { callapi } from '@/helper'
import { useRouter } from 'next/router'


const Login: React.FC<{cartitem:string}> = (props) => {
  const { data: session, status } = useSession()
  const items:{id:string;quantity:number;totalprice:number}[] = useSelector((state:{cart:{cart:[]}})=> state.cart.cart);
  const total = useSelector((state:{cart:{totalamount:number}})=> state.cart.totalamount);
  const dispatch = useDispatch()
  const logemailref= useRef<HTMLInputElement>(null);
  const logpasswordref= useRef<HTMLInputElement>(null);
  const emailref= useRef<HTMLInputElement>(null);
  const passwordref= useRef<HTMLInputElement>(null);
  const [regnotify,setregnotify] = useState('')
  const [notify,setnotify] = useState('')
  const router = useRouter()

  const register= async (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

      let data = await fetch(`/api/auth/signup`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailref.current?.value,
          password: passwordref.current?.value
         }),
      })

      const res = await data.json();
      setregnotify(res)
      setTimeout(()=> setregnotify(''),4000)
    
  }

  const login = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const result = await signIn('credentials',{
      redirect:false,
      email: logemailref.current?.value,
      password: logpasswordref.current?.value
    })
    if(result?.status === 200){
      router.replace(`/profile`)
    }else{
      setnotify(result?.error ? result?.error: '' )
      setTimeout(()=> setnotify(''),4000)
    }
    
    
  }

  useEffect(()=>{
    const mergecart = async ()=>{
    
      let res = await callapi(items,total,'getcart')
      
      dispatch(cartaction.cleaecart())
      dispatch(cartaction.setcart({cart:res.cart,total:res.total}))
  
    }
      if(session?.user?.email){
         mergecart()
      }

  },[session?.user?.email])

  return (
    <div className='grid grid-cols-12 pt-[200px] md:pt-[150px] h-full md:pt-100px gap-6 bg-slate-100 px-4 mb-20 '> 

        <div className='relative col-span-12 md:col-span-6 h-full  bg-slate-200 drop-shadow flex flex-col justify-start gap-6 items-center'>
          <p className='text-2xl font-medium mt-4'>Sign in</p>

          <form onSubmit={login} className='flex flex-col justify-center w-2/4 mb-10'>
             <label className='text-sm' htmlFor='email'>Email Address</label>
             <input className='p-2 border-[1px] border-slate-500 mb-4' type='email' name='email' ref={logemailref} required/>
                  
             <label className='text-sm' htmlFor='password'>Password</label>
             <input className='p-2 border-[1px] border-slate-500 mb-4' type='password' name='password' ref={logpasswordref} required/>
             
             <button className='bg-black p-2 text-slate-100 font-medium text-2xl text-center'>Sign In</button>
          </form>
          {notify && <p className='fixed mx-auto p-2 w-full h-full text-center top-0 left-0 text-lg font-semibold backdrop-blur-md'>{notify}</p>}
        </div>

        <div className='relative col-span-12 md:col-span-6 h-full  bg-slate-200 drop-shadow flex flex-col justify-start gap-6 items-center'>
          <p className='text-2xl font-medium mt-4'>New to Leather It</p>
          
          <form onSubmit={register} className='flex flex-col justify-center mb-10 w-2/4'>
            <label className='text-sm' htmlFor='email'>Email Address</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4 ' type='email' name='email' ref={emailref} required/>

            <label className='text-sm' htmlFor='password'>Password</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4' type='password' name='password' ref={passwordref} required/>

            <label className='text-sm' htmlFor='confirmpassword'>Confirm Password</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4' type='password' name='confirmpassword' required/>

            <button className='bg-black p-2 text-slate-100 font-medium text-2xl text-center'>Register</button>
          </form>
          {regnotify && <p className='fixed mx-auto p-2 w-full h-full text-center top-0 left-0 text-lg font-semibold backdrop-blur-md'>{regnotify}</p>}
        </div>
        
      
    </div>
  )
}

export default Login
