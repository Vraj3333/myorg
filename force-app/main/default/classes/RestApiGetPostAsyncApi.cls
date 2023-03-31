@RESTResource(urlMapping='/asyncApi/')
global class RestApiGetPostAsyncApi {
    @HttpGet
    global static List<Async_Api__c> getAllRecord(){
        List<Async_Api__c> asyncApi = [select request__c,response__c from Async_Api__c];
        return asyncApi;
    }
    
    @HttpPost
    global static Async_Api__c setRecord(){
        RestRequest req=RestContext.request;
        String asyncApi = req.requestBody.toString();
        JSONParser parser = JSON.createParser(asyncApi);
        System.debug(parser);
        //while (parser.nextToken() != null) {
            system.debug('inaaaa');
            //if (parser.getCurrentToken() == JSONToken.START_ARRAY) {
                //system.debug('inaaa');
              //  while (parser.nextToken() != null) {
                    //system.debug('inaa');
                    //if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                        
                        Async_Api__c acc = (Async_Api__c)parser.readValueAs(Async_Api__c.class);
            			insert acc;
            			System.debug(acc.request__c+' '+acc.response__c+' '+acc.Id);
                        //system.debug('ina');
                    //}
                //}
            //}
        //}
        return acc;
        //return ((Async_Api__c) Type.forName(asyncApi).newInstance()).getSObjectType();
    }
    
    @HttpPut
    global static void updateAccount(Account Account,Async_Api__c async){
        //RestRequest req=RestContext.request;
        //String jsonOfAccount=req.requestBody.toString();
        //JSONParser parser = JSON.createParser(jsonOfAccount);
        //Async_Api__c asyncObj = [update Async_Api__c set Response__c=parser.] 
        System.debug(Account);
        System.debug(async);

        update async;
        Async_Api__c asy=[select response__c from Async_Api__c where Id =:async.Id limit 1];
        if(asy.response__c== async.response__c){
            System.debug('in');
            update Account;
        }

        
        
    }
    
    

}