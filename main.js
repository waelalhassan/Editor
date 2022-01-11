const parent_content = document.querySelector("#parent_content");
const body_content = document.querySelector("#body");
const btn_h1 = document.querySelector("#Heading_1");
const btn_h2 = document.querySelector("#Heading_2");
const btn_h3 = document.querySelector("#Heading_3");
const btn_h4 = document.querySelector("#Heading_4");
const btn_h5 = document.querySelector("#Heading_5");
const btn_h6 = document.querySelector("#Heading_6");

const tools = document.querySelectorAll("#tools button");
const Heading = document.querySelector("#Heading");
const toggle_heading = document.querySelector("#toggle-heading");

const btn_center = document.querySelector("#center");
const btn_link = document.querySelector("#link");
const btn_italic = document.querySelector("#italic");
const btn_bold = document.querySelector("#bold");
const btn_paragraph = document.querySelector("#paragraph");
const btn_left = document.querySelector("#left");
const btn_right = document.querySelector("#right");
const btn_default = document.querySelector("#default");
const btn_color = document.querySelector("#color");

const paragraph_style = `padding-bottom: 10px;
word-break: break-all;`;
const heading_style = `margin-bottom: 10px`;

Heading.onmouseenter = function () {
  toggle_heading.classList.add("active");
};

toggle_heading.onmouseenter = function () {
  toggle_heading.classList.add("active");
};

Heading.onmouseleave = function () {
  toggle_heading.classList.remove("active");
};

toggle_heading.onmouseleave = function () {
  toggle_heading.classList.remove("active");
};

const spanHeading = document.createElement("span");
const parent = document.createElement("div");
const nameURL = document.createElement("span");
const btnEdit = document.createElement("button");

