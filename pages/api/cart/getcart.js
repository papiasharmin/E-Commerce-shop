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

    let usercart 

    //{$push: { review:{  //updateOne({name:req.query.review?.[2]},{$push: { review:{user:req.body.user,comment:req.body.comment,rating:req.body.rate,date:req.body.date.toString()}}})
    if(req.body.cart.length){
      for(let i= 0 ; i < req.body.cart.length; i++){
        usercart = await db.collection("cart").findOne({user:session.email,"cart.id":req.body.cart[i].id,"cart.size":req.body.cart[i].size});
        
        if(!usercart){
          await db.collection("cart").updateOne({user:session.email},{$push:{cart:{...req.body.cart[i]}}})
        }else{
          await db.collection("cart").updateOne({user:session.email,"cart.id": req.body.cart[i].id,"cart.size":req.body.cart[i].size},{$inc:{"cart.$.quantity": req.body.cart[i].quantity,"cart.$.totalprice":req.body.cart[i].totalprice}})
        }



      }
    }
 
      usercart = await db.collection("cart").findOne({user:session.email})
      console.log(usercart)
      usercart.total += req.body.total
      
     res.json(usercart)


 
  //client.close()
}