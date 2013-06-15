$(document).ready(function() {


  $('.sticker').each(function() {
    var sticker_stack = $(this);
    
    var make_a_new_sticker = function() {
      var fresh_sticker = $(sticker_stack).find('.permanent').clone().removeClass('permanent').addClass('draggable').draggable({
        stop: make_a_new_sticker
      }).css('position', '');
      $(sticker_stack).append(fresh_sticker)    
    };
    
    
    
    $(this).find('.draggable').draggable({
      stop: make_a_new_sticker  
    });
  });

});