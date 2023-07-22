
import { createSlice, configureStore } from "@reduxjs/toolkit";
import {loadState} from '../localstore';
 
const persistedState = loadState();
const hascart = persistedState? persistedState : {cart:[],total:0} 
const initialStatecart = {cart:hascart.cart,totalamount:hascart.total,nouser:1}

function handelupdate(item:any,action:any){



}

function handelremove(state:any,action:any){


}

const cartslice = createSlice({
    name:'cart',
    initialState: initialStatecart,
    reducers:{
        setcart(state,action){
            for(let i = 0; i < action.payload.cart?.length; i++){
                state.cart.push(action.payload.cart[i]);
            }
            state.totalamount += action.payload.total   
        },
        cleaecart(state){
            state.cart.splice(0,state.cart.length)            
            state.totalamount -= state.totalamount    
        },
        addcartitem(state,action){//
             
            if((state.cart.filter((item:any)=> item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color).length)){
                state.cart.map((item:any) => {
                
                    if(item.id === action.payload.id){
                        let itemleft = item.itemleft += action.payload.itemleft - item.itemleft;
            
                        if( item.color === action.payload.color && item.size === action.payload.size){//item.size && item.size === action.payload.size &&
                           
                                let quantity = item.quantity+=1;
                                let total =  item.totalprice += item.price
                                state.totalamount +=item.price
                              return {
                                ...item,
                                itemleft:itemleft,
                                quantity:quantity,
                                totalprice: total
                              }
            
                        }else{
                            return {
                                ...item,
                                itemleft:itemleft
                            }
                        }
                    }else{
                        return {...item}
                    }
                    })
                    
            }else{
                state.cart.push(action.payload)
                state.totalamount += action.payload.totalprice
            }
            

        },
        deletecartitem(state,action){
            //let itemleft = item.itemleft += action.payload.itemleft - item.itemleft ;
             let index 
             state.cart.map((item:any)=> {
                if(item.id === action.payload.id && item.size == action.payload.size && item.color === action.payload.color){
                    index = state.cart.indexOf(item)
                    state.totalamount -= item.totalprice
                }
            })
            state.cart.splice(index,1)
           
        },
        updateitem(state,action){
           state.cart.map((item:any)=> {
                
                if(item.id === action.payload.id){
                    let itemleft = item.itemleft += action.payload.itemleft - item.itemleft;
                    console.log(item.color)
                    console.log(action.payload.color )
                    if(item.size == action.payload.size && item.color === action.payload.color ){
                        let quantity = item.quantity+=1;
                        let total =  item.totalprice += item.price
                        state.totalamount += item.price
                        console.log({
                            ...item,
                            itemleft:itemleft,
                            quantity:quantity,
                            totalprice: total
                            })
                        return {
                            ...item,
                            itemleft:itemleft,
                        quantity:quantity,
                        totalprice: total
                        }
                    }else{
                 
                        return {
                            ...item,
                            itemleft:itemleft
                        }
                    }

                }else{
                    return {...item}
                }
                })
           
                
        },
        removecartitem(state,action){
            const itemexist = state.cart.find((item:any) => item.id === action.payload.id && item.size == action.payload.size && item.color === action.payload.color  )
            if(itemexist.quantity === 1){
                let index 
             state.cart.map((item:any,index:number)=> {
                if(item.id === action.payload.id && item.size == action.payload.size && item.color === action.payload.color ){
                    index = state.cart.indexOf(item)
                    state.totalamount -= item.price
                }
              }
            )
            state.cart.splice(index,1)
            
                
            }else{
                state.cart.map((item:any) => {
                
                    if(item.id === action.payload.id ){
                        let itemleft = item.itemleft += action.payload.itemleft - item.itemleft ;
                    
                        if(item.size == action.payload.size && item.color === action.payload.color ){

                            let quantity = item.quantity-=1;
                            let total =  item.totalprice -= item.price
                            state.totalamount -= item.price
                          return {
                            ...item,
                            itemleft:itemleft,
                            quantity:quantity,
                            totalprice: total
                          }


                        }else{
                            return {
                                ...item,
                                itemleft:itemleft
                            }
                        }
                    }else{
                        return {...item}
                    }
                    })

            }
            
            
        }
    }


})

const initialStateauth = {user:'',isloggedin:false}

const authslice = createSlice({
    name:'auth',
    initialState:initialStateauth,
    reducers:{
        login(state,action){

        },
        logout(state){

        }
    }
})

const store = configureStore({
    reducer: {cart:cartslice.reducer, auth:authslice.reducer}
})

export const cartaction = cartslice.actions;
export const authaction = authslice.actions;

export default store;



//if((state.cart.filter((item:any)=> item.id === action.payload.id && item.color === action.payload.color).length)){
    // state.cart.map((item:any) => {
    
    //     if(item.id === action.payload.id){
    //         let itemleft = item.itemleft += action.payload.itemleft - item.itemleft;

    //         if( item.color === action.payload.color ){//item.size && item.size === action.payload.size &&
    //             if(item.size){
    //                 if(item.size === action.payload.size){
    //                     let quantity = item.quantity+=1;
    //                     let total =  item.totalprice += item.price
    //                     state.totalamount +=item.price
    //                   return {
    //                     ...item,
    //                     itemleft:itemleft,
    //                     quantity:quantity,
    //                     totalprice: total
    //                   }

    //                 }else{
    //                     return {...item}
    //                 }


    //             }else if(!item.size){
    //                 let quantity = item.quantity+=1;
    //                 let total =  item.totalprice += item.price
    //                 state.totalamount +=item.price
    //               return {
    //                 ...item,
    //                 itemleft:itemleft,
    //                 quantity:quantity,
    //                 totalprice: total
    //               }

    //             }


    //         }else{
    //             return {
    //                 ...item,
    //                 itemleft:itemleft
    //             }
    //         }
    //     }else{
    //         return {...item}
    //     }
    //     })
        
// }else{
//     state.cart.push(action.payload)
//     state.totalamount += action.payload.totalprice
// }