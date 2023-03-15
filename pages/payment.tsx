import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React,{FormEvent, useEffect, useState} from 'react'


const Payment = () => {
    const {data:session,status} = useSession()
    const [userdata,setuserdata] = useState<{name:string;address:string;number:string} | null>(null)

    async function handelsubmit(e: FormEvent<HTMLFormElement>){
          e.preventDefault(); 
    }

    useEffect(()=>{
        async function userdetail(){
            let res = await fetch('/api/auth/account');

            let userdata = await  res.json()
            setuserdata(userdata)
        }
        if(session){
            userdetail()
        }
      },[session,userdata])

  return (
    <div>

        <div>
            <p>Delivary Detail</p>
            <p>Name: {userdata?.name}</p>
            <p>Address: {userdata?.address}</p>
            <p>Contact Number: {userdata?.number}</p>
            <p>Estimated delivary Date is <span>{(new Date(Date.now()+(48*3600*1000))).toLocaleDateString()}</span> to {`${userdata?.address}`}</p>
        </div>

        <div className='col-span-8 h-3/4 bg-slate-200 drop-shadow flex flex-col justify-center items-center'>
            <p className='text-2xl font-medium'>Payment Detail</p>

            <form onSubmit={handelsubmit} className='flex flex-col justify-start mt-6 w-2/4'>
                
                <p>Select Card</p>
                <div className='flex'>
                <label className='text-sm w-[70px] h-[35px]' htmlFor='card'><Image src={`/image/cardsvg/jcb.svg`} alt='' width={10} height={10}/></label>
                <input className='p-2 border-[1px] border-slate-500 mb-4 ' type='radio' name='card'/>

                <label className='text-sm w-[70px] h-[35px]' htmlFor='card'><Image src={`/image/cardsvg/visa.svg`} alt='' width={10} height={10}/></label>
                <input className='p-2 border-[1px] border-slate-500 mb-4' type='radio' name='card' />

                <label className='text-sm w-[70px] h-[35px]' htmlFor='card'><Image src={`/image/cardsvg/mastercard.svg`} alt='' width={10} height={10}/></label>
                <input className='p-2 border-[1px] border-slate-500 mb-4' type='radio' name='card' />
                </div>

                <label className='text-sm' htmlFor='password'>Card Number</label>
                <input className='p-2 border-[1px] border-slate-500 mb-4 ' type='password' name='password' maxLength={12} required/>

                <label className='text-sm' htmlFor='expire'>Expire Date</label>
                <input className='p-2 border-[1px] border-slate-500 mb-4' type='text' name='text' />

                <button className='bg-black p-2 text-slate-100 font-medium text-2xl text-center'>Confirm</button>
            </form>

  </div>
  </div>
  )
}

export default Payment

