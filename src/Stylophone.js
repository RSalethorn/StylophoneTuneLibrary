import outline from "./img/stylo-outline.svg";
import React from "react";
import "./Stylophone.css";
import Speaker from "./Speaker";
import highlight_1 from "./img/highlights/highlight-1.svg";
import highlight_1_5 from "./img/highlights/highlight-1.5.svg";
import highlight_2 from "./img/highlights/highlight-2.svg";
import highlight_3 from "./img/highlights/highlight-3.svg";
import highlight_3_5 from "./img/highlights/highlight-3.5.svg";
import highlight_4 from "./img/highlights/highlight-4.svg";
import highlight_4_5 from "./img/highlights/highlight-4.5.svg";
import highlight_5 from "./img/highlights/highlight-5.svg";
import highlight_6 from "./img/highlights/highlight-6.svg";
import highlight_6_5 from "./img/highlights/highlight-6.5.svg";
import highlight_7 from "./img/highlights/highlight-7.svg";
import highlight_7_5 from "./img/highlights/highlight-7.5.svg";
import highlight_8 from "./img/highlights/highlight-8.svg";
import highlight_8_5 from "./img/highlights/highlight-8.5.svg";
import highlight_9 from "./img/highlights/highlight-9.svg";
import highlight_10 from "./img/highlights/highlight-10.svg";
import highlight_10_5 from "./img/highlights/highlight-10.5.svg";
import highlight_11 from "./img/highlights/highlight-11.svg";
import highlight_11_5 from "./img/highlights/highlight-11.5.svg";
import highlight_12 from "./img/highlights/highlight-12.svg";

class Stylophone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //recordNotes:
      recordNotes: false,
      mouseDown: false,
      currentKeyNo: null,
      noteLength: null,
      beatLength: 350,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.onMouseEnterKey = this.onMouseEnterKey.bind(this);
    this.onMouseLeaveKey = this.onMouseLeaveKey.bind(this);

    this.incrementNoteLength = this.incrementNoteLength.bind(this);

    this.speaker = new Speaker();
    this.noteLengthTimer = null;
  }
  render() {
    let highlightData = {
      1: { keyNo: "1", img: highlight_1 },
      2: { keyNo: "1_5", img: highlight_1_5 },
      3: { keyNo: "2", img: highlight_2 },
      4: { keyNo: "3", img: highlight_3 },
      5: { keyNo: "3_5", img: highlight_3_5 },
      6: { keyNo: "4", img: highlight_4 },
      7: { keyNo: "4_5", img: highlight_4_5 },
      8: { keyNo: "5", img: highlight_5 },
      9: { keyNo: "6", img: highlight_6 },
      10: { keyNo: "6_5", img: highlight_6_5 },
      11: { keyNo: "7", img: highlight_7 },
      12: { keyNo: "7_5", img: highlight_7_5 },
      13: { keyNo: "8", img: highlight_8 },
      14: { keyNo: "8_5", img: highlight_8_5 },
      15: { keyNo: "9", img: highlight_9 },
      16: { keyNo: "10", img: highlight_10 },
      17: { keyNo: "10_5", img: highlight_10_5 },
      18: { keyNo: "11", img: highlight_11 },
      19: { keyNo: "11_5", img: highlight_11_5 },
      20: { keyNo: "12", img: highlight_12 },
    };
    let highlights = [];
    for (let n = 1; n <= 20; n++) {
      highlights.push(
        <img
          key={highlightData[n]["keyNo"]}
          src={highlightData[n]["img"]}
          className={"key key-" + highlightData[n]["keyNo"]}
          draggable={"false"}
          onMouseDown={(e) => this.onMouseDown(e)}
          onMouseUp={(e) => this.onMouseUp(e)}
          onMouseEnter={(e) => this.onMouseEnterKey(e)}
          onMouseLeave={(e) => this.onMouseLeaveKey(e)}
        />
      );
    }
    return (
      <div className="stylo-container">
        <img className={"outline"} src={outline} />
        <div className={"overlay"}>{highlights}</div>
        <div onClick={this.speaker.initAudio}>Click to activate audio</div>
      </div>
    );
  }

  incrementNoteLength() {
    let noteLength = this.state.noteLength;
    noteLength++;
    this.setState({ noteLength: noteLength });
    if (noteLength < 4) {
      this.props.incrementNoteLength();
      this.noteLengthTimer = setTimeout(
        this.incrementNoteLength,
        this.state.beatLength
      );
    }
  }

  onMouseDown(e) {
    this.setState({ mouseDown: true });

    let keyNo = this.props.addNoteToSong(e, this.state.noteLength);

    this.noteLengthTimer = setTimeout(
      this.incrementNoteLength,
      this.state.beatLength
    );

    this.setState({
      currentKeyNo: keyNo,
      mouseDown: true,
    });

    this.speaker.playNote(keyNo);
  }

  onMouseUp(e) {
    this.setState({ mouseDown: false });
    this.setState({ currentKeyNo: null });
    this.setState({ noteLength: 0 });
    if (this.noteLengthTimer !== null) {
      clearTimeout(this.noteLengthTimer);
    }
    this.speaker.stopNote();
  }

  onMouseEnterKey(e) {
    if (this.state.mouseDown === true) {
      let keyNo = this.props.addNoteToSong(e, this.state.noteLength);
      this.setState({ currentKeyNo: keyNo });
      this.speaker.playNote(keyNo);
    }
    e.target.style.opacity = "33%";
  }

  onMouseLeaveKey(e) {
    this.speaker.stopNote();

    this.setState({ noteLength: null });
    if (this.noteLengthTimer !== null) {
      clearTimeout(this.noteLengthTimer);
    }
    e.target.style.opacity = "0%";
  }
}

export default Stylophone;

/*

                    <img className='key key-1' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <img className='key key-2' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <img className='key key-3' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <img className='key key-4' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <img className='key key-5' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <img className='key key-6' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <img className='key key-7' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <div className='key key-8' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <div className='key key-9' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <div className='key key-10' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <div className='key key-11' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
                    <div className='key key-12' onClick={(e) => this.onClickKey(e)} onMouseEnter={(e) => this.onMouseEnterKey(e)} onMouseLeave={(e) => this.onMouseLeaveKey(e)} ></div>
*/
