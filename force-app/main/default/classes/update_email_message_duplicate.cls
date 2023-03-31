global class update_email_message_duplicate implements Database.Batchable<sObject>
{
    global Database.QueryLocator Start(Database.BatchableContext BC)
    {
        String query = 'select id, FromAddress,Subject,ToAddress,ValidatedFromAddress FROM EmailMessage';
        return Database.getQueryLocator(query);
    }
    global void Execute(Database.BatchableContext BC,List<EmailMessage> emailMessages)
    {
        List<EmailMessage> emailMessageList = New List<EmailMessage>();
        Map<Id,EmailMessage> emailMessageMap = New Map<Id,EmailMessage>();
        for(EmailMessage single_emailMessage : emailMessages)     
        {

            /*if(emailMessageList.contains(l.Name))
            {
                l.ToBeDeleted__c = True;
                Lead_List.add(l);
            }
            else
            {    
                System.debug(l);
                if(l.Name.contains('test') || l.Owner.IsActive != True || l.CreatedDate <= System.today().addDays(-365))
                {
                    l.ToBeDeleted__c = True;
                    System.debug(l.ToBeDeleted__c);
                    Lead_List.add(l);
                }
                Lead_Map.put(l.Name, l);
            }*/
            
        }
        if(emailMessageList.size()>0)
        {
            update emailMessageList;
        }
    }
    global void Finish(Database.BatchableContext BC)
    {
        
    }
}