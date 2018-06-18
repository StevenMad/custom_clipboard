var obj = [{
  "category": "DMI",
  "value": [{
    "subCategory": "probleme 1",
    "text": [
      "text1-1", "text1-2", "text1-3"
    ]
  }, {
    "subCategory": "probleme 2",
    "text": [
      "text2-1", "text2-2", "text2-3"
    ]
  }]
}];

window.onload = function () {
  // console.log(document.getElementById("category").innerHTML);
  fillCategory();
};

function fillCategory() {
  let categoryIndex = 0;
  obj.forEach(function (element) {
    $("#category").append(createCategoryElement(element.category, categoryIndex));
    $("#cat-" + categoryIndex).on("click", function(){
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
    $("#subcat-" + subCategoryIndex).on("click",function(){      
      fillClipBoard(element);
    } );
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