const initializer = [['4x6', false],['8x10', false],['11x17', false]];
const photoList = [
  ['DSC00211.jpg', new Map(initializer)],
  ['DSC09728.jpg', new Map(initializer)],
  ['DSC09459.jpg', new Map(initializer)],
  ['DSC09438.jpg', new Map(initializer)],
  ['DSC09425.jpg', new Map(initializer)],
  ['DSC09414.jpg', new Map(initializer)],
  ['DSC09407.jpg', new Map(initializer)],
  ['DSC09375.jpg', new Map(initializer)],
  ['DSC09315.jpg', new Map(initializer)],
  ['DSC09287.jpg', new Map(initializer)],
  ['DSC08624.jpg', new Map(initializer)],
  ['DSC08431.jpg', new Map(initializer)],
  ['DSC08395.jpg', new Map(initializer)],
  ['DSC02830.jpg', new Map(initializer)],
  ['fullsizeoutput_19a5.jpg', new Map(initializer)],
  ['DSC01709.jpg', new Map(initializer)],
  ['DSC01337.jpg', new Map(initializer)],
  ['DSC01285.jpg', new Map(initializer)],
  ['DSC01189.jpg', new Map(initializer)],
  ['DSC01062.jpg', new Map(initializer)],
  ['DSC01039.jpg', new Map(initializer)],
];

const handleClick = (i, id) => {
  const map = photoList[i][1];
  const value = map.get(id);
  map.set(id, !value);
  render();
};

const markup = (tag, i) => `
  <div>
    <div class="image">
      <img src="images/thumbnails/${tag[0]}">
    </div>
    <div class="controls">
      <a href="images/full-size/${tag[0]}">
        Full size
      </a>
      <span class="break">|</span>
      <button
        class="${tag[1].get('4x6') ? 'active' : ''}"
        onclick="handleClick(${i}, '4x6')"
      >
        4x6
      </button>
      <button
        class="${tag[1].get('8x10') ? 'active' : ''}"
        onclick="handleClick(${i}, '8x10')"
      >
        8x10
      </button>
      <button
        class="${tag[1].get('11x17') ? 'active' : ''}"
        onclick="handleClick(${i}, '11x17')"
      >
        11x17
      </button>
    </div>
  </div>
`;

const listItem = (tag) => {
  const entries = Array.from(tag[1].entries());
  const selected = entries.filter(([k, v]) => v);

  return `
    <div class="list-item">
      ${tag[0]}: ${selected.map(([k, v]) => ' ' + k)}
    </div>
  `;
}

const main = document.getElementById("main");
const list = document.getElementById("list");

const render = () => {
  let content = '';
  photoList.forEach((p, i) => content += markup(p, i));
  main.innerHTML = content;

  let listContent = '';
  photoList
    .filter(p => Array.from(p[1].values()).includes(true))
    .forEach(p => listContent += listItem(p));
  list.innerHTML = listContent;
}

render();
