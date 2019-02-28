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
   $('.sidebar').append('<li><div class="center-align"><img src="images/logo.svg" style="width:98%;max-width:200px" alt="EPICMAIL"></div></li>'
   // +'<li class="center-align "><a class="btn-compose white radius-5" href="#"><span class="fas fa-plus"></span> Compose</a></li>'
   +'<li><div class="divider indigo darken-2"></div></li>'
   +'<li><a class="text-grey" href="inbox.html"> <span class="fas fa-inbox"></span> Inbox</a></li>'
   +'<li><a class="text-grey" href="sent.html"> <span class="fas fa-location-arrow"></span> Sent</a></li>'
   +'<li><a class="text-grey" href="draft.html"> <span class="fas fa-sticky-note"></span> Drafts</a></li>'
   +'<li><div class="divider indigo darken-2"></div></li>'
   +'<li><a class="text-grey" href="users.html"> <span class="fas fa-user-friends"></span> Users</a></li>'
   +'<li><a class="text-grey" href="groups.html"> <span class="fas fa-users"></span> Groups</a></li>'
   +'<li><div class="divider indigo darken-2"></div></li>'
   +'<li><a class="text-grey" href="me.html"> <span class="fas fa-user"></span> Profile</a></li>'
   +'<li><a class="text-grey" href="#"> <span class="fas fa-sign-out-alt"></span> Logout</a></li>'
   )

   // footer nav
   $('.footer').append('<div><a href="inbox.html"><span class="fas fa-inbox"></span></a></div>'
   +'<div><a href="sent.html"><span class="fas fa-location-arrow"></span></a></div>'
   +'<div><a href="draft.html"><span class="fas fa-sticky-note"></span></a></div>'
   +'<div><a href="me.html"><span class="fas fa-bars"></span></a></div>'
   )

});

// pop message if it is function to be build later
fxToBuild = () => {
   confirm("This function will be build upon functionality! Check back soon");
}
// Open Reply Box, Form
openReplyBox = () => {
   $("#openReplyBox").show();
}