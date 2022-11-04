import React from "react";
import "./App.css";
import Stylophone from "./Stylophone";
import NotesPage from "./NotesPage";
import ErrorBoundary from "./ErrorBoundary";

//TuneCreator class renders and controls all components used for creating a song with Stylophone.
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
      // song: list that stores notes that make up the current song.
      song: [],
      // selectedBeat: index no. of a note in song selected on notes page to be edited
      selectedBeat: null,
      // isGroupSelect: boolean representing whether a group is currently being selected
      // (NOTE: is false when a group is already selected)
      isGroupSelect: false,
      // startGroupSelectedBeat & endGroupSelectedBeat: index no. of note that is the first and last in selected group
      // (NOTE: Will be set as a group is currently being selected. As the note the user presses mouse on)
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

  // Adds played note to the song from Stylophone
  // e is event data from the Stylophone mouse press.
  addNoteToSong(e) {
    // Fetch key no from the class of the key pressed
    // (IMPROVEMENT NEEDED: Needs changing to each key being a component with attributes of it's own key)
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let keyNo = e.target.classList[1].substr(start, end);

    let newSong = this.state.song;
    // If user hasn't selected a beat on notes page
    if (this.state.selectedBeat == null) {
      let newNote = { keyNo: keyNo, noteLength: 1 };
      // Adds note onto end of current song.
      newSong.push(newNote);
      this.setState({ song: newSong });
    } else {
      // Adds note into place selected on notes page
      newSong.splice(this.state.selectedBeat, 1, {
        keyNo: keyNo,
        noteLength: 1,
      });
      let newSelectedBeat = parseInt(this.state.selectedBeat) + 1;
      this.setState({ song: newSong, selectedBeat: newSelectedBeat });
    }

    // Generates effect of key flashing with colour when pressed.
    e.target.style.opacity = "75%";
    setTimeout(function () {
      e.target.style.opacity = "0%";
    }, 500);
    return keyNo;
  }

  // Removes note from song from a specified position
  // Usually called from clicking a notes key no. label under the staves
  // e is event data from the label press on NotesLine
  removeNoteFromSong(e) {
    // Fetch note index no from the class of the note label pressed
    // (IMPROVEMENT NEEDED: Same changes as addNoteToSong)
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let noteNo = e.target.classList[1].substr(start, end);

    let newSong = this.state.song;
    // Removes note from song at index noteNo
    newSong.splice(noteNo, 1);

    this.setState({ song: newSong });
  }

  // Changes the length of the note being created/edited
  // Usually called when holding down mouse on a Stylophone key for a longer amount of time.
  incrementNoteLength() {
    let newSong = this.state.song;
    // If user has selected a note on NotesPage
    if (this.state.selectedBeat === null) {
      // Changes the length of last note in song
      newSong[newSong.length - 1].noteLength++;
      this.setState({ song: newSong });
    } else {
      // Changes the length of note selected from NotesPage
      newSong[this.state.selectedBeat].noteLength++;
      this.setState({ song: newSong });
    }
  }

  // Selects a note to be edited/deleted
  // Usually called by user clicking on note on NotesPage
  // e is event data from mouse down
  selectBeat(e) {
    // Fetch note index no from the class of the note pressed
    // (IMPROVEMENT NEEDED: Same changes as addNoteToSong)
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let beatNo = e.target.classList[1].substr(start, end);

    // Also unsets any group selection.
    this.setState({
      selectedBeat: beatNo,
      startGroupSelectedBeat: null,
      endGroupSelectedBeat: null,
    });
  }

  // Starts a group selection. Usually called when user holds mouse down on note on NotesPage
  // e is event data from mouse down
  onGroupSelectStart(e) {
    // Fetch note index no from the class of the note pressed
    // (IMPROVEMENT NEEDED: Same changes as addNoteToSong)
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let startBeatNo = e.target.classList[1].substr(start, end);

    // Also unsets singular selected beat
    this.setState({
      isGroupSelect: true,
      selectedBeat: null,
      startGroupSelectedBeat: startBeatNo,
      endGroupSelectedBeat: null,
    });
  }

  // Completes a group selection. Usually called when user mouse ups on note on NotesPage
  // e is event data from mouse up
  onGroupSelectEnd(e) {
    // Fetch note index no from the class of the note mouse up event occured on
    // (IMPROVEMENT NEEDED: Same changes as addNoteToSong)
    let start = e.target.classList[1].indexOf("-") + 1;
    let end = e.target.classList[1].length;
    let endBeatNo = e.target.classList[1].substr(start, end);

    let startBeatNo = this.state.startGroupSelectedBeat;

    // Select group when user drags right to select
    if (
      this.state.isGroupSelect === true &&
      parseInt(startBeatNo) < parseInt(endBeatNo)
    ) {
      this.setState({ isGroupSelect: false });
      this.setState({ endGroupSelectedBeat: endBeatNo });
      // Select group when user drags left to select
    } else if (
      this.state.isGroupSelect === true &&
      parseInt(startBeatNo) > parseInt(endBeatNo)
    ) {
      // Swaps start and end note index around to accomodate for functions that need index nos in ascending order
      [startBeatNo, endBeatNo] = [endBeatNo, startBeatNo];
      this.setState({ isGroupSelect: false });
      this.setState({ startGroupSelectedBeat: startBeatNo });
      this.setState({ endGroupSelectedBeat: endBeatNo });
    } else {
      this.setState({ isGroupSelect: false });
    }
  }
}

export default TuneCreator;
