import React from 'react';

export const FormAddLabResult = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <h2>Tambah Hasil Lab Pasien</h2>

            <input type="hidden" name="id" value={props.hasilLab.id} />

            <div className="form-group">
                <label>Jenis<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="jenis" required />
            </div>

            <div className="form-group">
                <label>Hasil<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="hasil" required />
            </div>

            <div className="form-group">
                <label>Tanggal Pengajuan<span style={{ color: 'red' }}>*</span></label>
                <input type="date" className="form-control" name="tanggalPengajuan" required />
            </div>

            <input type="hidden" name="pasien.id" value={props.hasilLab.pasien.id} />

            <button className="btn btn-success" value="submit">Tambah</button>
        </form>
    )
}
