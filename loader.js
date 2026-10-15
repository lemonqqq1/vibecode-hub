(function(){
  var n = 9, parts = [], done = 0;
  function tryFinish(){
    if(done < n) return;
    document.body.insertAdjacentHTML('afterbegin', parts.join(''));
    var s = document.createElement('script');
    s.src = 'app.js';
    document.body.appendChild(s);
  }
  for(var i = 0; i < n; i++){
    (function(i){
      fetch('frag' + i + '.html').then(function(r){ return r.text(); }).then(function(t){
        parts[i] = t;
        done++;
        tryFinish();
      }).catch(function(e){ console.error('frag'+i, e); });
    })(i);
  }
})();
