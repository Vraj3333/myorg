import { api, LightningElement } from 'lwc';

export default class ChildToParentLwc extends LightningElement {
    handleIncrement(){
        this.dispatchEvent(new CustomEvent('increment'))
    }
    handleDecrement(){
        this.dispatchEvent(new CustomEvent('decrement'))
    }
    handleMultiple(){
        this.dispatchEvent(new CustomEvent('multiple'))
    }

    @api valuefromparent=-1;

}