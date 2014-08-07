
GuitarGui = {
  init: function(){
    this.computeDimensions();
      
    // TODO: handle resize

    this.paper = new Raphael(0, 10, this.width, this.height);

    this.draw();
  },

  computeDimensions: function(){
    this.width = Math.min($(window).width(), 600);
    this.height = this.width / 2.5;

    this.keyWidth = this.width / 10;
    this.keyHeight = this.height / 4;
  },

  draw: function(){
    this.drawKeys();
    // this.drawStrings(); // ISSUE: this blocks key drag
  },

  drawKeys: function(){
    for (var i = 0; i < 4; i++){
      for (var k = 0; k < 10; k++){
        var x = k * this.keyWidth;
        var y = i * this.keyHeight;

        if (k % 2) { var fill = '#e60';
        } else { var fill = '#e90'; }

        var key = this.paper
          .rect(x, y, this.keyWidth, this.keyHeight)
          .attr({fill: fill})
          .data('fill', fill)
          .data('row', i).data('column', k)
          .drag(move, start, up);

        var move = function(){}

        var start = function(){
          // NOTE: "this" is the key that calls start
          var data = {
            noteNumber: rowColumnToNoteNumber(this.data('row'), this.data('column'))
          };

          this.attr({fill: '#fb0'});

          $(window).trigger('noteDown', data);
        }

        var up = function(){
          var data = {
            noteNumber: rowColumnToNoteNumber(this.data('row'), this.data('column'))
          };

          this.attr({fill: this.data('fill')});

          // TODO: migrate to guitar keyboard
          if (false)
            $(window).trigger('noteUp', data);
        }
      }
    }
  },

  drawStrings: function(){
    for (var i = 0; i < 4; i++) {
      var command = 'M0 ';

      var y = (i + 0.5) * this.keyHeight;
      command += y;
      command += 'L' + this.width + ' ' + y;
      var path = this.paper.path(command);
      path.attr({
        'stroke': '#333',
        'stroke-width': '5',
      });
    }
  },
}

var rowColumnToNoteNumber = function(row, column) {
  var JUMP = 4;
  return 70 - row * JUMP + column;
}