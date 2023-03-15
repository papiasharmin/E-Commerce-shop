import Productdescription from '@/components/productdetail/Productdescription'
import Productview from '@/components/productdetail/Productview'
import React ,{useState,useEffect}from 'react'
import clientPromise from '@/lib/mongodb'
import { GetStaticPaths, GetStaticProps } from 'next'
import Allreview from '@/components/productdetail/review/Allreview';
import { imge } from '@/alltypes'

const ShoeDetail: React.FC<{shoe:string}> = (props) => {
  const shoe:imge= JSON.parse(props.shoe)
  const [img,setimg]= useState(shoe.img[0])
  
  function selectimg(color:string){
    let imgs = shoe.img.find(item => item.color === color)
    setimg(imgs!)
  }
  
  return (
    <div className='grid grid-cols-12 pt-[150px] md:pt-[100px] px-15'>

      {props.shoe && <><Productview img={img}/> <Productdescription  img={img} selectimg={selectimg} name={shoe.name} reviewcount={shoe.review.length} totalrating={shoe.totalrating} price={shoe.price} colors={shoe.color} sizes={shoe.size} quantity={shoe.quantity}/>
      
      <Allreview dbname={'shoe'} prorductname={shoe.name} review={shoe.review}/></>}

    </div>
  )
}

export default ShoeDetail

export const getStaticPaths: GetStaticPaths= async()=> {
  return {
    paths: [{ params: { shoeid: "women leather suede shoe  elegant" } }, { params: { shoeid: "women leather nubuck shoe luxary" } }],
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps= async(context) =>{
    
  const client = await clientPromise;
  const db = client.db("products");
  const shoe = await db.collection("shoe").findOne({gender:'female',name:context.params?.shoeid});

  console.log(shoe)
  
  return {
       props: {shoe:JSON.stringify(shoe)}
  }
}