$(function(){
   var auth = JSON.parse(localStorage.getItem('auth'));
   if(!auth || auth === ''){
      window.location.href = "login.html";
   }else{
      $(".userEmail").html(auth.email);
   }
})