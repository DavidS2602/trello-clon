import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {
  @Input() color: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' = 'sky'

  mapColors = {
    sky: {
      'bg-blue-500': true,
      'hover:bg-sky-800': true,
      'text-white': true,
    },
    yellow: {
      'bg-yellow-500': true,
      'hover:bg-yellow-800': true,
      'text-white': true,
    },
    green: {
      'bg-green-500': true,
      'hover:bg-green-800': true,
      'text-white': true,
    },
    red: {
      'bg-red-500': true,
      'hover:bg-red-800': true,
      'text-white': true,
    },
    violet: {
      'bg-violet-500': true,
      'hover:bg-violet-800': true,
      'text-white': true,
    },
    gray: {
      'bg-gray-500': true,
      'hover:bg-gray-800': true,
      'text-white': true,
    },
  }

  get colors() {
    const classes = this.mapColors[this.color]
    return classes ? classes : {}
  }

}
