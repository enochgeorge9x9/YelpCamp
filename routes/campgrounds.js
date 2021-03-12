const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const { isLoggedIn, validateCampground, isAuthor } = require('../middlewares')


router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCampground));
    // .post(upload.single('image'), (req, res) => {
    //     console.log(req.body, req.file)
    //     res.send(req.file)
    // })


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

//edit page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderNewForm))


module.exports = router;
