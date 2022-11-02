class Speaker {
  constructor() {
    this.keyFreq = {
      1: 220,
      "1_5": 233,
      2: 246,
      3: 130,
      "3_5": 138,
      4: 146,
      "4_5": 155,
      5: 164,
      6: 174,
      "6_5": 185,
      7: 196,
      "7_5": 208,
      8: 220,
      "8_5": 233,
      9: 246,
      10: 130,
      "10_5": 138,
      11: 146,
      "11_5": 155,
      12: 164,
    };

    this.initAudio = this.initAudio.bind(this);
    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);

    this.isPlaying = false;
    this.isInit = false;

    this.audContext = null;
    this.oscillator = null;
    this.audContext = null;
  }

  initAudio() {
    this.audContext = new AudioContext();
    this.gainNode = this.audContext.createGain();
    this.gainNode.value = 0.1;
    this.gainNode.connect(this.audContext.destination);

    this.isInit = true;
  }

  playNote(keyNo) {
    if (this.isInit === true && keyNo !== null && this.isPlaying === false) {
      console.log("Playing " + keyNo);
      this.oscillator = this.audContext.createOscillator();
      this.oscillator.type = "square";
      this.oscillator.frequency.value = this.keyFreq[keyNo];
      this.oscillator.connect(this.gainNode);
      this.oscillator.start();
      this.isPlaying = true;
    } else {
      console.log("Play called but failed if");
    }
  }

  stopNote() {
    if (this.isInit === true && this.isPlaying === true) {
      console.log("Stopping previous note");
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.isPlaying = false;
    } else {
      console.log("Stop called but failed if");
    }
  }
}

export default Speaker;
