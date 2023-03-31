@RESTResource(urlMapping='/public/')
global class RestApiGETPOST {
	@HTTPPost
    global static String creatingRecord(){
        String fname;
        RestRequest req=RestContext.request;
        RestResponse res=RestContext.response;
        String arr=req.requestBody.toString();
        System.debug('body is:'+arr);
        return 'hey';
    }
}