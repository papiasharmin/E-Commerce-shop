import React,{useState,useEffect, FormEvent} from 'react'
import Item from './Item'
import Noproduct from './Noproduct'
import Recentview from './Recentview'
import { useSelector } from 'react-redux'
import Payment from './Payment'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { cartaction } from '@/store/store'
import { useDispatch } from 'react-redux'
type cartitem = {color:string;link:string;name:string;img:string;size:string;price:number; quantity:number;totalprice:number;itemleft:number}

const Allitem: React.FC<{product:[]}>= (props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [show,setshow]= useState(false)
  const [showmodal,setshowmodal] = useState(false)
  const items = useSelector((state:{cart:{cart:[],totalamout:number}})=> state.cart.cart);
  const total = useSelector((state:{cart:{totalamount:number}})=> state.cart.totalamount);
  const [allitem,setallitem] = useState<cartitem[]>([])
  const dispatch = useDispatch()
 
  useEffect(()=>{
    setallitem(items)
  },[items])

  async function handelsubmit(e: FormEvent<HTMLFormElement>){  
    e.preventDefault();
    setshowmodal(true)
    let res = await fetch(`/api/cart/sentorderlist`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        date:new Date(),
        list:items,
        total:total
      })
    })
    dispatch(cartaction.cleaecart())
    localStorage.removeItem('payment')
  }

  function handelcheckout(){
    if(session){
      
      setshow(true)
      localStorage.setItem('payment',JSON.stringify(true))
    }else{
      router.push('/login')
    } 
  }

  function closemodal(){
    setshowmodal(false) 
 }

 const allitems =allitem.map((item:cartitem,index:number) => {  
  return <Item key={index} color={item.color}itemleft={item.itemleft} link={item.link} name={item.name}id={item.name}img={item.img} price={item.price} quantity={item.quantity} size={item.size} totalprice={item.totalprice}/>
})
console.log(props.product)

  return (
    <div className='grid grid-cols-12 w-full h-full pt-40 md:pt-20 gap-4 px-6'>
          {showmodal && <div className='absolute top-0 left-0 col-span-12 w-full h-full backdrop-blur-md flex justify-center items-center p-4 text-2xl font-semibold text-slate-600 text-center z-20'>
        <div className='border-2 border-slate-300 p-6 flex flex-col w-2/4 h-2/4 bg-slate-300 justify-center items-center cu'>
        <span>Your Order Is Confirmed.</span> <span>Thank you For Shopping From Reliance Leather</span>
        <span onClick={closemodal}className='text-2xl font-semibold border-2 p-2 cursor-pointer'>X</span>
        </div>
      </div>
    }
       {items.length ?<>
                        <p className='w-full col-span-12 text-2xl font-semibold bg-slate-100 p-2'>{`Item Summary (${items.length})`}</p>
                        <div className='col-span-12 md:col-span-8 flex flex-col gap-4 '>
                          {allitems}
                        </div>
                      </> : 
                        <Noproduct/>
      }

    {items.length ? <div className='flex flex-col gap-4 col-span-12 md:col-span-4 px-6 '>
                      <div className='flex flex-col gap-4 col-span-4 px-6 text-2xl'>
                        <p className='bg-slate-100 p-2'>Order Summary</p>
                        <div className='flex justify-between items-center '><span>Subtotal</span> <span>{total}</span></div>
                        <button onClick={handelcheckout} className='bg-black text-slate-100 text-2xl rounded-sm text-center p-2 w-[200px] self-end'>Check Out</button>
                      </div>
                      {show && <Payment handelsubmit={handelsubmit} showmodal= {showmodal}/>}
                    
                    </div> : <></>}
  
      <Recentview product={props.product}/>
    </div>
  )
}

export default Allitem

