$(document).ready(function(){

   
   // check document height
   const doc = new function() {
      this.height = $(document).height();
      this.resize = function(){
         $(window).on('resize',function() {
            var h = $(document).height();
            $(".sidebar").css('height', h+"px");
         })
      }
   };

   $(".sidebar").css('height', doc.height+"px");
   doc.resize();
   // console.log(doc.resize());
   

   // sidebar nav
   $('.sidebar').append('<li><div class="center-align"><a href="./inbox.html"><img src="images/logo.svg" style="width:98%;max-width:200px" alt="EPICMAIL"></a></div></li>'
   // +'<li class="center-align "><a class="btn-compose white radius-5" href="#"><span class="fas fa-plus"></span> Compose</a></li>'
   +'<li><div class="divider indigo darken-2"></div></li>'
   +'<li><a class="text-grey" href="inbox.html"> <span class="fas fa-inbox"></span> <span class="menulink">Inbox</a></span></li>'
   +'<li><a class="text-grey" href="sent.html"> <span class="fas fa-location-arrow"></span> <span class="menulink"> Sent</span></a></li>'
   +'<li><a class="text-grey" href="draft.html"> <span class="fas fa-sticky-note"></span> <span class="menulink"> Drafts</a></span></li>'
   +'<li><div class="divider indigo darken-2"></div></li>'
   +'<li><a class="text-grey" href="users.html"> <span class="fas fa-user-friends"></span> <span class="menulink"> Users</span></a></li>'
   +'<li><a class="text-grey" href="groups.html"> <span class="fas fa-users"></span> <span class="menulink"> Groups</span></a></li>'
   +'<li><div class="divider indigo darken-2"></div></li>'
   +'<li><a class="text-grey" href="me.html"> <span class="fas fa-user"></span> <span class="menulink"> Profile</span></a></li>'
   +'<li class="logout"><a class="text-grey" href="#" onclick="logout();"> <span class="fas fa-sign-out-alt"></span> <span class="menulink"> Logout</span></a></li>'
   )

   // footer nav
   $('.footer').append('<div><a href="inbox.html"><span class="fas fa-inbox"></span></a></div>'
   +'<div><a href="sent.html"><span class="fas fa-location-arrow"></span></a></div>'
   +'<div><a href="draft.html"><span class="fas fa-sticky-note"></span></a></div>'
   +'<div><a href="me.html"><span class="fas fa-bars"></span></a></div>'
   )
   $('.apploader').append('<img src="images/app_anim_1.svg" alt="EPICMAIL"><img src="images/app_anim_2.svg" alt="EPICMAIL"><img src="images/app_anim_3.svg" alt="EPICMAIL">');
});

// pop message if it is function to be build later
fxToBuild = () => {
   confirm("This function will be build upon functionality! Check back soon");
}
// Open Reply Box, Form
openReplyBox = () => {
   $("#openReplyBox").show();
}


// logout
logout = () => {
   localStorage.removeItem('auth');
   message("You are logout successfully, see you later!",'success');
   setTimeout(() => {
      window.location.href = 'login.html';
   }, 1500);
}
// message
message = (message,state) => {
   $(".message").hide();
   $('body').prepend("<div class='message "+state+"'>"+message+"</div>");
   setTimeout(() => {
      $(".message").fadeOut();
   }, 4000);
}