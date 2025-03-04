let saldoAwal = 0;
let pemasukanBulanan = Array(12).fill(0);
let pengeluaranBulanan = Array(12).fill(0);
let saldoBulanan = Array(12).fill(0);
let target = 0;

function setSaldoAwal() {
    saldoAwal = parseFloat(document.getElementById('saldo-awal').value) || 0;
    saldoBulanan[0] = saldoAwal;
    updateChart();
    saveData();
}

function updateMonthlyData() {
    for (let i = 0; i < 12; i++) {
        pemasukanBulanan[i] = parseFloat(document.getElementById(`pemasukan-${i}`).value) || 0;
        pengeluaranBulanan[i] = parseFloat(document.getElementById(`pengeluaran-${i}`).value) || 0;
    }
    calculateSaldoBulanan();
    updateChart();
    saveData();
}

function calculateSaldoBulanan() {
    saldoBulanan[0] = saldoAwal;
    for (let i = 1; i < 12; i++) {
        saldoBulanan[i] = saldoBulanan[i - 1] + pemasukanBulanan[i] - pengeluaranBulanan[i];
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

function saveData() {
    localStorage.setItem('saldoAwal', saldoAwal);
    localStorage.setItem('pemasukanBulanan', JSON.stringify(pemasukanBulanan));
    localStorage.setItem('pengeluaranBulanan', JSON.stringify(pengeluaranBulanan));
    localStorage.setItem('target', target);
    localStorage.setItem('saldoBulanan', JSON.stringify(saldoBulanan));
}

function loadData() {
    saldoAwal = parseFloat(localStorage.getItem('saldoAwal')) || 0;
    pemasukanBulanan = JSON.parse(localStorage.getItem('pemasukanBulanan')) || Array(12).fill(0);
    pengeluaranBulanan = JSON.parse(localStorage.getItem('pengeluaranBulanan')) || Array(12).fill(0);
    target = parseFloat(localStorage.getItem('target')) || 0;
    saldoBulanan = JSON.parse(localStorage.getItem('saldoBulanan')) || Array(12).fill(0);
    generateMonthlyInputs();
    updateChart();
}

function generateMonthlyInputs() {
    const monthlyInputsContainer = document.getElementById('monthly-inputs');
    monthlyInputsContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'monthly-input';
        inputDiv.innerHTML = `
            <label for="pemasukan-${i}">Pemasukan Bulan ${i + 1}</label>
            <input type="number" id="pemasukan-${i}" value="${pemasukanBulanan[i]}">
            <label for="pengeluaran-${i}">Pengeluaran Bulan ${i + 1}</label>
            <input type="number" id="pengeluaran-${i}" value="${pengeluaranBulanan[i]}">
        `;
        monthlyInputsContainer.appendChild(inputDiv);
    }
}

window.onload = loadData;
