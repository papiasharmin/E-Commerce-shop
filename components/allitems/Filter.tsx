import React, {ChangeEvent,useState} from 'react';
import Filterfield from './Filterfield';
type filterfield = {
  type:string;
  name:string,
  value:string[] ,
  field:string,
  handelchange:(e: ChangeEvent<HTMLInputElement>)=> void}


const Filter : React.FC<filterfield>= (props) => {
  const [show,setshow] = useState(false)

  
  const filterfield = props.value.map((item,index:number)=>
      <Filterfield key={index} type={props.type} name={props.type == 'radio'? `${props.name}`:`${props.name}${index}`} value={item} field={props.field} handelchange={props.handelchange}/>
  )
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-start gap-4 items-center bg-slate-100 rounded-md px-2'>
            <h4 className='col-span-2 text-sm text-slate-800 font-semibold  mb-2'>{props.field}</h4>
            <span onClick={()=>setshow(prev=> !prev)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                      </svg>
            </span>
        </div>
        {show && <div className='h-auto w-auto px-2'>
                    {filterfield}
                 </div>}
      </div>        
    </>
  )
}

export default Filter

