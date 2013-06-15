
function save_drag_points(self){
  var items = [];
  $('.dropped').each(function(){
    var self = $(this);
    var class_list = self.attr('class').split(/\s+/);
    var data = {
                 top: self.css('top'),
                 left: self.css('left'),
                 classList: class_list
               }
    items.push(data);
  });
  console.log(items);
  $.jStorage.set("mykey", items);
}

function load_the_data(){
  items = $.jStorage.get("mykey");
  $(items).each(function(index, value){
    var div = $('<div><div class="draggable"></div></div>');

    $(value['classList']).each(function(index, value){
      div.addClass(value);
    });

    div.css('position', 'relative');
    div.css('left',     value['left']);
    div.css('top',      value['top']);

    $('.elephant').append(div);
  });

  //if (items != undefined) {
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
});
