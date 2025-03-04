let saldoAwal = 0;
let pemasukan = Array(12).fill(0);
let pengeluaran = Array(12).fill(0);
let target = 0;
let saldoBulanan = Array(12).fill(0);

function setSaldoAwal() {
    saldoAwal = parseFloat(document.getElementById('saldo-awal').value) || 0;
    saldoBulanan[0] = saldoAwal;
    updateChart();
    updateSummary();
    saveData();
}

function tambahPemasukan() {
    const jumlah = parseFloat(document.getElementById('pemasukan').value) || 0;
    const bulan = prompt("Masukkan bulan (1-12):");
    const bulanIndex = parseInt(bulan) - 1;
    if (bulanIndex >= 0 && bulanIndex < 12) {
        pemasukan[bulanIndex] += jumlah;
        saldoBulanan[bulanIndex] += jumlah;
        updateChart();
        updateSummary();
        saveData();
    } else {
        alert("Bulan tidak valid. Masukkan angka antara 1 dan 12.");
    }
}

function tambahPengeluaran() {
    const jumlah = parseFloat(document.getElementById('pengeluaran').value) || 0;
    const bulan = prompt("Masukkan bulan (1-12):");
    const bulanIndex = parseInt(bulan) - 1;
    if (bulanIndex >= 0 && bulanIndex < 12) {
        pengeluaran[bulanIndex] += jumlah;
        saldoBulanan[bulanIndex] -= jumlah;
        updateChart();
        updateSummary();
        saveData();
    } else {
        alert("Bulan tidak valid. Masukkan angka antara 1 dan 12.");
    }
}

function setTarget() {
    target = parseFloat(document.getElementById('target').value) || 0;
    checkTarget();
    saveData();
}

function checkTarget() {
    saldoBulanan.forEach((saldo, index) => {
        if (saldo >= target) {
            alert(`Target mencapai Rp${target} pada bulan ke-${index + 1}`);
        }
    });
}

function updateChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 12 }, (_, i) => `Bulan ${i + 1}`),
            datasets: [{
                label: 'Saldo Bulanan',
                data: saldoBulanan,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateSummary() {
    const totalPemasukan = pemasukan.reduce((acc, curr) => acc + curr, 0);
    const totalPengeluaran = pengeluaran.reduce((acc, curr) => acc + curr, 0);
    const saldoAkhir = saldoBulanan[11];

    document.getElementById('summary-saldo-awal').textContent = `Rp${saldoAwal.toLocaleString()}`;
    document.getElementById('summary-pemasukan').textContent = `Rp${totalPemasukan.toLocaleString()}`;
    document.getElementById('summary-pengeluaran').textContent = `Rp${totalPengeluaran.toLocaleString()}`;
    document.getElementById('summary-saldo-akhir').textContent = `Rp${saldoAkhir.toLocaleString()}`;
}

function saveData() {
    localStorage.setItem('saldoAwal', saldoAwal);
    localStorage.setItem('pemasukan', JSON.stringify(pemasukan));
    localStorage.setItem('pengeluaran', JSON.stringify(pengeluaran));
    localStorage.setItem('target', target);
    localStorage.setItem('saldoBulanan', JSON.stringify(saldoBulanan));
}

function loadData() {
    saldoAwal = parseFloat(localStorage.getItem('saldoAwal')) || 0;
    pemasukan = JSON.parse(localStorage.getItem('pemasukan')) || Array(12).fill(0);
    pengeluaran = JSON.parse(localStorage.getItem('pengeluaran')) || Array(12).fill(0);
    target = parseFloat(localStorage.getItem('target')) || 0;
    saldoBulanan = JSON.parse(localStorage.getItem('saldoBulanan')) || Array(12).fill(0);
    updateChart();
    updateSummary();
}

window.onload = loadData;
