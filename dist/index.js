class konto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.saldo = 0;
    }
    hamtaId() {
        return this.id;
    }
    hamtaNamn() {
        return this.name;
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
        this.konton = [];
        this.nextId = 1;
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
//Funktioner
document.addEventListener("DOMContentLoaded", () => {
    const dinBank = new bank();
    function accountsTabContent() {
        const accountsCont = document.getElementById("accounts");
        const existingAccs = document.querySelector("#existingacc");
        // Clear existing content first
        existingAccs.innerHTML = "";
        const konton = dinBank.hamtaKonton();
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
    const createAccBtn = document.querySelector("#createAccount");
    const accNameInput = document.querySelector("#accnameinput");
    createAccBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const accountName = accNameInput?.value.trim();
        if (accountName) {
            dinBank.skapaKonto(accountName);
            accountsTabContent();
            accNameInput.value = "";
        }
    });
    accountsTabContent();
    const accountDropDown = document.createElement("select");
    const konton = dinBank.hamtaKonton();
    const defaultOp = document.createElement("option");
    defaultOp.value = "";
    defaultOp.textContent = "Välj konto";
    defaultOp.disabled = true;
    defaultOp.selected = true;
    accountDropDown.appendChild(defaultOp);
    konton.forEach(konto => {
        const option = document.createElement("option");
        option.value = konto.hamtaId().toString();
        option.textContent = `${konto.hamtaNamn()} - ${konto.hamtaSaldo()} kr`;
        accountDropDown.appendChild(option);
    });
    function depositTabContent() {
        const depositAct = document.querySelector("#depositaction");
        depositAct?.appendChild(accountDropDown);
    }
    function withdrawTabContent() {
        const depositAct = document.querySelector("#depositaction");
        depositAct?.appendChild(accountDropDown);
    }
    function transferTabContent() {
    }
    //Ui funktionalitet
    function getTabContent(tabID) {
        switch (tabID) {
            case '#accounts':
                accountsTabContent();
                break;
            case '#deposit':
                depositTabContent();
                break;
            case '#withdraw':
                withdrawTabContent();
                break;
            case '#transfer':
                transferTabContent();
                break;
        }
    }
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabSelector = tab.dataset.tabTarget;
            if (!tabSelector)
                return;
            const target = document.querySelector(tabSelector);
            if (!target)
                return;
            // Remove active classes
            tabContents.forEach(tabContent => tabContent.classList.remove("active"));
            tabs.forEach(tab => tab.classList.remove("active"));
            // Add active classes
            tab.classList.add("active");
            target.classList.add("active");
            // Update content for the active tab
            getTabContent(tabSelector);
        });
    });
});
export {};
//# sourceMappingURL=index.js.map