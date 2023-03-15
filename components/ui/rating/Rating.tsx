import React from 'react'
import Onerating from './Onerating'

const Rating :React.FC<{rate:number}>= (props) => {
  let fullrate = []
  let halforempty = []

  let ratelength = +(props.rate).toLocaleString().split('.')[0] 
  let rate = +(props.rate).toLocaleString().split('.')[1]
  
  for(let i = 0; i < ratelength; i++){

    fullrate.push(<Onerating ratestyle={`w-4 h-4 overflow-x-hidden `}/>)

  }

  for(let i = 0; i < 5-(ratelength); i++){

    if(i === 0){
      if( rate > 1 && rate  <= 3 ){

        halforempty.push(<Onerating ratestyle={`w-1 h-4 overflow-x-hidden`}/>)

      }else if( rate > 3 && rate  <= 6 ){

        halforempty.push(<Onerating ratestyle={`w-2 h-4 overflow-x-hidden`}/>)

      }else{

        halforempty.push(<Onerating ratestyle={`w-3 h-4 overflow-x-hidden`}/>)
      }

    }else{

      halforempty.push(<Onerating ratestyle={`w-0 h-4 overflow-x-hidden`}/>)
    }  

  }

  return (   
     <div className="flex justify-start items-center">
       {fullrate}
       {halforempty}
       <p className='pl-2'>{props.rate}</p>
     </div>
  )
}
export default Rating;

