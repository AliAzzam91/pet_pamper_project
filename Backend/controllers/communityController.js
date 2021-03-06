const Community = require('../models/Community')
const User = require('../models/User')

exports.createCommunity = (req, res) => { 
    //Check if any of the fields is missing
    try {
        if (!req.body.name || !req.body.token) {
            return res.status(400).json({message: "Please don't leave any field empty"})
        }
    } catch (err) {
        res.send({message: err})
    }

    User.findOne({token: req.body.token},{_id:1, account_type:1}).then((user) => {
        if (!user) {
            return res.status(400).json({message: "You are not a user"})
        }else {
            Community.findOne({name: req.body.name}).then((community)=>{

                try{
                    if (community) {
                        return res.status(400).json({message: "name already exists"})
                    }else {
                        if(user.account_type == 'Pet Walker') {
                            const newCommunity = new Community({
                                name: req.body.name,
                                latitude: req.body.latitude,
                                longitude: req.body.longitude,
                                image: req.body.image                       
                            })

                            newCommunity.members.push(user._id)
                            newCommunity.save()

                            User.findOne({'token': req.body.token}).then((userSelected)=>{
                                userSelected.communities.push(newCommunity._id)
                                userSelected.save()
                         
                            }).catch((err) => res.send({message: "JWT is wrong"}))

                            return res.status(200).json({message: "Successfully added a new community"})
                            
                        }else {return res.status(400).json({message: "You are not a pet walker"})}
                    }
                }catch(err) {res.send(err)}
            })
        }
    })
}


