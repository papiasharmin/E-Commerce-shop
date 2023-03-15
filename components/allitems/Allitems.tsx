import React from 'react';
import Item from './Item';

type product = {name:string,price:number,totalrating:number,img:{color:string,imgads:string[]}[]}

const Allitems: React.FC<{product:product[]}> = (props) => {
  const products = props.product.map(item => <Item key={item.name} name={item.name} price={item.price} img={item.img} totalrating={item.totalrating}/>)

  return (
    <div className='grid grid-cols-12 gap-2 col-span-12 md:col-span-9 md:gap-4 border-l-2 border-slate-500 p-10 bg-slate-50'>
       {products}   
    </div>
  )
}

export default Allitems