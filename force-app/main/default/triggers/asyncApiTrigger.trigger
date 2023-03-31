trigger asyncApiTrigger on Async_Api__c (after update) {
	System.debug('account'+Trigger.new);
    
}