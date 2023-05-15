const Userdb = require('../model/model')

//create a new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    //save user in database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating"
            })
        })

}

//retrive and return all users
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `not found user with id ${id}` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "error ocuurred while retriving information of single user" })
            })
    }
    else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "error ocuurred while retriving information" })
            })
    }
}

//update user via user id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindandModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id}` });
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error ocuurred while update information" })
        })
}

//delete user via user id
exports.delete = (req, res) => {
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot delete user with ${id}` });
            }
            else {
                res.send({ message: `deleted user with ${id}` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error ocuurred while deleting user" })
        })
}