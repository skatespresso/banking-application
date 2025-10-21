class konto {
        private id: number;
        private name: string;
        private type: string;
        private saldo: number;

        constructor(id: number, name: string, type: string) {
            this.id = id;
            this.name =name;
            this.type = type;
            this.saldo = 0;
        }

        hamtaId(): number {
            return this.id;
        }

        hamtaNamn(): string {
            return this.name;
        }

        hamtaTyp(): string {
            return this.type;
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

    skapaKonto(name: string, type: string): konto {
        const nyttKonto = new konto(this.nextId, name, type);
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