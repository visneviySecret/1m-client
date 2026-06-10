import { Notyf } from "notyf";

let notyf: Notyf | undefined;

export function getNotyf() {
  if (!notyf) {
    notyf = new Notyf({
      duration: 3000,
      position: { x: "right", y: "bottom" },
      dismissible: true,
    });
  }

  return notyf;
}
