class Dl {
	download(name){
		const fs = require('fs');
		const puppeteer = require('puppeteer');
		const colors = require('colors');
		(async () => {
			function sleep(milliseconds) {
				const date = Date.now();
				let currentDate = null;
				do {
					currentDate = Date.now();
				} while (currentDate - date < milliseconds);
			}
			function WriteError(errorback) {
				var data = fs.readFileSync('C:\\Users\\Corentin\\Documents\\dev\\ConvMP3\\back.txt', 'utf8');
				var today = new Date();
				var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/'+today.getDate();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				var dateTime = date + ' | ' + time;
				var message = data + "\n" + errorback + " _____" + dateTime;
				fs.writeFile('C:\\Users\\Corentin\\Documents\\dev\\ConvMP3\\back.txt', message, function(erreur) {
					if (erreur) {
						console.log(erreur.toString().red);
					}
				})
			}
			const browser = await puppeteer.launch({headless: false});//Open browser with puppeteer, to see the window, add {headless: false} in parameters

			console.log("===================================================================================".green);
			console.log("\\i/".green.bold + " Starting download process for : " + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta);
			console.log("===================================================================================".green);

			//Open a page with Youtube
			const page = await browser.newPage();
			var errorback = await page.goto('https://www.youtube.com/')
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Youtube n'est pas accessible pour le moment /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			
			//Type the name of the song in the youtube searchbar
			await page.waitFor(1000);
			var errorback = await page.evaluate(() => {
				const obj = document.querySelector('input[id="search"]');
				obj.select();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " La barre de recherche Youtube n'est pas disponible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			await page.keyboard.type(name);
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[=10%---------]".blue + "<--_____--Try to find the song URL--_____-->".yellow);

			//Submit the search
			await page.waitFor(500);
			var errorback = await page.evaluate(() => {
				const obj = document.querySelector('button[id="search-icon-legacy"]');
				obj.click();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le bouton de recherche Youtube n'est pas accessible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};

			//Clic on the video and get the url
			await page.waitFor(1000);
			var errorback = await page.evaluate(() => {
				const obj = document.querySelector('a[id="video-title"]');
				obj.click();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le vidéo Youtube n'est pas accessible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			const url = page.url();
			await page.waitFor(1000);
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[==20%--------]".blue + "<--__________--Song URL find--___________-->".yellow);

			//Open a new page with the downloader website
			const page2 = await browser.newPage();
			var errorback = await page2.goto('https://mp3-youtube.download/fr/easy-mp3-converter')
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le site de convertion n'est pas accessible pour le moment /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			
			//Type the youtube url
			await page2.waitFor(1000);
			var errorback = await page2.evaluate(() => {
				const conv = document.querySelector('input[class="form-control"]');
				conv.select();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le zone de saisie du convertisseur n'est pas accessible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			await page2.keyboard.type(url);

			//Clic on the button to submit the url
			await page2.waitFor(500);
			var errorback = await page2.evaluate(() => {
				const button = document.querySelector('button[class="btn btn-primary rounded-right"]');
				button.click();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le bouton de validation du convertisseur n'est pas accessible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[====40%------]".blue + "<--__--Start the song file conversion--__-->".yellow);

			//Test if the preparation of the download is done
			await page2.waitFor(1000);
			var result = 'False';
			while (result == 'False') {
				result = await page2.evaluate(() => {
					const button = document.querySelector('button[class="btn btn-primary"]');
					const button2 = document.querySelector('a[class="btn btn-primary"]');
					if (button != null || button2 != null) {
						return('True');
					} else {
						return('False')
					}
				})
				.catch(function (e) {
					console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
					console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Echec de la convertion du fichier /|\\ ".red + " " + e.toString().red);
					WriteError(name.toUpperCase() + ". " + e.toString());
					return(false);
				});
				if (result == false) {
					return(false);
				};
			}
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[=======70%---]".blue + "<--__--Song file conversion finished--___-->".yellow);

			//Get the name of the downloaded file by replacing -()/ by "" and é by e and " " by -
			await page2.waitFor(1000);
			var duree = await page2.evaluate(() => {
				var duree = document.querySelector("small");
				return(duree.textContent);
			});
			var duree = duree.replace(/[a-zA-ZÀ-ž\s]/g, "");
			var nom = await page2.evaluate(() => {
				var nom = document.querySelector("strong");
				return(nom.innerText);
			});
			nom = nom.replace(/[@]/g, "at ");
			console.log(nom);
			nom = nom.replace(/[^a-zA-Z0-9À-ž-\s]/g, "");
			nom = nom.replace(/ +/g, " ");
			nom = nom.replace(/ /g, "-");
			nom = nom.replace(/-+/g, "-");
			nom = nom.replace(/^-|-$/g, "");
			nom = nom.toLowerCase();
			//nom.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); Marche pas pour les ë
			nom = nom.replace(/["ç"]/g, "c");
			nom = nom.replace(/["èéêë"]/g, "e");
			nom = nom.replace(/["àáâãäå"]/g, "a");
			nom = nom.replace(/["ìíîï"]/g, "i");
			nom = nom.replace(/["ðòóôõö"]/g, "o");
			nom = nom.replace(/["ùúûü"]/g, "u");
			nom = nom.replace(/["ýÿ"]/g, "y");
			nom = nom + '.mp3';
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "Song file name : ".yellow + nom.yellow + " Song time ".yellow + duree.yellow);

			//Test if there is an adbutton, if yes clic on it
			await page2.waitFor(1000);
			const test = await page2.evaluate(() => {
				const button = document.querySelector('button[class="btn btn-primary"]');
				if (button != null) {
					button.click();
					return('True');
				} else {
					return('False');
				}
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le bouton de téléchargement du convertisseur n'est pas accessible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (test == false) {
				return(false);
			};
			
			//Set the download folder
			await page2._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: 'C:\\Users\\Corentin\\Documents\\ConvMP3'});
			
			//Clic on the button to download the file
			page2.waitFor(500);
			var errorback = await page2.evaluate(() => {
				const button2 = document.querySelector('a[class="btn btn-primary"]');
				button2.click();
			})
			.catch(function (e) {
				console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
				console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Le bouton de téléchargement du convertisseur n'est pas accessible /|\\ ".red + " " + e.toString().red);
				WriteError(name.toUpperCase() + ". " + e.toString());
				return(false);
			});
			if (errorback == false) {
				return(false);
			};

			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[=========90%-]".blue + "<--____--Downloading the song file--_____-->".yellow);

			//Check if the file is download, if yes close the browser
			var didexist = 'False';
			while (didexist == 'False') {
				var file = "C:\\Users\\Corentin\\Documents\\ConvMP3\\" + nom;
				var fileExists = fs.existsSync(file);
				if (fileExists == true) {
					didexist = 'True';
				}
				sleep(500);
			}
			console.log(" {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : " + "[==========100%]".blue + "<--____--Download complete--_____-->".yellow);
			console.log("===================================================================================".green);
			console.log("\\i/".green.bold + " | ".cyan.bold + "File name : ".yellow + nom.yellow + " | ".cyan.bold + "Song time ".yellow + duree.yellow);
			console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download finished " + "[_SUCCESS_]".green.bold);
			console.log("===================================================================================".green);
			await browser.close();
		})()
		.catch(function (e) {
			console.log("\\i/".green.bold + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " : Download failed " + "[_FAILED_]".red.bold);
			console.log("/!\\ ".red + " {".cyan.bgMagenta + name.cyan.bgMagenta.bold + "} ".cyan.bgMagenta + " " + "ERROR :".red.underline + " Une erreur interne est survenue /|\\ ".red + " " + e.toString().red);
		});
		return(true);
	}
}

module.exports.Dl = Dl;