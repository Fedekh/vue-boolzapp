// Oggi iniziamo a realizzare Boolzapp 
// Milestone 1:
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi)
//e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for,
// visualizzare nome e immagine di ogni contatto.
// Consigli del giorno:
// - scegliete con attenzione gli strumenti che utilizzerete;

// - tenete in mente le funzionalità che dovranno essere implementate nei giorni successive.
//  La struttura realizzata mi faciliterà rendere il tutto dinamico? 
//Forse mi serve una classe per distinguere i messaggi innviati da quelli ricevuti?

const { createApp } = Vue;

createApp({
    data() {
        return {
            textSent: "",   //testo nella text area
            textUser: "",    // messaggio personale
            textContact: "", // messaggio contatto
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            chatActived: null,  //chat attiva
            textSent: "",   // testo nella text area
            textUser: "",   // messaggio personale
            textContact: "",   // messaggio contatto
        }
    },
    methods: {
        getLastMessage(contact) {
            const lastMessage = contact.messages[contact.messages.length - 1];
            return lastMessage ? lastMessage.message : '';
        },
        getLastMessageDate(contact) {
            const lastMessage = contact.messages[contact.messages.length - 1];
            if (lastMessage) {
                const lastMessageTime = lastMessage.date.slice(11, 16); // il primo argomento indica l'indice di inizio della sottostringa (incluso), mentre il secondo argomento indica l'indice di fine della sottostringa (escluso).
                return lastMessageTime;
            }
            return '';
        },
        chatActive(element) {       //al click su una chat SX compaiono le info in alto dx 
            this.chatActived = {
                name: element.name,
                avatar: element.avatar,
                lastMessageDate: element.messages[element.messages.length - 1].date.slice(11, 16),
                lastMessage: element.messages[element.messages.length - 2]
            };
            console.log(element);
        },
        getLastChat(contact) {
            if (contact && contact.messages) {
                const lastMessages = contact.messages.slice(-3);
                return lastMessages ? lastMessages : [];
            }
            return [];
        }
    }
}).mount("#app");
