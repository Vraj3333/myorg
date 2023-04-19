public with sharing  class DataFetchTask {
    //public List<Contact> con{get;set;}
    public Contact c { get; set; }
    public String searchKey {get;set;}
   	public List<Contact> samepage { get; set; }
    public ID conid {set;get;}
    public Contact ansCon {get; set;}
    public void editKey(){
        System.debug(conid);
        Contact con= [select Id,LastName,Email,Phone,Department,Title,City__c,Street__c from Contact where Id=: conid];
		System.debug(con);
        ansCon=con;
        System.debug(ansCon);
        //PageReference pr = new PageReference('https://shrinesoft2-dev-ed--c.vf.force.com/apex/FormWithTableTaskVF');
   		//pr.setRedirect(true);
        
   		//return pr;
        
    }    
    
    public void search(){
        System.debug(searchKey);
        string searchquery='select Id,LastName,Email,Phone,Department,Title,City__c,Street__c from Contact where name like \'%'+searchKey+'%\'';
        samepage= Database.query(searchquery);
        
    }

    
    public DataFetchTask(){
       c=new Contact();
       samepage= [select Id,LastName,Email,Phone,Department,Title,City__c,Street__c from Contact];
       /* Contact con= [select Id,LastName,Email,Phone,Department,Title,City__c,Street__c from Contact where Id='0035i000008ZNgs' ];
		System.debug(con);
        ansCon=con;*/
    }

    public PageReference save() {
        System.debug(c);
        insert c;  
        PageReference pr = new PageReference('https://shrinesoft2-dev-ed--c.vf.force.com/apex/FormWithTableTaskVF');
   		pr.setRedirect(true);
   		return pr;

    }
    
    public PageReference saveEdit() {
        
        update ansCon;  
        PageReference pr = new PageReference('https://shrinesoft2-dev-ed--c.vf.force.com/apex/FormWithTableTaskVF');
   		pr.setRedirect(true);
   		return pr;

    }
    
/*    public boolean displayPopup {get; set;}     
    
    public void closePopup() {        
        displayPopup = false;    
    }     
    public void showPopup() {        
        displayPopup = true;    
    }*/
    
}