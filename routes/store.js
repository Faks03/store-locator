const express = require('express')
// const { get } = require('mongoose')
const router = express.Router()
// const Store = require('../models/store')
const { getStores, addStore } = require('../controllers/store')

router.route('/store').get(getStores).post(addStore)

module.exports = router