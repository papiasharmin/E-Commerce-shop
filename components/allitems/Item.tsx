
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Rating from '../ui/rating/Rating';

type product = {name:string,price:number,totalrating:number,img:{color:string,imgads:string[]}[]}

const Item : React.FC<product>= (props) => {
  const router = useRouter()

  
  let first = props.name.split(' ').indexOf('men') !== -1 ? 'men' : 'women';
  let second = props.name.split(' ').indexOf('jacket') != -1 ? 'jacket' : props.name.split(' ').indexOf('bag') != -1 ? 'bag' : 'shoe';
  return (
    <div className='flex flex-col p-6 col-span-6 md:col-span-4  bg-white drop-shadow-lg h-96'>
        <div className='relative h-3/4 flex flex-col items-center  p-1 rounded-md'>
           <div className='absolute w-2/4 top-3/4 text-center drop-shadow-lg bg-slate-100 p-2'>
            <Link className='text-xs md:text-base' href={`/${first}/${second}/${props.name}`}>View details</Link>
           </div>
            <Image className='w-full h-full' src={props.img[0]?.imgads[0]} alt='' width={300} height={300}/>
        </div>
        <div className='text-sm'>{props.totalrating> 0 ? <Rating rate={props.totalrating}/> : 'No Reviews'}</div>
        <p className='truncate'>{props.name}</p>
        <p>{props.price}</p>
      
    </div>
  )
}

export default Item
//`${router.pathname}/${props.name}`