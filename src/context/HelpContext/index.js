import React, {Component} from 'react';

import {help as helpConstants} from '../../constants/help';

export const HelpContext = React.createContext(true);

class AppProvider extends Component {

  state = {
    selectedHelp: helpConstants[0],
  };

  render() {
    return (
      <HelpContext.Provider
        value={{
          state: this.state,
          selectHelp: id => {
            this.setState({
              selectedHelp: helpConstants.find(item => item.id === parseInt(id))
            })
          }
        }}
      >
        {this.props.children}
      </HelpContext.Provider>
    );
  }
}

export function withHelpContext(Component) {
  return function WrapperComponent(props) {
    return (
      <HelpContext.Consumer>
        {state => <Component {...props} context={state}/>}
      </HelpContext.Consumer>
    );
  };
}

export default AppProvider;
