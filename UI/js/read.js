$(function(){
   // extract email id
   var path = window.location.href;
   var id = parseInt(path.substring(path.lastIndexOf('=') + 1));

   var url = "data/emails.json";
   $.getJSON(url, function(data) {
      var mails = Object.values(data);
      var  $readMail = $('#readMail');
      $.map(mails, function(mail, i) {
         if(mail.id == id){
            $readMail.html('<h1 class="nm l-v-padding">'+mail.subject+'</h1>'
            +'<b>'+mail.fullnames+'</b> &#60;'+mail.sender+'&#62;<br>'
            +'<span class="grey-text">'+formatDateTime(mail.created_at)+'</span>'
            +'<div class="divider m-v-margin grey"></div>'
            +'<div class="xl-v-margin">'+mail.subject+' '+mail.subject+'</div><br>'
            +'<div class="xl-v-margin"><a href="#"  onclick="openReplyBox();" class="btn bold indigo text-white xl-h-padding radius-5">Reply</a> <a href="#" onclick="fxToBuild();" class="btn grey text-indigo text-darken-3 xl-h-padding radius-5">Delete</a></div>'
            );
         }
      })

      
   })
})  

// format date
formatDateTime = (date) => {
   var months = [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]
   const d = date.split('/');
   return months[d[0]-1]+" "+d[1];
}
