import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class MyFirstLwc extends LightningElement {

    @api titleFinal="This is the first project"
    @api handleChangeValue(){
        this.titleFinal="New Value which is pass by parent class"
    }    

    //connectedcallback function is work with when the page is reload
    // connectedCallback(){
    //     if(this.titleFinal!==undefined){
    //         this.handleOnclick();
    //     }else{
    //         alert("Your function is not run because of title final is undefined")
    //     }
    // }


    // handleOnclick(){
    //     // alert("button is clicked")
    //     //we can use showtoast instead of any bootstrap or any thinks 
    //     this.ShowToastEvent(this.titleFinal)
    // }
    

    // ShowToastEvent(mytitle){
    //     const event=new ShowToastEvent({
    //         title:mytitle,
    //         message:"This is the test message",
    //         variant:'success'
    //     })
    //     this.dispatchEvent(event)
    // }//for the toast only
    
    
}