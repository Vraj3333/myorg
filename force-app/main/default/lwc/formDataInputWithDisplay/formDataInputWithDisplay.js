import { LightningElement,track } from 'lwc';

export default class FormDataInputWithDisplay extends LightningElement {
    @track fullName={firstname:"",lastname:""}
    handleChangeEvent(event){
        const ans=event.target.name;//this is the attribute in main page like name="firstname"
        if(ans==='firstName'){
            
            this.fullName.firstname=event.target.value
           
        }else if (ans==='lastName'){
            this.fullName.lastname=event.target.value
            console.log(ans," ",this.fullName.lastname)
            
        }
    }
}