class Point {
  constructor(
    /** @type {string} */ name,
    /** @type {number} */ x,
    /** @type {number} */ y,
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    /** @type {Point[]} */
    this.children = [];
  }

  addChild(/** @type {Point} */ child) {
    this.children.push(child);
  }
}

customElements.define(
  "stick-figure",
  class StickFigure extends HTMLElement {
    constructor() {
      super();
      this.id = crypto.randomUUID();

      this.head = new Point("head", 100, 16);
      const shoulders = new Point("shoulders", 100, 40);
      const leftElbow = new Point("leftElbow", 80, 80);
      const rightElbow = new Point("rightElbow", 120, 80);
      const hips = new Point("hips", 100, 104);
      const leftHand = new Point("leftHand", 80, 104);
      const rightHand = new Point("rightHand", 120, 104);
      const leftKnee = new Point("leftKnee", 80, 124);
      const rightKnee = new Point("rightKnee", 120, 124);
      const leftFoot = new Point("leftFoot", 80, 160);
      const rightFoot = new Point("rightFoot", 120, 160);

      this.head.addChild(shoulders);
      shoulders.addChild(leftElbow);
      shoulders.addChild(rightElbow);
      shoulders.addChild(hips);
      leftElbow.addChild(leftHand);
      rightElbow.addChild(rightHand);
      hips.addChild(leftKnee);
      hips.addChild(rightKnee);
      leftKnee.addChild(leftFoot);
      rightKnee.addChild(rightFoot);
    }

    connectedCallback() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "200");
      svg.setAttribute("height", "200");
      this.appendChild(svg);

      const drawLine = (x1, y1, x2, y2) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "white");
        line.setAttribute("stroke-width", "8");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
      };

      const drawPoints = (point) => {
        point.children.forEach(child => {
          drawLine(point.x, point.y, child.x, child.y);
          drawPoints(child);
        });
      };

      drawPoints(this.head);
    }
  },
);
