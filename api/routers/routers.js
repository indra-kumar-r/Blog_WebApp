let { Router } = require("express");
let controller = require("../controllers/controllers");

let router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

router.get("/profile", controller.profile);

router.post("/post", controller.p_post);
router.get("/post", controller.g_post);
router.put("/post", controller.u_post);
router.delete("/post/:id", controller.d_post);

router.get("/userpost", controller.userpost);
router.get("/post/:id", controller.g_post_id);

router.post("/likepost", controller.p_like);
router.get(`/likepost`, controller.g_like);
router.delete("/likepost", controller.d_like);

module.exports = router;
