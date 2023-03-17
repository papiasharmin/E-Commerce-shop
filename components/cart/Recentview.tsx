import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Recentview: React.FC<{product:[]}> = (props) => {
  
  let product = props.product.map( (item:{gender:string;name:string;img:{imgads:string[]}[]},index:number) => {
    console.log(item.name.includes('shoe'))
  return <Link key={index} href={`/${item.gender == 'male' ? 'men' : 'women'}/${item.name.includes('jacket')? 'jacket' : item.name.includes('bag')? 'bag' : 'shoe'}/${item.name}`}>
    <Image className='p-2 w-[200px] h-[200px] backdrop-blur-md' src={item.img[0].imgads[0]} alt='' width={200} height={200}/>
  </Link>
  }
  )

  return (
    <div className='flex flex-col justify-center items-center col-span-12 bg-white border-t-2 border-slate-500 mt-10'>
        <p className='p-2 font-semibold text-2xl mb-2'>Popular Search</p>

        <div className='w-full h-[200px] flex justify-around items-center'>
            <div className='flex justify-around items-center gap-4 overflow-x-hidden'>
               {product}
            </div>
        </div>
    </div>
  )
}

export default Recentview