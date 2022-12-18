import * as readline from 'readline'

class Main {
	private reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	private question = (questionText: string) => new Promise<string>((resolve) => this.reader.question(questionText, resolve))

	main = async () => {
		let numberOfWords = await this.question('Enter number of words -> ')
		try {
			const length = parseInt(numberOfWords)
			console.log('Enter comma separated hex-decimal values of each letters')
			for (let index = 0; index < length; index++) {
				const letters = await this.question('')
				const hexChars = letters.split(',').map((item) => item.trim())
				const asciiLetters: string[] = []
				for (let index = 0; index < hexChars.length; index++) {
					const element = hexChars[index]
					if (element.length != 2) {
						console.log(`Invalid Hex Character: ${element}`)
						return
					}
					asciiLetters.push(String.fromCharCode(parseInt(element, 16)))
				}
				console.log(asciiLetters.join(''))
			}
		} catch (err) {
			console.log('Please enter a correct number!')
		} finally {
			this.reader.close()
		}
	}
}

new Main().main()
