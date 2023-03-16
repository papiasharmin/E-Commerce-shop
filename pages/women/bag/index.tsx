import Allitems from '@/components/allitems/Allitems'
import Filter from '@/components/allitems/Allfilter'
import Allitembanner from '@/components/ui/Allitembanner'
import React, { useState, useEffect,ChangeEvent} from 'react'
import clientPromise from '../../../lib/mongodb'
import { useRouter } from 'next/router'
import { filtersearch, helpercatorsize,helperprice,helperreview } from '@/helper'

const AllBags: React.FC<{allbags:string}> = (props) => {
  const router=useRouter()
  const [product,setproduct] = useState(JSON.parse(props.allbags))
  const [isloading,setLoading] = useState(false)
  const [catagoryfield,setcatagoryfield] = useState<string[]>([])
  const [sizefield,setsizefield] = useState<string[]>([])
  const [reviewfield,setreviewfield] = useState<number>()
  const [pricefield,setpricefield] = useState<number[]>([])

  function handelcatagoryfilter(e:ChangeEvent<HTMLInputElement>){ 
      setcatagoryfield(prev => {
        let newarr = helpercatorsize(e,prev);
        return newarr
      })
  }

  function handelpricefilter(e:ChangeEvent<HTMLInputElement>){ 
    setpricefield(
      helperprice(e)   
    )
  }

  function handelreviewfilter(e:ChangeEvent<HTMLInputElement>){ 
    setreviewfield(
      helperreview(e)
   )
  }

  useEffect(()=>{
    const callapi = async ()=>{
      setLoading(true)
      let res = await filtersearch(router.pathname,pricefield,reviewfield,catagoryfield,sizefield,)
      setproduct(res)      
      setLoading(false)
    }
     
    if(catagoryfield[0] || sizefield[0]  || pricefield[0] || reviewfield){
       callapi()
    }else{
       setproduct(JSON.parse(props.allbags))
    }
  },[catagoryfield,sizefield,pricefield,reviewfield])

  return (
    <div className='grid grid-col-12 w-[100%]'>
      <Allitembanner routeid={router.pathname}/>
      <div className='grid grid-cols-12'>
         <Filter  product={`${router.pathname.split('/')[2]}`} handelcatagory={handelcatagoryfilter} handelprice={handelpricefilter} handelreview={handelreviewfilter} />
         {isloading == false? <Allitems product={product}/> : <p>LODING</p>}
      </div>
    </div>
  )
}

export default AllBags;

export const getStaticProps = async() =>{
 
  const client = await clientPromise;
  const db = client.db("products");
  const allbags = await db.collection("bag").find({gender:'female'}).project({img:1,name:1,price:1,totalrating:1,_id:0}).toArray();
  
  
return {
  props: {allbags:JSON.stringify(allbags ? allbags : [])}, 
}
}