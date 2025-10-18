// For NPM modules, there is a required `npm:` part prepended to the name of the module
import quotes from "../../_npm/popular-movie-quotes@1.2.4/e5fcd8be.js";

// Export a function that lets us query the module and get all quotes.
export function GetAllQuotes() {
    return quotes.getAll();
}