const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const eventData = require('../scraping/eventsData');

router.get('/', async (req, res)=>{
    var token = req.cookies.authorization;
    const finduser = await User.find({ active: true }, null, { sort: { name: 1 } });
    const events = await eventData.scrapeData.data;
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) console.log(err);
          else req.user = user;
          res.render("events", { user: user, found: finduser, upcomingEvents:events.upcomingEvents, pastEvents:events.pastEvent });
        });
      } else res.render("events", { user: req.user, found: finduser, upcomingEvents:events.upcomingEvents, pastEvents:events.pastEvents });
})

module.exports = router;