console.log(
  "questo metodo segue la logica della soluzione a strati. è molto lontano dall'essere ottimizzato, ma è un inizio. Si parte dalla faccia bianca, eventualmente si può ampliare a tutte le facce."
);
// Seleziona tutti i bottoni
let buttons = document.querySelectorAll("button");
let colonne = document.querySelectorAll(".colonna");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", esegui_click);
}

/*----- MAPPATURA -----*/

const indice_faccia = { L: 0, U: 1, F: 2, R: 3, D: 4, B: 5 };
const faccia_by_indice = { 0: "L", 1: "U", 2: "F", 3: "R", 4: "D", 5: "B" };
const colore_by_indice = {
  0: "blu",
  1: "bianco",
  2: "arancione",
  3: "verde",
  4: "giallo",
  5: "rosso",
};

// === Spigoli ===
const spigoli = [
  ["UF", [indice_faccia.U, 1, 2], [indice_faccia.F, 1, 0]],
  ["UR", [indice_faccia.U, 2, 1], [indice_faccia.R, 1, 0]],
  ["UB", [indice_faccia.U, 1, 0], [indice_faccia.B, 1, 0]],
  ["UL", [indice_faccia.U, 0, 1], [indice_faccia.L, 1, 0]],

  ["DF", [indice_faccia.D, 1, 0], [indice_faccia.F, 1, 2]],
  ["DR", [indice_faccia.D, 2, 1], [indice_faccia.R, 1, 2]],
  ["DB", [indice_faccia.D, 1, 2], [indice_faccia.B, 1, 2]],
  ["DL", [indice_faccia.D, 0, 1], [indice_faccia.L, 1, 2]],

  ["FL", [indice_faccia.F, 0, 1], [indice_faccia.L, 2, 1]],
  ["FR", [indice_faccia.F, 2, 1], [indice_faccia.R, 0, 1]],
  ["BR", [indice_faccia.B, 0, 1], [indice_faccia.R, 2, 1]],
  ["BL", [indice_faccia.B, 2, 1], [indice_faccia.L, 0, 1]],
];

// === Angoli ===
const angoli = [
  [
    "ULF",
    [indice_faccia.U, 0, 2],
    [indice_faccia.L, 2, 0],
    [indice_faccia.F, 0, 0],
  ],
  [
    "URF",
    [indice_faccia.U, 2, 2],
    [indice_faccia.R, 0, 0],
    [indice_faccia.F, 2, 0],
  ],
  [
    "URB",
    [indice_faccia.U, 2, 0],
    [indice_faccia.R, 2, 0],
    [indice_faccia.B, 0, 0],
  ],
  [
    "ULB",
    [indice_faccia.U, 0, 0],
    [indice_faccia.L, 0, 0],
    [indice_faccia.B, 2, 0],
  ],

  [
    "DLF",
    [indice_faccia.D, 0, 0],
    [indice_faccia.L, 2, 2],
    [indice_faccia.F, 0, 2],
  ],
  [
    "DRF",
    [indice_faccia.D, 2, 0],
    [indice_faccia.R, 2, 2],
    [indice_faccia.F, 2, 2],
  ],
  [
    "DRB",
    [indice_faccia.D, 2, 2],
    [indice_faccia.R, 2, 2],
    [indice_faccia.B, 0, 2],
  ],
  [
    "DLB",
    [indice_faccia.D, 0, 2],
    [indice_faccia.L, 0, 2],
    [indice_faccia.B, 2, 2],
  ],
];

const rotationOrder = {
  U: ["B", "L", "F", "R"],
  F: ["U", "L", "D", "R"],
  R: ["U", "F", "D", "B"],
  B: ["U", "R", "D", "L"],
  L: ["U", "B", "D", "F"],
  D: ["F", "L", "B", "R"],
};

const rotationOrderCorner = {
  U: ["ULF", "URF", "URB", "ULB"],
  D: ["DLF", "DRF", "DRB", "DLB"],
  F: ["ULF", "URF", "DRF", "DLF"],
  B: ["URB", "ULB", "DLB", "DRB"],
  L: ["ULB", "ULF", "DLF", "DLB"],
  R: ["URF", "URB", "DRB", "DRF"],
};

