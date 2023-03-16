import React, { ChangeEvent,useEffect,useState } from 'react';
import Filter from './Filter';

type filter = { 
                   
               product:string,
               handelcatagory?:(e: ChangeEvent<HTMLInputElement>)=> void,
               handelsize?:(e: ChangeEvent<HTMLInputElement>)=> void,
               handelprice:(e: ChangeEvent<HTMLInputElement>)=> void,
               handelreview:(e: ChangeEvent<HTMLInputElement>)=> void,
              }

const Allfilter :React.FC<filter>= (props) => {
  let catagory = props.product == 'jacket' ? ['faux leather','long coat','biker','bomber'] : props.product == 'bag' ? ['shoulder','crossbody','tote','wallet']: ['nubuck','calfskin','suede','chamois']
  let size = props.product == 'jacket' ? ['XS','S','M','L','XL'] : ['24','24.5','25','25.5','26','26.5','27','27.5']
  return (
    <div className='col-span-12 w-full md:col-span-3 flex flex-row md:flex-col px-2 md:px-10 py-8 gap-6 md:gap-10 text-xm md:text-base bg-slate-50'>  
        
        {props.product !== 'sale' && props.product !== 'whatsnew' ? <Filter key={1} field={`Select catagory`} value={catagory} name={`jac`} type={'checkbox'} handelchange={props.handelcatagory!}/> : ''}
        {props.product !== 'bag' && props.product !== 'sale' && props.product !== 'whatsnew' ? <Filter key={4} field={`Select size`} value={size} name={`size`} type={'checkbox'} handelchange={props.handelsize!}/> : ''}        
        <Filter key={2} field={`Select reviews`} value={['4','3','2','1',]} name={`review`} type={'radio'} handelchange={props.handelreview}/>       
        <Filter key={3} field={`Select price`} value={['0-3000','3000-6000','6000-8000','8000-10000',]} name={`price`} type={'radio'} handelchange={props.handelprice}/>   
    </div>
  )
}

export default Allfilter

