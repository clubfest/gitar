
GuitarDrawer = {
  init: function(){
    this.computeDimensions();
      
    // TODO: handle resize

    this.paper = new Raphael(0, 0, this.width, this.height);
    this.draw();
    // TODO: interact
  },

  computeDimensions: function(){
    this.width = $(window).width();
    this.height = $(window).height();

    this.keyWidth = this.width / 12;
    this.keyHeight = this.height / 4;
  },

  draw: function(){
    this.drawStrings();
    this.drawKeys();
  },

  drawStrings: function(){

  },

  drawKeys: function(){
    for (var i = 0; i < 4; i++){
      for (var k = 0; k < 12; k++){
        var x = k * this.keyWidth;
        var y = i * this.keyHeight;
        this.paper.rect(x, y, this.keyWidth, this.keyHeight);
      }
    }
  },
}