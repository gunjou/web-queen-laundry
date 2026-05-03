import React from "react";

const Receipt58mm = ({ data }) => {
  if (!data) return null;

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID").format(Number(n || 0));

  const hargaPerKg = Number(data.service?.harga || 0);
  const berat = Number(data.berat || 0);
  const total = Number(data.total || 0);

  const now = new Date().toLocaleString("id-ID");

  return (
    <div className="receipt-wrapper">
      {/* =========================
          STRUK PELANGGAN
      ========================= */}
      <div className="receipt">
        <div className="center title">QUEEN LAUNDRY</div>
        <div className="center text">Laundry Express & Premium Care</div>
        <div className="center text">Jl. Contoh No. 123</div>
        <div className="center text">Telp. 0812-xxxx-xxxx</div>

        <div className="line" />

        <div className="row">
          <span>Invoice</span>
          <span className="bold">{data.kode_invoice}</span>
        </div>

        <div className="row">
          <span>Tanggal</span>
          <span>{now}</span>
        </div>

        <div className="line" />

        <div className="section">PELANGGAN</div>
        <div>{data.customer?.nama || "-"}</div>
        {data.customer?.no_hp && <div>{data.customer.no_hp}</div>}

        <div className="line" />

        <div className="section">DETAIL ORDER</div>

        <div className="row">
          <span>Layanan</span>
          <span>{data.service?.nama || "-"}</span>
        </div>

        <div className="row">
          <span>Berat</span>
          <span>{berat} Kg</span>
        </div>

        <div className="row">
          <span>Harga/Kg</span>
          <span>Rp {formatRupiah(hargaPerKg)}</span>
        </div>

        <div className="line" />

        <div className="row total">
          <span>TOTAL</span>
          <span>Rp {formatRupiah(total)}</span>
        </div>

        <div className="row">
          <span>Pembayaran</span>
          <span>{data.metode || "-"}</span>
        </div>

        <div className="line" />

        <div className="center text">Terima kasih telah menggunakan</div>
        <div className="center text bold">QUEEN LAUNDRY</div>
      </div>

      {/* PEMBATAS */}
      <div className="cut-line">✂︎ POTONG DI SINI ✂︎</div>

      {/* =========================
          LABEL PIHAK LAUNDRY
      ========================= */}
      <div className="receipt">
        <div className="center title">QUEEN LAUNDRY</div>
        <div className="center bold">COPY INTERNAL</div>

        <div className="line" />

        <div className="row">
          <span>Invoice</span>
          <span className="bold">{data.kode_invoice}</span>
        </div>

        <div className="row">
          <span>Tanggal</span>
          <span>{now}</span>
        </div>

        <div className="line" />

        <div className="section">IDENTITAS</div>

        <div className="row">
          <span>Nama</span>
          <span>{data.customer?.nama || "-"}</span>
        </div>

        {data.customer?.no_hp && (
          <div className="row">
            <span>No HP</span>
            <span>{data.customer.no_hp}</span>
          </div>
        )}

        <div className="line" />

        <div className="section">DETAIL CUCIAN</div>

        <div className="row">
          <span>Layanan</span>
          <span>{data.service?.nama || "-"}</span>
        </div>

        <div className="row">
          <span>Berat</span>
          <span>{berat} Kg</span>
        </div>

        <div className="row">
          <span>Harga/Kg</span>
          <span>Rp {formatRupiah(hargaPerKg)}</span>
        </div>

        <div className="row total">
          <span>Total</span>
          <span>Rp {formatRupiah(total)}</span>
        </div>

        <div className="row">
          <span>Pembayaran</span>
          <span>{data.metode || "Belum Dibayar"}</span>
        </div>

        <div className="line" />

        <div className="section">CHECKLIST</div>
        <div>[ ] Sudah dicuci</div>
        <div>[ ] Sudah dikeringkan</div>
        <div>[ ] Sudah disetrika</div>
        <div>[ ] Sudah dibungkus</div>

        <div className="line" />

        <div className="center text bold">TEMPEL DI PLASTIK LAUNDRY</div>
      </div>

      <style>{`
        .receipt-wrapper {
          width: 58mm;
          background: #fff;
          color: #000;
          font-family: monospace;
          font-size: 10px;
        }

        .receipt {
          width: 58mm;
          padding: 6px;
          box-sizing: border-box;
        }

        .center {
          text-align: center;
        }

        .title {
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 0.5px;
        }

        .bold {
          font-weight: bold;
        }

        .text {
          font-size: 9px;
        }

        .section {
          font-size: 9px;
          font-weight: bold;
          margin-bottom: 3px;
        }

        .line {
          border-top: 1px dashed #000;
          margin: 6px 0;
        }

        .cut-line {
          text-align: center;
          font-size: 9px;
          padding: 4px 0;
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
        }

        .row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .row span:last-child {
          text-align: right;
        }

        .total {
          font-size: 11px;
          font-weight: bold;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

export default Receipt58mm;
