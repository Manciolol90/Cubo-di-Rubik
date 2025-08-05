// Seleziona tutti i bottoni
var buttons = document.querySelectorAll("button");
var colonne = document.querySelectorAll(".colonna");
const rotazioni = {
    F: {
        adiacenti: [
            [5,2], [2,0], [12,0], [9,2],
            [4,2], [2,1], [13,0], [9,1],
            [3,2], [2,2], [14,0], [9,0]
        ],
        faccia: [
            [7,0], [6,1], [7,2], [8,1],
            [8,0], [6,0], [6,2], [8,2]
        ]
    },
    U: {
        adiacenti: [
            [15,0], [0,0], [6,0], [9,0],
            [16,0], [1,0], [7,0], [10,0],
            [17,0], [2,0], [8,0], [11,0]
        ],
        faccia: [
            [4,0], [3,1], [4,2], [5,1],
            [5,0], [3,0], [3,2], [5,2]
        ]
    },
    R: {
        adiacenti: [
            [5,0], [8,0], [14,0], [15,2],
            [5,1], [8,1], [14,1], [15,1],
            [5,2], [8,2], [14,2], [15,0]
        ],
        faccia: [
            [10,0], [9,1], [10,2], [11,1],
            [11,0], [9,0], [9,2], [11,2]
        ]
    },
    L: {
        adiacenti: [
            [3,2], [17,0], [12,2], [6,2],
            [3,1], [17,1], [12,1], [6,1],
            [3,0], [17,2], [12,0], [6,0]
        ],
        faccia: [
            [1,0], [0,1], [1,2], [2,1],
            [2,0], [0,0], [0,2], [2,2]
        ]
    },
    B: {
        adiacenti: [
            [3,0], [11,0], [14,2], [0,2],
            [4,0], [11,1], [13,2], [0,1],
            [5,0], [11,2], [12,2], [0,0]
        ],
        faccia: [
            [16,0], [15,1], [16,2], [17,1],
            [17,0], [15,0], [15,2], [17,2]
        ]
    },
    Bt: {
        adiacenti: [
            [8,2], [2,2], [17,2], [11,2],
            [7,2], [1,2], [16,2], [10,2],
            [6,2], [0,2], [15,2], [9,2]
        ],
        faccia: [
            [13,0], [12,1], [13,2], [14,1],
            [14,0], [12,0], [12,2], [14,2]
        ]
    }
};

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", esegui_click);
}

// Funzione di gestione click dei bottoni con switch
function esegui_click(event) {
    var id = event.target.id;

    switch (id) {
        case "F":
            ruotaFaccia("F");
            break;

        case "U":
            ruotaFaccia("U");
            break;

        case "R":
            ruotaFaccia("R");
            break;

        case "L":
            ruotaFaccia("L");
            break;

        case "B":
            ruotaFaccia("B");
            break;

        case "Bt":
            ruotaFaccia("Bt");
            break;
        case "genera":
            console.log("Generazione casuale");
            generaMosseCasuali();
            break;

        case "mosse":
            console.log("Mostra le mosse");
            aggiornaLogMosse();
            break;

        case "risolvi":
            console.log("Risoluzione del cubo");
            risoluzione();
            break;

        default:
            console.log("Bottone non gestito:", id);
            break;
    }
}

//funzione per gestire la rotazione in senso orario delle facce al click

function ruotaFaccia(id) {
    const config = rotazioni[id];
    if (!config) return;

    // Rotazione delle facce adiacenti (3 cicli da 4)
    for (let i = 0; i < config.adiacenti.length; i += 4) {
        const [a, b, c, d] = config.adiacenti.slice(i, i + 4)
            .map(([col, child]) => colonne[col].children[child]);
        scambio_pixel(a, b, c, d);
    }

    // Rotazione interna della faccia
    for (let i = 0; i < config.faccia.length; i += 4) {
        const [a, b, c, d] = config.faccia.slice(i, i + 4)
            .map(([col, child]) => colonne[col].children[child]);
        scambio_pixel(a, b, c, d);
    }
}

//funzione per gestire lo scambio del colore dei quadratini

function scambio_pixel(elem1, elem2, elem3, elem4) {
    const classe1 = elem1.classList[1];
    const classe2 = elem2.classList[1];
    const classe3 = elem3.classList[1];
    const classe4 = elem4.classList[1];

    // Scambio circolare delle classi
    elem1.classList.remove(classe1);
    elem1.classList.add(classe2);

    elem2.classList.remove(classe2);
    elem2.classList.add(classe3);

    elem3.classList.remove(classe3);
    elem3.classList.add(classe4);

    elem4.classList.remove(classe4);
    elem4.classList.add(classe1);
}

//funzione per gestire il bottone Genera

function generaMosseCasuali() {
    var numeroCasuale = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
    console.log("Numero di iterazioni: ", numeroCasuale);

    var i = 0;

    function eseguiPasso() {
        if (i >= numeroCasuale) {
            return; // Fine del ciclo
        }

        // Genera un numero da 3 a 8
        var indice = Math.floor(Math.random() * (8 - 3 + 1)) + 3;

        var id = buttons[indice].id;
        console.log(id);
        ruotaFaccia(id);
        i++;
        setTimeout(eseguiPasso, 50); // Chiama se stesso dopo 50ms
    }

    // Avvia il primo passo
    eseguiPasso();
}

//funzione per gestire la risoluzione del cubo (partiamo dalla faccia bianca, eventualmente ampliamo a tutte le facce)

function risoluzione (){
    console.log("magari fosse così facile :DDDD")
}

//funzione per creare la croce iniziale

//funzione per finire il primo strato

//funzione per finire il secondo strato

//funzione per creare la croce nel terzo strato

//funzione per creare finire la sesta faccia

//funzione per sistemare gli spigoli del terzo strato

//funzione per sistemare gli angoli del terzo strato