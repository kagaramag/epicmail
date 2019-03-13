class Validate {
   static username(input, required) {
     if (input && required && input.length >= 3 && input.length <= 25) {
       return {
         isValid: true,
       }
     }
     if (input.match(/[a-z]{2}/i) && !input.match(/[0-9!$%*|}{:><?~`_&#^=]/)) {
       return {
         isValid: true,
       };
     }
     return {
       isValid: false, 
       error: 'Please enter valid characters! Only alphabetic characters allowed and it must be between 3 to 25 characters', 
     };
   }
 
   static phone(input, required) {
     if (input && required && input.match(/[0-9+]{2}/i) && !input.match(/[a-z!$%*|}{:><?~`_&#^=]/i)) {
       return {
         isValid: true,
       }
     }
     return {
       isValid: false, 
       error: 'Please enter a valid phone number!',
 
     };
   }
 
   static email(input, required) {
     if (input && required && input.match(/\S+@\S+\.\S+/i) && input.length >= 11 && input.length <= 45) {
       return {
         isValid: true,
       };
     };
     return {
       isValid: false,
       error: 'Please enter a valid email address',
     };
   }
 
   static title(input, required) {
     if (input && required && input.match(/[a-z0-9]{2}/i) && !input.match(/[|}{~`^=]/)) {
       return {
         isValid: true,
       };
     };
     return {
       isValid: false,
       error: 'Please enter valid characters!',
     };
   }

   static name(input, required) {
     if (input && required && input.length >= 2 && input.length <= 30) {
       return {
         isValid: true,
       }
     }
     return {
       isValid: false,
       error: 'Name must be between 2 to 30 characters',
     };
   };

   static string(type, string, required, min, max){ 
    //  check if email is not empty
     if(
        string && 
        required && 
        typeof string === 'string' &&
        string.length >= min &&
        string.length <= max
     ){
       return {
         isValid: true,
       };
     };
    // throw error
    return {
      isValid: false,
      error: `${type} is required and must be alphanumeric. Characters between ${min} and ${max}`,
    };
   };

   static number(type, number, required){ 
    //  check if email is not empty
     if(
        number && 
        required
     ){
       return {
         isValid: true,
       };
     };
    // throw error
    return {
      isValid: false,
      error: `${type} is required and must be a number`,
    };
   };

   static loginEmail(email){     
    //  check if email is not empty
     if(email && typeof email === 'string' && email.indexOf("@") !== -1 && email.match(/\S+@\S+\.\S+/i) && email.indexOf("@epicmail.com") !== -1){
       return {
         isValid: true,
       };
     };
    // throw error
    return {
      isValid: false,
      error: 'Email must be valid and registered under "@epicmail.com"',
    };
   };

 };
 
 export default Validate;