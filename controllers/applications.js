const express = require('express');
const router = express.Router();

const User = require('../models/user');

/**
 * Action: INDEX
 * Method: GET
 * Route: /users/:userId/applications
 * Description: Show all applications for the given user
 */
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

/**
 * Action: SHOW
 * Method: GET
 * Route: /users/:userId/applications/:applicationId
 * Description: Show the details for an application
 */
router.get('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);

    res.render('applications/show.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

/**
 * Action: NEW
 * Method: GET
 * Route: /users/:userId/applications/new
 * Description: Show form for creating new application
 */
router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

/**
 * Action: CREATE
 * Method: POST
 * Route: /users/:userId/applications
 * Description: Create a new application for the given user
 */
router.post('/', async (req, res) => {
  try {
    // Let's find the user for which we creating the application
    const currentUser = await User.findById(req.session.user._id);

    currentUser.applications.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:applicationId/edit', async (req, res) => {
  try {
    // Let's find the user for which we creating the application
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);

    res.render('applications/edit.ejs', {
      application: application,
    })
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:applicationId', async (req, res) => {
  try {
    // Let's find the user for which we creating the application
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);

    application.set(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

/**
 * Action: DELETE
 * Method: DELETE
 * Route: /users/:userId/applications/:applicationId
 * Description: 
 */
router.delete('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.id(req.params.applicationId).deleteOne();
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications`);
  } catch(error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;