const login = (req,res) => {
    res.render('./authentication/login')
}

const register = (req,res) => {
    res.render('./authentication/register')
}

module.exports = {
    login,
    register
}