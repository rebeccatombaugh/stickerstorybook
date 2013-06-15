$(document).ready(function() {

  $('.sticker.draggable').draggable({
    stop: function() {
            console.log($(this).position().top);
            console.log($(this).position().left);
          }
  });

});
