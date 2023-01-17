const bodyElement = document.querySelector('body');
const startSvg = document.querySelector('#start-svg');
const endSvg = document.querySelector('#end-svg');

/**
 * @param {{ x: number, y: number, isActive: boolean }} point
 * @param {{ partId: string, xAttribute: string, yAttribute: string }} elementData
 * @param { SVGElement } svg
 */
const setupPoint = (point, elementData, svgElement) => {
  // Setup elements
  const pointElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  pointElement.classList.add('point');
  pointElement.setAttribute('cx', point.x);
  pointElement.setAttribute('cy', point.y);
  pointElement.setAttribute('r', '4');
  elementData.forEach((data) => {
    const element = document.querySelector(data.partId);
    element.setAttribute(data.xAttribute, point.x);
    element.setAttribute(data.yAttribute, point.y);
  });

  // Event listeners
  pointElement.addEventListener('mousedown', () => (point.isActive = true));
  pointElement.addEventListener('mousemove', (e) => {
    if (point.isActive) {
      elementData.forEach((data) => {
        const element = document.querySelector(data.partId);
        element.setAttribute(data.xAttribute, e.offsetX);
        element.setAttribute(data.yAttribute, e.offsetY);
      });

      pointElement.setAttribute('cx', e.offsetX);
      pointElement.setAttribute('cy', e.offsetY);
    }
  });
  pointElement.addEventListener('mouseup', () => (point.isActive = false));

  // Add to SVG
  svgElement.appendChild(pointElement);
};

const setupPoints = (side, svgSelector) => {
  const svgElement = document.querySelector(svgSelector);

  setupPoint(
    { x: 100, y: 16, isActive: false },
    [
      { partId: `#${side}-head`, xAttribute: 'cx', yAttribute: 'cy' },
      { partId: `#${side}-neck`, xAttribute: 'x1', yAttribute: 'y1' },
    ],
    svgElement
  );
  setupPoint(
    { x: 100, y: 40, isActive: false },
    [
      { partId: `#${side}-neck`, xAttribute: 'x2', yAttribute: 'y2' },
      { partId: `#${side}-body`, xAttribute: 'x1', yAttribute: 'y1' },
      { partId: `#${side}-left-upper-arm`, xAttribute: 'x1', yAttribute: 'y1' },
      {
        partId: `#${side}-right-upper-arm`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 80, isActive: false },
    [
      { partId: `#${side}-left-upper-arm`, xAttribute: 'x2', yAttribute: 'y2' },
      { partId: `#${side}-left-lower-arm`, xAttribute: 'x1', yAttribute: 'y1' },
    ],
    svgElement
  );
  setupPoint(
    { x: 120, y: 80, isActive: false },
    [
      {
        partId: `#${side}-right-upper-arm`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
      {
        partId: `#${side}-right-lower-arm`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 100, y: 104, isActive: false },
    [
      { partId: `#${side}-body`, xAttribute: 'x2', yAttribute: 'y2' },
      { partId: `#${side}-left-upper-leg`, xAttribute: 'x1', yAttribute: 'y1' },
      {
        partId: `#${side}-right-upper-leg`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 104, isActive: false },
    [{ partId: `#${side}-left-lower-arm`, xAttribute: 'x2', yAttribute: 'y2' }],
    svgElement
  );
  setupPoint(
    { x: 120, y: 104, isActive: false },
    [
      {
        partId: `#${side}-right-lower-arm`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 124, isActive: false },
    [
      { partId: `#${side}-left-upper-leg`, xAttribute: 'x2', yAttribute: 'y2' },
      { partId: `#${side}-left-lower-leg`, xAttribute: 'x1', yAttribute: 'y1' },
    ],
    svgElement
  );
  setupPoint(
    { x: 120, y: 124, isActive: false },
    [
      {
        partId: `#${side}-right-upper-leg`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
      {
        partId: `#${side}-right-lower-leg`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 160, isActive: false },
    [{ partId: `#${side}-left-lower-leg`, xAttribute: 'x2', yAttribute: 'y2' }],
    svgElement
  );
  setupPoint(
    { x: 120, y: 160, isActive: false },
    [
      {
        partId: `#${side}-right-lower-leg`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
    ],
    svgElement
  );
};

setupPoints('start', '#start-svg');
setupPoints('end', '#end-svg');
