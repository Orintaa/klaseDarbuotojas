"use strict";
class Darbuotojas {
    constructor(_vardas, _pavarde, _atlyginimas) {
        this._vardas = _vardas;
        this._pavarde = _pavarde;
        this._atlyginimas = _atlyginimas;
    }
    get vardas() {
        return this._vardas;
    }
    get pavarde() {
        return this._pavarde;
    }
    get atlyginimas() {
        return this._atlyginimas;
    }
    gpm() {
        return this.atlyginimas * 0.2;
    }
    psd() {
        return this.atlyginimas * 0.0698;
    }
    vsd() {
        return this.atlyginimas * 0.1252;
    }
}
const btnPrideti = document.getElementById('prideti');
const btnIstrinti = document.getElementById('istrinti');
const inpVardas = document.getElementById('vardas');
const inpPavarde = document.getElementById('pavarde');
const inpAtlyginimas = document.getElementById('atlyginimas');
const output = document.getElementById("output");
const gpmSuma = document.getElementById('gpmSuma');
const vsdSuma = document.getElementById('vsdSuma');
const psdSuma = document.getElementById('psdSuma');
let imone = [];
// imone.push(new Darbuotojas('Jonas', 'Jonaitis', 2000));
// imone.push(new Darbuotojas('Petras', 'Petraitis', 1000));
// imone.push(new Darbuotojas('Juozas', 'Juozaitis', 3000));
let jsonString = localStorage.getItem('darbuotojas');
if (jsonString != null) {
    let data = JSON.parse(jsonString);
    data.forEach((obj) => {
        let darb = new Darbuotojas(obj._vardas, obj._pavarde, obj._atlyginimas);
        imone.push(darb);
    });
}
let outputImone = () => {
    if (output != null) {
        output.innerHTML = '';
        let gpmAll = 0;
        let psdAll = 0;
        let vsdAll = 0;
        imone.forEach((dirbantis, indeksas) => {
            gpmAll += dirbantis.gpm();
            psdAll += dirbantis.psd();
            vsdAll += dirbantis.vsd();
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = dirbantis.vardas + ", " + dirbantis.pavarde + ", atlyginimas: " + dirbantis.atlyginimas + ' Eur';
            const btn = document.createElement("button");
            btn.textContent = "istrinti";
            btn.className = "btn btn-danger float-end";
            btn.onclick = () => {
                deleteDarbuotojas(indeksas);
                console.log("Ištrynėme: " + dirbantis.vardas + " " + indeksas);
            };
            li.appendChild(btn);
            output.appendChild(li);
        });
        if (gpmSuma != null) {
            gpmSuma.textContent = gpmAll.toFixed(2) + 'Eur';
        }
        if (vsdSuma != null) {
            vsdSuma.textContent = vsdAll.toFixed(2) + 'Eur';
        }
        if (psdSuma != null) {
            psdSuma.textContent = psdAll.toFixed(2) + 'Eur';
        }
    }
};
let deleteDarbuotojas = (indeksas) => {
    imone.splice(indeksas, 1);
    outputImone();
    localStorage.setItem('darbuotojas', JSON.stringify(imone));
};
if (btnPrideti != null) {
    btnPrideti.onclick = () => {
        imone.push(new Darbuotojas(inpVardas.value, inpPavarde.value, inpAtlyginimas.valueAsNumber));
        outputImone();
        localStorage.setItem('darbuotojas', JSON.stringify(imone));
    };
}
if (btnIstrinti != null) {
    btnIstrinti.onclick = () => {
        deleteDarbuotojas(0);
        outputImone();
    };
}
outputImone();
