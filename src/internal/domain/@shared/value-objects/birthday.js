export class Birthday {
    #day
    #month
    #year
    #date

    constructor({day, month, year}) {
        this.#day = day;
        this.#month = month;
        this.#year = year;
        
        this.isValid()

        this.#date = new Date(this.#year, this.#month - 1, this.#day)
    }

    get day() {
        return this.#day
    }

    get month() {
        return this.#month
    }

    get year() {
        return this.#year
    }

    get date() {
        return this.#date
    }

    #isLeadYear() {
        return this.#year % 400 === 0 || (this.#year % 4 === 0 && this.#year % 100 !== 0)
    }

    isValid() {
        if (this.#month < 1 || this.#month > 12) {
            throw new Error("Invalid month")
        }

        if (this.#day < 1) {
            throw new Error("Invalid day")
        }

        const daysInMonth = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ]

        if (this.#isLeadYear()) {
            daysInMonth[1] = 29
        }

        if (this.#day > daysInMonth[this.#month - 1]) {
            throw new Error("invalid day for the given month")
        }
    }
}