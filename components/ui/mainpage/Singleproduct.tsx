import React,{useState}from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useParallax } from 'react-scroll-parallax';

const Singleproduct: React.FC<{imgsrc:string;stopscroll:number;linkads:string;classname?:string}> = (props) => {
    const [showback,setshowback]= useState(false)

    function handelmouseenter(){
      setshowback(true)
    }
    function handelmouseleave(){
      setshowback(false)
    }
    const parallaxscale0 =useParallax<HTMLDivElement>({
        scale: [0,1],
        startScroll:0,
        endScroll:props.stopscroll,   
    })

   return (
    <div onMouseEnter={handelmouseenter} onMouseLeave={handelmouseleave}  className={props.classname ? props.classname :'relative col-span-4 border-2 border-slate-100 rounded-md w-[180px] h-[180px] drop-shadow-md '}>
        {showback &&  <div className={`absolute backdrop-grayscale-0 bg-white/30 w-full h-full z-20 text-center ${props.classname ? 'rounded-[50%]': ''} `}>
                        <Link className='rounded-md bg-slate-100 text-slate-500 p-2' href={`${props.linkads}`}>view detail</Link>
                      </div>}
          <div ref={parallaxscale0.ref} className='w-full h-full flex justify-center'>
              <Image  className={props.classname ? 'rounded-[50%] hover:scale-110' :'' } src={props.imgsrc} alt='' fill/>
          </div>
    </div>
  )
}

export default Singleproduct
