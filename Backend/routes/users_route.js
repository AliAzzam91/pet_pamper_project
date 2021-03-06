const express = require('express')
const app = express()
const {body, validationResult} = require('express-validator')

const signupController = require('../controllers/signupController')
const statusController = require('../controllers/statusController')
const signinController = require('../controllers/signinController')
const userCommunitiesController = require('../controllers/userCommunitiesController')
const petShopController = require('../controllers/petShopController')
const veterinariesController = require('../controllers/veterinariesController')
const userInfoController = require('../controllers/userInfoController')
const addCommunityController = require('../controllers/addCommunityController')
const logoutController = require('../controllers/logoutController')
const addUserImageController = require('../controllers/addUserImageController')
const allCommunityController = require('../controllers/allCommunityController')
const pingCommunityController = require('../controllers/pingCommunityController')
const getNotificationsController = require('../controllers/getNotificationsController')
const googleSignInController = require('../controllers/googleSignInController')
const pushTokenController = require('../controllers/pushTokenController')
try{
//Signup route
app.post('/signup', body('email').isEmail(), body('password').isLength({min: 8}), (req, res) => { 
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({message: "Invalid email or password"})
    }
    signupController.addUser(req,res)
})

//Signin route
app.post('/signin', signinController.getUser)

//Status update route
app.post('/status', statusController.statusUpdate)

//Show communities
app.post('/communities', userCommunitiesController.getCommunities)

//Show pet shops
app.post('/pet_shops', petShopController.getPetShops)

//Show veterinaries
app.post('/veterinaries', veterinariesController.getVeterinaries)

//Get all communities
app.post('/all_communities', allCommunityController.getAllCommunities)

//Update user information
app.post('/user_info_update', userInfoController.infoUpdate)

//add a community to the user's communities list
app.post('/add_community', addCommunityController.addCommunity)

//Ping members of the community
app.post('/ping_community', pingCommunityController.pingMembers)

//Push token
app.post('/push_token', pushTokenController.getPushTokens)

//Get notifications
app.post('/notifications', getNotificationsController.getNotifications)

//Image update
app.post('/image', addUserImageController.imageUpdate)

//logout
app.post('/logout', logoutController.logOut)

//Google sign in
app.post('/google_signin', googleSignInController.getUserInfo )

}catch(err) {console.log(err)}

module.exports = app