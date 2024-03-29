import "dotenv/config";
import express from "express";
import viteexpress from "vite-express";
import compression from "compression";
import router from "./router.js";

//
function init() {

    //Create express app
    const app = express();

    //Use response compression
    app.use(compression());
    
    //Serve files
    app.use("/", router);
    
    //Create server
    viteexpress.listen(app, 3000, () => console.log("Server started !"));

};

//
export default init;