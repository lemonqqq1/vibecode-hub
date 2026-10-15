
(function(){
  var n = 4, parts = [], done = 0;
  function tryFinish(){
    if(done < n) return;
    var bin = Uint8Array.from(atob(parts.join('')), function(c){return c.charCodeAt(0)});
    var text = new TextDecoder('utf-8').decode(bin);
    document.body.insertAdjacentHTML('afterbegin', text);
    var s = document.createElement('script');
    s.src = 'app.js';
    document.body.appendChild(s);
  }
  for(var i=0;i<n;i++){
    (function(i){
      fetch('c'+i+'.b64').then(function(r){return r.text()}).then(function(t){
        parts[i] = t.trim();
        done++;
        tryFinish();
      });
    })(i);
  }
})();
