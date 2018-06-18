let obj = [];

function populateObj(data) {
  obj = JSON.parse(data);
  fillCategory(obj);
}

function updateObj() {
  //ajax create obj
  $.ajax({
    url: "reader.php"
  }).done(function (data) {
    console.log(data);
    populateObj(data);
  })
}

window.onload = function () {

  updateObj();

  $("#modal").iziModal(
    {
      closeButton: true
    }
  );

  //onclick
  $('.btn').on("click", function () {
    $.ajax({
      url:"writer.php?cat="+$("#categInput")[0].value
    }).done(function(){
      updateObj();
    })
  })
};

function fillCategory(obj) {
  $("#category").html("");
  createAddCategoryButton();
  let categoryIndex = 0;
  obj.forEach(function (element) {
    $("#category").append(createCategoryElement(element.category, categoryIndex));
    $("#cat-" + categoryIndex).on("click", function () {
      fillSubCategory(element);
    });
    categoryIndex++;
  });
}


function fillSubCategory(category) {
  let subCategoryIndex = 0;
  let valueArray = category.value;
  $("#subCategory").html("");
  valueArray.forEach(function (element) {
    $("#subCategory").append(createSubCategoryElement(element.subCategory, subCategoryIndex));
    $("#subcat-" + subCategoryIndex).on("click", function () {
      fillClipBoard(element);
    });
    subCategoryIndex++;
  });
}

function fillClipBoard(subCategory) {
  let clipIndex = 0;
  let textArray = subCategory.text;
  $("#clipboard").html("");
  textArray.forEach(function (element) {
    $("#clipboard").append(createClipBoardContent(element, clipIndex));
    clipIndex++;
  });

  //clipboard
  var clipboard = new ClipboardJS('.btn');
  clipboard.on('success', function (e) {
    console.info('Action', e.action);
    console.info('Text', e.text);

    e.clearSelection();
  });

  clipboard.on('error', function (e) {
    console.info('Action', e.action);
    console.info('Trigger', e.trigger);

    e.clearSelection();
  });
}


function createCategoryElement(name, index) {
  return '<div id="cat-' + index + '" class="categoryElement">' + name + '</div>';
}

function createSubCategoryElement(name, index) {
  return '<div id="subcat-' + index + '" class="subCategoryElement">' + name + '</div>';
}

function createClipBoardContent(content, index) {
  let clipBoardContent = '<div class="clipBoard">';
  let textArea = '<textarea id="text-' + index + '">' + content + '</textarea>';
  let trigger = '<!-- Trigger --><div class="btn" data-clipboard-target="#text-' + index + '">Copy</div>';
  clipBoardContent += textArea;
  clipBoardContent += trigger;
  clipBoardContent += '</div>';
  return clipBoardContent;

}

function createCategoryInputElement() {
  return '<input class="categoryElement" name="newElem" type="text"><div class="btn">Valider</btn>';
}

function createAddCategoryButton() {
  let newButton = '<div class="trigger categoryElement" data-micromodal-trigger="modal-1"><img class="img-btn" src="plus.png"/></div>';
  $("#category").append(newButton);
}

$(document).on('click', '.trigger', function (event) {
  event.preventDefault();
  // $('#modal').iziModal('setZindex', 99999);
  // $('#modal').iziModal('open', { zindex: 99999 });
  $('#modal').iziModal('open');
});



