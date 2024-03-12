const categorymastermodel = require("../Models/categorymastermodel")
const multer = require('multer');
const path = require('path');

//Viewing a Data
module.exports.categorymasterget = async (req, res) => {
    await categorymastermodel.find({},{
        _id: 1,
        category_name:1,
        category_image:1,
      
    }).then((category) => {
            res.json(category);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting category"+ err });
        });
}
module.exports.categorymastergetbyid = async (req, res) => {
  const  id  = req.params.id;
  await categorymastermodel.find({_id: id},{
      _id: 1,
      category_name:1,
      category_image:1,
  }).then((user) => {
          res.json(user);
      }).catch((err) => {
          res.status(500).json({ error: "Error getting users by id"+ err });
      });
}
// INSERT
// Function to generate category_id
async function generateCategoryId() {
    try {
        // Fetch the count of existing categories
        const count = await categorymastermodel.countDocuments();

        // Generate category_id
        const category_id = "C" + (count + 1).toString().padStart(3, '0'); // Ensure 3-digit format

        return category_id;
    } catch (err) {
        throw new Error("Error generating category ID: " + err.message);
    }
}

module.exports.categorymasterinsert = async (req, res) => {
    try {
        const { category_name, category_image } = req.body;

        // Generate category_id
        const category_id = await generateCategoryId();

        // Create the new category
        const newCategory = await categorymastermodel.create({ category_id, category_name, category_image });

        res.json(newCategory);
    } catch (err) {
        res.status(500).json({ error: "Error saving category: " + err.message });
    }
};

//UPDATE4
module.exports.categorymasterupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, category_image } = req.body;
  
      // Build the update object based on the fields you want to update
      const updateObject = {};
      if (category_name) updateObject.category_name = category_name;
      if (category_image) updateObject.category_image = category_image;
    
  
      const updatedRecord = await categorymastermodel.findByIdAndUpdate(id, updateObject, { new: true });
  
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
  module.exports.categorymasterdelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await categorymastermodel.findByIdAndDelete(id);
  
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
  module.exports.categoryuploadimage = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/categoryImageUpload/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/categoryImageUpload/Image/' + newFilename;
                cb(null, newFilename);
            }
        });
  
        const upload = multer({ storage: Storage }).single('category_image');
        upload(req, res, async function (err) {
            if (err) {
                // Handle upload error
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ category: UploadedfileName }); // Send a JSON response
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error category Image Upload" + error });
    }
};