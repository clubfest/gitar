
GuitarDrawer = {
  init: function(){
    this.computeDimensions();
      
    // TODO: handle resize

    this.paper = new Raphael(0, 10, this.width, this.height);
    this.draw();
    // TODO: interact
  },

  computeDimensions: function(){
    this.width = Math.min($(window).width(), 600);
    this.height = this.width / 2.5;

    this.keyWidth = this.width / 10;
    this.keyHeight = this.height / 4;
  },

  draw: function(){
    this.drawKeys();
    this.drawStrings();
  },

  drawStrings: function(){
    for (var i = 0; i < 4; i++) {
      var command = 'M0 ';

      var y = (i + 0.5) * this.keyHeight;
      command += y;
      command += 'L' + this.width + ' ' + y;
      var path = this.paper.path(command);
      path.attr({
        stroke: '#333',
        'stroke-width': '5',
      });
    }
  },

  drawKeys: function(){
    for (var i = 0; i < 4; i++){
      for (var k = 0; k < 10; k++){
        var x = k * this.keyWidth;
        var y = i * this.keyHeight;
        // if (k % 2) {
          var attr = {fill: '#e80'}
        // } else {
          // var attr = {fill: '#e90'}
        // }
        var key = this.paper
          .rect(x, y, this.keyWidth, this.keyHeight)
          .attr(attr)
          .drag(move, start, up);

        var move = function(){

        }
        var start = function(){
          this.attr({fill: '#fa0'});
          MIDI.noteOn(0, 60, 100);
        }
        var up = function(){
          this.attr({fill: '#e80'});
          MIDI.noteOff(0, 60);
        }
      }
    }
  },
}