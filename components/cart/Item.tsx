import Image from 'next/image'
import React ,{ useEffect,useState}from 'react'
import { cartaction } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { updatedbquantity } from '@/helper';

const Item : React.FC<{color:string;link:string;itemleft:number;name:string;id:string;img:string;size:string;price:number; quantity:number;totalprice:number}>= (props) => {
  const items:{id:string;quantity:number;totalprice:number;size:string;color:string}[] = useSelector((state:{cart:{cart:[]}})=> state.cart.cart);
 
  const dispatch = useDispatch();
  const router = useRouter();
  let dbname = props.link.split('/')[2]

  useEffect(()=>{
    updatedbquantity(props.name,0,dbname)
  },[])

  

  async function additem(upare:{id:string;size:string;color:string}){
    let itemleft = await updatedbquantity(props.name,-1,dbname)
    dispatch(cartaction.updateitem({...upare,itemleft}))
  }

  async function removeitem(upare:{id:string;size:string;color:string}){
    let itemleft = await updatedbquantity(props.name,1,dbname)
    dispatch(cartaction.removecartitem({...upare,itemleft}))
 }

  async function deleteitem(upare:{id:string;size:string;color:string}){
     const i = items.find(item => item.id === upare.id && item.size == upare.size && item.color == upare.color )
      let itemleft = await updatedbquantity(props.name,i!.quantity,dbname)
     dispatch(cartaction.deletecartitem({...upare,itemleft}))
  }
  let upare = {id:props.name,size:props.size,color:props.color}

  const instock = props.itemleft > 0 ? 'In Stock' : 'Out Of Stock'
  
  return (
    <div className='flex justify-items-start items-center gap-4 bg-slate-100 drop-shadow-md p-4'>
        <Link className='w-[100px] h-[100px]' href={props.link}><Image className='w-[100px] h-[100px] hover:scale-110' src={props.img} alt='' width={100} height={100} /></Link>
        <div className='flex flex-col'>
            <p className='font-medium'>{props.name}</p>
            <div className='flex justify-evenly items-center gap-6'>
                <p className='font-medium'>Size: {props.size}</p>
                <p className='font-medium'>Price: {props.price}</p>
                <div className='flex border-[1px] rounded-lg' >
                    <button onClick={()=>removeitem(upare)} className='border-r-[1px]  px-2'>-</button>
                    <span className='px-2'>{props.quantity}</span>
                    {instock == 'In Stock' ? <button onClick={()=>additem(upare)} className={`border-l-[1px] px-2 `} >+</button> :<button onClick={()=>additem(upare)} className={`border-l-[1px] p-2 disabled:opacity-50`} disabled>+</button>}
                </div>
                <p>{props.totalprice}</p>
            </div>
            <p className={`rounded-md bg-slate-100 p-2 text-center self-start font-semibold text-sm`}>{instock}</p>
            <button onClick={()=>deleteitem(upare)} className='bg-slate-100 drop-shadow-md p-[2px] text-xs text-center self-start'>Delete</button>
        </div>

    </div>
  )
}

export default Item