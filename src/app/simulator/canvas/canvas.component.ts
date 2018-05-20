import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Konva from 'konva';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: [ './canvas.component.scss' ],
})
export class CanvasComponent implements OnInit, OnChanges {
  @Input() settings = {};
  width = 0;
  height: 0;
  stage = null;
  layer = null;
  range = null;
  accessPointImg = null;
  radius = 0;
  accessPointCenter: Point;

  receivers: Array<Point> = [];

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.settings) {
      this.radius = 2 * this.calculateRadius(this.settings);
      if (changes.settings.firstChange) {
        this.setSize();
        this.drawStage();
        this.drawScale();
        this.drawRange();
        this.generatePoints();
        this.drawAccessPoint();
      } else {
        this.range.radius(this.radius);
        this.layer.batchDraw();
      }
      this.drawReceivers();
    }
  }

  setSize() {
    const element = this.elementRef.nativeElement;
    this.width = element.clientWidth;
    this.height = element.clientHeight;
  }

  drawAccessPoint() {
    const imageObj = new Image();
    const drawImage = this.drawImage.bind(this);
    imageObj.onload = function() {
      drawImage(this);
    };
    imageObj.src = '../../../assets/images/access-point.png';
  }

  drawStage() {
    this.stage = new Konva.Stage({
      container: 'canvas-container',
      width: this.width,
      height: this.height,
    });
    this.layer = new Konva.Layer();
    this.accessPointCenter = {
      x: this.stage.getWidth() / 2,
      y: this.stage.getHeight() / 2,
    };
  }

  drawImage(imageObj) {
    // access point image
    this.accessPointImg = new Konva.Image({
        image: imageObj,
        x: this.accessPointCenter.x  - 96,
        y: this.accessPointCenter.y - 96,
        width: 192,
        height: 192,
        draggable: true,
        dragBoundFunc: function(pos) {
          this.accessPointCenter.x = pos.x + 96;
          this.accessPointCenter.y = pos.y + 96;
          this.range.x(this.accessPointCenter.x);
          this.range.y(this.accessPointCenter.y);
          this.layer.batchDraw();
          this.drawReceivers();
          return pos;
        }.bind(this),
    });

    this.accessPointImg.on('mouseover', () => {
      document.body.style.cursor = 'pointer';
    });
    this.accessPointImg.on('mouseout', () => {
      document.body.style.cursor = 'default';
    });

    this.layer.add(this.accessPointImg);
    this.stage.add(this.layer);
  }

  drawRange() {
    this.range = new Konva.Circle({
      x: this.accessPointCenter.x,
      y: this.accessPointCenter.y,
      radius: this.radius,
      fill: '#D1D6DF',
    });
    this.layer.add(this.range);
    this.stage.add(this.layer);
  }

  drawReceivers() {
    this.receivers.map((point: Point) => {
      const circle = new Konva.Circle({
        x: point.x,
        y: point.y,
        radius: 5,
        fill: this.inRange(point) ? 'green' : 'red',
        strokeWidth: 4,
      });
      this.layer.add(circle);
      this.stage.add(this.layer);
    });
  }

  generatePoints() {
    for (let i = 0; i < 10; i++) {
      this.receivers.push({
        x: Math.floor(Math.random() * this.width + 1),
        y: Math.floor(Math.random() * this.height + 1),
      });
    }
  }

  sqr(x: number) {
    return x * x;
  }

  inRange(point: Point) {
    return Math.sqrt(this.sqr(this.accessPointCenter.x - point.x)
      + this.sqr(this.accessPointCenter.y - point.y)) < this.radius;
  }

  calculateRadius(settings, signal = -80, gain = 1) {
    const fspl = settings.power - signal + gain;
    const distance = Math.pow(10, (fspl - 32.44 - 20 * Math.log10(settings.radio * 1000)) / 20);
    return distance * 1000;
  }

  drawScale() {
    const corner = { x: this.stage.getWidth(), y: this.stage.getHeight() };
    const line = new Konva.Line({
      points: [
        corner.x - 20, corner.y - 50,
        corner.x - 20, corner.y - 30,
        corner.x - 220, corner.y - 30,
        corner.x - 220, corner.y - 50,
      ],
      stroke: '#bbb',
      strokeWidth: 1,
    });
    const text = new Konva.Text({
      x: corner.x - 140,
      y: corner.y - 55,
      text: '100m',
      fontSize: 20,
      fontFamily: 'Lato',
      fill: '#bbb',
    });

    this.layer.add(line);
    this.layer.add(text);
    this.stage.add(this.layer);
  }
}
