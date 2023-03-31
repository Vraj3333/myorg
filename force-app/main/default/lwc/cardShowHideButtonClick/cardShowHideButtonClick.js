import { LightningElement, track } from 'lwc';

export default class CardShowHideButtonClick extends LightningElement {
    cardTitle="This is show the content"
    @track onClickLabel='Show'
    @track cardVisible=false
    onClickEvent(event){
        const label=event.target.label;
        if(label==='Show'){
            this.onClickLabel='Hide'
            this.cardVisible=true
        }else{
            this.onClickLabel='Show'
            this.cardVisible=false
        }    
    }
}