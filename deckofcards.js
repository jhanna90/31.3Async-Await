const API_BASE_URL = 'https://deckofcardsapi.com/api';
let DECK;
const $button = $('button');
const $cardPile = $('#card-pile');

$button.on('click', (evt) => {
    DECK.drawAndDisplayCard();
});

class Deck {
    constructor() { }
    async init() {
        const resp = await axios.get(
            `${API_BASE_URL}/deck/new/shuffle/?deck_count=1`
        );
        this.deck_id = resp.data.deck_id;
    }

    // Part 1
    async drawCard() {
        const card_url = `${API_BASE_URL}/deck/${this.deck_id}/draw/?count=1`;
        const resp = await axios.get(card_url);
        const card = resp.data.cards[0];
        this.remaining = resp.data.remaining;

        console.log(`${card.value} of ${card.suit}`);
        return card;
    }

    // Part 2
    async drawTwoCards() {
        const card_url = `${API_BASE_URL}/deck/${this.deck_id}/draw/?count=1`;
        const resp1 = await axios.get(card_url);
        const resp2 = await axios.get(card_url);
        const card1 = resp1.data.cards[0];
        const card2 = resp2.data.cards[0];
        this.remaining = resp2.data.remaining;

        console.log(`${card1.value} of ${card1.suit}`);
        console.log(`${card2.value} of ${card2.suit}`);
    }

    // Part 3
    async drawAndDisplayCard() {
        const card = await this.drawCard();

        const $cardImg = $(
            `<img class="card" src="${card.image}" alt="${card.value} of ${card.suit}" />`
        );
        $cardPile.append($cardImg);

        this.remaining === 0 && $button.hide();
    }
}

$(() => {
    DECK = new Deck();
    DECK.init();
});
