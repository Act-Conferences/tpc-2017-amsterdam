/* 

  currently this file needed only because of make_uri.
  added: convenience conf_id

*/

var act = window.act = function() {
  var cache = {};
  return {
    conf_id: function() {
      var comps = location.pathname.split('/');
      return comps[1];
    },
    
    make_uri: function(conf_id, action, args) {
        var uri = [ '', conf_id, action ].join('/');
        if (args)
            for (var p in args)
                uri = uri + ';' + p + '=' + encodeURIComponent(args[p]);
        return uri;
    }, 
    
    // Simple JavaScript Templating
    // John Resig - http://ejohn.org/ - MIT Licensed
    template: function tmpl(str, data) {
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str)
             ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template generator
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
           
          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +
           
          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
           + "');}return p.join('');"
        );
      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    }
  };
}();
