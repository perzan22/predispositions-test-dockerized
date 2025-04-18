///////////////////////
// HEXAGON COMPONENT //
///////////////////////

// imports

import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

// component declaration

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrl: './hexagon.component.sass'
})
export class HexagonComponent {

  // set hexagon starting data

  private svg: any;
  private width = 300;
  private height = 300;
  finalPoint: any = { x: 0, y: 0 };
  fieldOfStudyFit = { x: 0, y: 0, label: '' }

  // input variable get point from parent component

  @Input() fieldOfStudyPoint!: { x: number, y: number };

  // output variable set point clicked to parent component

  @Output() fieldOfStudyPointChange = new EventEmitter<{ x: number, y: number }>()

  // set points of hexagon corners

  private points = [
    {x: 1, y: 0, label: 'A'}, 
    {x: 0.5, y: 0.833, label: 'B'}, 
    {x: -0.5, y: 0.833, label: 'R'}, 
    {x: -1, y: 0, label: 'K'},  
    {x: -0.5, y: -0.833, label: 'P'},  
    {x: 0.5, y: -0.833, label: 'S'}
  ]
  
  private selectedPoint: d3.Selection<SVGCircleElement, unknown, null, undefined> | null = null;

  private hexagonPoints = this.points.map(p => [p.x * 100 + this.width / 2, p.y * 100 + this.height / 2]);

  constructor(private el: ElementRef) {}

  // initialize model after component initialization

  ngAfterViewInit(): void {
    this.svg = d3.select(this.el.nativeElement.querySelector('svg'));
    
    // draw hexagon model

    this.svg.append('polygon')
      .attr('points', this.hexagonPoints.map(p => p.join(',')).join(' '))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    this.svg.selectAll("text")
      .data(this.points)
      .enter()
      .append("text")
      .attr("x", (d: { x: number; }) => 150 + d.x * 100 + d.x * 10)
      .attr("y", (d: { y: number; }) => 150 - d.y * 100 - d.y * 10)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "14px")
      .style("fill", "black")
      .text((d: { label: string; }) => d.label);
      console.log(this.fieldOfStudyPoint)

      if (this.fieldOfStudyPoint) {
        this.selectedPoint = this.svg
        .append("circle")
        .attr("cx", (this.fieldOfStudyPoint.x + 1.5) * 100 )
        .attr("cy", -(this.fieldOfStudyPoint.y - 1.5) * 100 )
        .attr("r", 3)
        .attr("fill", "#131936");

        console.log(this.selectedPoint)
      }

    this.setupClickListener();
  }

  // draw static point for tests

  private drawPoints(data: { x: number, y: number, label: string }[]) {
    data.forEach(d => {
      this.svg.append('circle')
        .attr('cx', d.x * 100 + this.width / 2)
        .attr('cy', -d.y * 100 + this.height / 2)
        .attr('r', 5)
        .attr('fill', 'red');

      this.svg.append('text')
        .attr('x', d.x * 100 + this.width / 2 + 10)
        .attr('y', -d.y * 100 + this.height / 2)
        .text(d.label)
        .attr('font-size', '12px');
    });
  }

  // method listens to clicking on the model

  private setupClickListener(): void {

    // set point based on click position

    this.svg.on("click", (event: MouseEvent) => {
      const [clickX, clickY] = d3.pointer(event, this.svg.node());
      const x = clickX / 100 - 1.5;
      const y = -clickY / 100 + 1.5; // revers y value because svg has 0 at the top

      // remove previously clicked point

      if (this.selectedPoint) {
        this.selectedPoint.remove();
      }

      // draw new point on hexagon

      this.selectedPoint = this.svg
        .append("circle")
        .attr("cx", clickX)
        .attr("cy", clickY)
        .attr("r", 3)
        .attr("fill", "#131936");

      // emit point asynchronously to parent component

      this.fieldOfStudyPointChange.emit({ x: x, y: y });
    });
  }


}
