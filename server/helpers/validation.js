class Validate {
   static username(input, required) {
     if (!input && !required && input.length >= 3 && input.length <= 25) {
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
     if (!input && !required) {
       return {
         isValid: true,
       }
     }
     if (input.match(/[0-9+]{2}/i) && !input.match(/[a-z!$%*|}{:><?~`_&#^=]/i)) {
       return {
         isValid: true,
       };
     }
     return {
       isValid: false,
 
       error: 'Please enter a valid phone number!',
 
     };
   }
 
   static email(input, required) {
     if (!input && !required) {
       return {
         isValid: true,
       }
     }
     if (input.match(/\S+@\S+\.\S+/i) && input.length >= 11 && input.length <= 45) {
       return true;
     }
     return {
       isValid: false,
       error: 'Please enter a valid email address',
     };
   }
 
   static title(input, required) {
     if (!input && !required) {
       return {
         isValid: true,
       }
     }
     if (input.match(/[a-z0-9]{2}/i) && !input.match(/[|}{~`^=]/)) {
       return {
         isValid: true,
       };
     }
     return {
       isValid: false,
       error: 'Please enter valid characters!',
     };
   }

   static name(input, required) {
     if (!input && !required) {
       return {
         isValid: true,
       }
     }
     if (input.length >= 3 && input.length <= 25) {
       return {
         isValid: true,
       };
     }
     return {
       isValid: false,
       error: 'Name must be between 3 to 25 characters',
     };
   }
 }
 
 export default Validate;