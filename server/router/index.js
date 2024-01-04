const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");

router.post("/add-user", Controller.addUser);
router.post("/login", Controller.login);
router.post('/google-login', Controller.googleLogin)

router.use(authentication);

router.get('/read-user', Controller.readUser)
router.get('/news', Controller.readNews) // Untuk menapilkan database dari news
// router.get('/players', Controller.readPlayers)
router.get('/leagues', Controller.readLeagues)
router.get('/forums', Controller.readForums)
router.post('/add-forums', Controller.addForums)
router.get('/forums/:id', Controller.readDetailForum)

// Untuk comment
router.get('/forums/:id/comments', Controller.readComments)
router.post('/forums/:id/add-comments', Controller.addComments)




router.delete('/forums/:id', Controller.deleteForum)
// router.get('/leagues/:id', Controller.readLeaguesById)
router.get('/leagues/:id/standings', Controller.readLeaguesStandingById)



// router.get('/payment/midtrans', Controller.midtransToken)
// router.get('/payment', Controller.readOrders)
// router.patch('/payment/status', Controller.updateOrderStatus)

module.exports = router;
