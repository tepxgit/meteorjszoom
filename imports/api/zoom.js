
import { Meteor } from 'meteor/meteor';

import crypto from 'crypto';

Meteor.methods({
   "zoom.generateSignature": generateSignature
});

function generateSignature({meetingNumber, role}) {

    let apiKey = "S5qSQABQTgmgz5VxSuvz-Q"
    let apiSecret = "h3GFC5HhCbbI5SMgvM9dHqa5oPHK1tyAwhbF"
    // Prevent time sync issue between client signature generation and zoom 
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  
    return {signature,apiKey}
  }
  