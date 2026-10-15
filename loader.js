(function(){
  var n = 5, parts = [], done = 0;
  function tryFinish(){
    if(done < n) return;
    document.body.insertAdjacentHTML('afterbegin', parts.join(''));
    var s = document.createElement('script');
    s.src = 'app.js';
    document.body.appendChild(s);
  }
  for(var i = 0; i < n; i++){
    (function(i){
      fetch('part' + i + '.html').then(function(r){ return r.text(); }).then(function(t){
        parts[i] = t;
        done++;
        tryFinish();
      }).catch(function(e){ console.error(e); });
    })(i);
  }
})();
