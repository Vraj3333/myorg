import { LightningElement } from 'lwc';

export default class ParentTochildLwc extends LightningElement {

    countValue=0;
    handleAdd(){
        this.countValue++;
    }
    handleSub(){
        this.countValue--;
    }
    handleMul(){
        this.countValue=this.countValue*2;
    }

    valueParent=0;
    handleTextOnChange(event){
        this.valueParent=event.target.value;
    }

}