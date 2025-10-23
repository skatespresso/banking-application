class konto {
        private id: number;
        private name: string;
        private saldo: number;

        constructor(id: number, name: string) {
            this.id = id;
            this.name =name;
            this.saldo = 0;
        }

        hamtaId(): number {
            return this.id;
        }

        hamtaNamn(): string {
            return this.name;
        }

        hamtaSaldo(): number {
            return this.saldo;
        }

        insattning(amount: number): void {
            if (amount>0){
                this.saldo += amount;
            }
        }

        uttag(amount:number): boolean {
            if (amount > 0 && amount <=this.saldo) {
                this.saldo -= amount;
                return true;
            }
            return false;
        }
    }

class bank {
    private konton: konto[];
    private nextId: number;

    constructor() {
        this.konton = [];
        this.nextId = 1;
    }

    skapaKonto(name: string): konto {
        const nyttKonto = new konto(this.nextId, name);
        this.konton.push(nyttKonto);
        this.nextId++;
        return nyttKonto;
    }

    hamtaKonton(): konto[] {
        return this.konton;
    }

    hittaKonto(id: number): konto | undefined {
        return this.konton.find(konto => konto.hamtaId() === id);
    }

}

//Funktioner

document.addEventListener("DOMContentLoaded", () => {
    const dinBank = new bank();

    

function accountsTabContent() {
    const accountsCont = document.getElementById("accounts")!;
    const existingAccs = document.querySelector("#existingacc")!;
    
    // Clear existing content first
    existingAccs.innerHTML = "";
    
    const konton = dinBank.hamtaKonton();
    
    if (konton.length === 0) {
        const noAcc = document.createElement("p");
        noAcc.innerText = "Du verkar inte ha några konton. Börja spara genom att starta ett!";
        existingAccs.appendChild(noAcc);
    } else {
        konton.forEach(konto => {
            let kontoInfo = document.createTextNode(`Konto ${konto.hamtaId()}: ${konto.hamtaNamn()} - ${konto.hamtaSaldo()} kr`);
            existingAccs.appendChild(kontoInfo);
            existingAccs.appendChild(document.createElement('br'));
        });
    }
}

const createAccBtn = document.querySelector("#createAccount");
const accNameInput = document.querySelector("#accnameinput") as HTMLInputElement;

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
    const option = document.createElement("option")
    option.value = konto.hamtaId().toString();
    option.textContent = `${konto.hamtaNamn()} - ${konto.hamtaSaldo()} kr`;
    accountDropDown.appendChild(option);
})



function depositTabContent() {
const depositAct = document.querySelector("#depositaction");
depositAct?.appendChild(accountDropDown);


}

function withdrawTabContent(){
    const depositAct = document.querySelector("#depositaction");
depositAct?.appendChild(accountDropDown);

}


function transferTabContent(){

}



    //Ui funktionalitet

function getTabContent(tabID: string){
    switch(tabID){
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
    const tabs = document.querySelectorAll<HTMLElement>('[data-tab-target]')
    const tabContents = document.querySelectorAll<HTMLElement>('[data-tab-content]')

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabSelector = tab.dataset.tabTarget;
            if (!tabSelector) return;
            
            const target = document.querySelector(tabSelector) as HTMLElement | null;
            if (!target) return;
            
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