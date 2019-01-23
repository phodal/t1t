function initPipes(ids) {
  dragula(ids, {
    direction: 'horizontal',
    moves: function (el, source, handle, sibling) {
      return true;
    },
  }).on('drag', function (el) {
    el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el) {
    el.className += ' ex-moved';
  }).on('over', function (el, container) {
    container.className += ' ex-over';
  }).on('out', function (el, container) {
    container.className = container.className.replace('ex-over', '');
  });
}

function initEditors() {
  var elements = document.querySelectorAll('.editable');
  var editor = new MediumEditor(elements);
}

function generateId(pipeData) {
  return pipeData.toLocaleLowerCase();
}

function initElements() {
  var ids = [];
  var pipeData = [
    {
      id: 1,
      title: 'Process',
      items: [
        '提交代码', 'PUSH Hooks', '运动持续集成', '部署到 Dev 环境', 'E2E 测试', '手动测试', '部署到 UAT 环境', '手工测试', '上线申请', '上线'
      ],
      backgroundColor: '#99b433',
      textColor: '#ffffff'
    },
    {
      id: 2,
      title: 'Tools',
      items: [
        'Git & GitHub', 'Git', 'Jenkins', '', '', '', '', '', '', '', '', ''
      ],
      backgroundColor: '#00a300',
      textColor: '#ffffff'
    }
  ];

  var elements = '';
  for (var i = 0; i < pipeData.length; i++) {
    var id = generateId(pipeData[i].title);
    var childItemId = id + '_child';
    var currentHtml = `<div id='${id}' class='container' style='background:${pipeData[i].backgroundColor};color:${pipeData[i].textColor}'>`;

    for (var k = 0; k < pipeData[i].items.length; k++) {
      currentHtml = currentHtml + '<div class="editable" id="' + childItemId + '">' + pipeData[i].items[k] + '</div>';
    }
    currentHtml = currentHtml + '</div>';
    elements = elements + currentHtml;
  }

  document.getElementById('pipe').innerHTML = elements;

  for (var j = 0; j < pipeData.length; j++) {
    ids.push(document.getElementById(generateId(pipeData[j].title)));
  }
  return ids;
}

function init() {
  var ids = initElements();
  initPipes(ids);
  initEditors();
}

init();
