import clientPromise from '@/lib/mongodb'

export default async function handler(req,res) {
 
    const path = req.query.filterpath?.[0].toLocaleLowerCase()
    let query 
     
    if( path !== 'sale' && path !== 'whatsnew'){
      const gen= path == 'men' ? 'male':'female'
      query = {gender:gen,catagory:{},size:{},totalrating:{},price:{}}

      if(req.body.catagoryfield[0]){
        query.catagory = {$in:req.body.catagoryfield}
      }else{
        delete query.catagory
      }

      if(req.body.sizefield[0]){
        query.size = {$in:req.body.sizefield}
      }else{
        delete query.size
      }

    }else if(path == 'sale'){
      query = {sale:true,totalrating:{},price:{}}
    }else{
      query = {new:true,totalrating:{},price:{}}
    }


    if(req.body.reviewfield){
      query.totalrating = {$gte:req.body.reviewfield}
    }else{
      delete query.totalrating
    }

    if(req.body.pricefield.length>0){
      query.price = {$gt:req.body.pricefield[0],$lte:req.body.pricefield[1]}
    }else{
      delete query.price
    }
 
    const client = await clientPromise
    const db =  client.db('products');

    if(path !== 'sale' && path !== 'whatsnew'){
      
      const dbname = req.query.filterpath?.[1].toLocaleLowerCase() 
      const product = await db.collection(dbname ? dbname : '').find(query).toArray()
      console.log(product)
      res.json(product);
    }else{
      const jacket = await db.collection('jacket').find(query).toArray()
      const bag= await db.collection('bag').find(query).toArray()
      const shoe = await db.collection('shoe').find(query).toArray()
      const allpro = [...jacket,...bag,...shoe]
      res.json(allpro);
    }
    
  }