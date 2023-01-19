const bodyElement = document.querySelector('body');
const startSvg = document.querySelector('#start-svg');
const endSvg = document.querySelector('#end-svg');

const setupPoint = (point, elementData, svgElement) => {
  // Setup elements
  const pointElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  // pointElement.classList.add('point');
  pointElement.setAttribute('fill', 'red');
  pointElement.setAttribute('cx', point.x);
  pointElement.setAttribute('cy', point.y);
  pointElement.setAttribute('r', '6');
  pointElement.setAttribute('id', point.id);
  elementData.forEach((data) => {
    const element = document.querySelector(data.partId);
    if (data.partId.includes('head')) {
      element.setAttribute('fill', 'white');
    } else {
      element.setAttribute('stroke', 'white');
      element.setAttribute('stroke-width', '8');
      element.setAttribute('stroke-linecap', 'round');
    }
    element.setAttribute(data.xAttribute, point.x);
    element.setAttribute(data.yAttribute, point.y);

    const side = data.partId.split('-').slice(0, 1);
    const resultSelector = `#result-${data.partId
      .split('-')
      .slice(1)
      .join('-')}`;
    const resultElement = document.querySelector(resultSelector);
    if (resultElement.getAttribute('id').includes('head')) {
      resultElement.setAttribute('fill', 'white');
    } else {
      resultElement.setAttribute('stroke', 'white');
      resultElement.setAttribute('stroke-width', '8');
      resultElement.setAttribute('stroke-linecap', 'round');
    }
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
    { id: `${sideTag}-point-1`, x: 100, y: 16, isActive: false },
    [
      { partId: `#${sideTag}-head`, xAttribute: 'cx', yAttribute: 'cy' },
      { partId: `#${sideTag}-neck`, xAttribute: 'x1', yAttribute: 'y1' },
    ],
    svgElement
  );
  setupPoint(
    { id: `${sideTag}-point-2`, x: 100, y: 40, isActive: false },
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
    { id: `${sideTag}-point-3`, x: 80, y: 80, isActive: false },
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
    { id: `${sideTag}-point-4`, x: 120, y: 80, isActive: false },
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
    { id: `${sideTag}-point-5`, x: 100, y: 104, isActive: false },
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
    { id: `${sideTag}-point-6`, x: 80, y: 104, isActive: false },
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
    { id: `${sideTag}-point-7`, x: 120, y: 104, isActive: false },
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
    { id: `${sideTag}-point-8`, x: 80, y: 124, isActive: false },
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
    { id: `${sideTag}-point-9`, x: 120, y: 124, isActive: false },
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
    { id: `${sideTag}-point-10`, x: 80, y: 160, isActive: false },
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
    { id: `${sideTag}-point-11`, x: 120, y: 160, isActive: false },
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

document.querySelector('button').addEventListener('click', () => {
  const startSvg = document.querySelector('#start-svg');

  startSvg.childNodes.forEach((node) => {
    if (node.nodeName === 'circle') {
      const xAttribute = node.getAttribute('cx');
      const yAttribute = node.getAttribute('cy');

      const endSelector = `#end-${node
        .getAttribute('id')
        .split('-')
        .slice(1)
        .join('-')}`;

      const endElement = document.querySelector(endSelector);
      endElement.setAttribute('cx', xAttribute);
      endElement.setAttribute('cy', yAttribute);

      if (node.getAttribute('id') === '#start-head') {
        const resultSelector = `#result-${node
          .getAttribute('id')
          .split('-')
          .slice(1)
          .join('-')}`;

        const xAnimate = document.querySelector(
          `${resultSelector} > animate[attributeName="cx"]`
        );
        const yAnimate = document.querySelector(
          `${resultSelector} > animate[attributeName="cy"]`
        );

        const xValues = xAnimate.getAttribute('values').split(';');
        const yValues = yAnimate.getAttribute('values').split(';');
        xValues[1] = xAttribute;
        yValues[1] = yAttribute;
        xAnimate.setAttribute('values', xValues.join(';'));
        yAnimate.setAttribute('values', yValues.join(';'));
      }
    }

    if (node.nodeName === 'line') {
      const x1Attribute = node.getAttribute('x1');
      const y1Attribute = node.getAttribute('y1');
      const x2Attribute = node.getAttribute('x2');
      const y2Attribute = node.getAttribute('y2');

      const endSelector = `#end-${node
        .getAttribute('id')
        .split('-')
        .slice(1)
        .join('-')}`;

      const endElement = document.querySelector(endSelector);
      endElement.setAttribute('x1', x1Attribute);
      endElement.setAttribute('y1', y1Attribute);
      endElement.setAttribute('x2', x2Attribute);
      endElement.setAttribute('y2', y2Attribute);

      const resultSelector = `#result-${node
        .getAttribute('id')
        .split('-')
        .slice(1)
        .join('-')}`;

      const x1Animate = document.querySelector(
        `${resultSelector} > animate[attributeName="x1"]`
      );
      const y1Animate = document.querySelector(
        `${resultSelector} > animate[attributeName="y1"]`
      );
      const x2Animate = document.querySelector(
        `${resultSelector} > animate[attributeName="x2"]`
      );
      const y2Animate = document.querySelector(
        `${resultSelector} > animate[attributeName="y2"]`
      );

      const x1Values = x1Animate.getAttribute('values').split(';');
      const y1Values = y1Animate.getAttribute('values').split(';');
      const x2Values = x2Animate.getAttribute('values').split(';');
      const y2Values = y2Animate.getAttribute('values').split(';');
      x1Values[1] = x1Attribute;
      y1Values[1] = y1Attribute;
      x2Values[1] = x2Attribute;
      y2Values[1] = y2Attribute;
      x1Animate.setAttribute('values', x1Values.join(';'));
      y1Animate.setAttribute('values', y1Values.join(';'));
      x2Animate.setAttribute('values', x2Values.join(';'));
      y2Animate.setAttribute('values', y2Values.join(';'));
    }
  });
});
