import clientPromise from '@/lib/mongodb'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req ,
  res
 ) {
  const secret = process.env.NEXTAUTH_SECRET
  const session = await getToken({req,secret})
  const client = await clientPromise;
  const db = client.db("user");
    
    const getres  = db.collection("cart").updateOne({user:session.email},
    { $set: { cart : req.body.cart, total:req.body.total} })
     
     res.json(getres)


 
  
}