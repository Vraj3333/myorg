public class GetListOfAccount {
	@AuraEnabled(cacheable=true)
    public static List<Account> getAllAccount(){
        List<Account> li=[select Name from Account];
        System.debug(li);
        return li;
    }
    public static List<Account> getAllAccount1(){
        List<Account> li=[select Name from Account];
        System.debug(li);
        return li;
    }
}