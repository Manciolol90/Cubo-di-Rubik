// Seleziona tutti i bottoni
var buttons = document.querySelectorAll("button");
var colonne = document.querySelectorAll(".colonna");

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

function ruotaFaccia(id){
    switch (id) {
        case "F":
            //gestione mosse facce adiacenti
            scambio_pixel(colonne[5].children[2], colonne[2].children[0], colonne[12].children[0], colonne[9].children[2])
            scambio_pixel(colonne[4].children[2], colonne[2].children[1], colonne[13].children[0], colonne[9].children[1])
            scambio_pixel(colonne[3].children[2], colonne[2].children[2], colonne[14].children[0], colonne[9].children[0])
            //gestione mosse faccia ruotata
            scambio_pixel(colonne[7].children[0], colonne[6].children[1], colonne[7].children[2], colonne[8].children[1])
            scambio_pixel(colonne[8].children[0], colonne[6].children[0], colonne[6].children[2], colonne[8].children[2])
            break;

        case "U":
            //gestione mosse facce adiacenti
            scambio_pixel(colonne[15].children[0], colonne[0].children[0], colonne[6].children[0], colonne[9].children[0])
            scambio_pixel(colonne[16].children[0], colonne[1].children[0], colonne[7].children[0], colonne[10].children[0])
            scambio_pixel(colonne[17].children[0], colonne[2].children[0], colonne[8].children[0], colonne[11].children[0])
            //gestione mosse faccia ruotata
            scambio_pixel(colonne[4].children[0], colonne[3].children[1], colonne[4].children[2], colonne[5].children[1])
            scambio_pixel(colonne[5].children[0], colonne[3].children[0], colonne[3].children[2], colonne[5].children[2])
            break;

        case "R":
            //gestione mosse facce adiacenti
            scambio_pixel(colonne[5].children[0], colonne[8].children[0], colonne[14].children[0], colonne[15].children[2])
            scambio_pixel(colonne[5].children[1], colonne[8].children[1], colonne[14].children[1], colonne[15].children[1])
            scambio_pixel(colonne[5].children[2], colonne[8].children[2], colonne[14].children[2], colonne[15].children[0])
            //gestione mosse faccia ruotata
            scambio_pixel(colonne[10].children[0], colonne[9].children[1], colonne[10].children[2], colonne[11].children[1])
            scambio_pixel(colonne[11].children[0], colonne[9].children[0], colonne[9].children[2], colonne[11].children[2])
            break;

        case "L":
            //gestione mosse facce adiacenti
            scambio_pixel(colonne[3].children[2], colonne[17].children[0], colonne[12].children[2], colonne[6].children[2])
            scambio_pixel(colonne[3].children[1], colonne[17].children[1], colonne[12].children[1], colonne[6].children[1])
            scambio_pixel(colonne[3].children[0], colonne[17].children[2], colonne[12].children[0], colonne[6].children[0])
            //gestione mosse faccia ruotata
            scambio_pixel(colonne[1].children[0], colonne[0].children[1], colonne[1].children[2], colonne[2].children[1])
            scambio_pixel(colonne[2].children[0], colonne[0].children[0], colonne[0].children[2], colonne[2].children[2])
            break;

        case "B":
            //gestione mosse facce adiacenti
            scambio_pixel(colonne[3].children[0], colonne[11].children[0], colonne[14].children[2], colonne[0].children[2])
            scambio_pixel(colonne[4].children[0], colonne[11].children[1], colonne[13].children[2], colonne[0].children[1])
            scambio_pixel(colonne[5].children[0], colonne[11].children[2], colonne[12].children[2], colonne[0].children[0])
            //gestione mosse faccia ruotata
            scambio_pixel(colonne[16].children[0], colonne[15].children[1], colonne[16].children[2], colonne[17].children[1])
            scambio_pixel(colonne[17].children[0], colonne[15].children[0], colonne[15].children[2], colonne[17].children[2])
            break;

        case "Bt":
            //gestione mosse facce adiacenti
            scambio_pixel(colonne[8].children[2], colonne[2].children[2], colonne[17].children[2], colonne[11].children[2])
            scambio_pixel(colonne[7].children[2], colonne[1].children[2], colonne[16].children[2], colonne[10].children[2])
            scambio_pixel(colonne[6].children[2], colonne[0].children[2], colonne[15].children[2], colonne[9].children[2])
            //gestione mosse faccia ruotata
            scambio_pixel(colonne[13].children[0], colonne[12].children[1], colonne[13].children[2], colonne[14].children[1])
            scambio_pixel(colonne[14].children[0], colonne[12].children[0], colonne[12].children[2], colonne[14].children[2])
            break;

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