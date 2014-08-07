## Done
* noteDown and noteUp triggers sound to play and stop
* hasPedal controls whether noteOff is called when key is up
* handle keydown events to noteDown filtering out repeated keydown

## Design
* GuitarKeyboard connects user input to noteDown signal
  * controls pedal
  * tuning
* Sound connects noteDown to MIDI.noteDown
  * controls volume
