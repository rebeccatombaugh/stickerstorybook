$(document).ready(function() {

  $('.sticker.draggable').draggable({
    stop: function() {
            var data = {
                         top: $(this).position().top,
                         left: $(this).position().left,
                         classList: $(this).attr('class').split(/\s+/)
                       }
            //$.jStorage.set("mykey", "keyvalue");
            console.log(data);
          }
  });

});
