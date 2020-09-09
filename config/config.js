module.exports = {
    "development": {
        'web_port': process.env.PORT || 3000,
        'db_connection_string': 'mongodb+srv://kaushik123:kaushik123@cluster0-l6gex.mongodb.net/<dbname>?retryWrites=true&w=majority',
        'jwt_secret': 'BeingZeroScoreTracker'
    },
    "production": {
        'web_port': process.env.PORT || 80,
        'db_connection_string': process.env.DB_CONNECTION_STRING || 'mongodb+srv://kaushik123:kaushik123@cluster0-l6gex.mongodb.net/<dbname>?retryWrites=true&w=majority',
        'jwt_secret': process.env.JWT_SECRET || 'BeingZeroScoreTracker'
    },
    get_active_config: function() {
        var config_profile = process.env.BZENV || 'development';
        console.log("CONFIG PROFILE SELECTED IS:  " + config_profile);
        return this[config_profile];
    }
}