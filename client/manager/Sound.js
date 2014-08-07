/*
 * adjust volume
 * controlled externally by triggering noteDown and noteUp
 */
Sound = {
  init: function(){
    var self = this;

    this.destroy();
    this.setVolume(80);

    $(window).on('noteDown.sound', function(evt, data){
      MIDI.noteOn(0, data.noteNumber, self.getVolume());
    });

    $(window).on('noteUp.sound', function(evt, data){
      MIDI.noteOff(0, data.noteNumber);
    });
  },

  destroy: function() {
    $(window).off('noteDown.sound');
    $(window).off('noteUp.sound');
  },

  getVolume: function() {
    return this.volume;
  },

  setVolume: function(arg) {
    this.volume = arg;
  }
}
    