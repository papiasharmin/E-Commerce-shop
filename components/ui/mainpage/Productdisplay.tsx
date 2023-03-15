import React from 'react'
import Singleproduct from './Singleproduct'
import { mainpagedisplay } from '@/alltypes';

const Productdisplay:React.FC<{stopscroll:number;product:{jacket:[{name:string,img:{imgads:string[]}[]},{name:string,img:{imgads:string[]}[]}];bag:[{name:string,img:{imgads:string[]}[]},{name:string,img:{imgads:string[]}[]}];shoe:[{name:string,img:{imgads:string[]}[]},{name:string,img:{imgads:string[]}[]}]},sec:string}> = (props) => {
  return (
    <div className='col-span-12 flex flex-col  gap-6 h-auto p-6 drop-shadow-lg rounded-lg border-2 mt-10'>

      <div className='text-center text-2xl border-2 border-slate-100 bg-slate-100 rounded-3xl text-slate-600 font-medium drop-shadow-xl p-2'>ON SALE</div>
      
      <div className='flex gap-2 justify-around items-center border-2 p-4 rounded-md'>       
        <Singleproduct imgsrc={`${props.product.jacket[0].img[0].imgads[0]}`} stopscroll={props.stopscroll} linkads={`/${props.sec}/jacket/${props.product.jacket[0].name}`} />
        <Singleproduct imgsrc={`${props.product.bag[0].img[0].imgads[0]}`} stopscroll={props.stopscroll} linkads={`/${props.sec}/bag/${props.product.bag[0].name}`}/>
        <Singleproduct imgsrc={`${props.product.shoe[0].img[0].imgads[0]}`} stopscroll={props.stopscroll} linkads={`/${props.sec}/shoe/${props.product.shoe[0].name}`}/>        
      </div>
      
      
      <div className='text-center text-2xl border-2 border-slate-100 bg-slate-100 rounded-3xl text-slate-600 font-medium drop-shadow-xl p-2'>NEW ARRIVALS</div>
      
      <div className='flex gap-2 justify-around items-center border-2 p-4 rounded-md'>
        <Singleproduct imgsrc={`${props.product.jacket[1].img[0].imgads[0]}`} stopscroll={props.stopscroll} linkads={`/${props.sec}/jacket/${props.product.jacket[1].name}`}/>
        <Singleproduct imgsrc={`${props.product.bag[1].img[0].imgads[0]}`} stopscroll={props.stopscroll} linkads={`/${props.sec}/bag/${props.product.bag[1].name}`}/>
        <Singleproduct imgsrc={`${props.product.shoe[1].img[0].imgads[0]}`} stopscroll={props.stopscroll} linkads={`/${props.sec}/shoe/${props.product.jacket[1].name}`}/>
      </div>
      
    </div>
  )
}

export default Productdisplay

