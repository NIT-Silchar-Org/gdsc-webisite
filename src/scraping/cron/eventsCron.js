const cron = require("node-cron");
const { scrapeSite } = require("../scraper/eventsScrape");

/* Scrapper Schedule set to 1200 hrs */
function scrapeSchedule({ scrapeData }) {
  // cron.schedule("00 12 * * *", () => {
  cron.schedule("*/7 * * * * *", () => {
    scrapeSite({ scrapeData });
  });
}

module.exports = { scrapeSchedule };
