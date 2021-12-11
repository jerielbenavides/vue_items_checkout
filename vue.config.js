process.env.NODE_ENV === 'production'
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/~benavidesjeriel/signout/static-site/': '/'
}