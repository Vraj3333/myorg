import StayInTouchSubject from '@salesforce/schema/User.StayInTouchSubject';
import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import insertContact from '@salesforce/apex/InsertRecordContactLWC.insertContact'
export default class ContactForm extends LightningElement {
    //for address purpose
    @track city = "";
    @track postal = "";
    @track province = "";
    @track street = "";
    @track country = "";

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

    // @track datevalue;

    handleOnchange(event) {
        const ans = event.target.name
        if (ans === "name") {
            // console.log("name",event.target.value)
            this.namef = event.target.value
        } else if (ans === "email") {
            // console.log("email",event.target.value)
            this.email = event.target.value
        } else if (ans === "mobilenum") {
            // console.log("Mobile Number",event.target.value)
            this.mobilenum = event.target.value
        } else if (ans === "title") {
            // console.log("title of purpose",event.target.value)
            this.title = event.target.value
        } else if (ans === "department") {
            // console.log("Department",event.target.value)
            this.department = event.target.value
        }


        //set all the value now check on the button click that it is valid or not


        this.city = event.target.city
        this.street = event.target.street
        this.province = event.target.province
        this.country = event.target.country
        this.postal = event.target.postalCode
    }

    /*


    //for the date conversion

    // getFirstDateOfMonth(dt){
    //     console.log(dt)
    //     const regex = /(\-\d\d)$/;          
    //     var givenDateConvertedToFirst = dt.replace(regex,'-01');
    //     console.log(givenDateConvertedToFirst)          
    //     return givenDateConvertedToFirst ;
    // }


    */


    handleOnClick(e) {
        e.preventDefault()
        // console.log("in")
        var mess = "";
        if (this.city === undefined || this.postal === undefined || this.postal.length > 6 || this.postal.length < 6 || this.province === undefined || this.street === undefined || this.country === undefined) {
            // console.log("city problem")
            mess = "Please Enter Address Correctly."
        }
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
            //error is occur
            // console.log("in when all the thinks work fine")
            alert(mess);
        } else {
            //if we have not any error

            // console.log("finalcity ", this.city)
            // console.log("finalstreet", this.street)
            // console.log("finalprovince", this.province)
            // console.log("finalcountry", this.country)
            // console.log("finalpostalcode", this.postal)

            console.log("done")
            var resp = {
                LastName: this.namef,
                Department: this.department,
                Email: this.email,
                Title: this.title,
                Phone: this.mobilenum,
                City__c: this.city,
                Street__c: this.street,
                Province__c: this.province,
                Country__c: this.country,
                Postal__c: this.postal
            }
            console.log("resp",resp)
            console.log({con:resp})
            insertContact({ con: resp })
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
        //value get but the page is refresh
    }

}