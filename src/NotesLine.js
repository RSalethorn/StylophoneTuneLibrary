import React from "react";
import "./NotesLine.css";
import note from "./note.svg";
import minim from "./minim.svg";
import three_note from "./three_note.svg";
import semibreve from "./semibreve.svg";

class NotesLine extends React.Component {
  constructor(props) {
    super(props);
    this.noteImageNos = {
      1: {
        ref: note,
      },
      2: {
        ref: minim,
      },
      3: {
        ref: three_note,
      },
      4: {
        ref: semibreve,
      },
    };
  }

  render() {
    let noteElems = [];
    let noteLabels = [];
    for (let n = 0; n < this.props.notes.length; n++) {
      let noteNo = this.props.noOfPrevNotes + n;
      noteElems.push(
        <img
          key={n}
          className={
            "note noteNo-" +
            noteNo +
            " note-" +
            this.props.notes[n].keyNo +
            " beat-" +
            (n + 1)
          }
          src={this.noteImageNos[this.props.notes[n].noteLength].ref}
        />
      );
      noteLabels.push(
        <div
          key={n}
          className={"noteLabel noteNo-" + noteNo + " beat-" + (n + 1)}
          onClick={(e) => this.props.removeNoteFromSong(e)}
        >
          {this.props.notes[n].keyNo}
        </div>
      );
    }

    let beatSelectors = [];
    for (let n = 0; n < 12; n++) {
      let beatNo = this.props.noOfPrevNotes + n;

      let beatSelected = "";
      if (this.props.selectedBeat == beatNo) {
        beatSelected = "selected";
      } else if (
        this.props.isGroupSelect === false &&
        this.props.hoverNo == beatNo
      ) {
        beatSelected = "hovered";
      }

      let beatGroupSelected = "";

      if (
        this.props.startGroupSelectedBeat !== null &&
        this.props.endGroupSelectedBeat !== null &&
        beatNo >= this.props.startGroupSelectedBeat &&
        beatNo <= this.props.endGroupSelectedBeat
      ) {
        beatGroupSelected = "groupSelected";
      } else if (
        this.props.startGroupSelectedBeat !== null &&
        this.props.isGroupSelect === true &&
        ((beatNo >= this.props.startGroupSelectedBeat &&
          beatNo <= this.props.hoverNo) ||
          (beatNo <= this.props.startGroupSelectedBeat &&
            beatNo >= this.props.hoverNo))
      ) {
        beatGroupSelected = "groupHovered";
      }
      beatSelectors.push(
        <div
          key={n}
          className={
            "beatSelector beatNo-" +
            beatNo +
            " beatSelector-" +
            (n + 1) +
            " " +
            beatGroupSelected
          }
          onClick={(e) => this.props.selectBeat(e)}
          onMouseEnter={(e) => this.props.onSelectorHoverEnter(e)}
          onMouseLeave={(e) => this.props.onSelectorHoverLeave(e)}
          onMouseDown={(e) => this.props.onGroupSelectStart(e)}
          onMouseUp={(e) => this.props.onGroupSelectEnd(e)}
        >
          <div
            className={
              "selectorMarker selectorMarker-" + (n + 1) + " " + beatSelected
            }
          ></div>
        </div>
      );
    }
    return (
      <li className="noteLine">
        <div className="stave stave-1"></div>
        <div className="stave stave-2"></div>
        <div className="stave stave-3"></div>
        <div className="stave stave-4"></div>
        <div className="stave stave-5"></div>
        {noteElems}
        <div className="labels-container">{noteLabels}</div>
        <div className="beatSelector-container">{beatSelectors}</div>
      </li>
    );
  }
}

export default NotesLine;
