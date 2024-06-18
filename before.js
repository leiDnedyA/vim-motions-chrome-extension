console.log('Vim motions for chrome enabled!');

const motions = {
  'g': {
    'g': () => {
      window.scroll({ top: 0 })
    }
  },
  'G': () => {
    window.scroll({ top: document.body.scrollHeight })
  },
  'Control': {
    'd': () => {
      window.scrollBy({ top: window.visualViewport.height / 2 });
    },
    'u': () => {
      window.scrollBy({ top: -(window.visualViewport.height / 2) });
    },
  }
}

const controlKeyOverrides = new Set(['d', 'u']);

const ignoreKeys = new Set(['Control', 'Shift']);

let currKeys = [];

let currNumber = null;

window.addEventListener('keydown', (event) => {
  console.log(event.key)
  const key = event.key;

  if (key === 'Escape') {
    currKeys = [];
    return;
  }

  if (ignoreKeys.has(key)) {
    return;
  }

  if (event.ctrlKey && controlKeyOverrides.has(key)) event.preventDefault();

  if (event.ctrlKey) {
    currKeys = ['Control'];
  }
  handleValidKey(key);

});

function handleValidKey(newKey) {
  currKeys.push(newKey);
  if (!motions.hasOwnProperty(currKeys[0])) {
    currKeys = [];
    return;
  }
  let currVal = motions[currKeys[0]];
  for (let key of currKeys.slice(1)) {
    if (!currVal.hasOwnProperty(key)) {
      currKeys = [];
      return;
    }
    currVal = currVal[key];
  }
  if (typeof currVal === 'function') {
    currVal();
    currKeys = [];
  }
}
