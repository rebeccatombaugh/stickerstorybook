$(document).ready(function() {
  load_the_data();

  $('.sticker.draggable').draggable({
    stop: save_drag_points
  });
});
