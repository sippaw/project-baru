const express = require('express');
const app = express();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const sequelize = require('./config/koneksi');
const users = require('./models/user');
const transaksi = require('./models/transaksi');
const Sepatu = require('./models/sepatu');
const routerSepatu = require('./routes/sepatu');
const routerUser = require('./routes/user');
const routerTransaksi = require('./routes/transaksi');
const routerLogin = require('./routes/login')
const uploadRoutes = require('./routes/upload');
const authenticateToken = require('./middleware/logs')
const path = require('path');

// Middleware
app.use(express.json());
app.use(cookieParser());//perantara mengambil cookie
app.use('/sepatu', routerSepatu);
app.use('/user', routerUser);
app.use('/transaksi', routerTransaksi);
app.use('/', routerLogin);
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
// dapat membuat file seperti HTML, CSS, JavaScript, dan gambar tersedia untuk klien melalui URL tanpa perlu penanganan tambahan di server.
app.use('/', uploadRoutes);

sequelize.authenticate()
.then(async () => {
    console.log('Connection success');
    //await Sepatu.sync({alter: true});
})
.catch(err => console.log('Error: ' + err));

app.listen(4000, () => {
    console.log('Server berhasil di running di port 4000');
})