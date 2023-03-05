const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers'); // we exported 2 module.exports... it came as obj
const Stay = require('../src/models/stay');


mongoose.connect('mongodb+srv://navi:Navi2308@cluster0.vbwsb7v.mongodb.net/vitStay?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


//a function which will take in an array and give one element of it from the array
const sample = (array_input) => array_input[Math.floor(Math.random() * array_input.length)];


const seedDB = async () => {
    await Stay.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const author= "63506801fb245685322c9ee1";
        const camp = new Stay({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/drfaohzpo/image/upload/v1661588557/YelpCamp/ieltintdmvpkeitvcjlj.jpg',
                  filename: 'YelpCamp/ieltintdmvpkeitvcjlj'
                },
                {
                  url: 'https://res.cloudinary.com/drfaohzpo/image/upload/v1661588560/YelpCamp/mtwaaytyf0cydcfs3hrs.png',
                  filename: 'YelpCamp/mtwaaytyf0cydcfs3hrs'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            author
        })
        await camp.save();
    }
    console.log("Seeded new Data")
}

seedDB().then(() => {
    mongoose.connection.close();
})