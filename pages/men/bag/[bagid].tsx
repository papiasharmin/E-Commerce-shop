import Productdescription from '@/components/productdetail/Productdescription'
import Productview from '@/components/productdetail/Productview'
import React ,{useState,useEffect}from 'react'
import clientPromise from '@/lib/mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import Allreview from '@/components/productdetail/review/Allreview';
import { imge } from '@/alltypes'

const BagDetail: React.FC<{bag:string}> = (props) => {
  const bag:imge= JSON.parse(props.bag)
  const [img,setimg]= useState(bag.img[0])
  
  function selectimg(color:string){
    let imgs = bag.img.find(item => item.color === color)
    setimg(imgs!)
  }
  
  return (
    <div className='grid grid-cols-12 pt-[150px] md:pt-[100px] px-15'>

      {props.bag && <><Productview img={img}/> <Productdescription  img={img} selectimg={selectimg} name={bag.name} reviewcount={bag.review.length} totalrating={bag.totalrating} price={bag.price} colors={bag.color} quantity={bag.quantity}/>
      
      <Allreview dbname={'bag'} prorductname={bag.name} review={bag.review}/></>}

    </div>
  )
}

export default BagDetail

export const getStaticPaths: GetStaticPaths= async()=> {
  return {
    paths: [{ params: { bagid: "men leather shoulder bag luxary" } }, { params: { bagid: "men leather shoulder bag elegant" } }],
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps= async(context) =>{
    
  const client = await clientPromise;
  const db = client.db("products");
  const bag = await db.collection("bag").findOne({gender:'male',name:context.params?.bagid});
  
  return {
       props: {bag:JSON.stringify(bag)}
  }
}