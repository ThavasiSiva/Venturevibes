const citymaster = require("../Models/citymaster")
const multer = require('multer');
const path = require('path');

//Viewing a Data
module.exports.citymasterget = async (req, res) => {
    await citymaster.find({},{
        _id: 1,
        city_id:1,
        city:1,
        district:1
      
    }).then((city) => {
            res.json(city);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting city"+ err });
        });
}
module.exports.citymastergetbyid = async (req, res) => {
  const  id  = req.params.id;
  await citymaster.find({_id: id},{
        _id: 1,
        city_id:1,
        city:1,
        district:1
  }).then((user) => {
          res.json(user);
      }).catch((err) => {
          res.status(500).json({ error: "Error getting users by id"+ err });
      });
}

// INSERT
// Function to generate city_id
async function generatecityId() {
  try {
      // Fetch the count of existing cities
      const count = await citymaster.countDocuments();

      // Generate city_id
      const city_id = "D" + (count + 1).toString().padStart(3, '0'); // Ensure 3-digit format

      return city_id;
  } catch (err) {
      throw new Error("Error generating city ID: " + err.message);
  }
}

module.exports.citymasterinsert = async (req, res) => {
  try {
      const { city, district } = req.body;

      // Generate city_id
      const city_id = await generatecityId();

      // Create the new city
      const newcity = await citymaster.create({ city_id, city, district });

      res.json(newcity);
  } catch (err) {
      res.status(500).json({ error: "Error saving city: " + err.message });
  }
}; 


//UPDATE4
module.exports.citymasterupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { city, district} = req.body;
  
      // Build the update object based on the fields you want to update
      const updateObject = {};
      
      if (city) updateObject.city = city;
      if (district) updateObject.district = district;
    
  
      const updatedRecord = await citymaster.findByIdAndUpdate(id, updateObject, { new: true });
  
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

  module.exports.citymasterdelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await citymaster.findByIdAndDelete(id);
  
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
  module.exports.cityuploadimage = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/cityImageUpload/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/cityImageUpload/Image/' + newFilename;
                cb(null, newFilename);
            }
        });
  
        const upload = multer({ storage: Storage }).single('city_image');
        upload(req, res, async function (err) {
            if (err) {
                // Handle upload error
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ city: UploadedfileName }); // Send a JSON response
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error city Image Upload" + error });
    }
};