const bodyElement = document.querySelector('body');
const svgElement = document.querySelector('svg');

/**
 * @param { number } id
 * @param {{ x: number, y: number }} point
 * @param {{ partId: string, xAttribute: string, yAttribute: string }} elementData
 */
const setupPoint = (id, point, elementData) => {
  // Set up HTML
  const textElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );
  const xLabelElement = document.createElement('label');
  const yLabelElement = document.createElement('label');
  const xInputElement = document.createElement('input');
  const yInputElement = document.createElement('input');

  // Initialize values
  textElement.textContent = id;
  textElement.setAttribute('x', point.x);
  textElement.setAttribute('y', point.y);

  xLabelElement.setAttribute('for', `x-${id}-start`);
  yLabelElement.setAttribute('for', `y-${id}-start`);
  xLabelElement.innerText = `x ${id} start`;
  yLabelElement.innerText = `y ${id} start`;

  xInputElement.setAttribute('id', `x-${id}-start`);
  yInputElement.setAttribute('id', `y-${id}-start`);
  xInputElement.setAttribute('type', 'range');
  yInputElement.setAttribute('type', 'range');
  xInputElement.setAttribute('min', '0');
  yInputElement.setAttribute('min', '0');
  xInputElement.setAttribute('max', '200');
  yInputElement.setAttribute('max', '200');
  xInputElement.setAttribute('step', '1');
  yInputElement.setAttribute('step', '1');
  xInputElement.setAttribute('value', point.x);
  yInputElement.setAttribute('value', point.y);

  elementData.forEach((data) => {
    const element = document.querySelector(data.partId);
    element.setAttribute(data.xAttribute, point.x);
    element.setAttribute(data.yAttribute, point.y);
  });

  // Set up event listeners
  xInputElement.addEventListener('input', (e) => {
    elementData.forEach((data) => {
      const element = document.querySelector(data.partId);
      element.setAttribute(data.xAttribute, e.target.value);
    });
    textElement.setAttribute('x', e.target.value);
  });
  yInputElement.addEventListener('input', (e) => {
    elementData.forEach((data) => {
      const element = document.querySelector(data.partId);
      element.setAttribute(data.yAttribute, e.target.value);
    });
    textElement.setAttribute('y', e.target.value);
  });

  // Add elements to html
  svgElement.appendChild(textElement);
  bodyElement.appendChild(xLabelElement);
  bodyElement.appendChild(xInputElement);
  bodyElement.appendChild(yLabelElement);
  bodyElement.appendChild(yInputElement);
};

// SVG parts
const head = document.querySelector('#head');
const neck = document.querySelector('#neck');
const body = document.querySelector('#body');
const leftUpperArm = document.querySelector('#left-upper-arm');
const rightUpperArm = document.querySelector('#right-upper-arm');
const leftLowerArm = document.querySelector('#left-lower-arm');
const rightLowerArm = document.querySelector('#right-lower-arm');
const leftUpperLeg = document.querySelector('#left-upper-leg');
const rightUpperLeg = document.querySelector('#right-upper-leg');
const leftLowerLeg = document.querySelector('#left-lower-leg');
const rightLowerLeg = document.querySelector('#right-lower-leg');

setupPoint(1, { x: 100, y: 16 }, [
  { partId: '#head', xAttribute: 'cx', yAttribute: 'cy' },
  { partId: '#neck', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(2, { x: 100, y: 40 }, [
  { partId: '#neck', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#body', xAttribute: 'x1', yAttribute: 'y1' },
  { partId: '#left-upper-arm', xAttribute: 'x1', yAttribute: 'y1' },
  { partId: '#right-upper-arm', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(3, { x: 80, y: 80 }, [
  { partId: '#left-upper-arm', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-lower-arm', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(4, { x: 120, y: 80 }, [
  { partId: '#right-upper-arm', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#right-lower-arm', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(5, { x: 100, y: 104 }, [
  { partId: '#body', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-upper-leg', xAttribute: 'x1', yAttribute: 'y1' },
  { partId: '#right-upper-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(6, { x: 80, y: 104 }, [
  { partId: '#left-lower-arm', xAttribute: 'x2', yAttribute: 'y2' },
]);
setupPoint(7, { x: 120, y: 104 }, [
  { partId: '#right-lower-arm', xAttribute: 'x2', yAttribute: 'y2' },
]);
setupPoint(8, { x: 80, y: 124 }, [
  { partId: '#left-upper-leg', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-lower-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(8, { x: 80, y: 124 }, [
  { partId: '#left-upper-leg', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-lower-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(9, { x: 120, y: 124 }, [
  { partId: '#right-upper-leg', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#right-lower-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint(10, { x: 80, y: 160 }, [
  { partId: '#left-lower-leg', xAttribute: 'x2', yAttribute: 'y2' },
]);
setupPoint(11, { x: 120, y: 160 }, [
  { partId: '#right-lower-leg', xAttribute: 'x2', yAttribute: 'y2' },
]);
