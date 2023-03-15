import React, { FormEvent,MouseEvent,useEffect,useRef,useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps} from 'next'
import clientPromise from '@/lib/mongodb';
import { getToken } from 'next-auth/jwt'

const Account: React.FC<{userdetail:string}> = (props) => {
  const {data: session, status} = useSession();
  const [detail,setdetail] = useState(JSON.parse(props.userdetail))
  const [show,setshow] = useState(false)
  const nameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const addressref = useRef<HTMLTextAreaElement>(null);
  const telref = useRef<HTMLInputElement>(null);
   const router = useRouter()
  
  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (status === "unauthenticated") {
    router.push(`/login`)
  }

  async function profidetailapi(){
   
      let res = await fetch(`/api/auth/account`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           name:nameref.current?.value,
           password: passwordref.current?.value,
           address: addressref.current?.value,
           tel:telref.current?.value
       
        })
      })

      let data = await res.json()
      setdetail(data)

  }

  async function handelsubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    profidetailapi()
      
  }

  function handeldispaly(e:MouseEvent<HTMLDivElement>){
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('hidden')
    
   
  }

  let orders = detail.orderlist.map((item:any) => <div className='flex flex-col '>
    <p className='bg-slate-100 p-2 w-wull flex '>
    <span>{`${(new Date(item.date)).toLocaleDateString()}`}</span>
    <span onClick={handeldispaly}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
    </span>
    </p>
    <div className='hidden p-4 text-sm'>
      <ul className='flex flex-col'>
      
        {item.list.map((item:any,index:number) => <li className='flex justify-between items-center border-b-2 p-2'><span>{`${item.name}`}</span><span>{`${item.size} ${item.color}`}</span><span>{`${item.price} X ${item.quantity} = ${item.totalprice}`}</span></li>)}
        <li className='self-end'>{`Total = ${item.total}`}</li>
      </ul>
    
    </div>
  </div> )

  return (
    
      <div className='grid grid-cols-12 p-[100px] w-full h-auto gap-6 '> 
        <div className='p-2 col-span-7 flex flex-col gap-4'>

          <div className='flex flex-col gap-2 border-2 border-slate-100 '>
          <p className='bg-slate-100 p-2'>Profile Detail</p>
          <div className='px-4'>
          <p className='border-b-2 p-2'>Name: {detail.name}</p>
          <p className='border-b-2 p-2'>Email: {detail.email}</p>
          <p className='border-b-2 p-2'>Tel: {detail.tel}</p>
          <p className='p-2'>Address: {detail.address}</p>
          </div>
          </div>

          <div className='flex flex-col gap-4 border-2 border-slate-100'>
            <p className='bg-slate-100 p-2'>Order List</p>
            {orders}
          </div>
        </div>
        <div className='col-span-5 h-3/4 bg-slate-200 drop-shadow flex flex-col justify-center items-center'>

          <form onSubmit={handelsubmit} className='flex flex-col justify-start mt-6 w-2/4'>
            <label className='text-sm' htmlFor='name'>Name</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4 ' type='text' name='text'  ref={nameref}required/>

            <label className='text-sm' htmlFor='password'>Change Password</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4' type='password' name='password' ref={passwordref}/>

            <label className='text-sm' htmlFor='address'>Telephon</label>
            <input className='p-2 border-[1px] border-slate-500 mb-4'  type ="tel" name='address' ref={telref} required/>

            <label className='text-sm' htmlFor='address'>Address</label>
            <textarea className='p-2 border-[1px] border-slate-500 mb-4'  name='address' ref={addressref} required/>

            <button className='bg-black p-2 text-slate-100 font-medium text-2xl text-center'>Submit</button>
          </form>

        </div>



       </div>
   
  )
}

export default Account

export const getServerSideProps: GetServerSideProps= async({req,res}) =>{

  const secret = process.env.NEXTAUTH_SECRET
  const session = await getToken({req,secret})
  const client = await clientPromise;
  const db = client.db("user");
  const userdetail = await db.collection("userdetail").findOne({email:session?.email});
  
  return {
       props: {userdetail:JSON.stringify(userdetail)}
  }
}

