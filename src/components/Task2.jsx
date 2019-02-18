import React, {Component} from 'react';
import Face1 from '../assets/face1.jpeg';
import Face2 from '../assets/face2.jpeg';
import Face3 from '../assets/face3.jpeg';
import Face4 from '../assets/face4.jpeg';
import Face5 from '../assets/face5.jpeg';
import Face6 from '../assets/face6.jpeg';
import Face7 from '../assets/face7.jpeg';
import Face8 from '../assets/face8.jpeg';
import Face9 from '../assets/face9.jpeg';
import Face10 from '../assets/face10.jpeg';
import {Stage, Layer, Image, Rect, Text} from "react-konva";
import {TextField} from '@material-ui/core';

export default class Task2 extends Component {
  images = [Face1, Face2, Face3, Face4, Face5, Face6, Face7, Face8, Face9, Face10];
  state = {
    images: [],
    caption: 'Caption name',
    img_number: 1,
    hovering: false,
  };

  async componentDidMount() {
    await this.loadImages();
    const canvasContainer = document.getElementsByClassName('custom-canvas')[0];
    const canvas = canvasContainer.getElementsByTagName('canvas')[0];
    canvas.addEventListener('mouseover', () => {
      this.setState({
        hovering: true,
      })
    });

    canvas.addEventListener('mouseout', () => {
      this.setState({
        hovering: false,
      })
    })
  }

  loadImages = async () => {
    await setInterval(async () => {
      const {images} = this.state;
      const newImageObject = new window.Image();
      newImageObject.src = this.images[images.length];
      newImageObject.onload = async () => {
        await this.setState({
          images: [...images, newImageObject]
        });
      };
    }, 100);
  };

  onHandleChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    })
  };

  render() {
    const {images, caption, img_number, hovering} = this.state;
    const {shapes} = this.props;

    const renderImages = () => images.map((image, index) =>
      <Image image={image} x={index % 5 * 200} y={index >= 5 ? 200 : 0} width={200} height={200}/>
    );

    const renderCaptions = () => shapes.map(shape =>
      (
        <React.Fragment>
          <Rect
            x={shape.shape_x}
            y={shape.shape_y}
            width={shape.shape_width}
            height={shape.shape_height}
            stroke={shape.shape_color}
          />
          {hovering ? <Text fill={'red'} x={shape.shape_x} y={shape.shape_y} text={caption} fontSize={15}/> : null }
        </React.Fragment>
      )
    );

    return (
      <div>
        <h1>Task 2</h1>
        <Stage className="custom-canvas" width={1000} height={400}>
          <Layer>
            {renderImages()}
            {renderCaptions()}
          </Layer>
        </Stage>
        <h3>Add some captions</h3>
        <form className="caption-form">
          <TextField
            className="accent-input"
            label="Enter Caption"
            type="text"
            name="caption"
            value={caption}
            fullWidth
            onChange={this.onHandleChange}
          />
        </form>
      </div>
    );
  }
}