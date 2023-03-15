import clientPromise from '@/lib/mongodb'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req,
  res
) {

  const secret = process.env.NEXTAUTH_SECRET
  const session = await getToken({req, secret})
  
  const client = await clientPromise
  const db =  client.db('user');
  let user
  
  if(req.method == "POST"){
   
    let update 
    if(req.body.password){
      update = { name:req.body.name,password:req.body.password,address:req.body.address,tel:req.body.tel};
  
    }else{
      update = { name:req.body.name,address:req.body.address,tel:req.body.tel };
      
    }

    await db.collection('userdetail').updateOne({email:session.email},{$set:update})
    user = await db.collection('userdetail').findOne({email:session.email})
  }else{
    user = await db.collection('userdetail').findOne({email:session.email})

  }

  
  res.json(user)
}
