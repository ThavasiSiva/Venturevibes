const placemaster = require("../Models/placemaster")
const multer = require('multer');
const path = require('path');

//Viewing a Data
module.exports.placemasterget = async (req, res) => {
    await placemaster.find({},{
      _id: 1,
      city: 1,
      title: 1,
      description: 1,
      upload_images: 1,
      location: 1,
      timing: 1,
      website_url: 1,
      season: 1
      
    }).then((place) => {
            res.json(place);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting placemaster"+ err });
        });
}
module.exports.placemastergetbyid = async (req, res) => {
  const  id  = req.params.id;
  await placemaster.find({_id: id},{
    _id: 1,
    city: 1,
    title: 1,
    description: 1,
    upload_images: 1,
    location: 1,
    timing: 1,
    website_url: 1,
    season: 1

  }).then((user) => {
          res.json(user);
      }).catch((err) => {
          res.status(500).json({ error: "Error getting users by id"+ err });
      });
}

// INSERT
// Function to generate place_id

async function generateplaceId() {
  try {
      // Fetch the count of existing categories
      const count = await placemaster.countDocuments();

      // Generate place_id
      const place_id = "P" + (count + 1).toString().padStart(3, '0'); // Ensure 3-digit format

      return place_id;
  } catch (err) {
      throw new Error("Error generating place ID: " + err.message);
  }
}

module.exports.placemasterinsert = async (req, res) => {
  try {
      const { city, title, description, upload_images, location, timing, website_url, season } = req.body;

      // Generate place_id
      const place_id = await generateplaceId();

      // Create the new place
      const newplace = await placemaster.create({ place_id, city, title, description, upload_images, location, timing, website_url, season });

      res.json(newplace);
  } catch (err) {
      res.status(500).json({ error: "Error saving place: " + err.message });
  }
};

//UPDATE
module.exports.placemasterupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const {  city, title, description, upload_images, location, timing, website_url, season } = req.body;
  
      // Build the update object based on the fields you want to update
      const updateObject = {};
     
      if (city) updateObject.city = city;
      if (title) updateObject.title = title;
      if (description) updateObject.description = description;
      if (upload_images) updateObject.upload_images = upload_images;
      if (location) updateObject.location = location;
      if (timing) updateObject.timing = timing;
      if (website_url) updateObject.website_url = website_url;
      if (season) updateObject.season = season;
    
  
      const updatedRecord = await placemaster.findByIdAndUpdate(id, updateObject, { new: true });
  
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      // Step 4: Send Response
      res.json({ message: 'Record updated successfully', data: updatedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
//DELETE
  module.exports.placemasterdelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await placemaster.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.json({ message: 'Record deleted successfully', data: deletedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };




//IMAGE UPLOAD
  module.exports.placeuploadimage = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/placeImageUpload/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/placeImageUpload/Image/' + newFilename;
                cb(null, newFilename);
            }
        });
  
        const upload = multer({ storage: Storage }).single('place_image');
        upload(req, res, async function (err) {
            if (err) {
                // Handle upload error
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ placemaster: UploadedfileName }); // Send a JSON response
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error place Image Upload" + error });
    }
};