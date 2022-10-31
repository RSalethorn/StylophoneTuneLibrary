import React from 'react';
import NotesLine from './NotesLine'
import './NotesPage.css'



class NotesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverNo: null
        }
        this.onSelectorHoverEnter = this.onSelectorHoverEnter.bind(this);
        this.onSelectorHoverLeave = this.onSelectorHoverLeave.bind(this);
    }

    onSelectorHoverEnter(e) {
        let start = e.target.classList[1].indexOf("-")+1;
        let end = e.target.classList[1].length;
        let beatNo = e.target.classList[1].substr(start, end);

        this.setState({hoverNo: beatNo});
    }

    onSelectorHoverLeave(e) {
        this.setState({hoverNo: null});
    }

    render() {
        let lines = []
        let lineNo = 0;
        let lineElems = []
        for (let n = 0; n < this.props.notes.length; n+=12) {
            let newLine = this.props.notes.slice(n, n+12);
            lineElems.push(<NotesLine 
                    key={n/12} 
                    notes={newLine} 
                    selectBeat={this.props.selectBeat} 
                    removeNoteFromSong={this.props.removeNoteFromSong} 
                    noOfPrevNotes={n} 
                    selectedBeat={this.props.selectedBeat}
                    onGroupSelectStart={this.props.onGroupSelectStart}
                    onGroupSelectEnd={this.props.onGroupSelectEnd}
                    isGroupSelect={this.props.isGroupSelect}
                    startGroupSelectedBeat={this.props.startGroupSelectedBeat}
                    endGroupSelectedBeat={this.props.endGroupSelectedBeat}
                    onSelectorHoverEnter={this.onSelectorHoverEnter}
                    onSelectorHoverLeave={this.onSelectorHoverLeave}
                    hoverNo={this.state.hoverNo} 
                />);
        }
        return (
            <div className="page-container">
                <ul className="lines-container">
                    {lineElems}
                </ul>
            </div>
        );
    }
}

export default NotesPage;