import { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

const oAuth2Client = new OAuth2Client();

const googleAuth = async (req: Request, res: Response) => {
    try {
        const code = req.headers.authorization;
        console.log("Authorization code: ", code);

        const response = await axios.post("https://oauth2.googleapis.com/token", {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        });
        const token = response.data.access_token;
        console.log("Access Token: ", token);

        const userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const userDetails = userResponse.data;
        console.log("User Details: ", userDetails);

        res.status(200).json({ message: "Google authentication successful" });
    } catch (error) {
        console.error("Error saving code:", error);
        res.status(500).json({ message: "Failed to save code" });
    }
};

export { googleAuth };
