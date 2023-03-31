import { LightningElement, track, wire } from 'lwc';
import getAllData from '@salesforce/apex/InsertRecordContactLWC.getAllData'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import updateContact from '@salesforce/apex/InsertRecordContactLWC.updateContact'
// import StayInTouchSubject from '@salesforce/schema/User.StayInTouchSubject';

export default class TableDisplayData extends LightningElement {

    //ref ;

    connectedCallback(){
        //this.ref='2343';

        this.workid2={'c__id':'3434','num':'343'};
    }



    @wire(getAllData,{refid: '$workid2.num'})
    contacts;

    // data=data;
    // columns=columns;
    @track searchValue;

    handleonchangeSearch(event) {
        console.log("in")
        console.log(this.contacts)
        this.searchValue = this.template.querySelector('lightning-input').value;
        console.log(this.contacts.data[0])
        var newArr = []
        for (let i = 0; i < this.contacts.data.length; i++) {
            console.log("in ", i)
            for (let key in this.contacts.data[i]) {
                console.log("ina", key)
                if (this.contacts.data[i][key].indexOf(this.searchValue) != -1) {
                    console.log("inb")
                    newArr.push(this.contacts.data[i]);
                    // console.log(newArr);
                }
            }
        }
        console.log(newArr)
        this.contacts.data = newArr
        console.log(this.contacts.data)

    }

    @track customFormModal = false;
    //name
    @track namef = "";

    //email
    @track email = "";

    //mobilenumber
    @track mobilenum = "";

    //title
    @track title = "";//for the purpose to contact that

    //department
    @track department = "";
    //id
    @track id="";
    @track objfinal = "";
    customShowModalPopup(event) {
        this.customFormModal = true;

        // console.log("id4",event.target.dataset.name)
        var obj = "";
        for (let i = 0; i < this.contacts.data.length; i++) {
            // console.log(this.contacts.data[i]['Id'])
            if (this.contacts.data[i]['Id'] === event.target.dataset.name) {
                obj = this.contacts.data[i];
            }
        }
        this.namef = obj.LastName
        this.email = obj.Email
        this.mobilenum = obj.Phone
        this.department = obj.Department
        this.title = obj.Title
        this.id=obj.Id
        console.log(obj)
        this.objfinal = obj;
    }

    customHideModalPopup() {
        this.customFormModal = false;
    }

    handleOnchangeEdit(event) {
        // console.log(event.target.value)
        // console.log(event.target.name)
        const ans = event.target.name
        if (ans === "name") {

            this.namef = event.target.value
        } else if (ans === "email") {

            this.email = event.target.value
        } else if (ans === "mobilenum") {

            this.mobilenum = event.target.value
        } else if (ans === "title") {

            this.title = event.target.value
        } else if (ans === "department") {

            this.department = event.target.value
        }
        // console.log(this.namef,',',this.id,',',this.email,',',this.department,',',this.title,',',this.mobilenum)
    }

    editData(e){
        e.preventDefault()
        // console.log("in")
        var mess = "";
       
        if (this.namef === "") {
            // console.log("name problem")
            mess = "Please Enter Name."
        }
        if (this.email === "") {
            // console.log("email problem")
            mess = "Please Enter Email."
        }

        if (this.mobilenum === "" || this.mobilenum.length > 10 || this.mobilenum.length < 10) {
            // console.log("mobilenumber porblem")
            mess = "MobileNumber must have 10 digits."
        }
        if (this.title === "") {
            // console.log("purpose problem")
            mess = "Please Enter The Purpose to Contact Us."
        }
        if (this.department === "") {
            // console.log("department problem")
            mess = "Please Enter Department."
        }

        if (mess !== "") {
          
            alert(mess);
        } else {
            

            console.log("done")
            var resp = {
                LastName: this.namef,
                Department: this.department,
                Email: this.email,
                Title: this.title,
                Phone: this.mobilenum,
                Id:this.id
            }
            console.log("resp",resp)
            console.log({con:resp})
            updateContact({ con: resp })
                .then(result => {
                    this.message = result;
                    this.error = undefined;
                    if (this.message !== undefined) {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Account created',
                                variant: 'success',
                            }),
                        );
                    }

                    window.console.log(JSON.stringify(result));
                    window.console.log("result", this.message);
                })
                .catch(error => {
                    this.message = undefined;
                    this.error = error;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                    window.console.log("error", JSON.stringify(this.error));
                });
        }
        window.location.reload()
    }




























    // const columns = [
    //     { label: 'Name', fieldName: 'LastName', type: 'text' },
    //     {
    //         label: 'Email',
    //         fieldName: 'Email',
    //         type: 'email',

    //     },
    //     {
    //         label: 'Purpose',
    //         fieldName: 'Title',
    //         type: 'text',

    //     },
    //     { label: 'Department', fieldName: 'Department', type: 'text' },
    //     { label: 'Mobile Number', fieldName: 'phone', type: 'phone' },
    // ];

    // const data=[getAllData];




    // async handleSave(event) {
    //     // Convert datatable draft values into record objects
    //     const records = event.detail.draftValues.slice().map((draftValue) => {
    //         const fields = Object.assign({}, draftValue);
    //         return { fields };
    //     });

    //     // Clear all datatable draft values
    //     this.draftValues = [];

    //     try {
    //         // Update all records in parallel thanks to the UI API
    //         const recordUpdatePromises = records.map((record) =>
    //             updateRecord(record)
    //         );
    //         await Promise.all(recordUpdatePromises);

    //         // Report success with a toast
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Success',
    //                 message: 'Contacts updated',
    //                 variant: 'success'
    //             })
    //         );

    //         // Display fresh data in the datatable
    //         await refreshApex(this.contacts);
    //     } catch (error) {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Error updating or reloading contacts',
    //                 message: error.body.message,
    //                 variant: 'error'
    //             })
    //         );
    //     }
    // }


}