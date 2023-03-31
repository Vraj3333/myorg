import { LightningElement, track, wire } from 'lwc';
import getAllAccount from '@salesforce/apex/GetListOfAccount.getAllAccount'
export default class GetDataApexForEach extends LightningElement {
    @track data=[]
    @wire(getAllAccount)
    accounts;
}