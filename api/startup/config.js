import config from 'config';
import debug from 'debug';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';

export default function(app) {
    // if(!config.get('jwtPrivateKey')) {
    //     throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    //   }

    if(!process.env.PRIVATE_KEY) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
      }

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(helmet());
    
    
    if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan Enabled...");
    }
}