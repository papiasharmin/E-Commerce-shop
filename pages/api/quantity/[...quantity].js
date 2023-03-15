import clientPromise from '@/lib/mongodb'


export default async function handler(
  req ,
  res
 ) {
  
  const client = await clientPromise;
  const db = client.db("products");
     
     let dbname = req.query.quantity?.[0].toLocaleLowerCase() 
    await db.collection(dbname).updateOne({name:req.body.name},
    { $inc: { quantity : req.body.qu} })

    const getres  = await db.collection(dbname).findOne({name:req.body.name})
     
     res.json(getres)
     

 
  
}