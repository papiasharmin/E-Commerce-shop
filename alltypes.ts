import { ChangeEvent } from "react";
export type mainpagedisplay = {imgads:string[];stopscroll:number;
    product:{jacket:[{gender:string;name:string,img:{imgads:string[]}[]},{name:string,img:{imgads:string[]}[]}];
    bag:[{gender:string;name:string,img:{imgads:string[]}[]},{name:string,img:{imgads:string[]}[]}];
    shoe:[{gender:string;name:string,img:{imgads:string[]}[]},{name:string,img:{imgads:string[]}[]}]},sec:string}

export    type imge={
        name:string;
        review:{comment:string,rating:number,user:string,date:Date}[];
        price:number;
        color:string[];
        size:string[];
        quantity:number;
        img:{
        color:string;
        imgads:string[]}[],
        totalrating:number
      }



