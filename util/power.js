import { click } from "../sound/index.js";
import { boot } from "./screens.js";
import { stopSpeaking } from "./speak.js";

/** Turn on the terminal */
async function on() {
  click();
  // await power();
  boot();
}

/** Turn off the terminal */
function off() {
  click();
  stopSpeaking();
  power(false);
}

async function power(on = true) {
  // @FIXME use a single class on the #monitor to detect on/off
  // document.querySelector("#slider").classList.toggle("on", on);
  // document.querySelector("#switch").checked = !on;
  // await pause(0.1);

  document.getElementById("crt").classList.toggle("turn-off", !on);
  document.getElementById("crt").classList.toggle("off", !on);
  return;
}

export { power, on, off };
