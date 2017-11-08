$(document).ready(function(){

  var stream = {
    mp3: "http://player.vfmradio.ru/stream.ogg"
  },

  ready = false;

  $("#jplayer_1").jPlayer({
    ready: function (event) {
      ready = true;
      $(this).jPlayer("setMedia", stream);
      
    },
    pause: function() {
      $(this).jPlayer("clearMedia");
    },
    error: function(event) {
      if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
        // Setup the media stream again and play it.
        $(this).jPlayer("setMedia", stream).jPlayer("play");
      }
    },
    swfPath: "js",
    supplied: "mp3",
    preload: "none",
    wmode: "window",
    keyEnabled: true
  });


});


var oldartist = '1';
var url = 'http://player.vfmradio.ru/status-json.xsl'; // урл json
      function update_track_inline() {  // функция обновления текущего трека
        $.getJSON(url, function(data) {
          var key2 = data.title; // собираем
          $('#sg').attr('href', 'https://www.google.ru/search?q='  + key2); // поиск гугл
          $('#sn').attr('href', 'http://namba.kg/#!/search/mp3/'  + key2); // поиск намба
          $('title').text(key2); // меняем тайтл
          $.each(data, function(key, val) { // берем каждое поле из JSON-ответа
            switch (key) {  // смотрим ключ
              case 'title': { $('#nowtrack').children('#artist').html(val); break; } // артисту заполняем поле артиста
              case 'NAME': { $('#nowtrack').children('#title').html(val); break; }  // треку заполняем поле названия трека
              case 'image': { // а если картинка
                if(oldartist!=val) {  // если новая картинка отличается от прошлой
                  if(val=='false' || val=='null' || val.length<10) {
                    $('#imgcontent').animate({opacity: 0},500, function() { // плавно меняем прозрачность в 0
                      $(this).css("background-image", "none").animate({opacity: 1}, 1000);  // меняем фон на новую картинку и плавно ее показываем
                    });
                  }
                  else {
                    $('#imgcontent').animate({opacity: 0},500, function() { // плавно меняем прозрачность в 0
                      $(this).css("background-image", "url("+val+")").animate({opacity: 1}, 1000);  // меняем фон на новую картинку и плавно ее показываем
                    });
                  }
                  oldartist=val;  // запоминаем вставленную картинку, чтобы она не мерцала каждый раз при проверке трека
                console.log(val);
                }
                break;
              }
            }
          });
        });
console.log('update_track_inline');
      }
setInterval(update_track_inline, 5000); // обновляем
