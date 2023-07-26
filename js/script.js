// Milestone 5 - opzionale
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato
// ● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

const { createApp } = Vue;
const dt = luxon.DateTime;console.log(dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS));
createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received',
                            showMenu: false
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
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',
                            showMenu: false
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                            showMenu: false
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
                            status: 'received',
                            showMenu: false
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received',
                            showMenu: false
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
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                            showMenu: false
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
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received',
                            showMenu: false
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
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent',
                            showMenu: false
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
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received',
                            showMenu: false
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
                            status: 'received',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent',
                            showMenu: false
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received',
                            showMenu: false
                        }
                    ],
                }
            ],

            chatCurrent: null,      //chat attiva
            currentMessage: "",     //selezioniamo l'attuale emssaggio in main window
            newMessage: "",         //ci scriveremo un nuovo messaggio dopo aver aperto una chat
            filterFriend: "",       //ci servirà per filtrare un amico nella ricerca
        }
    },
    methods: {
        
        //riusciamo a selezionare un elemento nella lista sx e gestirlo
        currentChat(element) {
            this.chatCurrent = element;
            this.currentMessage = element.messages;
        },

        //serve per inserire un nuovo messaggio e un auto messaggio di risposta
        //dopo aver cliccato una qualsiasi chat a sx
        insertMessage(element) {
            let currentDate = luxon.DateTime.now().setZone('Europe/Rome').toFormat('yyyy-MM-dd HH:mm:ss');
            if (this.newMessage !== "") {
                element.messages.push({
                    date: currentDate,
                    message: this.newMessage,
                    status: 'sent'
                });
                this.newMessage = "";
        
                // Risposta automatica dopo un secondo
                setTimeout(() => {
                    let currentDate = luxon.DateTime.now().setZone('Europe/Rome').toFormat('yyyy-MM-dd HH:mm:ss');
                    element.messages.push({
                        date: currentDate,
                        message: "Ciao caro sono assente per il momento.",
                        status: "received"
                    });
                }, 1000);
            }
        } ,

        //proviamo ad aggiungere effetto hover al click chat sx e rimuoverlo se ne clicco un altro
        toggleHoverClass(currentElemento) {
            this.contacts.forEach(elemento => {
                if (elemento !== currentElemento) {
                    elemento.hoverLiClass = false;
                }
            });
            currentElemento.hoverLiClass = !currentElemento.hoverLiClass;
        },

        //proviamo a cercare un nostro amico nella barra di ricerca
        findFriend() {
            const searchTerm = this.filterFriend.toLowerCase(); // rimuove eventuali spazi bianchi iniziali e finali
            if (searchTerm === '') {            // se la barra di ricerca è vuota, mostra tutti i contatti
                this.contacts.forEach((contact) => {
                    contact.visible = true;
                });
            } else {                // altrimenti, filtra i contatti in base alla stringa di ricerca
                this.contacts.forEach((contact) => {
                    const currentChatName = contact.name.toLowerCase();
                    contact.visible = currentChatName.includes(searchTerm);
                });
            }
        },

        //proviamo a creare un menu a tendina e ho inserito un'altra key
        //all interno dell array di oggetti messages settandolo a
        toggleMenu(elemento) {
            elemento.showMenu = !elemento.showMenu;            
        },

        //proviamo a far si che se vado via dall hover e ritorno, non parta da solo
        //il minimenu
        hideMenu(elemento) {
            if (elemento.showMenu) {
                elemento.showMenu = false;
            }
        },

        //proviamo a cancellare un messaggio
        deleteMessage(elemento) {
            const index = this.currentMessage.indexOf(elemento);
            if (index > -1) {
              this.currentMessage.splice(index, 1);
            }                       
          }
                    
    }
}).mount("#app");
