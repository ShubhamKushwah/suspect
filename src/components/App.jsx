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
import Task2 from "./Task2";

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
        <h1>Task 1</h1>
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
            <ExpansionPanel defaultExpanded className="expansion-panel">
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
          <Grid item xs={12}>
            <Task2 shapes={shapes}/>
          </Grid>
          <Grid item xs={12}>
            <h2>How to use & Features</h2>
            <ul>
              <li>
                <h4>Task 1:</h4>
                <ul>
                  <li>In the left side you'll see an expansion panel. Under
                    the <strong>Create</strong> tab, you can create a rectange. Where you can enter
                    the x-coordinate, y-coordinate, width, height, and color of the rectangle.
                    You can try with these values:
                    <p>X: 10</p>
                    <p>Y: 20</p>
                    <p>Width: 160</p>
                    <p>Height: 160</p>
                    <p>
                      Color: Accepted values are in all supported formats:
                      <br/>
                      <br/>
                      Regular html values/Hex Code/RGB collection/transparent RGB collection
                      <br/>
                      <br/>
                      red/#ff0033/rgb(200, 100, 255)/rgba(100, 200, 50, 0.8)
                    </p>
                  </li>
                  <li>Then click on <strong>Add</strong> button to add the shape to the canvas in
                    the right, as well as in the images below.
                  </li>
                  <li>There's another expansion panel just below the <strong>Create</strong> tab.
                    It's called <strong>Manage</strong>. There you'll see all your added rectangles
                    named by their color. If you want to resize any rectangle, just click on the
                    name, and a modal will open. There you can enter the new width and height of
                    that specific rectangle. Click on the <strong>Done</strong> button to make the
                    changes.
                  </li>
                  <li>
                    There's also an <strong>X</strong> button, which is right next to the rectangle
                    in the manage section. You can click on that button and it will instantly remove
                    that rectangle from the list, as well as from the canvas.
                  </li>
                  <li>
                    You can always collapse the expansion panels by clicking on the arrows, if you
                    need more space to work on.
                  </li>
                </ul>
              </li>
              <li>
                <h4>Task 2:</h4>
                <ul>
                  <li>
                    Since, the Task 2 is integrated with the Task 1, whenever you add a rectangle
                    from Task 1, it would be shown in the Task 1 canvas, as well as in the images
                    canvas as well.
                  </li>
                  <li>
                    There's a field for caption names below the images.
                    <br/>
                    Note: The captions would show on hovering over the images canvas, and disappear
                    when your mouse is not over it.
                  </li>
                  <li>
                    You can just change the caption name in the input field, and it would be
                    automatically changed everywhere.
                  </li>
                </ul>
              </li>
            </ul>
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