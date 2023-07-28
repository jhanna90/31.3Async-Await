let favNumber = 2;
let baseURL = "http://numbersapi.com";

// 1.
async function getNumFact() {
    let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(data);
}
getNumFact();

// 2.
const favNumbers = [87, 8, 26];
async function getNumsFacts() {
    let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
    console.log(data);
}
getNumsFacts();

// 3.
async function getFourFacts() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
    });
}
getFourFacts();