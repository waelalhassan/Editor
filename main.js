const body_content = document.querySelector("#body");
const btn_h1 = document.querySelector("#makeHeadding_1");
const btn_h2 = document.querySelector("#makeHeadding_2");
const btn_h3 = document.querySelector("#makeHeadding_3");

const tools = document.querySelectorAll("#tools button");
const btn_center = document.querySelector("#center");
const btn_link = document.querySelector("#link");
const btn_italic = document.querySelector("#italic");
const btn_bold = document.querySelector("#bold");
const btn_paragraph = document.querySelector("#paragraph");
const btn_left = document.querySelector("#left");
const btn_right = document.querySelector("#right");
const btn_default = document.querySelector("#default");
const btn_color = document.querySelector("#color");

body_content.addEventListener("click", (e) => {
  let hover = document.querySelectorAll(":hover");
  let t = hover.item(hover.length - 1);
  let target_local_name = t.localName;

  const p = document.createElement("p");
  p.style.cssText = `padding-bottom: 5px`;
  const br = document.createElement("br");
  p.appendChild(br);

  if (body_content.children.length <= 1) {
    if (body_content.firstChild.nodeName == "#text") {
      body_content.removeChild(body_content.firstChild);
      body_content.appendChild(p);
    }
  }

  if (e.target.classList.contains("body")) {
    e.preventDefault();
  } else {
    store_target(t);

    function real_node(ndoeName, btn) {
      for (let iv = 0; iv < tools.length; iv++) {
        if (target_local_name == ndoeName) {
          let du = 0;
          while (du < tools.length) {
            let dom = tools[du++];
            dom.classList.remove("active");
          }

          btn.classList.add("active");
        }
      }
    }

    real_node("p", btn_paragraph);
    real_node("h1", btn_h1);
    real_node("h2", btn_h2);
    real_node("h3", btn_h3);
    real_node("div", btn_default);
  }
});

body_content.addEventListener("dblclick", (e) => {
  const input_t_h = document.querySelectorAll(":hover");
  const input_t = input_t_h.item(input_t_h.length - 1);

  if (!input_t.classList.contains("body")) {
    handle_heighlight(input_t);
  }
});

function handle_heighlight(e) {
  console.log("run.. func");
  // let front_ele = document.createElement("font");
  btn_color.onchange = function () {
    let val = btn_color.value;

    let range, newNode;

    // front_ele.style.color = val

    // console.log(window.getSelection())
    // const start_pos = window.getSelection().extentOffset
    // const length_chars = window.getSelection().baseOffset
    // const text = e.textContent.trim().substr(start_pos, length_chars)
    // const all_text = window.getSelection().anchorNode.data;

    // let ele_target = e
    // let get_InnerHTML = ele_target.innerHTML;
    // let index = get_InnerHTML.indexOf(text);

    // if (index > -1) {
    //   ele_target = `${get_InnerHTML.substring(0, index)} <font style="color: ${val}">
    //     ${get_InnerHTML.substring(index, index+text.length)}
    //   </font>`
    // }

    // if (e.localName == "p") {
    //   let para = document.createElement("p");
    //   para.innerHTML = ele_target
    //   e.parentNode.appendChild(para);
    // }
  };
}

function store_target(t) {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const h5 = document.createElement("h5");
  const h6 = document.createElement("h6");
  const b = document.createElement("b");
  const i = document.createElement("i");
  const span = document.createElement("span");
  const p = document.createElement("p");
  const a = document.createElement("a");
  const target_index = Array.from(t.parentNode.children).indexOf(t);

  function main_function(btn, newNode, textNode) {
    btn.onclick = function () {
      let Range = document.createRange();
      newNode.textContent = t.textContent;
      if (t.localName != textNode) {
        Range.selectNode(t);
        Range.insertNode(newNode);
        t.remove();
      }
    };
  }

  main_function(btn_h1, h1, "h1");
  main_function(btn_h2, h2, "h2");
  main_function(btn_h3, h3, "h3");
  main_function(btn_paragraph, p, "p");
  main_function(btn_default, div, "div");
  // main_function(btn_link, link, "a");

  function handleTextAlign(btn, textAlignValue) {
    btn.onclick = function () {
      t.style.textAlign = textAlignValue;
    };
  }

  handleTextAlign(btn_center, "center");
  handleTextAlign(btn_left, "left");
  handleTextAlign(btn_right, "right");

  btn_italic.onclick = function () {
    t.style.fontStyle = "italic";
  };

  btn_bold.onclick = function () {
    t.style.fontWeight = "bold";
  };

  btn_color.onchange = function () {
    t.style.color = btn_color.value;
  };

  btn_link.onclick = function () {
    const parent = document.createElement("div");
    const input_text = document.createElement("input");
    const input_href = document.createElement("input");
    const save = document.createElement("button");
    const check = document.createElement("input");
    const label = document.createElement("label");
    save.textContent = "Save";
    save.setAttribute("type", "button");

    input_text.setAttribute("placeholder", "title");
    input_href.setAttribute("placeholder", "URL");
    input_text.setAttribute("type", "text");
    input_href.setAttribute("type", "text");
    check.setAttribute("type", "checkbox");
    check.setAttribute("value", "on");
    label.textContent = "Open the link in a new window";

    parent.style.cssText = `
    display: grid;
    position: absolute;
    top: ${t.getBoundingClientRect().top}px;
    left: ${t.getBoundingClientRect().left}px;
    transform: translate(-50%, -50%);`;

    parent.appendChild(input_text);
    parent.appendChild(input_href);
    parent.appendChild(check);
    parent.appendChild(label);
    parent.appendChild(save);
    btn_link.parentElement.appendChild(parent);

    save.onclick = function () {
      const title = input_text.value;
      const link_h = input_href.value;
      a.textContent = title;
      a.href = link_h;

      if (check.checked == true) a.setAttribute("target", "_blank");

      let range = document.createRange();

      range.selectNode(t);
      range.insertNode(a);
      t.remove();
      parent.remove();
    };
  };
}

// selectNodeContents
// surroundContents
// selectNode
// insertNode
// window.createRange()
// window.createRange().surroundContents()
// Node.cloneNode()
// window.getSelection()
// window.getSelection().getRangeAt(0).commonAncestorContainer
// appendChild
// insertBefore
// insertBefore + nextSibling
// replaceChild
