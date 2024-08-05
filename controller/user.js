const { Op, where } = require('sequelize')
const bcrypt = require('bcryptjs');
const user = require('../models/user');

const getAllUser = async (req, res) => { //untuk mengambil semua baris dari databases
    try {
        const User = await user.findAll();
        res.json(User);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getbyidUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const User = await user.findByPk(id); // Finding the shoe by primary key
        if (User) {
            res.json(User);
        } else {
            res.status(404).json({
                message: 'Not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// const createUser = async (req, res) => {
//     const {nama, email, password} = req.body
//     try {
//         const User = await user.create({
//             nama: nama,
//             email: email,
//             password : password,
//         });
//         res.json(User);
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

const register = async (req, res) => {
    const { nama, email, password } = req.body;
    try {
        const User = await user.findOne({ where: { email } });
    if (User) {
        return res.status(200).json ({message: "Email sudah ada"})
    }
        const salt = bcrypt.genSaltSync(10);//menghasilkan salt yang akan digunakan untuk hashing.(nilai acak)
        const hashedPassword = bcrypt.hashSync(password, salt);// menggabungkan menjadi hash
        const newUser = await user.create({ nama, email, password: hashedPassword });
        res.status(201).json({ message: 'User baru berhasil dibuat', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





module.exports = {
    getAllUser,
    //createUser,
    getbyidUser,
    register
};
