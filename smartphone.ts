// Definizione dell'interfaccia Chiamata
interface Chiamata {
  id: number;
  durata: number;
  dataOra: string;
}

// Definizione dell'abstract class UtenteSmartphone
abstract class UtenteSmartphone {
  constructor(
    public nome: string,
    public carica: number = 0,
    public numeroChiamate: number = 0,
    public registroChiamate: Chiamata[] = [],
    public immagine: string // Aggiungi il parametro immagine al costruttore
  ) {}

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

// Creazione degli utenti
const utenti: UtenteSmartphone[] = [
  new class extends UtenteSmartphone {
    constructor() {
      super("Gandalf", 30, 2, [], "assets/gandalf.jpg");
    }
  },
  new class extends UtenteSmartphone {
    constructor() {
      super("Sauron", 20, 1, [], "assets/sauron.jpg");
    }
  },
  new class extends UtenteSmartphone {
    constructor() {
      super("Frodo", 50, 3, [], "assets/frodo.jpg");
    }
  }
];

// Funzione per calcolare i minuti di chiamata possibili con il saldo residuo
function calcolaMinutiPossibili(saldoResiduo: number): number {
  const costoChiamataAlMinuto = 0.20;
  return Math.floor(saldoResiduo / costoChiamataAlMinuto);
}

// Funzione per effettuare la ricarica per un utente
function effettuaRicarica(userId: number): void {
  const importoRicaricaInput = document.getElementById(`ricaricaUser${userId}`) as HTMLInputElement;
  const importoRicarica = parseFloat(importoRicaricaInput.value);

  if (isNaN(importoRicarica)) {
    console.log("Importo ricarica non valido.");
    return;
  }

  if (userId > 0 && userId <= utenti.length) {
    const utente = utenti[userId - 1];
    utente.ricarica(importoRicarica);

    const userDataElement = document.getElementById(`userData${userId}`);
    const userCallLogElement = document.getElementById(`userCallLog${userId}`);

    if (userDataElement && userCallLogElement) {
      updateUserData(utente, userDataElement, userCallLogElement);
    }
  }
}

// Funzione per aggiornare i dati dell'utente sulla pagina HTML
function updateUserData(user: UtenteSmartphone, dataElement: HTMLElement, callLogElement: HTMLElement) {
  const saldoResiduo = user.numero404();
  const numeroChiamate = user.getNumeroChiamate();
  const minutiPossibili = calcolaMinutiPossibili(saldoResiduo);

  dataElement.innerHTML = `
    <h2>${user.nome}</h2>
    <img src="${user.immagine}" alt="${user.nome}" width="100">
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

// Aggiornamento dei dati e del registro delle chiamate per ogni utente
utenti.forEach((utente, index) => {
  utente.ricarica(30 * (index + 1));
  utente.chiamata(10 + (5 * index));
  utente.chiamata(5 + (3 * index));

  const userDataElement = document.getElementById(`userData${index + 1}`);
  const userCallLogElement = document.getElementById(`userCallLog${index + 1}`);

  if (userDataElement && userCallLogElement) {
    updateUserData(utente, userDataElement, userCallLogElement);
  }
});
