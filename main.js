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

  $("#subCateg").iziModal();
  $("#clip").iziModal();

  //onclick
  $('.btn').on("click", function (event) {
    var lien = "writer.php?";
    if ($("#categInput")[0].value.length > 0)
      lien += "cat=" + $("#categInput")[0].value;
    $.ajax({
      url: lien
    }).done(function () {
      updateObj();
    })
  })

  $('.btnSubCateg').on("click", function (event) {
    var lien = "writer.php?";
    if ($("#sousCategInput")[0].value.length > 0) {
      lien += "cat=" + $("#subCateg").attr("categorie") + "&subCateg=" + $("#sousCategInput")[0].value;
    }
    $.ajax({
      url: lien
    }).done(function () {
      updateSubCategory($("#subCateg").attr("categorie"));
    })
  })

  $('.btnClip').on("click", function (event) {
    var lien = "writer.php?";
    lien += "cat=" + $("#clip").attr("categorie") + "&subCateg=" + $("#clip").attr("souscateg") + "&clip=" + $("#clipInput")[0].value;
    $.ajax({
      url: lien
    }).done(function () {
      updateClip($("#clip").attr("categorie"), $("#clip").attr("souscateg"));
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

function updateSubCategory(categoryName) {
  updateObj();
  obj.forEach(function (element) {
    if (element.category === categoryName) {
      fillSubCategory(element);
    }
  })
}

function updateClip(categoryName, subCategoryName) {
  updateObj();
  obj.forEach(function (element) {
    if (element.category === categoryName) {
      var subCategList = element.value;
      subCategList.forEach(function (value) {
        if(value.subCategory === subCategoryName)
          fillClipBoard(element,value);
      })
    }
  })
}

function fillSubCategory(category) {
  let subCategoryIndex = 0;
  let valueArray = category.value;
  $("#subCategory").html("");
  createAddSubCategoryButton(category);
  valueArray.forEach(function (element) {
    $("#subCategory").append(createSubCategoryElement(element.subCategory, subCategoryIndex));
    $("#subcat-" + subCategoryIndex).on("click", function () {
      fillClipBoard(category, element);
    });
    subCategoryIndex++;
  });
}

function fillClipBoard(category, subCategory) {
  let clipIndex = 0;
  let textArray = subCategory.text;
  $("#clipboard").html("");
  createAddClipBoardButton(category, subCategory);
  if(textArray==null || textArray == undefined)
    return;
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
  let textArea = '<div id="text-' + index + '" class="clipBoardContent">' + content + '</div>';
  let trigger = '<!-- Trigger --><div class="btn" data-clipboard-target="#text-' + index + '">Copy</div>';
  clipBoardContent += textArea;
  clipBoardContent += trigger;
  clipBoardContent += '</div>';
  return clipBoardContent;

}

function createAddCategoryButton() {
  let newButton = '<div class="trigger categoryElement" ><img class="img-btn" src="plus.png"/></div>';
  $("#category").append(newButton);
}

function createAddSubCategoryButton(category) {
  let newButton = '<div categorie="' + category.category + '" class="trigger subCategoryElement"><img class="img-btn" src="plus.png"/></div>';
  $("#subCategory").append(newButton);
}

function createAddClipBoardButton(category, subCategory) {
  let newButton = '<div categorie="' + category.category + '" souscateg="' + subCategory.subCategory + '" class="trigger clipBoardElement"><img class="img-btn" src="plus.png"/></div>';
  $("#clipboard").append(newButton);
}

$(document).on('click', '.trigger', function (event) {
  event.preventDefault();
  // $('#modal').iziModal('setZindex', 99999);
  // $('#modal').iziModal('open', { zindex: 99999 });
  if (event.currentTarget.className.includes("clipBoard")) {
    var category = event.currentTarget.getAttribute("categorie");
    var subCategory = event.currentTarget.getAttribute("souscateg");
    $("#clip").attr("categorie", category);
    $("#clip").attr("souscateg", subCategory);
    $('#clip').iziModal('open');
  } else if (event.currentTarget.className.includes("subCategoryElement")) {
    var category = event.currentTarget.getAttribute("categorie");
    $('#subCateg').attr("categorie", category);
    $('#subCateg').iziModal('open');
  } else {
    $('#modal').iziModal('open');
  }
});



