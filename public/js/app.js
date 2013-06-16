
var page_id = "page1"

function save_the_data(){
  var page = { items: [], background_classes: [] }

  var class_list = $('.chosen.landscape').attr('class').split(/\s+/);
  $(class_list).each(function(index, value){
    page.background_classes.push(value);
  });

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
  $.jStorage.set(page_id, page);
}

function load_the_data(){
  page = $.jStorage.get(page_id);
  if (page == null) var page = { items: [], background_classes: [] };
 
  //$('.chosen.landscape').attr('class', 'chosen landscape').addClass(selected_background.attr('class'));
  $(page.background_classes).each(function(index, value){
    $('.chosen.landscape').addClass(value);
  });

  $(page.items).each(function(index, value){
    var div = $('<div><div class="content"></div></div>');

    var the_special_class = '';
    $(value['classList']).each(function(index, value){
      if (value != 'selected')
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

  $('.sticker_pen button').click(function() {
    var page_number = 0;
    var MAX_PAGE_NUMBER = 3;
    return function() {
      if($(this).hasClass('prev'))
        page_number--;
      else
        page_number++;
        
      if(page_number < 0)
        page_number = 0;
      else if(page_number > MAX_PAGE_NUMBER)
        page_number = MAX_PAGE_NUMBER
      
      var first_index = page_number * 6;
      var last_index = first_index + 5;
      
      $('.sticker_pen .sticker .permanent').hide();
      $('.sticker_pen .sticker .draggable').not('.dropped').hide();
      for(var i = first_index; i <= last_index; i++) {
        if(i == first_index && page_number != 0) {
          var pixels = 1 * -500;
          $('.sticker_pen .sticker').eq(i).css('margin-top', pixels + 'px');
        }
        
        $('.sticker_pen .sticker').eq(i).find('.permanent').show();
        $('.sticker_pen .sticker').eq(i).find('.draggable').show();
      }
        
    };
  }()).click();
  
  $('.sticker_pen').delegate('.dropped', 'click', function() {
    $(this).toggleClass('selected');                  
    $('.selected').not(this).removeClass('selected');
    
    if($('.selected').length > 0)
      $('.tools').show();
    else
      $('.tools').hide();
  });      

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
          save_the_data();
        }
      });
      
      $(sticker_stack).append(fresh_sticker)    
    };
    
    $(this).find('.draggable').each(function() {
      var sticker = $(this);
      sticker.draggable({
      
        stop: function() {                    
          on_drag_stop({ sticker: sticker });
          save_the_data()
        }
      });
    });
  });
  
  $('.landscape.menu .background').each(function() {
    var selected_background = $(this);
    
    $(this).click(function() {
      $('.chosen.landscape').attr('class', 'chosen landscape').addClass(selected_background.attr('class'));
      save_the_data();
    });
  });
  
  $('button.delete').click(function() {
    $('.selected.draggable').remove();
    save_the_data();
  });
  
  $('button.flip').click(function() {
    $('.selected.draggable').toggleClass('flipped');
    save_the_data();
  });

});
