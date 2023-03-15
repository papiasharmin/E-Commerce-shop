export async function updatedbquantity(name,qu,path){
  
    const data = await fetch(`/api/quantity/${path}`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name:name,
        qu   
        })
  
      }) 
      const res = await data.json()
      console.log(res)
      return res.quantity
}

export const callapi = async (items,total,path)=>{   
    const data = await fetch(`/api/cart/${path}`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      
       cart:items,
       total
      })

    })  

    let res = await data.json()
    return res
    
  }

export async function filtersearch(path,pricefield,reviewfield,catagoryfield,sizefield){
  const data = await fetch(`/api/filter${path}`,{  //router.pathname
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      catagoryfield,
      sizefield,
      pricefield,
      reviewfield
    })
  })
  const res = await data.json()

  return res

}

export function helpercatorsize(e,prev){
  const value = e.currentTarget.value
  const ifchecked = e.currentTarget.checked
  if(ifchecked){
    return [value, ...prev] 
   }else{
      const newarr = prev.filter(item => item !== value)
      return newarr 
   }
}

export function helperprice(e){
  const value = e.currentTarget.value
  const ifchecked = e.currentTarget.checked
  if(ifchecked){
    return (value.split('-')).map(item=> +item)
   }else{
      return []
   }
}

export function helperreview(e){
  const value = e.currentTarget.value
  const ifchecked = e.currentTarget.checked
  if(ifchecked){
    return +value
   }else{
      return 0
   }
}