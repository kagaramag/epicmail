
$("#register").validate({
      rules: {
            password: "required",
            password2: {
            equalTo: "#password"
      },
      submitHandler: function(form) {
            alert();
            form.submit();
      }
   }
});