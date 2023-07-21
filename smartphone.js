// Classe firstUser implementa l'interfaccia Smartphone
var FirstUser = /** @class */ (function () {
    function FirstUser(nome) {
        this.carica = 0;
        this.numeroChiamate = 0;
        this.registroChiamate = [];
        this.nome = nome;
    }
    FirstUser.prototype.ricarica = function (unaRicarica) {
        this.carica += unaRicarica;
    };
    FirstUser.prototype.chiamata = function (minutiDurata) {
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
    FirstUser.prototype.numero404 = function () {
        return this.carica;
    };
    FirstUser.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    FirstUser.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
    };
    return FirstUser;
}());
// Classe secondUser implementa l'interfaccia Smartphone
var SecondUser = /** @class */ (function () {
    function SecondUser(nome) {
        this.carica = 0;
        this.numeroChiamate = 0;
        this.registroChiamate = [];
        this.nome = nome;
    }
    SecondUser.prototype.ricarica = function (unaRicarica) {
        this.carica += unaRicarica;
    };
    SecondUser.prototype.chiamata = function (minutiDurata) {
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
    SecondUser.prototype.numero404 = function () {
        return this.carica;
    };
    SecondUser.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    SecondUser.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
    };
    return SecondUser;
}());
// Classe thirdUser implementa l'interfaccia Smartphone
var ThirdUser = /** @class */ (function () {
    function ThirdUser(nome) {
        this.carica = 0;
        this.numeroChiamate = 0;
        this.registroChiamate = [];
        this.nome = nome;
    }
    ThirdUser.prototype.ricarica = function (unaRicarica) {
        this.carica += unaRicarica;
    };
    ThirdUser.prototype.chiamata = function (minutiDurata) {
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
    ThirdUser.prototype.numero404 = function () {
        return this.carica;
    };
    ThirdUser.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    ThirdUser.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
    };
    return ThirdUser;
}());
// Recupera i riferimenti agli elementi HTML in cui visualizzare i dati
var user1DataElement = document.getElementById("user1Data");
var user1CallLogElement = document.getElementById("user1CallLog");
var user2DataElement = document.getElementById("user2Data");
var user2CallLogElement = document.getElementById("user2CallLog");
var user3DataElement = document.getElementById("user3Data");
var user3CallLogElement = document.getElementById("user3CallLog");
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
    dataElement.innerHTML = "\n    <h2>".concat(user.nome, "</h2>\n    <p>Saldo Residuo: ").concat(saldoResiduo, " Euro</p>\n    <p>Numero di Chiamate: ").concat(numeroChiamate, "</p>\n    <p>Minuti di Chiamata Possibili: ").concat(minutiPossibili, " minuti</p>\n  ");
    // Aggiungi il registro delle chiamate
    callLogElement.innerHTML = "";
    user.registroChiamate.forEach(function (chiamata) {
        callLogElement.innerHTML += "\n      <li>\n        ID: ".concat(chiamata.id, " | Durata: ").concat(chiamata.durata, " min | Data/Ora: ").concat(chiamata.dataOra, "\n      </li>\n    ");
    });
}
// Utilizzo delle classi per verificare il saldo residuo e il numero di chiamate per ogni utente
var user1 = new FirstUser("Sauron");
var user2 = new SecondUser("Gandalf");
var user3 = new ThirdUser("Frodo");
user1.ricarica(30);
user1.chiamata(10);
user1.chiamata(5);
user2.ricarica(20);
user2.chiamata(15);
user3.ricarica(50);
user3.chiamata(30);
user3.chiamata(10);
user3.chiamata(5);
// Aggiorna i dati e il registro delle chiamate per ogni utente
updateUserData(user1, user1DataElement, user1CallLogElement);
updateUserData(user2, user2DataElement, user2CallLogElement);
updateUserData(user3, user3DataElement, user3CallLogElement);
