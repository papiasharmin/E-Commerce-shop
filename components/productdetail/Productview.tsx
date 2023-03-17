import React, { MouseEvent, useEffect, useState } from 'react'
import Image from 'next/image'

const Productview:React.FC<{img:{color:string;imgads:string[]}}> = (props) => {

  const [mainimg,setmainimg] = useState(props.img.imgads[0])
  
  useEffect(()=>{setmainimg(props.img.imgads[0])},[props.img.color])
  
  function changeimg(e: MouseEvent<HTMLImageElement>){
    console.log(mainimg)
       setmainimg(e.currentTarget.src)
  }
  useEffect(()=>{},[mainimg])
  return (
    <div className='col-span-12 md:col-span-6 md:col-start-2 md:col-end-8 grid grid-cols-12 gap-4 h-[550px] overflow-auto pb-10 pl-4'>
        <div className='col-span-3 flex flex-col gap-4 pt-4'>
           <Image  src={`${props.img.imgads[0]}`} alt='' width={150} height={150} onClick={changeimg} className='border-2 border-slate-300 rounded-md p-2 hover:scale-110 w-[110px] h-[110px]'/>
           <Image  src={`${props.img.imgads[1]}`} alt='' width={150} height={150} onClick={changeimg} className='border-2 border-slate-300 rounded-md p-2 hover:scale-110 w-[110px] h-[110px]'/>

        </div>
        <div className='col-span-9  justify-center items-center'>
            <Image className=' h-[500px] pb-4' src={mainimg} alt='' width={400} height={600} />
        </div>

    </div>
  )
}

export default Productview
