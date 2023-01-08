import * as readline from 'readline'

class Main {
	private reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	})

	private mineField: string[][] = []

	private question = (questionText: string) => new Promise<string>((resolve) => this.reader.question(questionText, resolve))

	main = async () => {
		try {
			const fieldSize = parseInt(await this.question('Enter field size -> '))
			console.log('Enter comma separated minefield: ')
			for (let index = 0; index < fieldSize; index++) {
				const row = (await this.question('-> ')).split(',')
				if (row.length != fieldSize) {
					console.log('Field input not match field size')
					return
				}
				this.mineField.push(row.map((item) => item.trim()))
			}
			const count = this.sweep()
			this.displayMineField(count)
		} catch (err: any) {
			console.log('Field size is not valid!')
		} finally {
			this.reader.close()
		}
	}

	private sweep = () => {
		const mineCounts: string[][] = []
		for (let indexL1 = 0; indexL1 < this.mineField.length; indexL1++) {
			const mineRows: string[] = []
			for (let indexL2 = 0; indexL2 < this.mineField[indexL1].length; indexL2++) {
				const element = this.mineField[indexL1][indexL2]
				if (element !== '#') {
					// Mine is not there
					const adjacentItems = this.getAdjacentFields(indexL1, indexL2)
					let count = 0
					for (let index = 0; index < adjacentItems.length; index++) {
						if (adjacentItems[index] === '#') count += 1
					}
					mineRows.push(count.toString())
				} else {
					mineRows.push(element)
				}
			}
			mineCounts.push(mineRows)
		}
		return mineCounts
	}

	private isValidPos(x: number, y: number) {
		if (x < 0 || y < 0 || x > this.mineField.length - 1 || y > this.mineField.length - 1) return false
		return true
	}

	private getAdjacentFields = (x: number, y: number): string[] => {
		const adjacentFields: string[] = []
		if (this.isValidPos(x - 1, y - 1)) adjacentFields.push(this.mineField[x - 1][y - 1])
		if (this.isValidPos(x - 1, y)) adjacentFields.push(this.mineField[x - 1][y])
		if (this.isValidPos(x - 1, y + 1)) adjacentFields.push(this.mineField[x - 1][y + 1])
		if (this.isValidPos(x, y - 1)) adjacentFields.push(this.mineField[x][y - 1])
		if (this.isValidPos(x, y + 1)) adjacentFields.push(this.mineField[x][y + 1])
		if (this.isValidPos(x + 1, y - 1)) adjacentFields.push(this.mineField[x + 1][y - 1])
		if (this.isValidPos(x + 1, y)) adjacentFields.push(this.mineField[x + 1][y])
		if (this.isValidPos(x + 1, y + 1)) adjacentFields.push(this.mineField[x + 1][y + 1])
		return adjacentFields
	}

	private displayMineField = (count: string[][]) => {
		console.log('Mine field is: ')
		for (let index = 0; index < this.mineField.length; index++) {
			console.log(this.mineField[index].join(' '))
		}
		console.log('Mine counts are: ')
		for (let index = 0; index < count.length; index++) {
			console.log(count[index].join(' '))
		}
	}
}

new Main().main()
