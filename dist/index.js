class konto {
    constructor(id, name) {
        this.id = id;
        this.kontonamn = name;
        this.saldo = 0;
    }
    //Hämta-data-metoder
    hamtaId() {
        return this.id;
    }
    hamtaNamn() {
        return this.kontonamn;
    }
    hamtaSaldo() {
        return this.saldo;
    }
    insattning(amount) {
        if (amount > 0) {
            this.saldo += amount;
        }
    }
    uttag(amount) {
        if (amount > 0 && amount <= this.saldo) {
            this.saldo -= amount;
            return true;
        }
        return false;
    }
}
class bank {
    constructor() {
        this.konton = []; //vid sidladdning blir konton en tom array
        this.nextId = 1; //kollar vad nästa lediga kontoID är, det börjar på 1
    }
    skapaKonto(name) {
        const nyttKonto = new konto(this.nextId, name);
        this.konton.push(nyttKonto);
        this.nextId++;
        return nyttKonto;
    }
    hamtaKonton() {
        return this.konton;
    }
    hittaKonto(id) {
        return this.konton.find(konto => konto.hamtaId() === id);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const dinBank = new bank(); //vid varje sidladdning skapas en ny instans av "bank"
    const konton = dinBank.hamtaKonton();
    //error messages. pls dont roast me, i know, i know
    const accountMsg = document.createElement("p");
    const depositMsg = document.createElement("p");
    const withdrawMsg = document.createElement("p");
    const transferMsg = document.createElement("p");
    //class för styling
    accountMsg.className = "error-message";
    depositMsg.className = "error-message";
    withdrawMsg.className = "error-message";
    transferMsg.className = "error-message";
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    const createAccBtn = document.querySelector("#createAccount");
    const accNameInput = document.querySelector("#accnameinput");
    createAccBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const createAccForm = document.querySelector("#createAccForm");
        createAccForm?.appendChild(accountMsg);
        const accountName = accNameInput?.value.trim();
        if (accountName) {
            dinBank.skapaKonto(accountName);
            accountsTabContent();
            fillAllDropdowns();
            accNameInput.value = "";
            accountMsg.textContent = "";
        }
        else {
            accountMsg.textContent = "Ge ditt konto ett namn först.";
            return;
        }
    });
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabSelector = tab.dataset.tabTarget;
            if (!tabSelector)
                return;
            const target = document.querySelector(tabSelector);
            if (!target)
                return;
            tabContents.forEach(tabContent => tabContent.classList.remove("active"));
            tabs.forEach(tab => tab.classList.remove("active"));
            tab.classList.add("active");
            target.classList.add("active");
            if (tabSelector === '#accounts') {
                accountsTabContent();
            }
        });
    });
    function fillAllDropdowns() {
        const depositDropdown = document.getElementById("depositSelect");
        const withdrawDropdown = document.getElementById("withdrawSelect");
        const fromAccountDropdown = document.getElementById("fromAccount");
        const toAccountDropdown = document.getElementById("toAccount");
        if (depositDropdown)
            fillDropdown(depositDropdown);
        if (withdrawDropdown)
            fillDropdown(withdrawDropdown);
        if (fromAccountDropdown)
            fillDropdown(fromAccountDropdown);
        if (toAccountDropdown)
            fillDropdown(toAccountDropdown);
    }
    function fillDropdown(dropdown) {
        dropdown.innerHTML = '<option value="">Välj konto...</option>';
        konton.forEach(konto => {
            const option = document.createElement("option");
            option.value = konto.hamtaId().toString();
            option.textContent = `${konto.hamtaNamn()} - ${konto.hamtaSaldo()} kr`;
            dropdown.appendChild(option);
        });
    }
    function accountsTabContent() {
        const existingAccs = document.querySelector("#existingacc");
        existingAccs.innerHTML = "";
        if (konton.length === 0) {
            const noAcc = document.createElement("p");
            noAcc.innerText = "Du verkar inte ha några konton. Börja spara genom att starta ett!";
            existingAccs.appendChild(noAcc);
        }
        else {
            konton.forEach(konto => {
                let kontoInfo = document.createTextNode(`Konto ${konto.hamtaId()}: ${konto.hamtaNamn()} - ${konto.hamtaSaldo()} kr`);
                existingAccs.appendChild(kontoInfo);
                existingAccs.appendChild(document.createElement('br'));
            });
        }
    }
    function depositTabContent() {
        const depositBtn = document.querySelector("#depositBtn");
        const depositDiv = document.querySelector("#depositaction");
        depositDiv?.appendChild(depositMsg);
        depositBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const depositInput = document.querySelector("#depositinput");
            const dropdown = document.querySelector("#depositSelect");
            const targetAccId = dropdown.value;
            const amount = parseFloat(depositInput.value);
            if (!targetAccId) {
                depositMsg.textContent = "Välj ett konto först.";
                return;
            }
            if (!amount || amount <= 0) {
                depositMsg.textContent = "Ange ett giltligt belopp.";
                return;
            }
            const selectedAcc = konton.find(konto => konto.hamtaId().toString() === targetAccId);
            if (selectedAcc) {
                selectedAcc.insattning(amount);
                console.log(`Satte in ${amount} kr på ${selectedAcc.hamtaNamn()}`);
                depositMsg.textContent = `Satte in ${amount} kr på ${selectedAcc.hamtaNamn()}`;
                accountsTabContent();
                fillAllDropdowns();
                depositInput.value = "";
            }
            else {
                depositMsg.textContent = "Kunde inte hitta kontot.";
            }
        });
    }
    function withdrawTabContent() {
        const withdrawBtn = document.querySelector("#withdrawBtn");
        const withdrawaction = document.querySelector("#withdrawaction");
        withdrawaction?.appendChild(withdrawMsg);
        withdrawBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const withdrawInput = document.querySelector("#withdrawinput");
            const dropdown = document.querySelector("#withdrawSelect");
            const targetAccId = dropdown.value;
            const amount = parseFloat(withdrawInput.value);
            const selectedAcc = konton.find(konto => konto.hamtaId().toString() === targetAccId);
            if (!targetAccId) {
                withdrawMsg.textContent = "Välj ett konto.";
                return;
            }
            if (!amount || amount <= 0) {
                withdrawMsg.textContent = "Ange ett giltligt belopp.";
                return;
            }
            if (selectedAcc) {
                selectedAcc.uttag(amount);
                console.log(`Gjorde ett uttag på ${amount} kr på ${selectedAcc.hamtaNamn()}`);
                withdrawMsg.textContent = `Gjorde ett uttag på ${amount} kr på ${selectedAcc.hamtaNamn()}`;
                accountsTabContent();
                fillAllDropdowns();
                withdrawInput.value = "";
            }
            else {
                withdrawMsg.textContent = "Kunde inte hitta kontot.";
            }
        });
    }
    function transferTabContent() {
        const transferBtn = document.querySelector("#transferBtn");
        const transferaction = document.querySelector("#transferaction");
        transferaction?.appendChild(transferMsg);
        transferBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const transferInput = document.querySelector("#transferAmount");
            const fromDropdown = document.querySelector("#fromAccount");
            const toDropdown = document.querySelector("#toAccount");
            const fromAccId = fromDropdown.value;
            const toAccId = toDropdown.value;
            const amount = parseFloat(transferInput.value);
            const fromTarget = konton.find(konto => konto.hamtaId().toString() === fromAccId);
            const toTarget = konton.find(konto => konto.hamtaId().toString() === toAccId);
            if (!fromTarget || !toTarget) {
                transferMsg.textContent = "Välj både från-konto och till-konto.";
                return;
            }
            if (!amount || amount <= 0) {
                transferMsg.textContent = "Ange ett giltligt belopp.";
                return;
            }
            if (fromTarget && toTarget) {
                fromTarget.uttag(amount);
                toTarget.insattning(amount);
                console.log(`Förde över ${amount} kr från ${fromTarget.hamtaNamn()} till ${toTarget.hamtaNamn()}`);
                transferMsg.textContent = `Förde över ${amount} kr från ${fromTarget.hamtaNamn()} till ${toTarget.hamtaNamn()}`;
                accountsTabContent();
                fillAllDropdowns();
                transferInput.value = "";
            }
            else {
                transferMsg.textContent = "Ett av kontona kunde inte hittas.";
            }
        });
    }
    fillAllDropdowns();
    accountsTabContent();
    depositTabContent();
    withdrawTabContent();
    transferTabContent();
});
export {};
//# sourceMappingURL=index.js.map