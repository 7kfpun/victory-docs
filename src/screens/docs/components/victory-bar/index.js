import React from "react";
import EcologyRecipe from "../../../../components/ecology-recipe";

class VictoryBar extends React.Component {
  render() {
    return (
      <EcologyRecipe
        overview={require("!!raw!./ecology.md")}
        location={this.props.location}
        updateTocArray={this.props.updateTocArray}
        scope={{}}
      />
    );
  }
}

VictoryBar.propTypes = {
  location: React.PropTypes.object.isRequired,
  updateTocArray: React.PropTypes.func.isRequired
};

export default VictoryBar;