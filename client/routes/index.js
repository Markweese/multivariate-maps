const express = require('express');
const router = express.Router();
const flowsController = require('../controllers/flowsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', flowsController.checkThenLoad);
router.get('/explorer', flowsController.loadMap);
router.get('/explorer/:id', flowsController.pushValue);
router.get('/explorer/:state', flowsController.loadMap);
router.get('/explorer/new/:id', flowsController.pushValue);

//station dashboard pages
router.get('/site/:station', flowsController.loadStationDashboard);

router.post('/login',
  authController.login,
  authController.generateSessionToken
);

router.get('/login', userController.loginForm);
router.get('/logout', authController.logout);


router.get('/signup', userController.registerForm);
router.post('/signup',
  userController.uploadProfilePhoto,
  userController.resizeProfilePhoto,
  userController.validateRegister,
  catchErrors(userController.register)
);

router.get('/list',
  catchErrors(flowsController.findUserStations),
  flowsController.requestUserStations
);

router.get('/account',
  authController.isLoggedIn,
  userController.account
);
router.post('/account/update-basic',
  catchErrors(userController.updateAccountBasic)
);
router.post('/account/update-email',
  catchErrors(userController.updateAccountEmail)
);
router.post('/account/update-password',
  authController.confirmPassword,
  catchErrors(authController.updateAccountPassword)
);
router.post('/account/update-photo',
  userController.uploadProfilePhoto,
  userController.resizeProfilePhoto,
  catchErrors(userController.postProfilePhoto)
);
router.post('/account/forgot',
  catchErrors(authController.forgot)
);
router.get('/account/reset/:token',
  catchErrors(authController.reset)
);
router.post('/account/reset/:token',
  authController.confirmPassword,
  catchErrors(authController.updatePassword)
);

// Rest Endpoints

router.post('/site/:station/report',
  reportController.validateReport,
  reportController.postReport
);

router.post('/reports/flag/:report',
  reportController.validateFlag,
  reportController.flagReport
);

router.post('/reports/upvote/:report',
  reportController.upvoteReport
);

router.post('/reports/downvote/:report',
  reportController.downvoteReport
);

router.post('/reports/comment/upvote/:report/:comment',
  reportController.upvoteComment
);

router.post('/reports/comment/downvote/:report/:comment',
  reportController.downvoteComment
);

router.post('/reports/comment/add/:report',
  reportController.validateComment,
  reportController.addComment
);

router.post('/reports/comment/register-tags',
  reportController.cleanTags,
  reportController.registerTags
);

router.post('/reports/comment/notify-tagged',
  reportController.cleanNotification,
  reportController.notifyTaggedUsers
);

router.post('/reports/comment/notify-commented',
  reportController.cleanNotification,
  reportController.notifyCommentedUser
);

router.get('/reports/station/:station',
  reportController.getStationReports
);


module.exports = router;
