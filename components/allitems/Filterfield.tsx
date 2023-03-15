import React,{ChangeEvent} from 'react'
import Rating from '../ui/rating/Rating'

type filterfield = {
  type:string;
  name:string,
  value:string ,
  field:string,
  handelchange:(e: ChangeEvent<HTMLInputElement>)=> void}

const Filterfield:React.FC<filterfield> = (props) => {

  return (
    <div className='flex'>
    <input type={props.type} id={`${props.name}`} name={`${props.name}`}value={`${props.value}`} onChange={props.handelchange} ></input>
    {props.field == 'Select reviews' ? <Rating rate={+props.value}/>:<label htmlFor={`${props.name}`}>{`${props.value}`}</label>}
    </div>
  )
}

export default Filterfield