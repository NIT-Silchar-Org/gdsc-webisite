const { scrapeSchedule } = require("./cron/eventsCron");
const { scrapeSite } = require("./scraper/eventsScrape");

let scrapeData = {
  data: {
    upcomingEvents: [],
    pastEvents: [],
  },
};
scrapeSchedule({ scrapeData });
scrapeSite({ scrapeData });

module.exports = { scrapeData };