/*===Funzione ruota faccia=== */

function ruotaFaccia(id) {
  console.log("Rotazione completa faccia:", id);

  // --- 1. Gestione SPIGOLI ---
  const risultato_spigoli = spigoli
    .filter((s) => s[0].includes(id))
    .map(([name, posA, posB]) => {
      const [a, b] = name.split("");
      if (a === id) {
        return { facce_coinvolte: [a, b], posizioni: [posA, posB] };
      } else {
        return { facce_coinvolte: [b, a], posizioni: [posB, posA] };
      }
    });

  const spigoli_ordinati = rotationOrder[id].map((adj) =>
    risultato_spigoli.find((s) => s.facce_coinvolte[1] === adj)
  );

  // Rotazione pixel della faccia ruotata (spigoli)
  const spigoliFacePixels = spigoli_ordinati.map((s) =>
    getPixel(getIndiceByLettera(id), s.posizioni[0][1], s.posizioni[0][2])
  );
  scambio_pixel(
    spigoliFacePixels[0],
    spigoliFacePixels[1],
    spigoliFacePixels[2],
    spigoliFacePixels[3]
  );

  // Rotazione pixel delle facce adiacenti (spigoli)
  const spigoliAdjPixels = spigoli_ordinati.map((s, i) =>
    getPixel(
      getIndiceByLettera(rotationOrder[id][i]),
      s.posizioni[1][1],
      s.posizioni[1][2]
    )
  );
  scambio_pixel(
    spigoliAdjPixels[0],
    spigoliAdjPixels[1],
    spigoliAdjPixels[2],
    spigoliAdjPixels[3]
  );
}

function getPixel(facciaIndice, colonna, riga) {
  const facce = document.querySelectorAll(".faccia"); // le facce del cubo
  const faccia = facce[facciaIndice]; // la faccia corretta. faccia indice va da 0 a 5 e lo prendo dall'oggetto indice_faccia
  const col = faccia.children[colonna]; // colonna
  const pixel = col.children[riga]; // pixel dentro la colonna
  return pixel;
}

function scambio_pixel(e1, e2, e3, e4) {
  var c1 = e1.classList[1];
  var c2 = e2.classList[1];
  var c3 = e3.classList[1];
  var c4 = e4.classList[1];

  // rotazione in senso orario
  e1.classList.remove(c1);
  e1.classList.add(c2);

  e2.classList.remove(c2);
  e2.classList.add(c3);

  e3.classList.remove(c3);
  e3.classList.add(c4);

  e4.classList.remove(c4);
  e4.classList.add(c1);
}

function getIndiceByLettera(lettera) {
  switch (lettera) {
    case "L":
      return 0;
    case "U":
      return 1;
    case "F":
      return 2;
    case "R":
      return 3;
    case "D":
      return 4;
    case "B":
      return 5;
    default:
      return null; // se non trova la lettera
  }
}
// Scambia le classi colore di 4 pixel in senso orario

/*----- BOTTONI -----*/

function esegui_click(event) {
  let id = event.target.id;
  switch (id) {
    case "F":
    case "U":
    case "R":
    case "L":
    case "B":
    case "D":
      ruotaFaccia(id);
      break;
    case "genera":
      generaMosseCasuali();
      break;
    case "mosse":
      aggiornaLogMosse();
      break;
    case "risolvi":
      risoluzione();
      break;
    default:
      console.log("Bottone non gestito:", id);
      break;
  }
}

/*----- GENERA MOSSE CASUALI -----*/

function generaMosseCasuali() {
  let numeroCasuale = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
  console.log("Scramble:", numeroCasuale, "mosse");

  let i = 0;
  function eseguiPasso() {
    if (i >= numeroCasuale) return;
    let indice = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    let id = buttons[indice].id;
    ruotaFaccia(id);
    i++;
    setTimeout(eseguiPasso, 50);
  }
  eseguiPasso();
}

/*----- RISOLUZIONE -----*/

function risoluzione() {
  console.log("Qui inizieremo la risoluzione...");
  // TODO: inserire funzioni per croce bianca, primo strato, ecc.
}
