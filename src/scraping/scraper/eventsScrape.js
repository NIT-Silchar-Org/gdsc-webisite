const puppeteer = require("puppeteer");

async function scrapeSite({ scrapeData }) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(
      "https://gdsc.community.dev/national-institute-of-technology-nit-silchar/",
      {
        waitUntil: "networkidle2",
      }
    );
    await page.waitForSelector("#upcoming-events .general-card h4");

    /**
     * Scraping various data from elements and adding that to an object
     */
    scrapeData.data = await page.evaluate(() => {
      const events = [];

      const upcomingEventsElements = document.querySelectorAll(
        "#upcoming-events .panel-picture-content"
      );

      for (let i = 0; i < upcomingEventsElements.length; i++) {
        const tags = [];

        upcomingEventsElements[i]
          .querySelectorAll(".MuiChip-label")
          .forEach((node, index) => {
            tags[index] = node.innerHTML;
          });

        events[i] = {
          date:
            upcomingEventsElements[i].querySelector(".date strong").innerHTML ??
            "",
          title: {
            heading:
              upcomingEventsElements[i].querySelector("h4").innerHTML ?? "",
            subHeading:
              upcomingEventsElements[i].querySelector(".date span").innerHTML ??
              "",
          },
          description:
            upcomingEventsElements[i]
              .querySelector(".description")
              .innerHTML.trim() ?? "",
          tags,
        };
      }
      return events;
    });
    console.log(scrapeData);
    browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { scrapeSite };
