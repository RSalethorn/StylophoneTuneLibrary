import React from "react";
import "./App.css";
import Stylophone from "./Stylophone";
import NotesPage from "./NotesPage";
import NotesLine from "./NotesLine";
import ErrorBoundary from "./ErrorBoundary";

class TuneCreator extends React.Component {
  constructor(props) {
    super(props);

    this.addNoteToSong = this.addNoteToSong.bind(this);
    this.removeNoteFromSong = this.removeNoteFromSong.bind(this);
    this.incrementNoteLength = this.incrementNoteLength.bind(this);

    this.selectBeat = this.selectBeat.bind(this);

    this.onGroupSelectStart = this.onGroupSelectStart.bind(this);
    this.onGroupSelectEnd = this.onGroupSelectEnd.bind(this);

    this.state = {
      song: [],
      selectedBeat: null,
      isGroupSelect: false,
      startGroupSelectedBeat: null,
      endGroupSelectedBeat: null,
    };
  }
  render() {
    return (
      <div className="tunecreator-container">
        <ErrorBoundary>
          <Stylophone
            addNoteToSong={this.addNoteToSong}
            incrementNoteLength={this.incrementNoteLength}
          />
          <NotesPage
            notes={this.state.song}
            removeNoteFromSong={this.removeNoteFromSong}
            selectBeat={this.selectBeat}
            selectedBeat={this.state.selectedBeat}
            onGroupSelectStart={this.onGroupSelectStart}
            onGroupSelectEnd={this.onGroupSelectEnd}
            isGroupSelect={this.state.isGroupSelect}
            startGroupSelectedBeat={this.state.startGroupSelectedBeat}
            endGroupSelectedBeat={this.state.endGroupSelectedBeat}
          />
        </ErrorBoundary>
      </div>
    );
  }

  incrementNoteLength() {
    let newSong = this.state.song;
    if (this.state.selectedBeat === null) {
      newSong[newSong.length - 1].noteLength++;
      console.log("INC: ");
      console.log(newSong[newSong.length - 1]);
    } else {
      newSong[this.state.selectedBeat].noteLength++;
    }
  }

  addNoteToSong(e) {
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let keyNo = e.target.classList[1].substr(start, end);

    let newSong = this.state.song;
    if (this.state.selectedBeat == null) {
      let newNote = { keyNo: keyNo, noteLength: 1 };
      newSong.push(newNote);
      console.log("Initial Add note: ");
      console.log(newNote);
      this.setState({ song: newSong });
    } else {
      newSong.splice(this.state.selectedBeat, 1, {
        keyNo: keyNo,
        noteLength: 1,
      });
      let newSelectedBeat = parseInt(this.state.selectedBeat) + 1;
      this.setState({ song: newSong, selectedBeat: newSelectedBeat });
    }

    e.target.style.opacity = "75%";
    setTimeout(function () {
      e.target.style.opacity = "0%";
    }, 500);
    return keyNo;
  }

  removeNoteFromSong(e) {
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let keyNo = e.target.classList[1].substr(start, end);

    let newSong = this.state.song;
    newSong.splice(keyNo, 1);

    this.setState({ song: newSong });
  }

  selectBeat(e) {
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let beatNo = e.target.classList[1].substr(start, end);

    this.setState({
      selectedBeat: beatNo,
      startGroupSelectedBeat: null,
      endGroupSelectedBeat: null,
    });
  }

  onGroupSelectStart(e) {
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let startBeatNo = e.target.classList[1].substr(start, end);

    this.setState({
      isGroupSelect: true,
      selectedBeat: null,
      startGroupSelectedBeat: startBeatNo,
      endGroupSelectedBeat: null,
    });
  }

  onGroupSelectEnd(e) {
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let endBeatNo = e.target.classList[1].substr(start, end);

    let startBeatNo = this.state.startGroupSelectedBeat;

    console.log(
      "GEnd - StartBeatNo: " +
        startBeatNo +
        ", EndBeatNo: " +
        endBeatNo +
        ", IsGroupSelect: " +
        this.state.isGroupSelect
    );

    if (
      this.state.isGroupSelect === true &&
      parseInt(startBeatNo) > parseInt(endBeatNo)
    ) {
      console.log("Backwards Drag Activate");
      [startBeatNo, endBeatNo] = [endBeatNo, startBeatNo];
      this.setState({ isGroupSelect: false });
      this.setState({ startGroupSelectedBeat: startBeatNo });
      this.setState({ endGroupSelectedBeat: endBeatNo });
    } else if (
      this.state.isGroupSelect === true &&
      parseInt(startBeatNo) < parseInt(endBeatNo)
    ) {
      console.log("Forwards Drag Activate");
      this.setState({ isGroupSelect: false });
      this.setState({ endGroupSelectedBeat: endBeatNo });
    } else {
      console.log("Else Activate");
      this.setState({ isGroupSelect: false });
    }
  }
}

export default TuneCreator;
