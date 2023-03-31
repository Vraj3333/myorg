import { LightningElement, track } from 'lwc';
import getAllAccount from '@salesforce/apex/GetListOfAccount.getAllAccount'
export default class ComboBoxGivenId extends LightningElement {
    @track value=""
    @track accAllValue=[]

    get options(){
        return this.accAllValue
    }
    connectedCallback(){
        getAllAccount().then(res=>{
            let arr=[]
            for (let i = 0; i < res.length; i++) {
                arr.push({label:res[i].Name,value:res[i].Id})                
            }
            this.accAllValue=arr
        })
    }//this is run when load
    handleChange(event){
        this.value=event.target.value       
    }
}