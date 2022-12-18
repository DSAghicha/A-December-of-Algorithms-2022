import * as readline from 'readline'

class Main {
	private reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	private question = (questionText: string) => new Promise<string>((resolve) => this.reader.question(questionText, resolve))

	main = async () => {
		let word = await this.question('Enter word that needs to coded: ')
		const len = word.length
		let lastLetter = ''
		if (len % 2 !== 0) {
			lastLetter = word.slice(-1)
			word = word.slice(0, -1)
		}
		let startIndex = 0
		let finishIndex = 2
		let parts: string[] = []
		for (let index = 0; index < Math.floor(len / 2); index++) {
			const part = word.substring(startIndex, finishIndex)
			parts.push(part[1] + part[0])
			startIndex = finishIndex
			finishIndex += 2
		}
		console.log(parts.join('') + lastLetter)
		this.reader.close()
	}
}

new Main().main()
