const sectionTag =document.querySelector(".client-list") 
const container = document.querySelector(".logo-grid-container")
const rows = document.querySelectorAll(".client-logo-row")
const bodyTag = document.querySelector("body")

function clamp(input, min, max) {
  return Math.max(min, Math.min(input, max))
}

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function mapAndClamp(value, low1, high1, low2, high2) {
  return clamp(
	map(value, low1, high1, low2, high2),
	Math.min(low2, high2), 
	Math.max(low2, high2)
  )
}

const fadeAndMoveLogos = function() {
	const yPositionTop = window.pageYOffset
	const containerWidth = container.offsetWidth
	const containerYPos = container.getBoundingClientRect().top
	const containerXPos = container.getBoundingClientRect().left
	
	const sectionY = sectionTag.offsetTop
	const sectionHeight = sectionTag.getBoundingClientRect().height
	
	const totalHeight = bodyTag.getBoundingClientRect().height - window.innerHeight
	
	rows.forEach((logoRow, index) => {
		
		const rowWidth = logoRow.getBoundingClientRect().width
		const numberOfLogos = logoRow.querySelectorAll("img")
		
		if (index == 1 || index == 2 ) {
			delay = 0.9
		}
		else {
			delay = 1.5
		}
		
		if (yPositionTop > (sectionY - sectionHeight) && yPositionTop < (sectionY + sectionHeight)) {
				
			// movement = mapAndClamp(yPositionTop, 0, totalHeight, 0 - (rowWidth / 4), (rowWidth / 4))
			movement = mapAndClamp(yPositionTop, sectionY - window.innerHeight, sectionY + window.innerHeight, 0 - (rowWidth / 4), (rowWidth / 4))
			
			if (index % 2 === 0) {
				movement = 0 - movement
			}
			
			logoRow.style.transform = `translateX(${movement * delay}px)`
		}
		
		// movement = mapAndClamp(yPositionTop, 0, totalHeight, 0 - (rowWidth / 4), (rowWidth / 4))
		
		// REVERSE DIRECTION OF  EVERY SECOND ROW
		
		// MOVE THE ROWS
		
		// FADE LOGOS DEPENDING ON THEIR PROXIMITY TO THE CENTRE
		const logos = logoRow.querySelectorAll("img")
		logos.forEach((logo) => {
			logoVertCenter = logo.getBoundingClientRect().width / 2	
			logoRelXPos = (logo.getBoundingClientRect().left - containerXPos) - (containerWidth*0.5)
			
			logoDelta = logoRelXPos + logoVertCenter
			
			if(logoDelta < 0) {
				logoDelta = 0 - logoDelta
			}
			
			targetOpacity = mapAndClamp(logoDelta, 0, containerWidth * 0.7, 1, 0)
			logo.style.opacity = targetOpacity
		})
		
	})	
}

document.addEventListener("scroll", function(){
	fadeAndMoveLogos()
})
document.addEventListener("resize", function(){
	fadeAndMoveLogos()
})

fadeAndMoveLogos()