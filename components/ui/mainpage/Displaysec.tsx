import React from 'react'
import Productdisplay from './Productdisplay'
import Productrotate from './Productrotate'
import { mainpagedisplay } from '@/alltypes'

const Displaysec:React.FC<mainpagedisplay> = (props) => {
  return (
    <div className='w-full h-auto overflow-hidden font-sans grid grid-cols-12 px-[40px]'>
      <Productrotate imgads={props.imgads} gender={props.product.jacket[0].gender} stopscroll={props.stopscroll} />
      <Productdisplay stopscroll={props.stopscroll+500} product={props.product} sec={props.sec}/>
    </div>
  )
}

export default Displaysec

