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

    const side = data.partId.split('-').slice(0, 1);
    const resultSelector = `#result-${data.partId
      .split('-')
      .slice(1)
      .join('-')}`;
    const xAnimate = document.querySelector(
      `${resultSelector} > animate[attributeName="${data.xAttribute}"]`
    );
    const yAnimate = document.querySelector(
      `${resultSelector} > animate[attributeName="${data.yAttribute}"]`
    );

    if (side[0] === '#start') {
      xAnimate.setAttribute('values', `${point.x};0;${point.x}`);
      yAnimate.setAttribute('values', `${point.y};0;${point.y}`);
    } else {
      const xValues = xAnimate.getAttribute('values').split(';');
      const yValues = yAnimate.getAttribute('values').split(';');
      xValues[1] = point.x;
      yValues[1] = point.y;
      xAnimate.setAttribute('values', xValues.join(';'));
      yAnimate.setAttribute('values', yValues.join(';'));
    }
  });

  // Event listeners
  pointElement.addEventListener('mousedown', () => (point.isActive = true));
  pointElement.addEventListener('mousemove', (e) => {
    if (point.isActive) {
      elementData.forEach((data) => {
        const element = document.querySelector(data.partId);
        element.setAttribute(data.xAttribute, e.offsetX);
        element.setAttribute(data.yAttribute, e.offsetY);

        const resultElement = document.querySelector(
          `#result-${data.partId.split('-').slice(1).join('-')}`
        );
        resultElement.setAttribute(data.xAttribute, e.offsetX);
        resultElement.setAttribute(data.yAttribute, e.offsetY);

        const side = data.partId.split('-').slice(0, 1);
        const resultSelector = `#result-${data.partId
          .split('-')
          .slice(1)
          .join('-')}`;
        const xAnimate = document.querySelector(
          `${resultSelector} > animate[attributeName="${data.xAttribute}"]`
        );
        const yAnimate = document.querySelector(
          `${resultSelector} > animate[attributeName="${data.yAttribute}"]`
        );

        if (side[0] === '#start') {
          const xValues = xAnimate.getAttribute('values').split(';');
          const yValues = yAnimate.getAttribute('values').split(';');
          xValues[0] = e.offsetX;
          yValues[0] = e.offsetY;
          xValues[2] = e.offsetX;
          yValues[2] = e.offsetY;
          xAnimate.setAttribute('values', xValues.join(';'));
          yAnimate.setAttribute('values', yValues.join(';'));
        } else {
          const xValues = xAnimate.getAttribute('values').split(';');
          const yValues = yAnimate.getAttribute('values').split(';');
          xValues[1] = e.offsetX;
          yValues[1] = e.offsetY;
          xAnimate.setAttribute('values', xValues.join(';'));
          yAnimate.setAttribute('values', yValues.join(';'));
        }

        const coordinatesElement = document.querySelector('strong');
        coordinatesElement.innerText = `${e.offsetX}, ${e.offsetY}`;
      });

      pointElement.setAttribute('cx', e.offsetX);
      pointElement.setAttribute('cy', e.offsetY);
    }
  });
  pointElement.addEventListener('mouseup', () => (point.isActive = false));

  // Add to SVG
  svgElement.appendChild(pointElement);
};

const setupPoints = (sideTag, svgSelector) => {
  const svgElement = document.querySelector(svgSelector);

  setupPoint(
    { x: 100, y: 16, isActive: false },
    [
      { partId: `#${sideTag}-head`, xAttribute: 'cx', yAttribute: 'cy' },
      { partId: `#${sideTag}-neck`, xAttribute: 'x1', yAttribute: 'y1' },
    ],
    svgElement
  );
  setupPoint(
    { x: 100, y: 40, isActive: false },
    [
      { partId: `#${sideTag}-neck`, xAttribute: 'x2', yAttribute: 'y2' },
      { partId: `#${sideTag}-body`, xAttribute: 'x1', yAttribute: 'y1' },
      {
        partId: `#${sideTag}-left-upper-arm`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
      {
        partId: `#${sideTag}-right-upper-arm`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 80, isActive: false },
    [
      {
        partId: `#${sideTag}-left-upper-arm`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
      {
        partId: `#${sideTag}-left-lower-arm`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 120, y: 80, isActive: false },
    [
      {
        partId: `#${sideTag}-right-upper-arm`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
      {
        partId: `#${sideTag}-right-lower-arm`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 100, y: 104, isActive: false },
    [
      { partId: `#${sideTag}-body`, xAttribute: 'x2', yAttribute: 'y2' },
      {
        partId: `#${sideTag}-left-upper-leg`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
      {
        partId: `#${sideTag}-right-upper-leg`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 104, isActive: false },
    [
      {
        partId: `#${sideTag}-left-lower-arm`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 120, y: 104, isActive: false },
    [
      {
        partId: `#${sideTag}-right-lower-arm`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 124, isActive: false },
    [
      {
        partId: `#${sideTag}-left-upper-leg`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
      {
        partId: `#${sideTag}-left-lower-leg`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 120, y: 124, isActive: false },
    [
      {
        partId: `#${sideTag}-right-upper-leg`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
      {
        partId: `#${sideTag}-right-lower-leg`,
        xAttribute: 'x1',
        yAttribute: 'y1',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 80, y: 160, isActive: false },
    [
      {
        partId: `#${sideTag}-left-lower-leg`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
    ],
    svgElement
  );
  setupPoint(
    { x: 120, y: 160, isActive: false },
    [
      {
        partId: `#${sideTag}-right-lower-leg`,
        xAttribute: 'x2',
        yAttribute: 'y2',
      },
    ],
    svgElement
  );
};

setupPoints('start', '#start-svg');
setupPoints('end', '#end-svg');
