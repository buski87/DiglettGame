// controla el gameover
var i = 30;
var clock = setInterval(function() {
  if (i > 0) {
    console.log(i);
  } else {
    $( ".game-over" ).toggle();
    clearInterval(clock);
  }
  i--;
}, 1000);

// start con imagen 
    $( ".start" ).click(function() {
      $( ".start" ).toggle();
    });
    
    // controla el tiempo en el html 
    function Timer(duration, display) {
      var timer = duration, minutes, seconds;
      var interval = setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          display.text(minutes + ":" + seconds);
  
          if (--timer < 0) {
              timer = duration;
            clearInterval(interval);
          }
      }, 1000);
  }

  jQuery(function ($) {
      var Minute = 60 * 0.5,
          display = $('#timer');
      Timer(Minute, display);
  });
  