import React,{useState, MouseEvent, ChangeEvent, useEffect}from 'react'
import Rating from '../ui/rating/Rating'
import { cartaction } from '@/store/store';
import {useSelector, useDispatch} from 'react-redux'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { callapi, updatedbquantity } from '@/helper';

const Productdescription: React.FC<{img:{color:string;imgads:string[]};selectimg:(color:string)=>void;name:string,reviewcount:number,totalrating:number,price:number,colors:string[],sizes?:string[],quantity:number}> = (props) => {

  const [show,setshow] = useState(false);
  const [customerchoice,setcustomerchoice] = useState<{color:string,size:string}>({color:props.colors[0],size:''})
  const [warning,setwarning] = useState('');
  const [quantity,setquantity] = useState(props.quantity)
  const [sizes,setsizes] = useState(props.sizes?.map(item=> <li key={item} id={item} onClick={selectsize} className='w-10 h-8 rounded-md bg-slate-100 p-1 text-center cursor-pointer'>{item}</li>))
  const [instock,setinstock] = useState('')
  const { data: session, status } = useSession()
  const items = useSelector((state:{cart:{cart:[]}})=> state.cart.cart);
  const total = useSelector((state:{cart:{totalamount:number}})=> state.cart.totalamount);
  const dispatch = useDispatch();
  const router = useRouter();
  
  let path= (router.pathname.split('/').slice(0,3));
  path[4] = props.name;
  let link = path.join('/');

  function toggleer(){
    setshow(prev => !prev)
  }

  async function addtocart(){
    if(sizes && customerchoice.size === ''){
       setwarning('Please select a size!')
    }else{
      setwarning('Added to bag');
      setTimeout(()=> setwarning(''),2000)
       let quan = await updatedbquantity(props.name,-1,path[2])
       setquantity(quan)
      let item = {
        name:props.name,
        id:props.name , //
        img:props.img.imgads[0],
        size:sizes ? customerchoice.size : " ",
        color:customerchoice.color,//
        quantity: 1,
        price:props.price,
        totalprice:props.price,
        itemleft: quan,
        link:link
      };
       
      dispatch(cartaction.addcartitem(item))
    }
  }

  function selectsize(e: MouseEvent<HTMLLIElement>){ 
    const val = e.currentTarget.innerHTML
    setsizes(prev => {
      let newarr = prev
      
        for(let i = 0; i < newarr!.length; i++){
          if(newarr![i].key === val){
            newarr!.splice(i,1,<li key={newarr![i].key}  onClick={selectsize} className='w-12 h-8 border-2 border-gray-800 rounded-md  p-1  text-center cursor-pointer'>{val}</li>)
            
          }else{
            newarr!.splice(i,1,<li key={newarr![i].key}  onClick={selectsize} className='w-10 h-8 rounded-md bg-slate-100 p-1 text-center cursor-pointer'>{newarr![i].key}</li>)           
          }
        }
      return newarr
  })
      
    setcustomerchoice(prev => {
        return {...prev,size:val}
    })  
  }

  function selectcolor(e: ChangeEvent<HTMLInputElement>){
    const val = e.currentTarget.value
    setcustomerchoice(prev => {
      return {...prev,color:val}
    })
    props.selectimg(val)
  
  }

  useEffect(()=>{
    updatedbquantity(props.name,0,path[2])
  },[])

  useEffect(()=>{
    if(session){
    callapi(items,total,'updatecart')
    } 
  },[items])

  useEffect(()=>{
  
  },[sizes])

  useEffect(()=>{
    setinstock( quantity >= 1 ? 'In Stock' : 'Out of Stock')
  },[quantity])
  
  
  const color = props.colors.map(item => <div className='flex gap-2 items-center'><input id={item} onChange={selectcolor} className='' type='radio' name='color' value={item}/><label htmlFor={item}>{item}</label></div>)
  
  return (
    <div className='col-span-12 md:col-span-4 md:col-start-8 md:col-end-12  px-6 flex flex-col gap-2'>
        <p>{props.name}</p>
        <div className='flex gap-8 items-center text-sm'>{props.totalrating > 0 ? <div><Rating rate={props.totalrating}/><p className='text-sm text-red-900'>{`${props.reviewcount} review`}</p></div> : 'No Reviews'}</div>
        <p>Price: {props.price}</p>
        
        <p>Color:</p>
        <div className='flex gap-6 '>{color}</div>
        {props.sizes  && <><p>Sizes:</p>
        <ul className='flex flex-wrap gap-6 rounded-md w-3/4 p-2'>{sizes}</ul></>}
        <p className='w-1/4  rounded-md border-[1px] border-slate-800  text-center'>{instock}</p>
        <p className='text-red-800 font-medium'>{warning}</p>

        {instock == 'Out of Stock'?<button className={`bg-black text-white rounded-md text-center font-semibold p-2 w-2/4 disabled:opacity-50`} disabled onClick={addtocart}>ADD TO BAG</button> :<button className={`bg-black text-white rounded-md text-center font-semibold p-2 w-2/4 `} onClick={addtocart}>ADD TO BAG</button>}
        <div >
          <h3 className='text-xl font-semibold cursor-pointer'>Description <span className='text-3xl cursor-pointer' onClick={toggleer}>+</span></h3>
          {show && <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </p>}
        
        </div>

    </div>
  )
}

export default Productdescription