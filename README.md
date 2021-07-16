### Node SQL Complete API Using Seqelize for Reference

This APIs contains GET, POST, Delete, PUT, GET/:id, Relationship between table and server side validation

## Dependencies

- Sequelize CLI
- sequelize
- Express
- mysql2

## Installing

- Create a Database sequelize and Give Mysql credentials in config/config.json
- Any modifications needed to be made to files/folders

## Executing program

```
node index
```

### NOTES

## To Create Model

```
sequelize model:generate --name User --attributes name:string,email:string,role:string
```

## Creating Migration

```
sequelize  db:migrate
```

## Can Add extra columns but has to done in model and migration [To add UUID field in User table]

```
uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
```

## Connect to Database

Import sequelize and other created models from model/index.js

```
const { User, sequelize } = require('./models')
```

Then run authenticate method to connect after server start

```
app.listen(5000, async () => {
    console.log("server listening on 5000")
    await sequelize.authenticate();
    console.log("DB connected")
})
```

## Control What To Hide While giving response[toJSON()]

Refer to model/user

```
 class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined}
    }
  };

```

## Relationship || Association

Here I have created a relationship between User and posts[one to many]

[static associate() ->
this.belongsTo-> Define the foreign Key
this.hasMany(Define the model and forgeignKey name)
]

Post Model Will contain same Id multiple times refering to the user

```
class Post extends Model {

    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' })
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };

```

User Model has one id that contains multiple posts

```
  class User extends Model {
    static associate({ Post }) {
      // define association here

      this.hasMany(Post, { foreignKey: 'userId' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };

```

#ALIAS

Here as known as alias

```
this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
```

By adding include method that refers to alias given during relationship will return the associated data

```
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

```

OutPUT

```
{
  "uuid": "d7570b3c-fd2d-4d6b-83ff-140e9835a5ed",
  "name": "bikash2",
  "email": "bik2@fd.com",
  "role": "user",
  "createdAt": "2021-07-16T01:14:01.000Z",
  "updatedAt": "2021-07-16T01:14:01.000Z",
  "posts": [
    {
      "uuid": "549d45a7-582d-443e-9c35-ac897cbd4c1d",
      "body": "New Post",
      "userId": 1,
      "createdAt": "2021-07-16T01:40:16.000Z",
      "updatedAt": "2021-07-16T01:40:16.000Z"
    },
    {
      "uuid": "625dc92b-410c-4d71-b9bb-dfce7310aa40",
      "body": "New Post",
      "userId": 1,
      "createdAt": "2021-07-16T01:41:10.000Z",
      "updatedAt": "2021-07-16T01:41:10.000Z"
    }
  ]
}

```

### Author

- [Bikash Ranjan Dash](https://github.com/bhappy123/)
