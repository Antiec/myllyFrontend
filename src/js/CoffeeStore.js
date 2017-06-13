import { computed, observable } from "mobx"

class Coffee {
    @observable value
    @observable id
    @observable complete

    constructor(value) {
        this.value = value
        this.id = Date.now()
        this.complete = false
    }
}

export class CoffeeStore {
    @observable coffees = []
    @observable filter = ""
    @computed get filteredCoffees(){
        var matchesFilter = new RegExp(this.filter, "i")
        return this.coffees.filter(coffee => !this.filter || matchesFilter.test(coffee.value))
    }

    createCoffee(value){
        this.coffees.push(new Coffee(value))
    }

    clearComplete = () => {
        const incompleteCoffees = this.coffees.filter(coffee => !coffee.complete)
        this.coffees.replace(incompleteCoffees)
    }
}

export default new CoffeeStore;