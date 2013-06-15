$(document).ready(function() {


  $('.sticker').each(function() {
    var sticker_stack = $(this);
    
    var add_a_new_sticker_to_the_top_of_the_stack = function() {
      
      var fresh_sticker = $(sticker_stack).find('.permanent').clone().removeClass('permanent').addClass('draggable');
      fresh_sticker.draggable({
        stop: add_a_new_sticker_to_the_top_of_the_stack
      });
      
      $(sticker_stack).append(fresh_sticker)    
    };
    
    $(this).find('.draggable').draggable({
      stop: add_a_new_sticker_to_the_top_of_the_stack  
    });
  });

});