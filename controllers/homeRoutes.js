const router = require("express").Router();
const { Blog, Trip, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // const tripData = await Trip.findAll({
    //   include: [
    //     {
    //       model: User,
    //     },
    //   ],
    // });

    // const trips = tripData.map((trip) => trip.get({ plain: true }));
    // console.log(trips);
    // res.json(trips)
    res.render("userprofile", {
      //   trips,
      //   logged_in: req.session.logged_in
    });
  } catch (err) {
    // res.status(500).json(err);
    res.json("We've got an issue!");
  }
});

router.get("/trip/:id", async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {/////do one of these per route 
      include: [
        {
          model: Trip,
        },
      ],
    });

    const trip = tripData.get({ plain: true });

    res.render("trip", {
      ...trip,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Viewing all blogs
router.get('/viewblogs', async (req, res) => {
  try {
    const blogData = await Blog.findAll( {
      include: [{ model: Trip }],
    });
  
    const blogs = blogData.map(blog => blog.get({plain: true}))

    res.render("viewblogs", {
      blogs,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

//Viewing all trips
router.get('/viewtrip', async (req, res) => {
  try {
    const tripData = await Trip.findAll( {
      include: [{ model: Trip }],
    });
  
    const trips = tripData.map(trip => trip.get({plain: true}))

    res.render("viewtrips", {
      trips,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

//route for adding a blog page
router.get('/addblog', async (req, res) => {
  try {
    res.render("addblog", {
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

//route for adding a trip page
router.get('/addtrip', async (req, res) => {
  try {
    res.render("addtrip", {
      trips,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

//route for viewing user profile page
router.get('/userprofile', async (req, res) => {
  try {
    // const tripData = await Trip.findAll( {
    //   include: [{ model: Trip }],
    // });
  
    // const trips = tripData.map(trip => trip.get({plain: true}))

    res.render("userprofile", {
      user,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

//route for the the signup page
router.get('/signup', async (req, res) => {
  try {
    // const tripData = await Trip.findAll( {
    //   include: [{ model: Trip }],
    // });
  
    // const trips = tripData.map(trip => trip.get({plain: true}))

    res.render("signup", {
      user,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

//route for the the searchpage page
router.get('/profile', async (req, res) => {
  try {
    // const tripData = await Trip.findAll( {
    //   include: [{ model: Trip }],
    // });
  
    // const trips = tripData.map(trip => trip.get({plain: true}))

    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
    }
});


// Use withAuth middleware to prevent access to route
router.get("/trip", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render("trip", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
