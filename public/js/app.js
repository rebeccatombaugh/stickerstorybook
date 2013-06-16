
  
$(document).ready(function(){
  $('.sticker_pen').delegate('.dropped', 'click', function() {
    $(this).toggleClass('selected');                  
    $('.selected').not(this).removeClass('selected');
    
    if($('.selected').length > 0) {
      
      var content_height = parseInt($(this).find('.content').css('height'), 10);
      $(this).css('height', (content_height + 20) + 'px');
      
      $('.tools').show();
    }
    else
      $('.tools').hide();
  });      
});

var page_id = "1"

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
  $('.chosen.landscape').attr('class', 'chosen landscape');
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

function getImgSize(imgSrc, fn) {
    var newImg = new Image();

    newImg.onload = function() {
      var height = newImg.height;
      var width = newImg.width;
      fn(width, height);
    }

    newImg.src = imgSrc; // this must be done AFTER setting onload
}

$(document).ready(function() {
  setup_the_page();
});

function setup_the_page(){
  $('.dropped').remove();
  load_the_data();

  $('#the_landscape').click(function(){
    $('.selected').click();
  });

  var sticker_count = $('.sticker').length;
  var size_adjustments_completed = 0;

  $('.sticker').each(function() {
    var adjustable_content = $(this).find('.content');
    var src = adjustable_content.css('background-image').replace('url(', '').replace(')', '');
    
    getImgSize(src, function(width, height) {
      var sized_width = parseInt($(adjustable_content).css('width'), 10);
      var sized_height = (sized_width / (width / height)) + 'px';
      adjustable_content.css('height', sized_height);
      adjustable_content.parent().css('height', sized_height);
      adjustable_content.parent().parent().css('height', sized_height); 
      
      size_adjustments_completed++;
      if(size_adjustments_completed == sticker_count) {
        calculate_pages();
        show_page(0);
      }     
    });
  });
  
  
  var calculate_pages = function() {
    var current_page = 0;
    var total_height_on_this_page = 0;
    var total_height_on_previous_pages = 0;
    $('.sticker_pen .sticker').each(function() {

      var sticker = $(this);
      
      if(total_height_on_this_page == 0) {
        $(sticker).data('topmargin', ((-1 * total_height_on_previous_pages) + 40) + 'px');
        $(sticker).addClass('first_on_page');
      }
      
      $(sticker).addClass('page_' + current_page) 
      
      var height = parseInt($(sticker).css('height'), 10);
      total_height_on_this_page += height;
      if((total_height_on_this_page + height) > 450) {  
        total_height_on_previous_pages += total_height_on_this_page;
        total_height_on_this_page = 0;
        current_page++;
      }
    });        
  };
  
  
  var next_index = 0;
 
  var show_page = function() {
    return function(page_number) {      
      $('.sticker_pen .sticker').css('margin-top', '');
      $('.sticker_pen .sticker .permanent').hide();
      $('.sticker_pen .sticker .draggable').not('.dropped').hide();      
      
      $('.sticker_pen .sticker.page_' + page_number + '.first_on_page').css('margin-top', $('.sticker_pen .sticker.page_' + page_number + '.first_on_page').data('topmargin')).show();
      $('.sticker_pen .sticker.page_' + page_number + ' .permanent').show();
      $('.sticker_pen .sticker.page_' + page_number + ' .draggable').not('.dropped').show();      

    }
  }();
  
  $('.sticker_pen button').click(function() {
    var current_page = 0;
    
    return function() {
      if($(this).hasClass('next')) {        
        var prospective_page = current_page + 1;
      } else {
        var prospective_page = current_page - 1;
      }
      
      if($('.sticker_pen .sticker.page_' + prospective_page).length > 0) {
        current_page = prospective_page;
        show_page(current_page);
      }
    };
  }());
  
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

    $(this).toggleClass('selected');                  
    $('.selected').not(this).removeClass('selected');
    
    if($('.selected').length > 0)
      $('.tools').show();
    else
      $('.tools').hide();

    save_the_data();
  });
  
  $('button.flip').click(function() {
    $('.selected.draggable').toggleClass('flipped');
    save_the_data();
  });

  $('button.grow, button.shrink').click(function() {
    var sizes = [0, .4, .6, .8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 4];
    
    return function() {
      var current_size_index = parseInt($('.selected').data('current_size'), 10) || 3;
      var previous_size_index = current_size_index;
      

      
      $('.selected').removeClass('smallest small medium big biggest');
      if($(this).hasClass('grow')) {
        if((current_size_index + 1) > (sizes.length - 1))
          return;        
        else
          current_size_index++;
        
      } else {
        if((current_size_index - 1) < 1) 
          return;
        else
          current_size_index--;
      }
   
      var current_width = parseInt($('.selected .content').css('width'), 10);
      var current_height = parseInt($('.selected .content').css('height'), 10);
      var new_width = current_width * sizes[current_size_index] / sizes[previous_size_index];
      var new_height = current_height * sizes[current_size_index] / sizes[previous_size_index];
      $('.selected .content').css({
        width: new_width + 'px',
        height: new_height + 'px'
      });
      $('.selected').css({
        width: (new_width + 20) + 'px',
        height: (new_height + 20) + 'px'
      });
      
      $('.selected').data('current_size', current_size_index + '');
      save_the_data();
    }
  }());
}

$(document).ready(function(){
  $('.previous_page').click(function(){
    page_id = parseInt(page_id, 10) - 1 + '';
    console.log(page_id);
    setup_the_page();
  });
  $('.next_page').click(function(){
    page_id = parseInt(page_id, 10) + 1 + '';
    console.log(page_id);
    setup_the_page();
  });
});
