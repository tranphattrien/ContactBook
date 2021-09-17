const config = {
    app: {
        port: process.env.PORT || 8080,
    },
    db:{
        url: "mongdb://localhost:27017/contactbook"
    }
};
module.exports = config;