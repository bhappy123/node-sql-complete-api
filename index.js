const express = require('express')
const { User, sequelize, Post } = require('./models')

const app = express()

app.use(express.json())


// Create A user User
app.post('/users', async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const user = await User.create({ name: name, email: email, role: role })
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
})


// Get All Users
app.get('/users', async (req, res) => {
    try {
        const user = await User.findAll()
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
})

// Get Single User With All posts by the user with one to many relations ship and added alias inside model [as: 'posts']
app.get('/users/:uuid', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
            include: 'posts'
        })
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
})

// Delete a User
app.delete('/users/:uuid', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        })

        user.destroy();

        return res.json({ message: 'User deleted' })
    } catch (error) {
        return res.json(error)
    }
})

// Edit a User
app.put('/users/:uuid', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        })

        user.name = req.body.name
        user.email = req.body.email
        user.role = req.body.role

        user.save()
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
})

// Create a Post
app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body;
    try {
        const user = await User.findOne({ where: { uuid: userUuid } })

        const post = await Post.create({ body, userId: user.id })
        return res.json(post)
    } catch (error) {
        return res.json(error)
    }
})

app.listen(5000, async () => {
    console.log("server listening on 5000")
    await sequelize.authenticate();
    console.log("DB connected")
})