
function save_the_data(self){
  var page = { items: [] }
  $('.dropped').each(function(){
    var self = $(this);
    var icon = self.parent().attr('data-icon');
    var class_list = self.attr('class').split(/\s+/);
    var data = {
                 top: self.css('top'),
                 left: self.css('left'),
                 icon: icon,
                 classList: class_list
               }
    page.items.push(data);
  });
  $.jStorage.set("mykey", page);
}

function load_the_data(){
  page = $.jStorage.get("mykey");
  if (page == null) page = { items: [] };
  $(page.items).each(function(index, value){
    var div = $('<div><div class="content"></div></div>');

    var the_special_class = '';
    $(value['classList']).each(function(index, value){
      div.addClass(value);
    });

    div.css('position', 'relative');
    div.css('left',     value['left']);
    div.css('top',      value['top']);

    $('.' + value['icon']).append(div);
  });
}

$(document).ready(function() {

  load_the_data();

  $('.sticker').each(function() {
    var sticker_stack = $(this);
    
    var on_drag_stop = function(params) {      
      params.sticker.addClass('dropped');
      add_a_new_sticker_to_the_top_of_the_stack();
      
      var clicking_is_disabled = true;
            
      $(params.sticker).unbind('click').click(function() {
        if(!clicking_is_disabled)
          $(this).toggleClass('selected');        
        else
          clicking_is_disabled = false;
      });      
    
    };
    
    var add_a_new_sticker_to_the_top_of_the_stack = function() {
      
      var fresh_sticker = $(sticker_stack).find('.permanent').clone().removeClass('permanent').addClass('draggable');
      fresh_sticker.draggable({
        stop: function() {                    
          on_drag_stop({ sticker: fresh_sticker });
          save_the_data(this);
        }
      });
      
      $(sticker_stack).append(fresh_sticker)    
    };
    
    $(this).find('.draggable').each(function() {
      var sticker = $(this);
      sticker.draggable({
      
        stop: function() {                    
          on_drag_stop({ sticker: sticker });
          save_the_data(this)
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
