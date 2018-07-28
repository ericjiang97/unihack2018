import React, { Component } from 'react';

class FallbackPage extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Calendar</h1>
                </header>
                <p className="App-intro">
                    Error 404
                </p>
            </div>
        )
    }
}

export default FallbackPage