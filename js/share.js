var url = 'http://www.radiorecord.ru/xml/pirate_online_v3.txt'; // урл json
function share() {
	$.getJSON(url, function(data) {
	var sharetext = 'Cейчас в эфире: ' + data.ARTIST + '-' + data.NAME;
	var image2 =data.image;
	var url = 'http://likvidator22.besaba.com/pirate/';
	$('#fb').attr('href', 'http://www.facebook.com/sharer.php?s=100&p[title]='+ sharetext + '&p[summary]=Пиратская Станция&p[url]='+ url +'&p[images][0]=' + image2);
	$('#tw').attr('href', 'http://twitter.com/share?text=' + sharetext + '&url='+ url +'&counturl=' + url);
	$('#lj').attr('href', 'http://livejournal.com/update.bml?subject=' + sharetext + '&event=Пиратская Станция ' + url + '&transform=1');
	$('#ok').attr('href', 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1' + sharetext + '&st._surl=' + url);
	$('#vk').attr('href', 'http://vkontakte.ru/share.php?url=' + url +'&title=' + sharetext + '&description=Пиратская Станция&image=' + image2 + '&noparse=true');
});
}
console.log('share');
setInterval(share, 5000); // обновляем

document.onclick = function(e) {
var leftvar = (screen.width-626)/2;
var topvar = (screen.height-436)/2;
  e = e || event;
  var t = e.target || e.srcElement;
  while (t && t.nodeType == 1 && t.tagName.toLowerCase() != 'a')
     t = t.parentNode;

  if (t && t.nodeType == 1 && /\bpopup\b/.test(t.className)) {
    window.open(t.href,'displayWindow','width=626,height=436,left='+leftvar+',top='+topvar+',status=no,toolbar=no,menubar=no');
    return false;
  }
  return true;
}
