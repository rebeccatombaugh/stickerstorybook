$(document).ready(function() {


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

  $('.sticker.draggable').draggable({
    stop: function() {
            var data = {
                         top: $(this).css('top'),
                         left: $(this).css('left'),
                         classList: $(this).attr('class').split(/\s+/)
                       }
            console.log(data);
            $.jStorage.set("mykey", data);
          }
  });




});
