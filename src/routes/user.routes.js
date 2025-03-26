const router = require("express").Router();
const { getAll, getOne, create, update, deleted } = require("../controllers/user.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleted);

module.exports = router;