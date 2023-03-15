import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Acctooltip :React.FC<{ onmouseenter:()=>void,onmouseleave:()=>void}> = (props) => {
    const { data: session, status } = useSession()

    async function handellogout(){
        localStorage.removeItem('localcart')   
         await signOut()
    }

    return (
        <div className='flex flex-col items-center fixed top-[145px] md:top-[61.5px] md:right-[30px] md:top-18  w-full md:w-[10%] h-auto p-2 bg-slate-50 drop-shadow-xl z-40' onMouseEnter={props.onmouseenter} onMouseLeave={props.onmouseleave}>
            <ul>
                {!session && <li className='flex py-2 gap-2'><Link className=' border-slate-600 p-2' href={`/login`}>Login</Link></li>}
                {session && <><li className='flex py-2 gap-2'><Link className=' border-slate-600 p-2' href={`/profile`}>My Profile</Link></li>
                <li className='flex p-2 gap-2 cursor-pointer' onClick={handellogout}>Logout</li></>}
            </ul>
    
        </div>
      )
}

export default Acctooltip