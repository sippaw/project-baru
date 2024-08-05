const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = '123';

// Middleware untuk memverifikasi token JWT
const authenticateToken = (req, res, next) => {
    // console.log(token);
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'login dulu' });
        }
    
        jwt.verify(token, secretKey, (err, decoded) => { //Verifikasi token menggunakan secret key
            if (err) {
                return res.status(403).json({ message: 'Failed authentication' });
            }
            req.user = decoded; //menyimpan informasi tentang pengguna yang telah diotentikasi
            next();
        });
    } catch (error) {
        console.log(error);
    } // mengambil token dari cookies
    
}

module.exports = authenticateToken;
