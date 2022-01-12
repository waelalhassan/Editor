const iframe = document.querySelector("#editable");
const windowIframe = iframe.contentWindow;
const documentIframe = windowIframe.document;

documentIframe.body.contentEditable = true;
documentIframe.body.className = "body";
documentIframe.body.id = "body";
documentIframe.body.innerHTML = `<p style="margin-bottom: 10px; margin-top: 10px; margin-left:0; margin-right: 0; word-break: break-all"></br></p>`;

const parent_content = document.querySelector("#parent_content");
const body_content = iframe.contentWindow.document.querySelector("#body");
const btn_h1 = document.querySelector("#Heading_1");
const btn_h2 = document.querySelector("#Heading_2");
const btn_h3 = document.querySelector("#Heading_3");
const btn_h4 = document.querySelector("#Heading_4");
const btn_h5 = document.querySelector("#Heading_5");
const btn_h6 = document.querySelector("#Heading_6");
const fontSize = document.querySelector("#fontSize");
const toggle_fontSize = document.querySelector("#toggle_fontSize");
const toggle_fontSize_btns = document.querySelectorAll(
  "#toggle_fontSize button"
);

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

const paragraph_style = `margin-bottom: 10px; margin-top: 10px; margin-left:0; margin-right: 0; word-break: break-all;`;
const heading_style = `margin-bottom: 15px; margin-top: 15px`;
iframe.width = `${parent_content.getBoundingClientRect().width}`;

function handlePositionEl(el, list) {
  list.style.cssText = `
  top: ${el.getBoundingClientRect().top + el.offsetHeight}px;
  left: ${el.getBoundingClientRect().left}px;
  `;
}
handlePositionEl(Heading, toggle_heading);
handlePositionEl(fontSize, toggle_fontSize);

function dropdownMenu(el, list) {
  el.onmouseenter = function () {
    list.classList.add("active");
  };

  el.onmouseleave = function () {
    list.classList.remove("active");
  };

  list.onmouseenter = function () {
    list.classList.add("active");
  };

  list.onmouseleave = function () {
    list.classList.remove("active");
  };
}

dropdownMenu(Heading, toggle_heading);
dropdownMenu(fontSize, toggle_fontSize);

const spanHeading = documentIframe.createElement("span");
const parentEdit = documentIframe.createElement("div");
const nameURL = documentIframe.createElement("span");
const btnEdit = documentIframe.createElement("button");
const closeBtn = documentIframe.createElement("button");

const pFirst = documentIframe.createElement("p");
const br = documentIframe.createElement("br");
pFirst.appendChild(br);

//! fix first line of content
body_content.onkeyup = function () {
  if (!body_content.firstChild) {
    pFirst.style.cssText = paragraph_style;
    if (body_content.children.length < 1) {
      body_content.appendChild(pFirst);
    }
  }
};

