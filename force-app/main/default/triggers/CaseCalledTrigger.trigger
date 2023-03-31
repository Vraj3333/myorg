trigger CaseCalledTrigger on Case (before insert,after update) {
    
    
    if(trigger.IsInsert ){
    	for(Case c:Trigger.New){
        	system.debug('case------->'+c);
            c.Old_Status__c=c.Status;
            //update c;
    	} 
        //Case c=trigger.old[0];
        //system.debug();
    }
    
    if(trigger.isUpdate){
        List<Case> cases = new List<Case>();
    	for(Case c:Trigger.New){
        	system.debug('case->'+c);
            Case c1=new Case(Id = c.Id);
            system.debug('case1->'+c1);
            c1.Old_Status__c=c.Status;
			system.debug('case old status->'+c.Old_Status__c);
            system.debug('case old status->'+c1.Old_Status__c);
            cases.add(c1);
    	}    
        //update cases;
    }
    
}