body_content.addEventListener("click", (e) => {
  const t = e.target;
  const pFirst = document.createElement("p");

  pFirst.style.cssText = paragraph_style;
  const br = document.createElement("br");
  pFirst.appendChild(br);

  //! fix first line of content
  if (body_content.children.length < 1) {
    if (body_content.firstChild.nodeName == "#text") {
      body_content.removeChild(body_content.firstChild);
      body_content.appendChild(p);
    }
  }

  //? prevent get target from body
  if (e.target.classList.contains("body")) {
    e.preventDefault();
  } else {
    //-----------------------------------
    //? knowledge the target element and what the style of it
    //-----------------------------------
    function realNode(ndoeName, btn) {
      for (let iv = 0; iv < tools.length; iv++) {
        if (t.localName == ndoeName) {
          let du = 0;
          while (du < tools.length) {
            let dom = tools[du++];
            dom.classList.remove("active");
          }
          btn.classList.add("active");
        }
      }
    }

    function realNodeTextAlign(btn, value) {
      if (t.style.textAlign == value) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }

    realNode("p", btn_paragraph);
    realNode("h1", btn_h1);
    realNode("h2", btn_h2);
    realNode("h3", btn_h3);
    realNode("h4", btn_h4);
    realNode("h5", btn_h5);
    realNode("h4", btn_h6);
    realNode("div", btn_default);

    if (t.style.fontWeight == "bold") {
      btn_bold.classList.add("active");
    } else {
      btn_bold.classList.remove("active");
    }

    if (t.style.fontStyle == "italic") {
      btn_italic.classList.add("active");
    } else {
      btn_italic.classList.remove("active");
    }

    realNodeTextAlign(btn_left, "left");
    realNodeTextAlign(btn_right, "right");
    realNodeTextAlign(btn_center, "center");

    tools.forEach((e) => {
      if (e.classList.contains("active") && e.textContent.match(/h/gi)) {
        switch (e.id) {
          case "Heading_1":
            spanHeading.textContent = "1";
            break;
          case "Heading_2":
            spanHeading.textContent = "2";
            break;
          case "Heading_3":
            spanHeading.textContent = "3";
            break;
          case "Heading_4":
            spanHeading.textContent = "4";
            break;
          case "Heading_5":
            spanHeading.textContent = "5";
            break;
          case "Heading_6":
            spanHeading.textContent = "6";
            break;
        }

        Heading.appendChild(spanHeading);
      }
    });
  }

  //-----------------------------------
  //? edit the target link
  //-----------------------------------

  if (t.localName == "a") {
    if (document.querySelector("#parent_add_new_link") == null) {
      parent.className = "show-link";
      nameURL.textContent = t.href;
      btnEdit.textContent = "Edit";
      btnEdit.setAttribute("type", "button");

      parent.appendChild(nameURL);
      parent.appendChild(btnEdit);
      parent_content.appendChild(parent);

      btnEdit.onclick = function () {
        parent.remove();
        const a = document.createElement("a");
        const parent_box = document.createElement("div");
        const actions = document.createElement("div");
        const input_text = document.createElement("input");
        const input_href = document.createElement("input");
        const save = document.createElement("button");
        const cancel = document.createElement("button");
        const check = document.createElement("input");
        const label = document.createElement("label");

        save.textContent = "Save";
        cancel.textContent = "Cancel";
        save.setAttribute("type", "button");
        cancel.setAttribute("type", "button");

        input_text.setAttribute("placeholder", "New Title");
        input_href.setAttribute("placeholder", "New URL");
        input_text.setAttribute("type", "text");
        input_href.setAttribute("type", "text");
        check.setAttribute("type", "checkbox");
        check.setAttribute("value", "on");
        label.setAttribute("for", "adding_new_url");
        check.setAttribute("id", "adding_new_url");
        label.textContent = "Open the link in a new window";
        parent_box.className = "add-edit-link";
        parent_box.className = "add-edit-link";
        parent_box.id = "parent_edit_link";

        parent_box.appendChild(input_text);
        parent_box.appendChild(input_href);
        parent_box.appendChild(check);
        parent_box.appendChild(label);
        actions.appendChild(save);
        actions.appendChild(cancel);
        parent_box.appendChild(actions);
        parent_content.appendChild(parent_box);

        save.onclick = function () {
          a.textContent = input_text.value;
          a.href = input_href.value;
          const iRange = document.createRange();
          iRange.selectNode(t);
          iRange.insertNode(a);
          t.remove();
          parent_box.remove();
        };

        cancel.onclick = function () {
          parent_box.remove();
        };
      };
    }
  }

  /*--------------------------
primary functionality
---------------------------*/

  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const h5 = document.createElement("h5");
  const h6 = document.createElement("h6");
  const p = document.createElement("p");

  p.style.cssText = paragraph_style;
  h1.style.cssText = heading_style;
  h2.style.cssText = heading_style;
  h3.style.cssText = heading_style;
  h4.style.cssText = heading_style;
  h5.style.cssText = heading_style;
  h6.style.cssText = heading_style;

  //-----------------------------------
  //? create headings & paragraph
  //-----------------------------------
  function main_function(btn, newNode, textNode) {
    btn.onclick = function () {
      let selection = window.getSelection();
      if (selection.rangeCount > 0) {
        let getRange = selection.getRangeAt(0);
        let parentNode = getRange.startContainer.parentNode;

        function checkIfHasChildrens() {
          if (parentNode.localName == "span") {
            return parentNode.parentElement;
          } else {
            return parentNode;
          }
        }

        if (checkIfHasChildrens().parentElement.getAttribute("id") == "body") {
          if (checkIfHasChildrens().children.length > 0) {
            let dk = checkIfHasChildrens().childNodes;
            console.log(dk);

            function getNewElement(tagName, contents, cssStyle) {
              let newElement = document.createElement(tagName);
              if (typeof tagName === "undefined") {
                newElement = document.createTextNode(contents);
              } else {
                newElement.style.color = cssStyle;
                newElement.innerHTML = contents;
              }
              return newElement;
            }

            for (let i of dk) {
              if (parentNode.localName !== textNode) {
                checkIfHasChildrens().remove();
                newNode.appendChild(
                  getNewElement(i.localName, i.textContent, getColorSpan())
                );
                getRange.insertNode(newNode);

                function getColorSpan() {
                  if (i.localName == "span") {
                    return i.style.color;
                  }
                }
              }
            }
          } else {
            if (parentNode.localName !== textNode) {
              let nodeValue = document.createTextNode(
                getRange.commonAncestorContainer.nodeValue
              );
              parentNode.remove();
              newNode.appendChild(nodeValue);
              getRange.insertNode(newNode);
            }
          }
        }
      }
    };
  }

  main_function(btn_h1, h1, "h1");
  main_function(btn_h2, h2, "h2");
  main_function(btn_h3, h3, "h3");
  main_function(btn_h4, h4, "h4");
  main_function(btn_h5, h5, "h5");
  main_function(btn_h6, h6, "h6");
  main_function(btn_paragraph, p, "p");
  main_function(btn_default, div, "div");

  //-----------------------------------
  //? make the text in [left, center, right]
  //-----------------------------------
  function handleTextAlign(btn, textAlignValue) {
    btn.onclick = function () {
      t.style.textAlign = textAlignValue;
    };
  }

  handleTextAlign(btn_center, "center");
  handleTextAlign(btn_left, "left");
  handleTextAlign(btn_right, "right");

  //-----------------------------------
  //? make the text italic
  //-----------------------------------
  btn_italic.onclick = function () {
    let nodeItalic = document.createElement("i");
    let iRange = window.getSelection();

    if (iRange.rangeCount > 0) {
      let getR = iRange.getRangeAt(0);
      let selectedText = getR.extractContents();
      let checkIfSelectedText = selectedText.childNodes.length;

      if (checkIfSelectedText >= 1) {
        if (t.localName == "b") {
          getR.selectNode(t);
          getR.insertNode(selectedText);
          t.remove();
        } else {
          nodeItalic.appendChild(selectedText);
          getR.insertNode(nodeItalic);
        }

        if (window.getSelection) {
          if (window.getSelection().empty) {
            window.getSelection().empty();
          } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
          }
        }
      } else {
        if (t.style.fontStyle == "italic") {
          t.style.fontStyle = "";
        } else {
          t.style.fontStyle = "italic";
        }
      }
    }
  };

  //-----------------------------------
  //? make the text bold
  //-----------------------------------
  btn_bold.onclick = function () {
    let nodeBold = document.createElement("b");
    let iRange = window.getSelection();

    if (iRange.rangeCount > 0) {
      let getR = iRange.getRangeAt(0);
      let selectedText = getR.extractContents();
      let checkIfSelectedText = selectedText.childNodes.length;

      if (checkIfSelectedText >= 1) {
        if (t.localName == "b") {
          getR.selectNode(t);
          getR.insertNode(selectedText);
          t.remove();
        } else {
          nodeBold.appendChild(selectedText);
          getR.insertNode(nodeBold);
        }

        if (window.getSelection) {
          if (window.getSelection().empty) {
            window.getSelection().empty();
          } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
          }
        }
      } else {
        if (t.style.fontWeight == "bold") {
          t.style.fontWeight = "";
        } else {
          t.style.fontWeight = "bold";
        }
      }
    }
  };

  //-----------------------------------
  //? change color selected string
  //-----------------------------------
  const spanColor = document.createElement("span");
  btn_color.onclick = function () {
    let rng = window.getSelection();
    let getRange = rng.getRangeAt(0);

    btn_color.onchange = function () {
      let selection = getRange.extractContents();
      let isThereSelection = selection.childNodes.length;
      let targetNode = getRange.startContainer.parentNode;

      spanColor.style.color = btn_color.value;
      if (rng.rangeCount > 0) {
        if (isThereSelection > 0) {
          if (targetNode.localName == "span") {
            targetNode.remove();
            spanColor.appendChild(selection);
            getRange.insertNode(spanColor);
          } else {
            spanColor.appendChild(selection);
            getRange.insertNode(spanColor);
          }
        } else {
          targetNode.style.color = btn_color.value;
        }
      }
    };
  };

  //-----------------------------------
  //? create link tag
  //-----------------------------------
  btn_link.onclick = function () {
    const a = document.createElement("a");
    const parent = document.createElement("div");
    const actions = document.createElement("div");
    const input_text = document.createElement("input");
    const input_href = document.createElement("input");
    const save = document.createElement("button");
    const cancel = document.createElement("button");
    const check = document.createElement("input");
    const label = document.createElement("label");

    save.textContent = "Save";
    cancel.textContent = "Cancel";
    save.setAttribute("type", "button");
    cancel.setAttribute("type", "button");

    input_text.setAttribute("placeholder", "TITLE");
    input_href.setAttribute("placeholder", "URL");
    input_text.setAttribute("type", "text");
    input_href.setAttribute("type", "text");
    check.setAttribute("type", "checkbox");
    check.setAttribute("value", "on");
    label.setAttribute("for", "adding_new_url");
    check.setAttribute("id", "adding_new_url");
    label.textContent = "Open the link in a new window";
    parent.className = "add-edit-link";
    parent.id = "parent_add_new_link";

    parent.appendChild(input_text);
    parent.appendChild(input_href);
    parent.appendChild(check);
    parent.appendChild(label);
    actions.appendChild(save);
    actions.appendChild(cancel);
    parent.appendChild(actions);
    parent_content.appendChild(parent);

    const selection = window.getSelection();
    input_text.value = selection.toString();

    createFakeMark();
    function createFakeMark() {
      const mark = document.createElement("mark");
      mark.style.color = "#FFF";
      mark.style.backgroundColor = "#308fff";
      mark.id = "fake_mark";
      let range = selection.getRangeAt(0);
      let selectNode = range.extractContents();
      mark.appendChild(selectNode);
      range.insertNode(mark);
    }

    function removeFakeMark() {
      const fake_mark = document.querySelector("#fake_mark");

      if (fake_mark) {
        const text_node = document.createTextNode(fake_mark.textContent);
        const csRange = document.createRange();
        csRange.selectNode(fake_mark);
        csRange.insertNode(text_node);
        fake_mark.remove();
      }

      parent.remove();
    }

    save.onclick = function () {
      const title = input_text.value;
      const link_h = input_href.value;
      a.textContent = title;
      a.href = link_h;
      if (check.checked == true) a.setAttribute("target", "_blank");
      const dRange = document.createRange();

      if (dRange.toString() == "") {
        dRange.selectNode(t);
        dRange.insertNode(a)
        t.remove();
      } else {
        dRange.selectNode(document.querySelector("#fake_mark"));
        dRange.insertNode(a);
        document.querySelector("#fake_mark").remove();
      }
      parent.remove();
    };

    cancel.onclick = function () {
      removeFakeMark();
    };
  };

  /*--------------------------
end primary functionality
---------------------------*/
}); // end body_content

/*--------------------------
count words & letters
---------------------------*/
const parentInfo = document.createElement("div");
const nodeLengthLetters = document.createElement("p");
const nodeLengthWords = document.createElement("p");

body_content.addEventListener("keyup", () => {
  const content = body_content.textContent;
  const lengthOfLetters = content.trim();
  const lengthOfWords = content.trim().split(" ");

  if (lengthOfWords[0] == "") {
    lengthOfWords.unshift();
  }

  nodeLengthLetters.textContent = `Length letters: ${lengthOfLetters.length}`;
  nodeLengthWords.textContent = `Length Words: ${lengthOfWords.length}`;
  parentInfo.className = "length-letters-words";

  parentInfo.appendChild(nodeLengthLetters);
  parentInfo.appendChild(nodeLengthWords);
  parent_content.appendChild(parentInfo);
});

/*--------------------------
end count words & letters
---------------------------*/
