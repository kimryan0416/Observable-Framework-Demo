// For NPM modules, there is a required `npm:` part prepended to the name of the module
import quotes from "npm:popular-movie-quotes";

// Export a function that lets us query the module and get all quotes.
export function GetAllQuotes() {
    return quotes.getAll();
}