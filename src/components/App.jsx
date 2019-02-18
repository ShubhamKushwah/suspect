import React, {Component} from 'react';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
  Button,
  Modal,
} from "@material-ui/core";
import Canvas from "./Canvas";

export default class App extends Component {

  state = {
    shape_width: '',
    shape_height: '',
    shape_x: '',
    shape_y: '',
    shape_color: 'green',
    showModal: false,
    selectedShapeIndex: 0,
    shapes: [],
  };

  onHandleChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    })
  };

  onHandleSubmit = e => {
    e.preventDefault();
    const {shapes, shape_x, shape_y, shape_width, shape_height, shape_color} = this.state;
    const newShapeObject = {
      shape_width,
      shape_height,
      shape_x,
      shape_y,
      shape_color,
    };
    console.log('new Shape object');
    console.log('new Shape object: ', newShapeObject);
    this.setState({
      shapes: [...shapes, newShapeObject],
      shape_width: '',
      shape_height: '',
      shape_x: '',
      shape_y: '',
      shape_color: 'green',
    })
  };

  onSubmitModalForm = e => {
    e.preventDefault();
    const {shapes, selectedShapeIndex, resize_shape_width, resize_shape_height} = this.state;
    shapes[selectedShapeIndex].shape_width = resize_shape_width;
    shapes[selectedShapeIndex].shape_height = resize_shape_height;
    this.setState({
      shapes,
      showModal: false,
      resize_shape_width: '',
      resize_shape_height: '',
    })
  };

  onDeleteShape = id => {
    const {shapes} = this.state;
    shapes.splice(id, 1);
    this.setState({
      shapes,
    });
  };

  toggleModal = () => {
    const {showModal} = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  onResizeShape = index => {
    this.toggleModal();
    this.setState({
      selectedShapeIndex: index,
    })
  };

  render() {

    const {
      shape_x,
      shape_y,
      shape_width,
      shape_height,
      shape_color,
      shapes,
      showModal,
      resize_shape_width,
      resize_shape_height,
    } = this.state;

    return (
      <div className="main_container">
        <Grid container>
          <Grid item xs={5}>
            <h3>Functions</h3>
            <ExpansionPanel defaultExpanded className="expansion-panel">
              <ExpansionPanelSummary className="expansion-panel__summary"
                                     expandIcon={<i className={"fas fa-chevron-down"}/>}>
                <span>Create</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form className="main_container__form" onSubmit={this.onHandleSubmit}>
                  <TextField
                    className="accent-input"
                    label="X"
                    type="number"
                    name="shape_x"
                    value={shape_x}
                    fullWidth
                    onChange={this.onHandleChange}
                  />
                  <TextField
                    className="accent-input"
                    label="Y"
                    type="number"
                    name="shape_y"
                    value={shape_y}
                    fullWidth
                    onChange={this.onHandleChange}
                  />
                  <TextField
                    className="accent-input"
                    label="Width"
                    type="number"
                    name="shape_width"
                    value={shape_width}
                    fullWidth
                    onChange={this.onHandleChange}
                  />
                  <TextField
                    className="accent-input"
                    label="Height"
                    type="number"
                    name="shape_height"
                    value={shape_height}
                    fullWidth
                    onChange={this.onHandleChange}
                  />
                  <TextField
                    className="accent-input"
                    label="Color"
                    type="text"
                    name="shape_color"
                    value={shape_color}
                    fullWidth
                    onChange={this.onHandleChange}
                  />
                  <Button type="submit" variant="contained" className="accent-btn" fullWidth>
                    <i className="fas fa-plus"/> Add
                  </Button>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className="expansion-panel">
              <ExpansionPanelSummary className="expansion-panel__summary"
                                     expandIcon={<i className={"fas fa-chevron-down"}/>}>
                <span>Manage</span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {shapes.length <= 0 ?
                  'No shapes found'
                  :
                  <ul className="shapes-list">
                    {shapes.map((shape, index) => <li>
                      <button onClick={() => this.onResizeShape(index)}>{shape.shape_color}</button>
                      <button onClick={() => this.onDeleteShape(index)}><i
                        className="fas fa-times"/></button>
                    </li>)}
                  </ul>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={7}>
            <h3>Canvas</h3>
            <Canvas shapes={shapes}/>
          </Grid>
        </Grid>
        <Modal
          open={showModal}
          onClose={this.toggleModal}
          className="custom-modal"
        >
          <div>
            <form onSubmit={this.onSubmitModalForm}>
              <TextField
                className="accent-input"
                label="Width"
                type="number"
                name="resize_shape_width"
                value={resize_shape_width}
                fullWidth
                onChange={this.onHandleChange}
              />
              <TextField
                className="accent-input"
                label="Height"
                type="number"
                name="resize_shape_height"
                value={resize_shape_height}
                fullWidth
                onChange={this.onHandleChange}
              />
              <Button type="submit" variant="contained" className="accent-btn" fullWidth>
                <i className="fas fa-check"/> Done
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}