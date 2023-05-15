import Allitem from '@/components/cart/Allitem'
import React,{useEffect} from 'react'
import { useSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'
import { useSelector } from 'react-redux'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { callapi } from '@/helper'

const Cart: React.FC<{allpro:string}> = (props) => {
  const { data: session, status } = useSession()
  const items:{id:string;quantity:number;totalprice:number}[] = useSelector((state:{cart:{cart:[]}})=> state.cart.cart);
  const total = useSelector((state:{cart:{totalamount:number}})=> state.cart.totalamount);

//adding test comment
useEffect(()=>{
  if(session){
    callapi(items,total,'updatecart')
  }
   
},[items])

return <Allitem  product={JSON.parse(props.allpro)}/>
  
}

export default dynamic(()=> Promise.resolve(Cart),{ssr:false})

export const getServerSideProps: GetServerSideProps = async({req,res}) =>{

    const client = await clientPromise;
    const db = client.db("products");
    
    const product1 = await db.collection("jacket").find({totalrating: {$gte: 4}}).limit(2).toArray();
    const product2 = await db.collection("bag").find({totalrating: {$gte: 4}}).limit(2).toArray();
    const product3 = await db.collection("shoe").find({totalrating: {$gte: 4}}).limit(2).toArray();
    const allpro = [...product1,...product2,...product3];

return {
props: {
  allpro:JSON.stringify(allpro ? allpro : []),
},
}
}