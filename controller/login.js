const { Op, where } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const user = require('../models/user');
const { patch } = require('../routes/login');
const secretKey = '123';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const User = await user.findOne({ where: { email } }); // untuk mencari email yang sama
        if (User) {
            const match = bcrypt.compareSync(password, User.password); // untuk membandingkan sebuah nilai dengan hash yang tersimpan
            if (match) {
                // Buat token JWT
                const token = jwt.sign({ id: User.id, email: User.email }, secretKey, { expiresIn: '1h' });
                // data yag disimpan untuk mengidentifikasi

                // Set cookie dan kirim respons dalam satu langkah
                res.cookie('token', token, {
                    httpOnly: true, //
                    secure: true, // gunakan true jika menggunakan HTTPS
                    maxAge: 3600000 ,// waktu dalam milidetik (1 jam)
                    patch : '/'

                }).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'email not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie('token', {httpOnly: true});
        res.status(200).json({message: 'logout berhasil'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

module.exports = {login, logout};
