const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)

      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        let existing = bcrypt.compareSync(password, users[i].passwordHash)

        if(users[i].username === username && existing){
          let usersToReturn = {...users[i]}
          delete usersToReturn.passwordHash
          console.log(users[i])
          console.log(usersToReturn)
          res.status(200).send(usersToReturn)
          return
      }
      }
      res.status(400).send("User not found.")
    },

    register: (req, res) => {
        const { username, email, firstName, lastName, password } = req.body

        console.log('Registering User')
        
        let salt =bcrypt.genSaltSync(5)
        let passwordHash = bcrypt.hashSync(password, salt)
        
        const user = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        
        users.push(user)
        let returnedUser = {...user}
        delete returnedUser.passwordHash
        res.status(200).send(returnedUser)
        console.log(user)
    }
    
}