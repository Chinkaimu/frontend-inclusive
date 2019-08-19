import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const ThemeContext = React.createContext({
    background: 'red',
    color: 'white',
});

class Header extends Component {
    render () {
        return <div>
            Hello React Context API
        </div>
    }
}

class Title extends Component {
    render () {
        return <ThemeContext.Consumer>
            {
                context => (
                    <h1 style={{background: context.background, color: context.color}}>
                        context control the style
                    </h1>
                )
            }
            </ThemeContext.Consumer>
    }
}

class App extends Component {
    render () {
        return (
            <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
                <Header />
                <Title />
            </ThemeContext.Provider>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('container1'));