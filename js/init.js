$(function(){
   const doc = new function() {
      this.height = $(document).height();
      this.width = $(document).width();
      // this.resizeHeight = function(){
      //    resize = $(window).bind("resize", function () {
      //       var w =  $(this).width();
      //       return w;
      //    });
      //    return resize;
      // }
   }
   $(window).bind("resize", function () {
         var w =  $(this).width();
         var h =  $(this).height();
         $(".mailerContent").css('width', (w-260)+"px");
         $(".sidebar").css('height', h+"px");
      });
   $(".sidebar").css('height', doc.height+"px");
   $(".mailerContent").css('width', (doc.width-260)+"px");
   // console.log(doc.resizeHeight());
});