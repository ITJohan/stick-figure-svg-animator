const bodyElement = document.querySelector('body');
const svgElement = document.querySelector('svg');

/**
 * @param {{ x: number, y: number, isActive: boolean }} point
 * @param {{ partId: string, xAttribute: string, yAttribute: string }} elementData
 */
const setupPoint = (point, elementData) => {
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
    console.log(e);
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

setupPoint({ x: 100, y: 16, isActive: false }, [
  { partId: '#head', xAttribute: 'cx', yAttribute: 'cy' },
  { partId: '#neck', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 100, y: 40 }, [
  { partId: '#neck', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#body', xAttribute: 'x1', yAttribute: 'y1' },
  { partId: '#left-upper-arm', xAttribute: 'x1', yAttribute: 'y1' },
  { partId: '#right-upper-arm', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 80, y: 80 }, [
  { partId: '#left-upper-arm', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-lower-arm', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 120, y: 80 }, [
  { partId: '#right-upper-arm', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#right-lower-arm', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 100, y: 104 }, [
  { partId: '#body', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-upper-leg', xAttribute: 'x1', yAttribute: 'y1' },
  { partId: '#right-upper-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 80, y: 104 }, [
  { partId: '#left-lower-arm', xAttribute: 'x2', yAttribute: 'y2' },
]);
setupPoint({ x: 120, y: 104 }, [
  { partId: '#right-lower-arm', xAttribute: 'x2', yAttribute: 'y2' },
]);
setupPoint({ x: 80, y: 124 }, [
  { partId: '#left-upper-leg', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#left-lower-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 120, y: 124 }, [
  { partId: '#right-upper-leg', xAttribute: 'x2', yAttribute: 'y2' },
  { partId: '#right-lower-leg', xAttribute: 'x1', yAttribute: 'y1' },
]);
setupPoint({ x: 80, y: 160 }, [
  { partId: '#left-lower-leg', xAttribute: 'x2', yAttribute: 'y2' },
]);
setupPoint({ x: 120, y: 160 }, [
  { partId: '#right-lower-leg', xAttribute: 'x2', yAttribute: 'y2' },
]);
