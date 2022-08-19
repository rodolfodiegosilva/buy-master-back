import { findOne } from "../model/User.model";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const  handleLogin = async (req, res) => {
	const cookies = req.cookies;

	const { user, pwd } = req.body;
	if (!user || !pwd) return res.status(400).json({ "message": "Username and password are required." });

	const foundUser = await findOne({ username: user }).exec();

	if (!foundUser) return res.sendStatus(401); //Unauthorized 
	// evaluate password

	const match = await compare(pwd, foundUser.password);
	//console.log(foundUser)
	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean);

		// create JWTs
		const accessToken = sign(
			{
				"UserInfo": {
					"username": foundUser.username,
					"roles": roles
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "24h" }
		);
		const newRefreshToken = sign(
			{ "username": foundUser.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "24h" }
		);

		// Changed to let keyword
		let newRefreshTokenArray =
            !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

		if (cookies?.jwt) {

			/* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
			const refreshToken = cookies.jwt;
			const foundToken = await findOne({ refreshToken }).exec();

			// Detected refresh token reuse!
			if (!foundToken) {
				// clear out ALL previous refresh tokens
				newRefreshTokenArray = [];
			}

			res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
		}

		// Saving refreshToken with current user
		foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

		// Creates Secure Cookie with refresh token
		res.cookie("jwt", newRefreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });
		//console.log(roles);
		//console.log(accessToken);
		// Send authorization roles and access token to user
		res.json({ accessToken: accessToken, roles: roles});

	} else {
		res.sendStatus(401);
	}
};

// eslint-disable-next-line no-undef
export default { handleLogin };