

GuitarKeyboard = {
  init: function(){
    this.setTuning([67, 64, 60, 56]);
    this.setHasPedal(true);

    this.handleNoteKeys();
    // this.handleTuningKeys();

  },

  handleNoteKeys: function(){
    var self = this;
    var downKeys = {};

    $(window).on('focus.GuitarKeyboard', function(){ downKeys = {} });

    $(window).on('keydown.GuitarKeyboard', function(evt){
      var keyCode = self.fixKeyCode(evt.which);
      var noteNumber = self.getNoteNumber(keyCode);

      if (typeof noteNumber === 'number'){
        if (!downKeys[noteNumber]) {
          data = {noteNumber: noteNumber};
          $(window).trigger('noteDown', data);
          downKeys[noteNumber] = data;
        }
      }
    });

    $(window).on('keyup.GuitarKeyboard', function(evt){
      var keyCode = self.fixKeyCode(evt.which);
      var noteNumber = self.getNoteNumber(keyCode);

      if (typeof noteNumber === 'number'){
        if (!self.getHasPedal()) {
          $(window).trigger('noteUp', {noteNumber: noteNumber});
        }
        delete downKeys[noteNumber];
      }
    });
  },

  handleRepeat: function() {

  },

  getNoteNumber: function(keyCode){
    return this.keyCodeToNoteNumber[keyCode];
  },

  _updateKeyCodeToNoteNumber: function() {
    var self = this;
    this.keyCodeToNoteNumber = {};

    // keycodes is defined below as a matrix
    keyCodes.forEach(function(codes, stringIdx) {
      var stringStart = self.tuning[stringIdx]; 
      codes.forEach(function(code, fretIdx) {
        self.keyCodeToNoteNumber[code] = stringStart + fretIdx;
      });
    });
  },

  setTuning: function(tuning){
    this.tuning = tuning;
    this._updateKeyCodeToNoteNumber();
  },

  getTuning: function(){
    return this.tuning;
  },

  getHasPedal: function(){
    return this.hasPedal;
  },

  setHasPedal: function(arg) {
    this.hasPedal = arg;
  },

  fixKeyCode: function(keyCode) {
    // firefox incompatibility
    if (keyCode === 59) {
      keyCode = 186;
    } else if (keyCode === 61) {
      keyCode = 187;
    } else if (keyCode === 173) {
      keyCode = 189;
    }

    return keyCode
  }
}

var keyCodes = [];

keyCodes.push([
  192,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  48,
  189,
  187,
]);

keyCodes.push([
  81,
  87,
  69,
  82,
  84,
  89,
  85,
  73,
  79,
  80,
  219,
  221,
]);

keyCodes.push([
  65,
  83,
  68,
  70,
  71,
  72,
  74,
  75,
  76,
  186,
  222,
]);

keyCodes.push([
  90,
  88,
  67,
  86,
  66,
  78,
  77,
  188,
  190,
  191,
]);
