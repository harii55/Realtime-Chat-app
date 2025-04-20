import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {

    // Generate a JWT token with the user ID as payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    
    // Send the token as a cookie in the response
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie (stops XSS attacks)
        sameSite: 'strict', // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development"  //it is not http"S" in development mode hence we set it to false
    }
    )

    return token;
 }