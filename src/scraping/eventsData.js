const { scrapeSchedule } = require("./cron/eventsCron");
const { scrapeSite } = require("./scraper/eventsScrape");

let scrapeData = {
  data: null,
};
scrapeSchedule({ scrapeData });
scrapeSite({ scrapeData });

module.exports = { scrapeData };
