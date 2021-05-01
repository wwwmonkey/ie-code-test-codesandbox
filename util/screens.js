import clear from "../commands/clear.js";
import { parse, type, input } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";

/** Boot screen */
async function boot() {
  clear();
  // TODO: enable for LIVE
  // await type([
  //   "Welcome to IE CODE TEST VER1.0 terminal",
  //   " ",
  //   "> SET TERMINAL/BOOT",
  //   "Loading........................",
  //   "Please wait........",
  //   "..........",
  //   "...",
  //   ".",
  //   "OK.",
  //   " ",
  //   "> SET TERMINAL MODE=ROBOT",
  //   "> INPUT CMD OR HELP"
  // ]);
  // await pause();
  // say("INPUT ROBOT COMMAND");
  return main();
}

/** Main input terminal, recursively calls itself */
async function main() {
  let command = await input();
  try {
    await parse(command);
  } catch (e) {
    if (e.message) await type(e.message);
  }

  main();
}

function addClasses(el, ...cls) {
  let list = [...cls].filter(Boolean);
  el.classList.add(...list);
}

function getScreen(...cls) {
  let div = document.createElement("div");
  addClasses(div, "fullscreen", ...cls);
  document.querySelector("#crt").appendChild(div);
  return div;
}

function toggleFullscreen(isFullscreen) {
  document.body.classList.toggle("fullscreen", isFullscreen);
}

/** Attempts to load template HTML from the given path and includes them in the <head>. */
async function loadTemplates(path) {
  let txt = await fetch(path).then((res) => res.text());
  let html = new DOMParser().parseFromString(txt, "text/html");
  let templates = html.querySelectorAll("template");

  templates.forEach((template) => {
    document.head.appendChild(template);
  });
}

/** Clones the template and adds it to the container. */
async function addTemplate(id, container, options = {}) {
  let template = document.querySelector(`template#${id}`);
  if (!template) {
    throw Error("Template not found");
  }
  // Clone is the document fragment of the template
  let clone = document.importNode(template.content, true);

  if (template.dataset.type) {
    await type(clone.textContent, options, container);
  } else {
    container.appendChild(clone);
  }

  // We cannot return clone here
  // https://stackoverflow.com/questions/27945721/how-to-clone-and-modify-from-html5-template-tag
  return container.childNodes;
}

/** Creates a new screen and loads the given template into it. */
async function showTemplateScreen(id) {
  let screen = getScreen(id);
  await addTemplate(id, screen);
  return screen;
}

function el(type, container = document.querySelector(".terminal"), cls = "") {
  let el = document.createElement(type);
  addClasses(el, cls);

  container.appendChild(el);
  return el;
}

function div(...args) {
  return el("div", ...args);
}

export {
  boot,
  main,
  getScreen,
  toggleFullscreen,
  div,
  el,
  loadTemplates,
  addTemplate,
  showTemplateScreen
};
