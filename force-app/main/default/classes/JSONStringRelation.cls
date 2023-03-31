public class JSONStringRelation {
    public static void jsonString(){
	/*Map<String,Object> m=new Map<String,Object>();
	String str='System.Address[getCity:Cupertino;getCountry:USA;getCountryCode:null;getGeocodeAccuracy:null;getPostalCode:null;getState:CA;getStateCode:null;getStreet=test abc change to this;]';
    //System.debug('hu');
    str=str.replaceAll(';', ',');
    Integer n=str.indexOf('[');
    String s=str.substring(n,str.length());
    System.debug(s);
    Object o=s;
      */
        
        
Contact con = new Contact(FirstName = 'First', LastName = 'Last', Phone = '9999999999', Email = 'Test@test.com');
/* Code to convert Contact to JSON string */
      //  system.debug('contact->'+con);
		//String strJSON = JSON.serialize(con);
        String s='getCity=Cupertino,getCountry=USA,getCountryCode=null,getGeocodeAccuracy=null,getPostalCode=null,getState=CA,getStateCode=null,getStreet=test abc change to this';
        String[] arr=s.split(',');
        String st='{';
        for(String str:arr){
            String[] st1=str.split('=');
            if(st1[1]!='null'){
            	//st+='"'+st1[0]+'":"'+st1[1]+'",';
            	st+=st1[1]+',';
            }
        }
        st=st.substring(0,st.length()-1);
        st+='}';
        system.debug('str->'+st);
        //system.debug('str1->'+JSON.deserializeUntyped(st));
        //system.debug('str2->'+JSON.serialize(st));
//system.debug('JSON String is ' + s);
/* Code to convert JSON string to Contact */
//Contact con1 = (Contact)JSON.deserialize(strJSON, Contact.Class);
//system.debug('Contact is ' + con1);
    //System.debug(o);
   /*List<String> a=new List<String>();
   a.add('1');
   System.debug(a);*/
        //(Parties:[actionName=null, countryCode=1, dialingCode=+1, emailId=temp@gmail.com, firstName=TempF, hostEmailId=null, lastName=TempL, mobileNumber=, permission=FILL_FIELDS_AND_SIGN, sequence=1, signerAuthLevel=null])
    //Business Name=System.Address[getCity=Cupertino;getCountry=USA;getCountryCode=null;getGeocodeAccuracy=null;getPostalCode=null;getState=CA;getStateCode=null;getStreet=test abc change to this;]
    }
}