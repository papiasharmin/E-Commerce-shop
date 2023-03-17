import Link from 'next/link'
import React from 'react'

const Noproduct = () => {
  return (
    <div className='col-start-2 col-end-12 md:col-start-4 md:col-end-10 flex flex-col justify-center items-center gap-4  h-[400px] bg-slate-200 drop-shadow-md self-center'>
        <p className='bg-slate-200 drop-shadow-md text-center p-2 w-2/4'>Your Cart Is Empty</p>
        <Link className='bg-black text-slate-100 text-2xl rounded-sm text-center p-2 w-[200px]' href={`/login`}>Register/Sign in</Link>
        <Link className='bg-slate-200 drop-shadow-md text-slate-500 text-2xl rounded-sm text-center p-2 w-[200px]' href={`/`}>Shop Now</Link>
    </div>
  )
}

export default Noproduct