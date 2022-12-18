import { exit } from 'process'
import * as readline from 'readline'

class Main {
	private reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	private question = (questionText: string) => new Promise<string>((resolve) => this.reader.question(questionText, resolve))

	main = async () => {
		while (true) {
			try {
				let action = parseInt(await this.question('What do you want to do?\n1. Encode\n2. Decode\n3. Exit\n-> '))
				switch (action) {
					case 1: {
						const word = await this.question('Enter word -> ')
						if (word.length >= 3) {
							console.log(this.encode(word))
						} else {
							console.log("Can't encode words having less than 3 characters!")
						}
						break
					}
					case 2: {
						const word = await this.question('Enter word -> ')
						if (word.length >= 5) {
							console.log(this.decode(word))
						} else {
							console.log("Can't decode words having less than 5 characters!")
						}
						break
					}
					case 3: {
						this.reader.close()
						exit(0)
					}
					default: {
						console.log('Invalid choice')
					}
				}
			} catch (err) {
				console.log('Not a number\nTry again!')
			}
		}
	}

	private encode = (word: string): string => word.slice(2) + word.slice(0, 2) + 'ae'

	private decode = (word: string) => word.slice(-4).slice(0, 2) + word.slice(0, word.length - 4)
}

new Main().main()
