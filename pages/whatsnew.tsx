import React ,{ChangeEvent, useEffect, useState}from 'react'
import clientPromise from '@/lib/mongodb';
import { useRouter } from 'next/router';
import Allitembanner from '@/components/ui/Allitembanner';
import Allitems from '@/components/allitems/Allitems';
import Filter from '@/components/allitems/Allfilter';
import { filtersearch, helperprice,helperreview } from '@/helper';

const Whatsnew: React.FC<{allnew:string}> = (props) => {
  const router=useRouter()
  const [product,setproduct] = useState(JSON.parse(props.allnew))
  const [isloading,setLoading] = useState(false)
  const [reviewfield,setreviewfield] = useState<number>()
  const [pricefield,setpricefield] = useState<number[]>([])

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
        let res = await filtersearch(router.pathname,pricefield,reviewfield)
        setproduct(res)      
        setLoading(false)
      }
      
    if(pricefield[0] || reviewfield){
      callapi()
     
    }else{
       setproduct(JSON.parse(props.allnew))
    }

  },[pricefield,reviewfield])
 
  
  return (
    <div className='grid grid-col-12 w-[100%]'>
      <Allitembanner routeid={router.pathname}/>
      <div className='grid grid-cols-12'>
         <Filter  product={`${router.pathname.split('/')[1]}`} handelprice={handelpricefilter} handelreview={handelreviewfilter} />{isloading == false? <Allitems product={product}/> : <p>LODING</p>}
      </div>
    </div>
  )
}

export default Whatsnew

export const getStaticProps = async() =>{
    

  const client = await clientPromise;
  const db = client.db("products");
  const newshoes = await db.collection("shoe").find({new:true}).project({img:1,name:1,price:1,size:1,totalrating:1,_id:0}).toArray();
  const newbags = await db.collection("bag").find({new:true}).project({img:1,name:1,price:1,size:1,totalrating:1,_id:0}).toArray();
  const newjackets = await db.collection("jacket").find({new:true}).project({img:1,name:1,price:1,size:1,totalrating:1,_id:0}).toArray();

  const allnew = [...newshoes,...newbags,...newjackets]
  
return {
props: {allnew:JSON.stringify(allnew ? allnew : [])}, // will be passed to the page component as props
}
}

