import React, { UIEvent } from 'react'
import { useState,useEffect, MouseEvent} from 'react'
import Link from 'next/link'
import Tooltip from '../ui/tooltip'
import { useSelector } from 'react-redux';
import Acctooltip from '../ui/acctooltip';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar: React.FC<{}>= () => {
  const [show, setshow] = useState<string | null>(null);
  const [showcart,setshowcart] = useState(false)
  const [navcolor,setnavcolor] = useState(false)
  const [ontooltip,setontooltip] = useState(false)
  let [time,settime] = useState<NodeJS.Timeout>();
  const [navshowlg, setnavshowlg] = useState<boolean>(false);
  const items:{id:string;quantity:number;totalprice:number}[] = useSelector((state:{cart:{cart:[]}})=> state.cart.cart);
  const [totalitem,settotalitem] = useState(0)
  const router = useRouter()
  
  useEffect(()=>{
    settotalitem(items.reduce((totalitem,items)=> totalitem + items.quantity,0))
    setshowcart(true)
    setTimeout(() => 
      setshowcart(false)
    , 5000);
  },[items])
  
  function handelMouseenter(event: MouseEvent<HTMLLIElement>){  
     setshow(event?.currentTarget.innerHTML)
     
  }
  
  function handelMouseleave(){ 
    settime(setTimeout(()=>{    
        if(!ontooltip){
          setshow(null)
        }
      },1000)
    )  
  }
  function handeltooltipenter(){  
    setontooltip(true)
  }

  function handeltooltipleave(){
    setontooltip(false)
    setshow('')
  }

  function handelscroll(){
    
    if (window.scrollY >= 60) {
       setnavcolor(true)
    }else{
      setnavcolor(false)
    }

  }
  useEffect(()=>{ 
    if(ontooltip || show){
      clearTimeout(time)
    }else{
      handelMouseleave()
    }
  },[ontooltip,show])

  function togglenav(){
    setnavshowlg(prev=> !prev)
  }

  useEffect(() => {
    window.addEventListener("scroll", handelscroll, true);
    return () => window.removeEventListener("scroll", handelscroll);
    
  }, []);

  const navigator = <>
            <ul className='flex items-center '>
                <li className='px-2'onMouseEnter={handelMouseenter} onMouseLeave={handelMouseleave} >Women</li>
                <li className='px-2' onMouseEnter={handelMouseenter} onMouseLeave={handelMouseleave}>Men</li>
                <li className='px-2'><Link href={`/whatsnew`}>New Arrivals</Link></li>
                <li className='px-2'><Link href={`/sale`}>Sale</Link></li>
            </ul>

            <div className='flex '>
             
              <ul className='flex items-center self-end py-2'>   
                <li className='px-2' onMouseEnter={handelMouseenter} onMouseLeave={handelMouseleave}>Account</li>
                <li className='flex justify-center items-center px-2'>
                  <Link href={`/cart`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </Link>
                  {totalitem >0 ? <span className='text-xl font-medium text-center text-gray-900'>{totalitem}</span>: ''}
                </li>               
              </ul>
            </div>
  </>

  return (
    <>
    <div   className={`fixed z-10 w-full hover:bg-slate-100 text-slate-800 ${navcolor ? 'bg-slate-200' : ''}`}>
        <nav className='flex justify-evenly items-center md:flex-row parent md:justify-between center-center p-4 bg-transparent text-slate-800 hover:text-slate-800 font-sans'>
            <Link href={`/`} className='relative text-2xl font-semibold flex justify-center items-center'><Image alt='' className='w-[70px] h-[35px]' src='/image/logo1.png' width={100} height={100}/>𝑅𝐸𝐿𝐼𝒜𝒩𝒞𝐸</Link>
            <div className='hidden md:flex'>
              {navigator}
            </div>
            <div className='block md:hidden' onClick={togglenav}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            </div>
            {navshowlg && <div className='flex justify-around w-full top-16 left-0 absolute bg-slate-50 border-gray-800 drop-shadow-lg '>{navigator}</div>}


        </nav>       
    </div>
    {(show === 'Women' || show === 'Men') && <Tooltip routeid={show.split('')[0].toLocaleLowerCase()+show.slice(1)} onmouseenter={handeltooltipenter} onmouseleave={handeltooltipleave}/>}
    {(show  === 'Account' ) && <Acctooltip onmouseenter={handeltooltipenter} onmouseleave={handeltooltipleave} />}
    {router.pathname !== '/cart' && showcart && <div className='z-20 fixed top-[145px] md:top-[70px] right-0 w-full md:w-1/4 h-auto p-2 bg-slate-50'>
      {items.map((item:any,index:number) =>
         <div key={index} className='flex justify-center items-center gap-2 border-[1px] mb-2'>
          <div>
            <Image className='w-[100px] h-[100px]' src={`${item.img}`} alt='' width={100} height={100}/>
          </div>
          <div className='flex flex-col justify-start  text-xs font-semibold'> 
            <p className=''> color: {item.color}</p>  
            {item.size !== ' ' && <p>size: {item.size}</p>}
            <p> price: {item.price}</p> 
            <p>qty: {item.quantity}</p>

          </div>
         </div>       
      )}
    </div>}
    </>
  )
}

export default Navbar

// <input className='bg-transparent border-[1px] rounded-md border-slate-200 px-4' type={'text'} placeholder='search' />

