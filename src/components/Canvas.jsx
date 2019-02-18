import React, {Component} from 'react';
import {Rect, Stage, Layer} from "react-konva";

export default class Canvas extends Component {
  render() {
    const { shapes } = this.props;

    const renderShapes = () =>
      shapes.map((shape) => (
        <Rect
          x={shape.shape_x}
          y={shape.shape_y}
          width={shape.shape_width}
          height={shape.shape_height}
          stroke={shape.shape_color}
        />
      ));

    return (
      <Stage className="canvas" width={500} height={500}>
        <Layer>
          {renderShapes()}
        </Layer>
      </Stage>
    );
  }
}