// Definizione dell'interfaccia Smartphone
interface Smartphone {
  nome: string;
  carica: number;
  numeroChiamate: number;
  registroChiamate: Chiamata[];

  ricarica(unaRicarica: number): void;
  chiamata(minutiDurata: number): void;
  numero404(): number;
  getNumeroChiamate(): number;
  azzeraChiamate(): void;
}

// Interfaccia per i dati di una chiamata
interface Chiamata {
  id: number;
  durata: number;
  dataOra: string;
}

// Classe firstUser implementa l'interfaccia Smartphone
class FirstUser implements Smartphone {
  nome: string;
  carica: number = 0;
  numeroChiamate: number = 0;
  registroChiamate: Chiamata[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

  ricarica(unaRicarica: number): void {
    this.carica += unaRicarica;
  }

  chiamata(minutiDurata: number): void {
    const costoChiamata = minutiDurata * 0.20;
    if (costoChiamata <= this.carica) {
      this.carica -= costoChiamata;
      this.numeroChiamate++;
      const nuovaChiamata: Chiamata = {
        id: this.numeroChiamate,
        durata: minutiDurata,
        dataOra: new Date().toLocaleString()
      };
      this.registroChiamate.push(nuovaChiamata);
    } else {
      console.log("Credito insufficiente per effettuare la chiamata.");
    }
  }

  numero404(): number {
    return this.carica;
  }

  getNumeroChiamate(): number {
    return this.numeroChiamate;
  }

  azzeraChiamate(): void {
    this.numeroChiamate = 0;
  }
}

// Classe secondUser implementa l'interfaccia Smartphone
class SecondUser implements Smartphone {
  nome: string;
  carica: number = 0;
  numeroChiamate: number = 0;
  registroChiamate: Chiamata[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

  ricarica(unaRicarica: number): void {
    this.carica += unaRicarica;
  }

  chiamata(minutiDurata: number): void {
    const costoChiamata = minutiDurata * 0.20;
    if (costoChiamata <= this.carica) {
      this.carica -= costoChiamata;
      this.numeroChiamate++;
      const nuovaChiamata: Chiamata = {
        id: this.numeroChiamate,
        durata: minutiDurata,
        dataOra: new Date().toLocaleString()
      };
      this.registroChiamate.push(nuovaChiamata);
    } else {
      console.log("Credito insufficiente per effettuare la chiamata.");
    }
  }

  numero404(): number {
    return this.carica;
  }

  getNumeroChiamate(): number {
    return this.numeroChiamate;
  }

  azzeraChiamate(): void {
    this.numeroChiamate = 0;
  }
}

// Classe thirdUser implementa l'interfaccia Smartphone
class ThirdUser implements Smartphone {
  nome: string;
  carica: number = 0;
  numeroChiamate: number = 0;
  registroChiamate: Chiamata[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

  ricarica(unaRicarica: number): void {
    this.carica += unaRicarica;
  }

  chiamata(minutiDurata: number): void {
    const costoChiamata = minutiDurata * 0.20;
    if (costoChiamata <= this.carica) {
      this.carica -= costoChiamata;
      this.numeroChiamate++;
      const nuovaChiamata: Chiamata = {
        id: this.numeroChiamate,
        durata: minutiDurata,
        dataOra: new Date().toLocaleString()
      };
      this.registroChiamate.push(nuovaChiamata);
    } else {
      console.log("Credito insufficiente per effettuare la chiamata.");
    }
  }

  numero404(): number {
    return this.carica;
  }

  getNumeroChiamate(): number {
    return this.numeroChiamate;
  }

  azzeraChiamate(): void {
    this.numeroChiamate = 0;
  }
}

// Recupera i riferimenti agli elementi HTML in cui visualizzare i dati
const user1DataElement = document.getElementById("user1Data");
const user1CallLogElement = document.getElementById("user1CallLog");
const user2DataElement = document.getElementById("user2Data");
const user2CallLogElement = document.getElementById("user2CallLog");
const user3DataElement = document.getElementById("user3Data");
const user3CallLogElement = document.getElementById("user3CallLog");

// Funzione per calcolare i minuti di chiamata possibili con il saldo residuo
function calcolaMinutiPossibili(saldoResiduo: number): number {
  const costoChiamataAlMinuto = 0.20;
  return Math.floor(saldoResiduo / costoChiamataAlMinuto);
}

// Funzione per aggiornare i dati dell'utente sulla pagina HTML
function updateUserData(user: Smartphone, dataElement: HTMLElement, callLogElement: HTMLElement) {
  const saldoResiduo = user.numero404();
  const numeroChiamate = user.getNumeroChiamate();
  const minutiPossibili = calcolaMinutiPossibili(saldoResiduo);

  dataElement.innerHTML = `
    <h2>${user.nome}</h2>
    <p>Saldo Residuo: ${saldoResiduo} Euro</p>
    <p>Numero di Chiamate: ${numeroChiamate}</p>
    <p>Minuti di Chiamata Possibili: ${minutiPossibili} minuti</p>
  `;

  // Aggiungi il registro delle chiamate
  callLogElement.innerHTML = "";
  user.registroChiamate.forEach((chiamata) => {
    callLogElement.innerHTML += `
      <li>
        ID: ${chiamata.id} | Durata: ${chiamata.durata} min | Data/Ora: ${chiamata.dataOra}
      </li>
    `;
  });
}

// Utilizzo delle classi per verificare il saldo residuo e il numero di chiamate per ogni utente
const user1 = new FirstUser("Sauron");
const user2 = new SecondUser("Gandalf");
const user3 = new ThirdUser("Frodo");

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
