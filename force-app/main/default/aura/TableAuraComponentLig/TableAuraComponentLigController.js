({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', 
            [
            {label: 'Name', fieldName: 'LastName', type: 'text' ,editable: true},
            {label: 'Email', fieldName: 'Email', type: 'text' ,editable: true},
            {label: 'Purpose', fieldName: 'Title', type: 'text' ,editable: true},
            {label: 'Department', fieldName: 'Department', type: 'text' ,editable: true},
            {label: 'Phone', fieldName: 'Phone', type: 'text' ,editable: true },
            // {label: 'City', fieldName: 'City__s', type: 'text'  },
            // {label: 'Phone', fieldName: 'Street__s', type: 'text'  }
            
        ]);
        helper.fetchData(cmp,event, helper);
    },
    handleSaveEdition: function (cmp, event, helper) {
        var draftValues = event.getParam('draftValues');
        console.log(draftValues);
        var action = cmp.get("c.updateAllData")       
        action.setParams({"con" : draftValues});
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);
        
    },
    handleSearch:function (component,event,helper){
        event.preventDefault()
        var searchVal = component.find("search").get("v.value")
        console.log(searchVal)
        var action = component.get('c.getAllData');
        action.setParam({})
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                console.log("in")
                var res=response.getReturnValue()
                var newArr = []
                for (let i = 0; i < res.length; i++) {
                    console.log("in ", i)
                    for (let key in res[i]) {
                        console.log("ina", key)
                        if (res[i][key].indexOf(searchVal) != -1) {
                            console.log("inb")
                            newArr.push(res[i]);
                            console.log(newArr);
                        }
                    }
                }
                component.set('v.contSeList',newArr)
                // console.log(newArr)
            }
        });
        $A.enqueueAction(action);

    }
})