import React from "react";

class Speaker extends React.Component {
  constructor(props) {
    super(props);

    this.initAudio = this.initAudio.bind(this);
    this.state = {
      audContext: null,
      oscillator: null,
      gainNode: null,
    };
  }

  initAudio() {
    let audContext = new AudioContext();
    let oscillator = audContext.createOscillator();
    oscillator.type = "square";
    let gainNode = audContext.createGain();
    gainNode.value = 0.25;
    oscillator.connect(gainNode);
    gainNode.connect(audContext.destination);
    //oscillator.start(0);
    this.setState({
      audContext: audContext,
      oscillator: oscillator,
      gainNode: gainNode,
    });
  }
  render() {
    return (
      <div onClick={this.initAudio}>
        Current Note: {this.props.currentKeyNo}
      </div>
    );
  }
}

export default Speaker;
