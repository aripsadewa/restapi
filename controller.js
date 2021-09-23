'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function (req, res) {
    response.ok("aplikasi berjalan", res)
};

//tampil semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('select * from mahasiswa', function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.tampilbyid = function (req, res) {
    let id = req.params.id;
    connection.query('select * from mahasiswa where id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            }
        });
};

exports.tambahMahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('insert into mahasiswa (nim,nama,jurusan) values(?,?,?)', [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("Berhasil tambah!", res)
            }
        });
};

exports.ubahMahasiswa = function (req, res) {
    var id = req.body.id;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('update mahasiswa set nim=?, nama=?, jurusan=? where id=?', [nim, nama, jurusan, id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("Berhasil Ubah!", res)
            }
        });
};

exports.hapusMahasiswa = function (req, res) {
    var id = req.body.id;
    connection.query('delete from mahasiswa where id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("Behasil Hapus!", res)
            }
        });
};

//tampil grouping matakuliah
exports.tampilgroupmatakuliah = function(req, res){
    connection.query('SELECT mahasiswa.id, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.nama as matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_mahasiswa=mahasiswa.id AND krs.id_matakuliah=matakuliah.id',
    function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });

};