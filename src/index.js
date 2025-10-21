const tabContents = document.querySelectorAll('.tabcontent');
const tabLinks = document.querySelectorAll('.tablinks');

function activeTabs(tabId) {
    tabContents.forEach(tabCn => {
        tabCn.id === tabId ? "block": "none";
    });

    tabLinks.forEach(link => {
        if (link.getAttribute("data-tab") ===tabId) link.classList.add("active");
        else link.classList.remove("active");
    });


    tabLinks.forEach(link => {
        link.addEventListener("click" , (e) => {
            e.preventDefault();
            const tabId = link.getAttribute("data-tab") || (link.getAttribute('href') || '').replace('#', '');
        if (tabId) showTab(tabId);
    });
       
 });

if (tabLinks.length>0) {
    const firstTab = tabLinks[0].getAttribute("data-tab") || (tabLinks[0].getAttribute('href') || '').replace('#', '');
    if (firstTab) showTab(firstTab);
}



var konto = /** @class */ (function () {
    function konto(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.saldo = 0;
    }
    konto.prototype.hamtaId = function () {
        return this.id;
    };
    konto.prototype.hamtaNamn = function () {
        return this.name;
    };
    konto.prototype.hamtaTyp = function () {
        return this.type;
    };
    konto.prototype.hamtaSaldo = function () {
        return this.saldo;
    };
    konto.prototype.insattning = function (amount) {
        if (amount > 0) {
            this.saldo += amount;
        }
    };
    konto.prototype.uttag = function (amount) {
        if (amount > 0 && amount <= this.saldo) {
            this.saldo -= amount;
            return true;
        }
        return false;
    };
    return konto;
}());
var bank = /** @class */ (function () {
    function bank() {
        this.konton = [];
        this.nextId = 1;
    }
    bank.prototype.skapaKonto = function (name, type) {
        var nyttKonto = new konto(this.nextId, name, type);
        this.konton.push(nyttKonto);
        this.nextId++;
        return nyttKonto;
    };
    bank.prototype.hamtaKonton = function () {
        return this.konton;
    };
    bank.prototype.hittaKonto = function (id) {
        return this.konton.find(function (konto) { return konto.hamtaId() === id; });
    };
    return bank;
}());
