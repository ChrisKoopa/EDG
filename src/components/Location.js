import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { deepCopy } from "../utils/builder";
import { updatePlayerClues, updateLocationOccupant } from "../actions/index";

class Location extends PureComponent {
  updateOccupant = (playerId, locationId, index, value) => {
    this.props.updateLocationOccupant(playerId, locationId, index, value);
  };

  updateAddress = (playerId, part, value) => {
    const newSheet = deepCopy(this.props.game.gameData.sheets[playerId]);
    newSheet.locations[this.props.locationId].address[part] = value;
    this.props.updatePlayerClues(playerId, newSheet);
  };

  updateWeapon = (playerId, value) => {
    const newSheet = deepCopy(this.props.game.gameData.sheets[playerId]);
    newSheet.locations[this.props.locationId].weapon = value;
    this.props.updatePlayerClues(playerId, newSheet);
  };

  componentWillReceiveProps = props => {
    this.props = props;
  };

  render = () => {
    const gameData = this.props.game.gameData;
    const setupData = this.props.game.setupData;
    const playerId = this.props.game.playerId;
    const location = gameData.sheets[playerId].locations[this.props.locationId];

    return (
      <div>
        <div>{this.props.locationId}</div>
        <div>{location.name}</div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Men</th>
                <th>Women</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <TextField
                    hintText="Suspect"
                    id={`${this.props.locationId}-men-0`}
                    value={location.occupants[0] || ""}
                    onChange={e =>
                      this.updateOccupant(
                        playerId,
                        this.props.locationId,
                        0,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    hintText="Suspect"
                    id={`${this.props.locationId}-women-2`}
                    value={location.occupants[2] || ""}
                    onChange={e =>
                      this.updateOccupant(
                        playerId,
                        this.props.locationId,
                        2,
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    hintText="Suspect"
                    id={`${this.props.locationId}-men-1`}
                    value={location.occupants[1] || ""}
                    onChange={e =>
                      this.updateOccupant(
                        playerId,
                        this.props.locationId,
                        1,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    hintText="Suspect"
                    id={`${this.props.locationId}-women-3`}
                    value={location.occupants[3] || ""}
                    onChange={e =>
                      this.updateOccupant(
                        playerId,
                        this.props.locationId,
                        3,
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div>Address</div>
          <div>
            <TextField
              hintText="Side of town"
              id={`${this.props.locationdId}-side`}
              value={location.address.side || ""}
              onChange={e =>
                this.updateAddress(playerId, "side", e.target.value)
              }
            />
          </div>
          <div>
            <TextField
              hintText="Part of town"
              id={`${this.props.locationdId}-town`}
              value={location.address.town || ""}
              onChange={e =>
                this.updateAddress(playerId, "town", e.target.value)
              }
            />
          </div>
        </div>
        <div>Weapon location</div>
        <div>
          <TextField
            hintText="Type"
            id={`${this.props.locationId}-weapon`}
            value={location.weapon || ""}
            onChange={e => this.updateWeapon(playerId, e.target.value)}
          />
        </div>
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayerClues: (playerId, sheet) =>
      dispatch(updatePlayerClues(playerId, sheet)),
    updateLocationOccupant: (playerId, locationId, index, value) =>
      dispatch(updateLocationOccupant(playerId, locationId, index, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
