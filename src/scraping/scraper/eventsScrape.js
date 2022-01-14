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
    // await page.waitForSelector("#upcoming-events");

    /**
     * Scraping various data from elements and adding that to an object
     */
    scrapeData.data.upcomingEvents = await page.evaluate(() => {
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
          img:
            upcomingEventsElements[i].parentElement.querySelector("a img").src ??
            "",
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
          link: upcomingEventsElements[i].querySelector("a").href,
        };
      }
      return events;
    });

    scrapeData.data.pastEvents = await page.evaluate(() => {
      const events = [];
      let list = document.querySelectorAll("#past-events .past-event-list a");
      for (let i = 0; i < list.length; i++) {
        events[i] = {
          img: list[i].querySelector("img").src,
          date: list[i].querySelectorAll("p")[0].innerText.trim(),
          heading: list[i].querySelectorAll("p")[1].innerText.trim(),
          description: list[i].querySelectorAll("p")[2].innerText.trim(),
        }

      }
      return events;
    })

    console.log(scrapeData);
    browser.close();
  } catch (err) {
    console.log(err);
  }
}



module.exports = { scrapeSite};
