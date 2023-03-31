import { LightningElement } from 'lwc';

export default class ParentOfMyFirstLwc extends LightningElement {

    handleChange(){
        this.template.querySelector('c-my-first-lwc').handleChangeValue()
    }

}