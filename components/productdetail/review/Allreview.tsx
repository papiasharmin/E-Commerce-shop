import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React ,{FormEvent, useEffect, useRef, useState}from 'react'
import Customerreview from './Customerreview'
import Rating from '@/components/ui/rating/Rating'

const Allreview: React.FC<{dbname:string;prorductname:string,review:{comment:string,rating:number,user:string,date:Date}[]}> = (props) => {
  const { data: session, status } = useSession()
   const [review,setreview] = useState('');
   const [rating,setrating] = useState(4);
   const [allow,setallow] = useState(false)
   const [allreview,setallreview] = useState(props.review)
   const reviewref = useRef<HTMLTextAreaElement>(null)
   const ratingref = useRef<HTMLInputElement>(null)
   const router = useRouter()
   
  function checksession(){
    if(session){
      setallow(true)
    }else{
      router.replace(`/login`)
    }
  }

  async function addreview(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(reviewref.current?.value !== ''){

      setreview(reviewref.current!.value);

      const res = await fetch(`/api/review/${props.dbname}/${props.prorductname}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          comment:review,
          rate:rating,
          user:session?.user?.email?.slice(0,session?.user?.email?.indexOf('@')),
          date:new Date()
        })
      })
      let data = await res.json()
      console.log(data)
      setallreview(data)
     }
  }
  let allreviewele
  useEffect(()=>{
     
    console.log(`HELLOO`) 
  },[allreview])

  allreviewele = allreview?.map(item => <Customerreview key={item.comment} review={item}/>);
  console.log(`HELLOOENDDDD`) 
  let reviewform = <>
      {!allow &&<><button className='rounded-md bg-slate-200 drop-shadow-md p-2' onClick={checksession}>Add Customer Review</button></>}
      {allow && 
          <form className={`flex flex-col gap-2 my-4 ${props.review.length ? 'w-full': 'w-2/4 md:w-1/4'}`} onSubmit={addreview}>
            <label htmlFor="volume">Add Rating</label>
            <Rating rate={+rating}/>
            <input type="range" id="volume" name="volume" min="0" max="5" step='0.3' defaultValue={4} onChange={()=> setrating(+ratingref.current!.value)}ref={ratingref}/>
            <label htmlFor="comment">Add Comment</label>
            <textarea className='resize rounded-md w-full h-auto p-2 border-[1px] border-slate-500 ' name='comment' onChange={()=> setreview(reviewref.current!.value)} ref={reviewref} />
            <button className='bg-slate-200 drop-shadow-md p-2 text-center' >Add Review</button>
          </form>
      }
    </>
  
  return (
    <div className='col-span-8 col-start-3 col-end-11 grid gap-4 grid-cols-12 py-10 border-t-2 mt-10'>
      { props.review.length == 0 && 
          <div className='col-span-12 flex flex-col justify-center items-center'>
            <p className='text-2xl mb-2 '>No Customer Reviews</p>
            <p className='text-2xl mb-2'>Be The First To Review This Product</p>
            {reviewform}
          </div>
      }

      { props.review.length !== 0  && 
        <>
          <div className='col-span-12 md:col-span-8 h-[500px] overflow-y-auto mt-10'>
            {allreviewele}
          </div>
          <div className='col-span-12 md:col-span-4 border-l-2 p-4'>
            {reviewform}   
          </div>
        </>
       }
    </div>
  )
}

export default Allreview
