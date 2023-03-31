({
    submitStudentInfo: function (component, event, helper) {

        var isValidate = true;
        // var firstName = component.find('Name');        
        var nameVal = component.find("name").get("v.value");
        var titleVal = component.find("title").get("v.value");
        var emailVal = component.find("email").get("v.value");
        var phoneVal = component.find("phone").get("v.value");
        var departmentVal = component.find("department").get("v.value")

        var streetVal=component.find("street").get("v.value");
        var cityVal=component.find("city").get("v.value");

        console.log(nameVal, " ", titleVal, " ", emailVal, " ", phoneVal, " ", departmentVal);


        //validation

        if (nameVal === undefined || nameVal.trim().length === 0) {
            alert("Name is Required")
            isValidate = false
        }
        if (titleVal === undefined || titleVal.trim().length === 0) {
            alert("Purpose is Required")
            isValidate = false
        }
        if (emailVal === undefined || emailVal.trim().length === 0) {
            alert("Email is Required")
            isValidate = false
        }//add also email validation 
        if (phoneVal === undefined || phoneVal.trim().length === 0 || phoneVal.trim().length > 10 || phoneVal.trim().length < 10) {
            alert("Phonenumber is Required and must be 10 digits")
            isValidate = false
        }
        if (departmentVal === undefined || departmentVal.trim().length === 0) {
            alert("department is Required")
            isValidate = false
        }
        if(streetVal===undefined||streetVal.trim().length===0){
            alert("Street is Required")
            isValidate=false;
        }
        if(cityVal===undefined||cityVal.trim().length===0){
            alert("City is Required")
            isValidate=false;
        }
        else {
            isValidate = true
        }

        if (isValidate) {
            console.log("done")
            var action=component.get("c.insertContacts")
            console.log(action)
            action.setParams({
                lastName:nameVal,
                email:emailVal,
                title:titleVal,
                department:departmentVal,
                phone:phoneVal,
                street:streetVal,
                city:cityVal
            })
            action.setCallback(this,function(res){
                var state=res.getState()
                console.log("in")    
                console.log(state)
                if(state==='SUCCESS'){
                    console.log("done successs")
                    helper.showToast('Success !', 'Record Inserted Successfully', 'success');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
            
            $A.enqueueAction(action);
            
            // window.location.reload()
            //value get but the page is refresh
        }

        
        
    },
})