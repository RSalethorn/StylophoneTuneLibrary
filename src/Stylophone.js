import outline from "./stylo-outline.svg";
import React from "react";
import "./Stylophone.css";
import Speaker from "./Speaker";
import highlight_1 from "./highlight-1.svg";
import highlight_1_5 from "./highlight-1.5.svg";
import highlight_2 from "./highlight-2.svg";
import highlight_3 from "./highlight-3.svg";
import highlight_3_5 from "./highlight-3.5.svg";
import highlight_4 from "./highlight-4.svg";
import highlight_4_5 from "./highlight-4.5.svg";
import highlight_5 from "./highlight-5.svg";
import highlight_6 from "./highlight-6.svg";
import highlight_6_5 from "./highlight-6.5.svg";
import highlight_7 from "./highlight-7.svg";
import highlight_7_5 from "./highlight-7.5.svg";
import highlight_8 from "./highlight-8.svg";
import highlight_8_5 from "./highlight-8.5.svg";
import highlight_9 from "./highlight-9.svg";
import highlight_10 from "./highlight-10.svg";
import highlight_10_5 from "./highlight-10.5.svg";
import highlight_11 from "./highlight-11.svg";
import highlight_11_5 from "./highlight-11.5.svg";
import highlight_12 from "./highlight-12.svg";

class Stylophone extends React.Component {
  constructor(props) {
    super(props);
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
          onClick={(e) => this.props.addNoteToSong(e)}
          onMouseEnter={(e) => this.onMouseEnterKey(e)}
          onMouseLeave={(e) => this.onMouseLeaveKey(e)}
        />
      );
    }
    return (
      <div className="stylo-container">
        <img className="outline" src={outline} />
        <div className="overlay">{highlights}</div>
        <Speaker />
      </div>
    );
  }

  onMouseEnterKey(e) {
    e.target.style.opacity = "33%";
  }

  onMouseLeaveKey(e) {
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
