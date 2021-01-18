

let dropArea = document.getElementById('drop-area')
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, (e) => {
		e.preventDefault()
		e.stopPropagation()
	}, false)
})

;['dragenter', 'dragover'].forEach(eventName => {
	dropArea.addEventListener(eventName, () => {
		dropArea.classList.add('highlight')
	}, false)
})

;['dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, () => {
		dropArea.classList.remove('highlight')
	}, false)
})

dropArea.addEventListener('drop', (e) => {
	let dt = e.dataTransfer
	let files = dt.files

	handleFiles(files)
}, false)

function handleFiles(files) {
	([...files]).forEach(uploadFile)
}
window.handleFiles = handleFiles

function uploadFile(file) {
	let progressbar = document.getElementById("progressbar")
	let statusbar = progressbar.querySelector('.status')
	progressbar.classList.remove('hidden')
	var reader = new FileReader();
	reader.onload = async (e) => {
		let rom = new Uint8Array(reader.result)
		let sk = rom.slice(0, 2097152)
		let s3 = rom.slice(2097152)

		var a = new FileReader()
		a.onload = function(e) {
			document.querySelector('a.skrom').href = a.result	
		}
		a.readAsDataURL(new Blob([sk], {type: 'application/octet-stream'}) )

		var b = new FileReader()
		b.onload = function(e) {
			document.querySelector('a.s3rom').href = b.result
		}
		b.readAsDataURL(new Blob([s3], {type: 'application/octet-stream'}) )

		document.getElementById("drop-areaholder").classList.add('hide')
		window.setTimeout(() => document.getElementById("drop-areaholder").classList.add('hidden'), 1000)
		document.getElementById("results").classList.remove('hidden')
	}
	reader.readAsArrayBuffer(file)
}