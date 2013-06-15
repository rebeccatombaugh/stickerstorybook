
function save_drag_points(self){
  var data = {
               top: $(self).css('top'),
               left: $(self).css('left'),
               classList: $(self).attr('class').split(/\s+/)
             }
  $.jStorage.set("mykey", data);
}

function load_the_data(){
  data = $.jStorage.get("mykey");

  if (data != undefined) {
    var div = $('<div><div class="draggable"></div></div>');

    $(data['classList']).each(function(index, value){
      div.addClass(value);
    });

    div.css('position', 'relative');
    div.css('left',     data['left']);
    div.css('top',      data['top']);

    $('.sticker_pen').append(div);
  }
}


$(document).ready(function() {

  load_the_data();

  $('.sticker').each(function() {
    var sticker_stack = $(this);
    
    var on_drag_stop = function(params) {      
      params.sticker.addClass('dropped');
      add_a_new_sticker_to_the_top_of_the_stack();
    };
    
    var add_a_new_sticker_to_the_top_of_the_stack = function() {
      
      var fresh_sticker = $(sticker_stack).find('.permanent').clone().removeClass('permanent').addClass('draggable');
      fresh_sticker.draggable({
        stop: function() {                    
          on_drag_stop({ sticker: fresh_sticker });
          save_drag_points(this);
        }
      });
      
      $(sticker_stack).append(fresh_sticker)    
    };
    
    $(this).find('.draggable').each(function() {
      var sticker = $(this);
      sticker.draggable({
      
        stop: function() {                    
          on_drag_stop({ sticker: sticker });
          save_drag_points(this)
        }
      });
    });
  });
  
  $('.landscape.menu .background').each(function() {
    var selected_background = $(this);
    
    $(this).click(function() {

      $('.chosen.landscape').attr('class', 'chosen landscape').addClass(selected_background.attr('class'));

    });
  });

});
