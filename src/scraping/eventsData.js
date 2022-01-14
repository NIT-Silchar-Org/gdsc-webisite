const { scrapeSchedule } = require("./cron/eventsCron");
const { scrapeSite } = require("./scraper/eventsScrape");

let scrapeData = {
  data: {
    upcomingEvents: null,
    pastEvents: null,
  },
};
scrapeSchedule({ scrapeData });
scrapeSite({ scrapeData });

module.exports = { scrapeData };
