function initHeat(opts) {

  var heat = {};

  var data = data || [],
      legislators = [],
      votes = [];

  // Set defaults

  var options = _.extend({
    year: 1990,
    mapEl: '#heatmap-wrap',
    loadingEl: '#loading'
  }, opts);

  options.vote_key = _.extend({
  }, opts.vote_key);

  options.colors = _.extend({
  }, opts.colors);

  options.size = _.extend({
    dotsize: 4,
    gutsize: 1
  }, opts.size);

  // get or set data
  heat.data = function(new_data) {
    if (!new_data) {
      return data;
    } else {
      data = new_data;
    }
  }
  // get or set options
  heat.options = function(opts) {
    if (!opts) {
      return options;
    } else {
      options = _.extend(options, opts);
    }
  }
  
  //Init options in dom
  _.each(options.colors, function(c, k) {
    if (k == "null" || k == "undefined") {
      $('.color5').css({"color":c});
    } else {
      $('.color'+k).css({"color":c});
    } 
  }); 

  heat.draw = function() {
    $('#heatmap').attr('height', data.length*options.size.dotsize+options.size.gutsize);
    $('#heatmap').attr('width', data[0].length*options.size.dotsize+options.size.gutsize);

    var b = heatmap('heatmap', data, {
      colorize: function(val) {
        return options.colors[val];
      },
      dotsize: options.size.dotsize,
      gutsize: options.size.gutsize
    });

    b.render();
    $(options.loadingEl).hide();
    $(options.mapEl).fadeIn();

    b.canvas.onmousemove = function(e) {
      var pos = indices(options.size.dotsize+options.size.gutsize, e);
      var val = lookup(pos, data);
      heat.move(pos.i, pos.j, val);
    };

    b.canvas.onclick = function(e) {
      var pos = indices(options.size.dotsize+options.size.gutsize, e);
      var val = lookup(pos, data);
      heat.click(pos.i, pos.j, val);
    };
  };

  heat.move = function(row, col, val) { };
  heat.click = function(row, col, val) { };

  return heat;
};
