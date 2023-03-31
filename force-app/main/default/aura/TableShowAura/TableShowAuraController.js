({

    myAction: function (component, event, helper) {
        // event.preventDefault()
        // console.log("in")

        var action = component.get('c.getAllData');

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                // console.log("in")
                component.set('v.contSeList', response.getReturnValue());
                console.log('v.contSeList')
            }
        });
        // console.log("action",action)
        $A.enqueueAction(action);

    },
    myFetchSearch: function (component, event, helper) {
        event.preventDefault()
        // console.log(component.find("search").get("v.value"))
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

        // component.set('v.contList', newArr);


    }

})