
import Productdescription from '@/components/productdetail/Productdescription'
import Productview from '@/components/productdetail/Productview'
import React ,{useState,useEffect}from 'react'
import clientPromise from '@/lib/mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import Allreview from '@/components/productdetail/review/Allreview';
import { useDispatch } from 'react-redux';
import { cartaction } from '@/store/store';
import { imge } from '@/alltypes'

const JacketDetail: React.FC<{jacket:string}> = (props) => {
  const jacket:imge= JSON.parse(props.jacket)
  const [img,setimg]= useState(jacket.img[0])
  
  function selectimg(color:string){
    let imgs = jacket.img.find(item => item.color === color)
    setimg(imgs!)
  }
  
  return (
    <div className='grid grid-cols-12 pt-[150px] md:pt-[100px] px-15'>

      {props.jacket && <><Productview img={img}/> <Productdescription  img={img} selectimg={selectimg} name={jacket.name} reviewcount={jacket.review.length} totalrating={jacket.totalrating} price={jacket.price} colors={jacket.color} sizes={jacket.size} quantity={jacket.quantity}/>
      
      <Allreview dbname={'jacket'} prorductname={jacket.name} review={jacket.review}/></>}

    </div>
  )
}

export default JacketDetail;

export const getStaticPaths: GetStaticPaths= async()=> {
  return {
    paths: [{ params: { jacketid: "men bulky faux leather bomber jacket" } }, { params: { jacketid: "men furry faux leather cool jacket" } }],
    fallback: 'blocking', 
  }
}

export const getStaticProps: GetStaticProps= async(context) =>{
    
  const client = await clientPromise;
  const db = client.db("products");
  const jacket = await db.collection("jacket").findOne({gender:'male',name:context.params?.jacketid});
  
  return {
       props: {jacket:JSON.stringify(jacket)}
  }
}
