import React from 'react';
import Image from 'next/image';

const Allitembanner: React.FC<{routeid:string}> = (props) => {
  let gender = props.routeid.split('/').join(' ')
  return (
    <div className='col-span-12 w-full flex justify-center bg-gradient-to-r from-cyan-400 to-blue-400  h-[300px] md:h-[250px] overflow-hidden'>
        <Image className='relative w-20 h-20 md:w-[200px] md:h-[200px] self-end -rotate-12' src={`/image/banner3.png`} alt='' width={200} height={150}/>     
        <div className='self-center text-slate-300 text-xl md:text-4xl font-light md:font-semibold font-sans'>
          <p>{`Best quality leather ${gender}.`}</p> 
          <p>{`Shop all type of leather ${gender}`}</p>
        </div>
        <Image className='relative w-20 h-20 md:w-[200px] md:h-[200px]  -bottom-10 self-end rotate-12' src={`/image/banner2.png`} alt='' width={200} height={150}/>
        <Image className='relative w-20 h-20 md:w-[200px] md:h-[200px]  top-0 self-start -rotate-12' src={`/image/banner1.png`} alt='' width={200} height={150}/>
    </div>
  )
}

export default Allitembanner