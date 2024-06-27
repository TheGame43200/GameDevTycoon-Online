const mongoose = require('mongoose');

const mongoUri = 'mongodb://192.168.1.61:27017/mygame';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connecté...');
    mongoose.connection.close();
})
.catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});