body_content.onclick = function (e) {
  const t = e.target;
  //? prevent get target from body
  if (e.target.classList.contains("body")) {
    e.preventDefault();
  } else {
    getTarget(t);
  }

  function getTarget(t) {
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

    //-----------------------------------
    //? edit the target link
    //-----------------------------------

    if (t.localName == "a") {
      if (document.querySelector("#parent_add_new_link") == null) {
        parentEdit.className = "show-link";
        nameURL.textContent = t.href;
        btnEdit.textContent = "Edit";
        closeBtn.textContent = "Close";
        btnEdit.setAttribute("type", "button");
        parentEdit.style.cssText = `
      top: ${t.getBoundingClientRect().top + t.offsetHeight}px;
      left: ${t.getBoundingClientRect().left}px;
      `;

        parentEdit.appendChild(nameURL);
        parentEdit.appendChild(btnEdit);
        parentEdit.appendChild(closeBtn);
        parent_content.appendChild(parentEdit);

        btnEdit.onclick = function () {
          parentEdit.remove();
          const a = documentIframe.createElement("a");
          const parent_box = documentIframe.createElement("div");
          const actions = documentIframe.createElement("div");
          const input_text = documentIframe.createElement("input");
          const input_href = documentIframe.createElement("input");
          const save = documentIframe.createElement("button");
          const cancel = documentIframe.createElement("button");
          const check = documentIframe.createElement("input");
          const label = documentIframe.createElement("label");

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
          parent_box.style.cssText = `
        top: ${t.getBoundingClientRect().top + t.offsetHeight}px;
        left: ${t.getBoundingClientRect().left}px;
        `;

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
            const iRange = documentIframe.createRange();
            iRange.selectNode(t);
            iRange.insertNode(a);
            t.remove();
            parent_box.remove();
          };

          cancel.onclick = function () {
            parent_box.remove();
          };
        };

        closeBtn.onclick = function () {
          parentEdit.remove();
        };
      }
    }

    /*--------------------------
primary functionality
---------------------------*/

    const div = documentIframe.createElement("div");
    const h1 = documentIframe.createElement("h1");
    const h2 = documentIframe.createElement("h2");
    const h3 = documentIframe.createElement("h3");
    const h4 = documentIframe.createElement("h4");
    const h5 = documentIframe.createElement("h5");
    const h6 = documentIframe.createElement("h6");
    const p = documentIframe.createElement("p");

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
        let selection = windowIframe.getSelection();
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

          if (
            checkIfHasChildrens().parentElement.getAttribute("id") == "body"
          ) {
            if (checkIfHasChildrens().children.length > 0) {
              let dk = checkIfHasChildrens().childNodes;

              function getNewElement(tagName, contents, cssStyle, href) {
                let newElement = documentIframe.createElement(tagName);
                if (typeof tagName === "undefined") {
                  newElement = documentIframe.createTextNode(contents);
                } else {
                  newElement.style.color = cssStyle;
                  newElement.innerHTML = contents;
                  newElement.href = href;
                }
                return newElement;
              }

              for (let i of dk) {
                if (parentNode.localName !== textNode) {
                  checkIfHasChildrens().remove();
                  newNode.appendChild(
                    getNewElement(
                      i.localName,
                      i.textContent,
                      getColorSpan(),
                      i.href
                    )
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
                let nodeValue = documentIframe.createTextNode(
                  getRange.commonAncestorContainer.nodeValue
                );
                parentNode.remove();
                newNode.appendChild(nodeValue);
                getRange.insertNode(newNode);
              }
            }
          }
        }
        btn.parentElement.classList.remove("active")
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
      let nodeItalic = documentIframe.createElement("i");
      let iRange = windowIframe.getSelection();

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

          if (windowIframe.getSelection) {
            if (windowIframe.getSelection().empty) {
              windowIframe.getSelection().empty();
            } else if (windowIframe.getSelection().removeAllRanges) {
              windowIframe.getSelection().removeAllRanges();
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
      let nodeBold = documentIframe.createElement("b");
      let iRange = windowIframe.getSelection();

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

          if (windowIframe.getSelection) {
            if (windowIframe.getSelection().empty) {
              windowIframe.getSelection().empty();
            } else if (windowIframe.getSelection().removeAllRanges) {
              windowIframe.getSelection().removeAllRanges();
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

    const spanColor = documentIframe.createElement("span");
    btn_color.onclick = function () {
      let rng = windowIframe.getSelection();
      if (rng.rangeCount > 0) {
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
      }
    };

    //-----------------------------------
    //? create link tag
    //-----------------------------------
    const a = document.createElement("a");
    const parent = document.createElement("div");
    const actions = document.createElement("div");
    const input_text = document.createElement("input");
    const input_href = document.createElement("input");
    const save = document.createElement("button");
    const cancel = document.createElement("button");
    const check = document.createElement("input");
    const label = document.createElement("label");

    btn_link.onclick = function () {
      if (!t.classList.contains("body")) {
        document.querySelector("#parent_add_new_link")
          ? document.querySelector("#parent_add_new_link").remove()
          : "";

        document.querySelector(".show-link")
          ? document.querySelector(".show-link").remove()
          : "";

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
        parent.style.cssText = `
      top: ${t.getBoundingClientRect().top + t.offsetHeight}px;
      left: ${t.getBoundingClientRect().left}px;
      `;
        parent.appendChild(input_text);
        parent.appendChild(input_href);
        parent.appendChild(check);
        parent.appendChild(label);
        actions.appendChild(save);
        actions.appendChild(cancel);
        parent.appendChild(actions);
        parent_content.appendChild(parent);

        const selection = windowIframe.getSelection();
        input_text.value = selection.toString();

        createFakeMark();
        function createFakeMark() {
          const mark = documentIframe.createElement("mark");
          mark.style.color = "#FFF";
          mark.style.backgroundColor = "#308fff";
          mark.id = "fake_mark";
          let range = selection.getRangeAt(0);
          let selectNode = range.extractContents();
          mark.appendChild(selectNode);
          range.insertNode(mark);
        }

        function removeFakeMark() {
          const fake_mark = documentIframe.querySelector("#fake_mark");

          if (fake_mark) {
            const text_node = documentIframe.createTextNode(
              fake_mark.textContent
            );
            const csRange = documentIframe.createRange();
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
          const dRange = documentIframe.createRange();

          if (documentIframe.querySelector("#fake_mark").textContent.length == 0) {
            dRange.selectNode(t);
            dRange.insertNode(a);
            t.remove();
            parent.remove();
          } else {
            dRange.selectNode(documentIframe.querySelector("#fake_mark"));
            dRange.insertNode(a);
            documentIframe.querySelector("#fake_mark").remove();
            parent.remove();
          }
        };

        cancel.onclick = function () {
          removeFakeMark();
        };
      }
    };

    //-----------------------------------
    //? change font size
    //-----------------------------------

    toggle_fontSize_btns.forEach((e) => {
      e.onclick = function () {
        const data_size = this.getAttribute("data-size");
        t.style.fontSize = `${data_size}px`;
        e.parentNode.classList.remove("active")
      };
    });

    /*--------------------------
end primary functionality
---------------------------*/
  } // end getTarget
}; // end body_content

/*--------------------------
count words & letters
---------------------------*/
const parentInfo = documentIframe.createElement("div");
const nodeLengthLetters = documentIframe.createElement("p");
const nodeLengthWords = documentIframe.createElement("p");

body_content.addEventListener("keyup", () => {
  const content = body_content.textContent;
  const lengthOfLetters = content.trim();
  const lengthOfWords = content.trim().split(" ");

  if (lengthOfWords[0] == "") {
    lengthOfWords.pop();
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
