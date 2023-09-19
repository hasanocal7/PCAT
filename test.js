const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// MONGOOSE +5.0

// Create a Photo

/*
Photo.create({
  title: 'Photo Title',
  description: 'Lorem ipsum',
});
*/

// Read a Photo

/*
Photo.find({})
.then(results => {
    console.log(results)
})
.catch(error => {
    console.log(error)
})
*/

// Update a Photo

const id = '6509d9c7881efd461020a6f5';

/*Photo.findByIdAndUpdate(
    id, {
        title: "Photo Title (Updated)",
        description: "Elam tera fiş kem gözler şiş"
    },
    {new : true}
).then(results => {
    console.log(results)
}).catch(err => {
    console.log(err)
})
*/

// Delete a Photo

Photo.findByIdAndDelete(id)
.then(console.log('Photo is removed!'))