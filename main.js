const body_content = document.querySelector("#body");
const btn_h1 = document.querySelector("#Heading_1");
const btn_h2 = document.querySelector("#Heading_2");
const btn_h3 = document.querySelector("#Heading_3");

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

// Global functions
function createEditLink(t) {
  const a = document.createElement("a");
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
}

const span = document.createElement("span");

body_content.addEventListener("click", (e) => {
  let hover = document.querySelectorAll(":hover");
  let t = hover.item(hover.length - 1);
  let target_local_name = t.localName;

  const p = document.createElement("p");
  p.style.cssText = paragraph_style;
  const br = document.createElement("br");
  p.appendChild(br);

  if (body_content.children.length < 1) {
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

    tools.forEach(e => {
      if (e.classList.contains("active") && e.textContent.match(/h/ig)) {

        switch(e.id) {
          case "Heading_1":
            span.textContent = "1";
            break;
          case "Heading_2":
            span.textContent = "2";
            break;
          case "Heading_3":
            span.textContent = "3";
            break;
          case "Heading_4":
            span.textContent = "4";
            break;
          case "Heading_5":
            span.textContent = "5";
            break;
          case "Heading_6":
            span.textContent = "6";
            break;
        }
      
        Heading.appendChild(span)
      }
    })


  }

  if (t.localName == "a") {
    const parent = document.createElement("div");
    const nameURL = document.createElement("span");
    const btnEdit = document.createElement("button");
    parent.style.cssText = `
    position: absolute;
    top: ${t.getBoundingClientRect().top}px;
    left: ${t.getBoundingClientRect().left}px;
    transform: translate(-50%, -50%);
    background-color: #333;
    color: #FFF;
    padding: 10px;
    `;
    nameURL.textContent = t.href;
    btnEdit.textContent = "Edit";

    parent.appendChild(nameURL);
    parent.appendChild(btnEdit);
    t.parentElement.appendChild(parent);

    btnEdit.onclick = function () {
      createEditLink(t);
      parent.remove();
    };
  }
});

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
  p.style.cssText = paragraph_style;
  h1.style.cssText = heading_style;
  h2.style.cssText = heading_style;
  h3.style.cssText = heading_style;
  h4.style.cssText = heading_style;
  h5.style.cssText = heading_style;
  h6.style.cssText = heading_style;



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
    if (t.style.fontStyle == "italic") {
      t.style.fontStyle = "";
    } else {
      t.style.fontStyle = "italic";
    }
  };

  btn_bold.onclick = function () {
    if (t.style.fontWeight == "bold") {
      t.style.fontWeight = "";
    } else {
      t.style.fontWeight = "bold";
    }
  };

  btn_color.onchange = function () {
    t.style.color = btn_color.value;
  };

  btn_link.onclick = function () {
    createEditLink(t);
  };
}
