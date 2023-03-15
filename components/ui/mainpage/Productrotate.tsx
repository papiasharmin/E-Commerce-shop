import React,{useState} from 'react'
import Image from 'next/image'
import { useParallax } from 'react-scroll-parallax';
import Link from 'next/link';
import Singleproduct from './Singleproduct';

const Productrotate:React.FC<{gender:string;imgads:string[];stopscroll:number}> = (props) => {

    const parallaxrotate1 = useParallax<HTMLDivElement>({
        rotate: [0,360],
        startScroll:0,
        endScroll:props.stopscroll,
    });

    let rotaerdispaly = props.imgads.map((item,index) =>

       <Singleproduct classname={`absolute ${index == 0 ? '-top-[75px] md:-top-[100px]': index == 1 ? '-left-[90px] top-[60px] md:-left-[120px] md:top-[80px]' :'top-[60px] left-[90px] md:top-[80px] md:left-[120px]'} w-full h-full border-4 border-slate-200 rounded-[50%]`} 
       imgsrc={item} linkads={`/${props.gender == 'male'?'men':'women'}/${index === 0 ?'jacket': index === 1 ?'bag':'shoe'}`} 
       stopscroll={props.stopscroll}/>
    )

    return (
    <div className='relative col-span-12 flex flex-col md:flex-row justify-around items-center gap:10 md:gap-30 h-[380px] md:h-[500px] '>
       
      <div className='hidden md:flex  border-2 p-2 border-slate-300 h-full w-2/4 justify-center items-center self-start bg-no-repeat bg-cover bg-center'>
        <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm'></div>
        <img src={`/image/${props.gender == 'male'?'mainpagebg2.jpeg':'mainpagebg1.jpg'}`} className='h-full w-full '/>
        <div className='absolute left-1/4 top-7 w-2/4 text-2xl text-center text-slate-600 z-1 '>
          <p className='font-semibold'><span className='text-slate-700 text-3xl font-semibold'>𝑅𝐸𝐿𝐼𝒜𝒩𝒞𝐸 𝐿𝐸𝒜𝒯𝐻𝐸𝑅...</span> A Trusted Brand.</p>
          <p>Buy leather wear,</p><p>quality and comfort ensured</p>
        </div>
      </div>

    <div className='w-full  md:w-2/4 h-full flex justify-center items-center'>

      <div ref={parallaxrotate1.ref} className="spinner relative border-slate-300 rounded-[50%] w-[150px] h-[150px] md:w-[200px] md:h-[200px]">

          {rotaerdispaly}

      </div>
    </div>

    </div> 
    )
}

export default Productrotate

