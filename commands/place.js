// import { parse, type, prompt, input } from "./io.js";

async function place(position) {
  window.console.log("position: ", position);
  // Fetch the source code of this file as text :D
  let source = await fetch("../terminal.js").then((res) => res.text());
}

export default place;
