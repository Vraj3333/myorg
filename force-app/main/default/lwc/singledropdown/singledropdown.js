import { LightningElement, api, track } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Singledropdown extends LightningElement {
    @api label = "Default label";
    _disabled = false;
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
        this.handleDisabled();  
    }
    @track inputOptions = [{
        value: 'Select work orders',
        label: 'Select work orders'
    }, 
    // {
    //     value: 'test1',
    //     label: 'test1',
    //     email: 'test1@gmail.com'
    // }, {
    //     value: 'test2',
    //     label: 'test22',
    //     email: 'test2@gmail.com'
    // }];
    
     {
        value: 'abcd',
        label: 'abcd',
        email: 'abcd@gmail.com',
        preselect:true
    }, {
        value: 'abc',
        label: 'abc',
        email: 'abc@gmail.com',
        preselect:false
    }];
    @api
    get options() {

        //ShowToastEvent("get Options--->",this.inputOptions.filter(option => option.value !== 'Select work orders'))

        
        return this.inputOptions.filter(option => option.value !== 'Select work order');
    }
    set options(value) {
        console.log("obj1--->")
        let options = [{
            value: 'Select work orders',
            label: 'Select work orders'
        }];
        let value1 = [
        //     {
        //     value: 'test1',
        //     label: 'test1',
        //     email: 'test1@gmail.com'
        // }, {
        //     value: 'test2',
        //     label: 'test2',
        //     email: 'test2@gmail.com'
        // }
        {
            value: 'abcd',
            label: 'abcd',
            email: 'abcd@gmail.com',
            preselect: false
        }, {
            value: 'abc',
            label: 'abc',
            email: 'abc@gmail.com',
            preselect:false
        }
    ]
        console.log("value-->", value1)
        alert(value1)
        this.inputOptions = options.concat(value1);
        console.log("inputoptions"+this.inputOptions)

    }
    @api
    clear() {
        console.log("obj2--->")
        this.handleSelectOption();
    }
    value = [];
    @track inputValue = 'Select work orders';
    hasRendered;
    renderedCallback() {
        
        if (!this.hasRendered) {
            //  we coll the logic once, when page rendered first time
            this.handleDisabled();
        }
        let obj=this.inputOptions.filter(option=>option.preselect===true);
            // console.log("obj--->",obj.length)
            // console.log("obj----->",obj[0].preselect);
        if(obj.length>0){
            this.inputValue = obj[0].label;
            // console.log(JSON.stringify(this.template.querySelector("input")))
            // if(this.template.querySelector('input')){
            //     input.disabled = this.disabled;
            // }
            this.disabled = true;
        }else{
            this.hasRendered = true;
           
        }
    }
    
    
    handleDisabled() {
        
        let input = this.template.querySelector("input");
        if (input) {
            input.disabled = this.disabled;
        }
    }
    comboboxIsRendered;
    handleClick() {

        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.toggle("slds-is-open");
        if (!this.comboboxIsRendered) {
            let allOption = this.template.querySelector('[data-id="Select work orders"]');
            allOption.firstChild.classList.add("slds-is-selected");

            this.comboboxIsRendered = true;
        }
    }
    handleSelection(event) {
        
        let value = event.currentTarget.dataset.value;
        if (value === 'Select work orders') {

            this.handleSelectOption();
        }
        
        else {

            this.handleOption(event, value);
            
        }
        let input = this.template.querySelector("input");
        input.focus();
        this.sendValues();
    }
    sendValues() {
        let values = [];
        let emails = [];
        for (const valueObject of this.value) {
            values.push(valueObject.value);
            emails.push(valueObject.email);
            console.log(JSON.stringify(valueObject));

        }
        this.dispatchEvent(new CustomEvent("valuechange", {
            detail: values
        }));
        this.dispatchEvent(new CustomEvent("emailchange", {
            detail: emails
        }));
    }
    handleSelectOption() {
        this.value = [];
        this.inputValue = 'Select work orders';
        let listBoxOptions = this.template.querySelectorAll('.slds-is-selected');
        for (let option of listBoxOptions) {
            option.classList.remove("slds-is-selected");
        }
        let allOption = this.template.querySelector('[data-id="Select work orders"]');
        allOption.firstChild.classList.add("slds-is-selected");
        this.closeDropbox();
    }
    handleOption(event, value) {
        console.log('handleOption')
        let listBoxOption = event.currentTarget.firstChild;
        console.log("listboxoption--->"+listBoxOption)
        if (listBoxOption.classList.contains("slds-is-selected")) {

            console.log("inlistboxoption")
            console.log("value if condition-->"+value)
            this.value.filter(option=> console.log("optionvalue in filter",option.value))
            this.value = this.value.filter(option => option.value !== value);
            console.log("value"+JSON.stringify(this.value))

            //another data can save in this.value array
        }
   
        else {
            // if(this.options)
            
            
            let allOption = this.template.querySelector('[data-id="Select work orders"]');
            allOption.firstChild.classList.remove("slds-is-selected");
            console.log("alloption---->"+allOption);
            let option = this.options.find(option => option.value === value);
            console.log("option--->"+JSON.stringify(option))
            // for(const val of this.value){
            //     console.log("this.value[i]=>",val)
            //     console.log("val label",val.label);
            //     if(val.label.indexOf("test")!=-1) {
            //         this.template.querySelector(`[data-id=${val.value}]`).firstChild.classList.remove("slds-is-selected")
            //           this.value=[];
            //     }
               
            // }
            console.log("this.value1->>>>"+JSON.stringify(this.value))
            this.value.push(option);
            console.log("this.value->>>>"+JSON.stringify(this.value))
        }
        if (this.value.length > 1) {
            this.inputValue = this.value.length + ' options selected';
        }
        else if (this.value.length === 1) {
            this.inputValue = this.value[0].label;
        }
        else {
            this.inputValue = 'Select work orders';
        }
        listBoxOption.classList.toggle("slds-is-selected");
    }
    dropDownInFocus = false;
    handleBlur() {
        if (!this.dropDownInFocus) {
            this.closeDropbox();
        }
    }
    handleMouseleave() {
        this.dropDownInFocus = false;
    }
    handleMouseEnter() {
        this.dropDownInFocus = true;
    }
    closeDropbox() {
        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.remove("slds-is-open");
    }
}