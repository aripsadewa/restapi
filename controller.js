'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("aplikasi berjalan",res)
};

//tampil semua data mahasiswa
exports.tampilsemuamahasiswa = function(req,res){
    connection.query('select * from mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.tampilbyid = function(req,res){
    let id = req.params.id;
    connection.query('select * from mahasiswa where id = ?',  [id],
        function(error, rows, fields){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows, res)
        }
    });
};