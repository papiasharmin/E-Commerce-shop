import React from 'react';
import clientPromise from '@/lib/mongodb';
import Displaysec from '@/components/ui/mainpage/Displaysec';

const HomePage: React.FC<{allpro:string}> = (props) => {

  return (
    <div className='flex flex-col w-full h-auto gap-[80px] bg-gradient-to-r from-gray-100 to-gray-500'>

      <div className='relative flex items-center w-full h-[600px] overflow-hidden font-sans backdrop-blur-md bg-[#0f8080]'>

            <div className='relative w-2/4 h-[600px] skew-y-6'>

              <div className='absolute top-[300px]  w-full z-10 text-slate-100 text-5xl font-extrabold font-sans -skew-y-6'>
                 <p>Buy from leather shop, be cool</p>
                 <p>Amazing Clothing</p>
              </div>
              <img className='absolute top-[100px] left-[100px] lg:left-[200px] drop-shadow-2xl w-[100px] h-[150px] lg:w-[200px] lg:h-[250px] animate-movedown' src={'https://i.pinimg.com/736x/b2/20/b7/b220b75ea62cb2e1d765d70cd3e32940--classy-couple-couple-style.jpg'}/>
              <img className='absolute top-[250px] left-[35px] lg:left-[75px] drop-shadow-2xl w-[100px] h-[150px] lg:w-[200px] lg:h-[250px]  animate-moveleft' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtt_v4YM51m2ys69bdwSvS5_cVAE5JvTXE-Q&usqp=CAU'}/>
              <img className='absolute top-[250px] left-[175px] lg:left-[350px] drop-shadow-2xl w-[100px] h-[150px] lg:w-[200px] lg:h-[250px]   animate-moveright' src={'https://www.colonellittleton.com/wp-content/uploads/2023/01/category-image-alligator-jan2023.jpg'}/>
              
            </div>

            <div className='md:block hidden overflow-clip relative -top-24  w-2/4 h-[800px]'>
                <video className=' h-[1000px] shadow-md shadow-slate-100 w-[800px] ' preload='auto' muted autoPlay loop src='/video/vid1.mp4'/>
            </div>

      </div>

      <Displaysec imgads={[`/image/maindisrotate/womenjac1.jpg`,`/image/maindisrotate/womenbag1.jpeg`,`/image/maindisrotate/womenshoe1.jpg`]} stopscroll={600} product={JSON.parse(props.allpro).women} sec={'women'}/>
      <Displaysec imgads={[`/image/maindisrotate/menjac1.jpg`,`/image/maindisrotate/menbag1.jpg`,`/image/maindisrotate/menshoe1.jpg`]} stopscroll={2000} product={JSON.parse(props.allpro).men} sec={'men'}/>

    </div>
  )
}

export default HomePage

export const getStaticProps = async() =>{
 
        const client = await clientPromise;
        const db = client.db("products");
        const wjacketsale = await db.collection("jacket").findOne({gender:'female',sale:true});
        const wjacketnew = await db.collection("jacket").findOne({gender:'female',new:true});
        const mjacketsale = await db.collection("jacket").findOne({gender:'male',sale:true});
        const mjacketnew = await db.collection("jacket").findOne({gender:'male',new:true});
        const wbagsale = await db.collection("bag").findOne({gender:'female',sale:true});
        const wbagnew = await db.collection("bag").findOne({gender:'female',new:true});
        const mbagsale = await db.collection("bag").findOne({gender:'male',sale:true});
        const mbagnew = await db.collection("bag").findOne({gender:'male',new:true});
        const wshoesale = await db.collection("shoe").findOne({gender:'female',sale:true});
        const wshoenew = await db.collection("shoe").findOne({gender:'female',new:true});
        const mshoesale = await db.collection("shoe").findOne({gender:'male',sale:true});
        const mshoenew = await db.collection("shoe").findOne({gender:'male',new:true});
        //client.close()
        let allpro = {women:{jacket:[wjacketsale,wjacketnew],bag:[wbagsale,wbagnew],shoe:[wshoesale,wshoenew]},
                        men:{jacket:[mjacketsale,mjacketnew],bag:[mbagsale,mbagnew],shoe:[mshoesale,mshoenew]}}
       
    return {
      props: {
         allpro:JSON.stringify(allpro)
       
      }, // will be passed to the page component as props
    }
  }







