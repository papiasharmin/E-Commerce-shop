import React,{useEffect,useState,FormEvent}from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Payment: React.FC<{handelsubmit:(e:FormEvent<HTMLFormElement>)=>void;showmodal:boolean}> = (props)=> {
    const {data:session,status} = useSession()
    const router = useRouter()
    const [userdata,setuserdata] = useState<{name:string;address:string;number:string} | null>(null)
    //const [show,setshow] = useState(props.showmodal)

    if (status === "loading") {
        return <p>Loading...</p>
      }
      if (status === "unauthenticated") {
        router.push(`/login`)
      }


      useEffect(()=>{
        async function userdetail(){
            let res = await fetch('/api/auth/account');

            let userdata = await  res.json()
            setuserdata(userdata)
        }

        userdetail()
        
      },[])
      useEffect(()=>{
       
      },[userdata])
  return (
    <div className='col-span-4'>

    <div className='col-span-8 h-auto bg-slate-200 drop-shadow flex flex-col justify-center items-center mb-4 p-4'>
        <p className='text-2xl font-medium'>Delivary Detail</p>
        <div>
        <p>Name: {userdata?.name}</p>
        <p>Address: {userdata?.address}</p>
        <p>Contact Number: {userdata?.number}</p>
        <p className='text-sm'>Estimated delivary Date is <span className='font-semibold'>{(new Date(Date.now()+(48*3600*1000))).toLocaleDateString()}</span> to {`${userdata?.address}`}</p>
        </div>
    </div>

    <div className='col-span-8 h-auto bg-slate-200 drop-shadow flex flex-col justify-center items-center p-4'>
        <p className='text-2xl font-medium'>Payment Detail</p>

        <form onSubmit={props.handelsubmit} className='flex flex-col justify-start mt-6 w-2/4'>
            
            <p>Select Card</p>
            <div className='flex justify-around items-center'>
            
            <input className='' type='radio' name='card'/>
            <label className='text-sm pr-2' htmlFor='card'><Image src={`/image/cardsvg/jcb.svg`} alt='' width={40} height={40}/></label>
           
            
            <input className='' type='radio' name='card' />
            <label className='text-sm pr-2' htmlFor='card'><Image src={`/image/cardsvg/visa.svg`} alt='' width={40} height={40}/></label>
            
            
            <input className=' ' type='radio' name='card' />
            <label className='text-sm pr-2' htmlFor='card'><Image src={`/image/cardsvg/mastercard.svg`} alt='' width={40} height={40}/></label>
            
            
            </div>

            <label className='text-sm' htmlFor='password'>Card Number</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4 ' type='password' name='password' maxLength={12} required/>

            <label className='text-sm' htmlFor='date'>Expire Date</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4' type='date' name='date' required/>

            <button className='bg-black p-2 text-slate-100 font-medium text-2xl text-center'>Confirm</button>
        </form>

</div>
</div>
  )
}

export default Payment