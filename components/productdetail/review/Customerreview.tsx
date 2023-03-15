
import React from 'react'
import Rating from '@/components/ui/rating/Rating'

const Customerreview: React.FC<{review:{comment:string,rating:number,user:string,date:Date}}>= (props) => {
  const date = (new Date(props.review.date)).toLocaleDateString()

  
  return (
    <div className='col-span-12 p-2 border-b-2'>
      <span>{props.review.user}</span> <span>{date}</span>
      <Rating rate={+props.review.rating}/> 
      
      <p>{props.review.comment}</p>

    </div>
  )
}

export default Customerreview