import { cylinder, leaf, sphere } from "./geometry";

export const data = {
  hilbert: {
    axiom: "A",
    productions: {
      A: "B-F+CFC+F-D&F^D-F+&&CFC+F+B//",
      B: "A&F^CFB^F^D^^-F-D^|F^B|FC^F^A//",
      C: "|D^|F^B-F+C^F^A&&FA&F^C+F+B^F^D//",
      D: "|CFB-F+B|FA&F^A&&FB-F+B|FC//",
    },
    models: {
      F: cylinder,
    },
    angle: 90,
    maxIterations: 4,
    redraw: false,
  },
  koch: {
    axiom: "&-XS-XS-XS-XS",
    productions: {
      X: "XS+XS-XS-XSXS+XS+XS-X",
      S: "F^F^F^F^F",
    },
    models: {
      F: cylinder,
    },
    angle: 90,
    maxIterations: 4,
    redraw: false,
  },
  bush: {
    axiom: "A",
    productions: {
      A: "[&FL!A]/////’[&FL!A]///////’[&FL!A]",
      F: "S/////F",
      S: "FL",
    },
    models: {
      F: cylinder,
    },
    angle: 22.5,
    maxIterations: 10,
    redraw: false,
  },
  bush2: {
    axiom: "A",
    productions: {
      A: "[&FL!A]/////’[&FL!A]///////’[&FL!A]",
      F: "S/////F",
      S: "FL",
    },
    models: {
      F: cylinder,
      L: sphere,
    },
    angle: 22.5,
    maxIterations: 10,
    redraw: false,
  },
  bush3: {
    axiom: "A",
    productions: {
      A: "[&FL!A]/////’[&FL!A]///////’[&FL!A]",
      F: "S/////F",
      S: "FL",
    },
    models: {
      F: cylinder,
      L: leaf,
    },
    angle: 22.5,
    maxIterations: 10,
    redraw: false,
  },
  plant: {
    axiom: "P",
    productions: {
      P: "I+[P+O]--//[--L]I[++L]-[PO]++PO",
      I: "FS[//&&L][//^^L]FS",
      S: "SFS",
      O: "[&&&E'/W////W////W////W////W]",
      E: "FF",
      W: "['^F][X]",
    },
    models: {
      F: cylinder,
      L: leaf,
      X: sphere,
    },
    angle: 18,
    maxIterations: 7,
    redraw: false,
  },
  plant2: {
    axiom: "P",
    productions: {
      P: "I+[P+O]--//[--L]I[++L]-[PO]++PO",
      I: "FS[//&&L][//^^L]FS",
      S: {
        successors: [
          { weight: 33, successor: "[//&&L][//^^L]FS" },
          { weight: 33, successor: "SFS" },
          { weight: 33, successor: "S" },
        ],
      },
      O: "[&&&E'/W////W////W////W////W]",
      E: "FF",
      W: "['^F][X]",
    },
    models: {
      F: cylinder,
      L: leaf,
      X: sphere,
    },
    angle: 18,
    maxIterations: 7,
    redraw: true,
  },
};
