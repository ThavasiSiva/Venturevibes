const Router = require("express")

const router =Router()

const { categorymasterget,categorymasterinsert,categorymasterupdate,categorymasterdelete ,categoryuploadimage,categorymastergetbyid}=require("../Controllers/categorymastercontroller")




router.get("/categorymasterget",categorymasterget);
router.post("/categorymasterinsert",categorymasterinsert);
router.post("/categorymasterupdate/:id",categorymasterupdate);
router.post("/categorymasterdelete/:id",categorymasterdelete);
router.post("/categoryuploadimage",categoryuploadimage);
router.get("/categorymastergetbyid/:id",categorymastergetbyid);
module.exports = router;
