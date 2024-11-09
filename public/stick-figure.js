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
    this.limbs = {
      neck: {
        from: this.points.head,
        to: this.points.shoulders
      },
      leftUpperArm: {
        from: this.points.shoulders,
        to: this.points.leftElbow
      },
      body: {
        from: this.points.shoulders,
        to: this.points.hips
      },
      rightUpperArm: {
        from: this.points.shoulders,
        to: this.points.rightElbow
      },
      leftLowerArm: {
        from: this.points.leftElbow,
        to: this.points.leftHand
      },
      rightLowerArm: {
        from: this.points.rightElbow,
        to: this.points.rightHand
      },
      leftUpperLeg: {
        from: this.points.hips,
        to: this.points.leftKnee,
      },
      rightUpperLeg: {
        from: this.points.hips,
        to: this.points.rightKnee
      },
      leftLowerLeg: {
        from: this.points.leftKnee,
        to: this.points.leftFoot
      },
      rightLowerLeg: {
        from: this.points.rightKnee,
        to: this.points.rightFoot
      }
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
        ${Object.values(this.limbs).map((limb, index) => `
          <line
            id="${this.id}-limb-${index}"
            x1="${limb.from.x}"
            y1="${limb.from.y}"
            x2="${limb.to.x}" 
            y2="${limb.to.y}"
            stroke="white"
            stroke-width="8"
            stroke-linecap="round"
          />
        `)}
        ${Object.values(this.points).map((point, index) => `
          <circle
            id="${this.id}-point-${index}"
            cx="${point.x}"
            cy="${point.y}"
            r="6"
            fill="red"
          />
        `).join('')}
      </svg>
    `

    Object.values(this.points).forEach((_point, index) => {
      const pointElement = this.querySelector(`#${this.id}-point-${index}`)
      if (pointElement === null) throw new Error("Could not query point element")
      if (!(pointElement instanceof SVGCircleElement)) throw new Error("Point is of wrong element type")
      
      pointElement.addEventListener('mousedown', () => {
        pointElement.setAttribute('active', '')
      })
      pointElement.addEventListener('mousemove', (event) => {
        // TODO: implement move feature
      })
      pointElement.addEventListener('mouseup', () => {
        pointElement.removeAttribute('active')
      })
    })
  }
})