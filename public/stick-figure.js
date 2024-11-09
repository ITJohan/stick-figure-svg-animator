customElements.define('stick-figure', class StickFigure extends HTMLElement {
  constructor() {
    super();
    this.id = crypto.randomUUID();
    this.points = {
      head: {x: 100, y: 16},
      shoulders: {x: 100, y: 40},
      leftElbow: {x: 80, y: 80},
      rightElbow: {x: 120, y: 80},
      hips: {x: 100, y: 104},
      leftHand: {x: 80, y: 104}, 
      rightHand: {x: 120, y: 104},
      leftKnee: {x: 80, y: 124}, 
      rightKnee: {x: 120, y: 124},
      leftFoot: {x: 80, y: 160}, 
      rightFoot: {x: 120, y: 160},
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <svg id="${this.id}-svg" width="200" height="200">
        <circle
          id="${this.id}-head"
          cx="${this.points.head.x}"
          cy="${this.points.head.y}"
          r="16"
          fill="white"
        />
        <line
          id="${this.id}-neck"
          x1="${this.points.head.x}" 
          y1="${this.points.head.y}"
          x2="${this.points.shoulders.x}" 
          y2="${this.points.shoulders.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          id="${this.id}-left-upper-arm"
          x1="${this.points.shoulders.x}" 
          y1="${this.points.shoulders.y}"
          x2="${this.points.leftElbow.x}" 
          y2="${this.points.leftElbow.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-body"
          x1="${this.points.shoulders.x}" 
          y1="${this.points.shoulders.y}"
          x2="${this.points.hips.x}" 
          y2="${this.points.hips.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-right-upper-arm"
          x1="${this.points.shoulders.x}" 
          y1="${this.points.shoulders.y}"
          x2="${this.points.rightElbow.x}" 
          y2="${this.points.rightElbow.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-left-lower-arm"
          x1="${this.points.leftElbow.x}" 
          y1="${this.points.leftElbow.y}"
          x2="${this.points.leftHand.x}" 
          y2="${this.points.leftHand.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-right-lower-arm"
          x1="${this.points.rightElbow.x}" 
          y1="${this.points.rightElbow.y}"
          x2="${this.points.rightHand.x}" 
          y2="${this.points.rightHand.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-left-upper-leg"
          x1="${this.points.hips.x}" 
          y1="${this.points.hips.y}"
          x2="${this.points.leftKnee.x}" 
          y2="${this.points.leftKnee.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-right-upper-leg"
          x1="${this.points.hips.x}" 
          y1="${this.points.hips.y}"
          x2="${this.points.rightKnee.x}" 
          y2="${this.points.rightKnee.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-left-lower-leg"
          x1="${this.points.leftKnee.x}" 
          y1="${this.points.leftKnee.y}"
          x2="${this.points.leftFoot.x}" 
          y2="${this.points.leftFoot.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line id="${this.id}-right-lower-leg"
          x1="${this.points.rightKnee.x}" 
          y1="${this.points.rightKnee.y}"
          x2="${this.points.rightFoot.x}" 
          y2="${this.points.rightFoot.y}"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        ${Object.values(this.points).map((point, index) => `
          <circle
            id="${this.id}-point-${index + 1}"
            cx="${point.x}"
            cy="${point.y}"
            r="6"
            fill="red"
          />
        `).join('')}
      </svg>
    `
  }
})