'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };

     res.json(data);
     res.end();
}

//response untuk nested matakuliah
exports.oknested = function(values, res){
    //mulai akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        //tentukan key group
        if(akumulasikan[item.nama]){
            //variable group
            const group = akumulasikan[item.nama];
            //cek jika array adalah mahasiswa
            if(Array.isArray(group.matakuliah)){
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };

     res.json(data);
     res.end();
}