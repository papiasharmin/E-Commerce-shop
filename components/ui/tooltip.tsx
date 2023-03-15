import React from 'react'
import Link from 'next/link'
const Tooltip :React.FC<{routeid:string, onmouseenter:()=>void,onmouseleave:()=>void}>= (props) => {
return (
    <div className='flex flex-col items-center fixed  top-[145px] md:top-[61.5px] md:left-1/4 w-full md:w-[25%] h-auto p-2 bg-slate-50 drop-shadow-xl z-40' onMouseEnter={props.onmouseenter} onMouseLeave={props.onmouseleave}>
        <ul>
            <li className='flex py-2 gap-2'><img className='w-10 h-10' src={props.routeid == 'women'?`https://www.fjackets.com/blog/wp-content/uploads/2019/08/leather-jacket-women-810x438.jpg` : `https://images.unsplash.com/photo-1553591589-2e96ef7eca65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGxlYXRoZXIlMjBqYWNrZXR8ZW58MHx8MHx8&w=1000&q=80`}/>
               <Link className='border-l-2 border-slate-600 p-2' href={`/${props.routeid}/jacket`}> {`${props.routeid} jackets`} </Link>
            </li>
            <li className='flex py-2 gap-2'><img className='w-10 h-10' src={props.routeid == 'women'?`https://www.shutterstock.com/image-photo/fashion-clothes-beautiful-sexy-woman-260nw-511870546.jpg` : `https://i.etsystatic.com/11850141/r/il/18338b/3726831602/il_340x270.3726831602_gsjy.jpg`}/>
               <Link className='border-l-2 border-slate-600 p-2' href={`/${props.routeid}/bag`}>{`${props.routeid} bags`}</Link>
            </li>
            <li className='flex py-2 gap-2'><img className='w-10 h-10' src={props.routeid == 'women'?`https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1345098657.jpg?crop=1.00xw:0.753xh;0,0.0312xh&resize=640:*` : `https://i.insider.com/613fbae6261771001825ec35?width=1136&format=jpeg`}/>
               <Link className='border-l-2 border-slate-600 p-2' href={`/${props.routeid}/shoe`}>{`${props.routeid} shoes`}</Link>
            </li>
        </ul>

    </div>
  )
}

export default Tooltip