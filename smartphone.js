var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Definizione dell'abstract class UtenteSmartphone
var UtenteSmartphone = /** @class */ (function () {
    function UtenteSmartphone(nome, carica, numeroChiamate, registroChiamate, immagine // Aggiungi il parametro immagine al costruttore
    ) {
        if (carica === void 0) { carica = 0; }
        if (numeroChiamate === void 0) { numeroChiamate = 0; }
        if (registroChiamate === void 0) { registroChiamate = []; }
        this.nome = nome;
        this.carica = carica;
        this.numeroChiamate = numeroChiamate;
        this.registroChiamate = registroChiamate;
        this.immagine = immagine;
    }
    UtenteSmartphone.prototype.ricarica = function (unaRicarica) {
        this.carica += unaRicarica;
    };
    UtenteSmartphone.prototype.chiamata = function (minutiDurata) {
        var costoChiamata = minutiDurata * 0.20;
        if (costoChiamata <= this.carica) {
            this.carica -= costoChiamata;
            this.numeroChiamate++;
            var nuovaChiamata = {
                id: this.numeroChiamate,
                durata: minutiDurata,
                dataOra: new Date().toLocaleString()
            };
            this.registroChiamate.push(nuovaChiamata);
        }
        else {
            console.log("Credito insufficiente per effettuare la chiamata.");
        }
    };
    UtenteSmartphone.prototype.numero404 = function () {
        return this.carica;
    };
    UtenteSmartphone.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    UtenteSmartphone.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
    };
    return UtenteSmartphone;
}());
// Creazione degli utenti
var utenti = [
    new /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super.call(this, "Gandalf", 30, 2, [], "assets/gandalf.jpg") || this;
        }
        return class_1;
    }(UtenteSmartphone)),
    new /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super.call(this, "Sauron", 20, 1, [], "assets/sauron.jpg") || this;
        }
        return class_2;
    }(UtenteSmartphone)),
    new /** @class */ (function (_super) {
        __extends(class_3, _super);
        function class_3() {
            return _super.call(this, "Frodo", 50, 3, [], "assets/frodo.jpg") || this;
        }
        return class_3;
    }(UtenteSmartphone))
];
// Funzione per calcolare i minuti di chiamata possibili con il saldo residuo
function calcolaMinutiPossibili(saldoResiduo) {
    var costoChiamataAlMinuto = 0.20;
    return Math.floor(saldoResiduo / costoChiamataAlMinuto);
}
// Funzione per aggiornare i dati dell'utente sulla pagina HTML
function updateUserData(user, dataElement, callLogElement) {
    var saldoResiduo = user.numero404();
    var numeroChiamate = user.getNumeroChiamate();
    var minutiPossibili = calcolaMinutiPossibili(saldoResiduo);
    dataElement.innerHTML = "\n    <h2>".concat(user.nome, "</h2>\n    <img src=\"").concat(user.immagine, "\" alt=\"").concat(user.nome, "\" width=\"100\">\n    <p>Saldo Residuo: ").concat(saldoResiduo, " Euro</p>\n    <p>Numero di Chiamate: ").concat(numeroChiamate, "</p>\n    <p>Minuti di Chiamata Possibili: ").concat(minutiPossibili, " minuti</p>\n  ");
    // Aggiungi il registro delle chiamate
    callLogElement.innerHTML = "";
    user.registroChiamate.forEach(function (chiamata) {
        callLogElement.innerHTML += "\n      <li>\n        ID: ".concat(chiamata.id, " | Durata: ").concat(chiamata.durata, " min | Data/Ora: ").concat(chiamata.dataOra, "\n      </li>\n    ");
    });
}
// Aggiornamento dei dati e del registro delle chiamate per ogni utente
utenti.forEach(function (utente, index) {
    utente.ricarica(30 * (index + 1));
    utente.chiamata(10 + (5 * index));
    utente.chiamata(5 + (3 * index));
    var userDataElement = document.getElementById("userData".concat(index + 1));
    var userCallLogElement = document.getElementById("userCallLog".concat(index + 1));
    if (userDataElement && userCallLogElement) {
        updateUserData(utente, userDataElement, userCallLogElement);
    }
});
