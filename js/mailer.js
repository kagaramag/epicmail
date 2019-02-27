$(function(){
   var url = "data/emails.json";
   $.getJSON(url, function(data) {
      var mails = Object.values(data);
      var  $mailer = $('.mailer');
      $.map(mails, function(mail, i) {
         $mailer.append('<div class="onemail">'
         +'<div class="m_profile"><img src="http://via.placeholder.com/32x32.png?text=M" alt="Profile"></div>'
         +'<div class="m_sender truncate" onclick="readmail('+mail.id+');">'+mail.fullnames+'</div>'
         +'<div class="m_subject truncate" onclick="readmail('+mail.id+');">'+mail.subject+'</div>'
         +'<div class="m_time">'+formatDateTime(mail.created_at)+'</div>'
         +'<div class="m_action right-align">'
         +'<a href="#"><span class="fas fa-trash-alt" title="Delete"></span></a>'
         +'<a href="#"><span class="fas fa-undo-alt" title="Retract"></span></a>'
         +'<a href="#"><span class="fas fa-comment-alt" title="Instant Reply"></span></a>'
         +'</div>'
         +'<div class="clear"></div></div>');
     });      
   //    $.each(mails, function (i, mail) {
   //       $mailer.append('<div class="onemail">Email</div>');
   //   });
   })
})  

// format date
formatDateTime = (date) => {
   var months = [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]
   const d = date.split('/');
   return months[d[0]-1]+" "+d[1];
}

readmail = (id) => {
   window.location.href = 'read.html?id='+id;
}