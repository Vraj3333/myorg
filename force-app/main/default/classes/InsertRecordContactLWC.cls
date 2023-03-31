public with sharing class InsertRecordContactLWC {
    ////Contact con=new Contact(LastName='Vraj',Department='Computer',Email='vraj@gmail.com',Title='Study',Phone='9999999999',City__c='Ahmedabad', Street__c='Kamgaktur',Province__c= 'kuchipudi',Country__c= 'kathak',Postal__c= 'kamni');
    @AuraEnabled
    public static void insertContact(Contact con){
        
        System.debug(con);
        try{
            insert con;
        }catch(Exception e){
            System.debug(con);
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void insertContacts(String lastName,String email,String title,String department,String phone ){
        
        
        Contact con=new Contact(LastName=lastName,Email=email,Title=title,Department=department,Phone=phone);
        System.debug(con);
        try{
            insert con;
        }catch(Exception e){
            System.debug(con);
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
        public static List<Contact> getAllData(String refid){
        	system.debug('refid--------------->'+refid);
        List<Contact> li=[Select Id,LastName,Email,Title,Department,Phone,Street__c from Contact];
        System.debug(li);
        return li;
    }
    
    
    @AuraEnabled
    public static void updateContact(Contact con){
        System.debug(con);
        try{
            update con;
        }catch(Exception e){
            System.debug('in error');
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static void updateAllData(List<Contact> con){
        System.debug(con);
        update con;
	}
}