import clientPromise from '@/lib/mongodb'


export default async function handler(
  req ,
  res
 ) {
 
  const client = await clientPromise;
  
  const db =  client.db('products');
    const user = await db.collection(req.query.review?.[1]).findOne({name:req.query.review?.[2]});
    let rate = user.review.reduce((total,item)=> total + (+item.rating),0)
    rate = +(((rate + req.body.rate) / (user.review.length + 1)).toFixed(1))
     console.log(rate)
    const revieexist = await db.collection(req.query.review?.[1]).findOne({name:req.query.review?.[2],"review.user": req.body.user})
    
    if(revieexist){
  
      await db.collection(req.query.review?.[1]).updateOne({name:req.query.review?.[2],"review.user":req.body.user},
      
     {$set:{totalrating:rate,"review.$.comment":req.body.comment,"review.$.rating":req.body.rate,"review.$.date":req.body.date.toString()}} )

    }else{

      await db.collection(req.query.review?.[1]).updateOne({name:req.query.review?.[2]},{$push: { review:{user:req.body.user,comment:req.body.comment,rating:req.body.rate,date:req.body.date.toString()}},totalrating:rate})

    }
   
    const allreview = await db.collection(req.query.review?.[1]).findOne({name:req.query.review?.[2]},{review:1,_id:0})

    
 
    res.json(allreview.review)
}

