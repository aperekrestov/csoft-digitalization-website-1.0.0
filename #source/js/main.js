//@prepros-append TweenMax.min.js

let mobileMenuView = false
let expandListsListeners = false
const maxHeightForExpandBlockBig = 184
const maxHeightForExpandBlockSmall = 86
let maxHeightForExpandBlock = maxHeightForExpandBlockBig

window.addEventListener('resize', onResize)

window.addEventListener('load', e => {
	hideMobileMenu()
	onResize()
	if (typeof (document.querySelector('.content__banner')) != 'undefined' && document.querySelector('.content__banner') != null) {
		TweenMax.to('.content__banner-pic', 0, { y: -100 })
		TweenMax.to('.content__banner-border', 0, { y: 100 })
		TweenMax.to(['.content__banner-pic', '.content__banner-border'], 1.5, { y: 0, ease: Power4.easeInOut })
		TweenMax.to('.content__banner', 1, { opacity: 1 })
	}
	if (typeof (document.getElementById('full-screen__video')) != 'undefined' && document.getElementById('full-screen__video') != null) {
		document.getElementById('full-screen__video').play()
	}
})

function onResize() {
	if (window.innerWidth <= 767) {
		maxHeightForExpandBlock = maxHeightForExpandBlockSmall
		document.querySelector('.menu__list').style.top = window.innerHeight / 4 + 'px'
		let ul = document.getElementById('menu__products').getElementsByTagName('ul')[0]
		ul.style.display = 'block'
		TweenMax.to(ul, 0, { scaleX: 1, scaleY: 1, opacity: 1 })
		for (let i = 0; i < ul.children.length; i++) {
			TweenMax.to(ul.children[i].getElementsByTagName('a')[0], 0, { y: 0, opacity: 1 })
		}
		if (!mobileMenuView) {
			document.querySelector('.menu__list').style.display = 'none'
		}
		if (window.innerHeight < 500) {
			if (mobileMenuView) {
				document.querySelector('.menu').style.position = 'relative'
			}
		}
		document.querySelector('.menu__list').style.position = 'absolute'
		document.querySelector('.menu__list').style.top = window.innerHeight / 4 + 'px'
		document.querySelector('.menu__list').style.width = '320px'
		document.querySelector('.menu__list').style.right = 'calc(50% - 160px)'
		document.querySelector('.menu__list').style.flexDirection = 'column'
		document.querySelector('.menu__list').style.textAlign = 'center'
	} else {
		maxHeightForExpandBlock = maxHeightForExpandBlockBig
		let ul = document.getElementById('menu__products').getElementsByTagName('ul')[0]
		ul.style.display = 'none'
		if (mobileMenuView) {
			hideMobileMenu()
		}
		document.querySelector('.menu__list').style.display = 'block'
		document.querySelector('.menu__list').style.position = 'relative'
		document.querySelector('.menu__list').style.width = 'auto'
		document.querySelector('.menu__list').style.right = '0'
		document.querySelector('.menu__list').style.top = '0'
		document.querySelector('.menu__list').style.display = 'flex'
		document.querySelector('.menu__list').style.flexDirection = 'initial'
		document.querySelector('.menu__list').style.textAlign = 'left'
	}

	if (typeof (document.querySelector('.content__expand-list')) != 'undefined' && document.querySelector('.content__expand-list') != null) {
		checkExpandLists()
		// ? метод пересчета корректной высоты раскрывающегося списка currentHeight
	}
	if (typeof (document.querySelector('.content__banner')) != 'undefined' && document.querySelector('.content__banner') != null) {
		if (window.innerWidth / 1920 < 1) {
			TweenMax.to('.content__banner', 0, { scale: window.innerWidth / 1920, transformOrigin: 'bottom left' })
		}
	}
}


//   ---------------------------------------------------- логика меню
btnAction1(document.querySelector('.menu__mail-btn'))
btnAction1(document.querySelector('.menu__home-btn'))
document.getElementById('menu__products').addEventListener('mouseenter', e => {
	if (!mobileMenuView) {
		let ul = document.getElementById('menu__products').getElementsByTagName('ul')[0]
		ul.style.display = 'block'
		TweenMax.to(ul, 0, { transformOrigin: 'center top', scaleX: 0.1, scaleY: 0.2, opacity: 0.3 })
		for (let i = 0; i < ul.children.length; i++) {
			TweenMax.to(ul.children[i].getElementsByTagName('a')[0], 0, { opacity: 0, y: -30 })
		}
		TweenMax.to(ul, 0.3, { ease: Power1.easeOut, scaleY: 1 })
		TweenMax.to(ul, 0.3, { ease: Power1.easeOut, scaleX: 1 })
		TweenMax.to(ul, 0.5, { opacity: 1 })
		for (let i = 0; i < ul.children.length; i++) {
			TweenMax.to(ul.children[i].getElementsByTagName('a')[0], i / 10 + 0.5, { ease: Power1.easeIn, opacity: 1 })
			TweenMax.to(ul.children[i].getElementsByTagName('a')[0], i / 10 + 0.5, { ease: Power1.easeOut, y: 0 })
		}
	}
})
document.getElementById('menu__products').addEventListener('mouseleave', e => {
	if (!mobileMenuView) {
		let ul = document.getElementById('menu__products').getElementsByTagName('ul')[0]
		for (let i = 0; i < ul.children.length; i++) {
			TweenMax.to(ul.children[i].getElementsByTagName('a')[0], 0.2, { opacity: 0, y: -20 })
		}
		TweenMax.to(ul, 0.3, { ease: Power1.easeIn, scaleY: 0.2 })
		TweenMax.to(ul, 0.3, { ease: Power1.easeIn, scaleX: 0.1 })
		TweenMax.to(ul, 0.5, { opacity: 0, onComplete: e => { ul.style.display = 'none' } })
	}
})
document.querySelector('.menu__mail-btn').addEventListener('click', e => {
	footerLineFixed()
	showEmailPopup()
})
document.querySelector('.menu__menu-btn').addEventListener('click', e => {
	if (!mobileMenuView) {
		showMobileMenu()
	} else {
		hideMobileMenu()
	}
})

function showMobileMenu() {
	mobileMenuView = true
	document.querySelector('.menu__menu-btn-icon').style.display = 'none'
	footerLineFixed()
	if (window.innerHeight < 500) {
		document.querySelector('.menu').style.position = 'relative'
	}
	document.querySelector('.menu-mobile-bg').style.display = 'block'
	document.querySelector('.menu__list').style.display = 'block'
	document.querySelector('.close-line-1').style.display = 'block'
	document.querySelector('.close-line-2').style.display = 'block'
	TweenMax.to('.close-line-1', 0.5, { rotation: 45, y: 9, ease: Back.easeInOut })
	TweenMax.to('.close-line-2', 0.5, { rotation: -45, y: -9, ease: Back.easeInOut })
}
function hideMobileMenu() {
	mobileMenuView = false
	footerLineRelative()
	document.querySelector('.menu').style.position = 'fixed'
	document.querySelector('.menu-mobile-bg').style.display = 'none'
	document.querySelector('.menu__list').style.display = 'none'
	TweenMax.to(['.close-line-1', '.close-line-2'], 0.5, {
		rotation: 0, y: 0, ease: Back.easeInOut, onComplete: function () {
			document.querySelector('.menu__menu-btn-icon').style.display = 'block'
			document.querySelector('.close-line-1').style.display = 'none'
			document.querySelector('.close-line-2').style.display = 'none'
		}
	})
}


function footerLineFixed() {
	TweenMax.to([document.documentElement, document.body], 0, { scrollTop: 0, ease: Power4.easeInOut })
	if (typeof (document.querySelector('.wrapper-main-content')) != 'undefined' && document.querySelector('.wrapper-main-content') != null) {
		document.querySelector('.wrapper-main-content').style.cssText = 'display:none !important'
	}
}

function footerLineRelative() {
	// document.querySelector('.footer-line').style.position = 'relative'
	if (typeof (document.querySelector('.wrapper-main-content')) != 'undefined' && document.querySelector('.wrapper-main-content') != null) {
		document.querySelector('.wrapper-main-content').style.display = 'block'
	}
}





//  ---------------------------------------------------- интерактив элементов интерфейса относительно курсора пользователя

if (typeof (document.querySelector('.button-style-1')) != 'undefined' && document.querySelector('.button-style-1') != null) {
	// ? анимация полоски кнопки Style-1
	for (let i = 0; i < document.querySelectorAll(".button-style-1").length; i++) {
		document.querySelectorAll(".button-style-1")[i].addEventListener('mouseover', e => {
			let line = e.target.parentNode.querySelector('span')
			TweenMax.to(line, 0.5, {
				ease: Power4.easeOut, scaleX: 0, opacity: 0, transformOrigin: ('top right'), onComplete: function () {
					TweenMax.to(line, 0.2, { ease: Power4.easeOut, opacity: 1, scaleX: 1, transformOrigin: ('top left') })
				}
			})
		})
		document.querySelectorAll(".button-style-1")[i].addEventListener('mouseout', e => {
			let line = e.target.parentNode.querySelector('span')
			TweenMax.to(line, 0.5, {
				ease: Power4.easeOut, scaleX: 0, opacity: 0, transformOrigin: ('top right'), onComplete: function () {
					TweenMax.to(line, 0.2, { ease: Power4.easeOut, opacity: 1, scaleX: 1, transformOrigin: ('top left') })
				}
			})
		})
	}
}

function btnAction1(theObject) {
	// ? анимация прилипания иконок к курсору пользователя
	theObject.addEventListener('mouseover', interactiveActivate)
	theObject.addEventListener('mouseout', interactiveDeactivate)
	let
		elem2,
		elem1 = theObject.querySelector('.elem-1'),
		mpos_left = 0,
		mpos_top = 0,
		mpos_block_left = 0,
		mpos_block_top = 0,
		numToRepositionX = 0,
		numToRepositionY = 0
		;
	if (typeof (theObject.querySelector('.elem-2')) != 'undefined' && theObject.querySelector('.elem-2') != null) {
		elem2 = theObject.querySelector('.elem-2')
	}

	function onMouseMove(event) {
		mpos_left = event.offsetX == undefined ? event.layerX : event.offsetX
		mpos_top = event.offsetY == undefined ? event.layerY : event.offsetY
		mpos_block_left = mpos_left - theObject.getBoundingClientRect().width
		mpos_block_top = mpos_top - theObject.getBoundingClientRect().height

		if (mpos_left < theObject.getBoundingClientRect().width / 2) {
			numToRepositionX = mpos_block_left - mpos_block_left / 2
		} else {
			numToRepositionX = mpos_left / 2
		}

		if (mpos_top < theObject.getBoundingClientRect().height / 2) {
			numToRepositionY = mpos_block_top - mpos_block_top / 2
		} else {
			numToRepositionY = mpos_top / 2
		}

		if (typeof (theObject.querySelector('.elem-2')) != 'undefined' && theObject.querySelector('.elem-2') != null) {
			TweenMax.to(elem2, 0.75, { x: numToRepositionX / 6, y: numToRepositionY / 6, ease: Power1.easeOut })
			TweenMax.to(elem1, 0.75, { x: numToRepositionX / 10, y: numToRepositionY / 10, ease: Power1.easeOut })
		} else {
			TweenMax.to(elem1, 0.75, { x: numToRepositionX / 3, y: numToRepositionY / 3, ease: Power1.easeOut })
		}
	}
	function interactiveActivate() {
		theObject.addEventListener('mousemove', onMouseMove)
		if (typeof (theObject.querySelector('.elem-2')) != 'undefined' && theObject.querySelector('.elem-2') != null) {
			TweenMax.to(elem2, 0.5, { scale: 1.1, ease: Power1.easeOut })
		}
	}
	function interactiveDeactivate() {
		theObject.removeEventListener('mousemove', onMouseMove)
		if (typeof (theObject.querySelector('.elem-2')) != 'undefined' && theObject.querySelector('.elem-2') != null) {
			TweenMax.to(elem2, 0.5, { scale: 1, x: 0, y: 0, ease: Power1.easeOut })
		}
		TweenMax.to(elem1, 0.5, { scale: 1, x: 0, y: 0, ease: Power1.easeOut })
	}
}





//  ---------------------------------------------------- логика раскрывающихся списков в контенте
function checkExpandLists() {
	let currentHeight
	let numPaddingMouseOver = 8

	for (let i = 0; i < document.querySelectorAll(".content__expand-list").length; i++) {
		document.querySelectorAll(".content__expand-list")[i].style.maxHeight = 100 + "%"
		if (!expandListsListeners) {
			document.querySelectorAll(".content__expand-list")[i].parentNode.querySelector('.button-expand').addEventListener('click', btnExpandClick)
			document.querySelectorAll(".content__expand-list")[i].parentNode.querySelector('.button-expand').addEventListener('mouseover', btnExpandOver)
		}
		currentHeight = document.querySelectorAll(".content__expand-list")[i].parentNode.querySelector('.content__expand-list').clientHeight
		document.querySelectorAll(".content__expand-list")[i].parentNode.querySelector('.content__expand-list-height-info').innerHTML = currentHeight

		if (document.querySelectorAll(".content__expand-list")[i].parentNode.querySelector('.content__expand-list-checkbox').checked) {
			// ? пропускаем все expand-list, которые не развернуты
		} else {
			document.querySelectorAll(".content__expand-list")[i].parentNode.querySelector('.content__expand-list').style.maxHeight = maxHeightForExpandBlock + 'px'
		}

		function btnExpandClick(e) {
			let parent = document.getElementById(e.target.parentNode.id)
			if (parent.parentNode.querySelector('.content__expand-list-checkbox').checked) {
				numPaddingMouseOver = 8
				parent.parentNode.querySelector('.content__expand-list-checkbox').checked = false
				TweenMax.to(parent.parentNode.querySelector('.content__expand-list'), 0.8, { ease: Power4.easeInOut, maxHeight: maxHeightForExpandBlock + 'px' })
				TweenMax.to(e.target.parentNode.querySelector('.arrow-1'), 0.5, { y: 0 })
				TweenMax.to(e.target.parentNode.querySelector('.arrow-2'), 0.5, { y: 0 })
				e.target.parentNode.querySelector('h4').innerHTML = 'Еще ...'
			} else {
				numPaddingMouseOver = 10
				parent.parentNode.querySelector('.content__expand-list-checkbox').checked = true
				let currentHeightFromHtmlTag = Number(parent.parentNode.querySelector('.content__expand-list-height-info').textContent)
				TweenMax.to(parent.parentNode.querySelector('.content__expand-list'), 0.85, { ease: Power4.easeInOut, maxHeight: currentHeightFromHtmlTag + 'px' })
				TweenMax.to(e.target.parentNode.querySelector('.arrow-1'), 0.5, { y: 10 })
				TweenMax.to(e.target.parentNode.querySelector('.arrow-2'), 0.5, { y: -10 })
				e.target.parentNode.querySelector('h4').innerHTML = 'Свернуть'
			}
		}
		function btnExpandOver(e) {
			TweenMax.to(e.target.parentNode.querySelector('.arrow-1'), 0.25, { ease: Power2.easeInOut, top: -numPaddingMouseOver })
			TweenMax.to(e.target.parentNode.querySelector('.arrow-2'), 0.25, {
				ease: Power2.easeInOut,
				delay: 0.075,
				top: numPaddingMouseOver, onComplete: function () {
					TweenMax.to(e.target.parentNode.querySelector('.arrow-1'), 0.15, { top: 0 })
					TweenMax.to(e.target.parentNode.querySelector('.arrow-2'), 0.15, { top: 0 })
				}
			})
		}
	}
	expandListsListeners = true
}
//------------------------------------------------


// ---------------------------------------------------- логика футера
if (typeof (document.querySelector('.footer-big-block')) != 'undefined' && document.querySelector('.footer-big-block') != null) {
	btnAction1(document.querySelector('.footer-big-block__up'))
	btnAction1(document.querySelector('.footer-big-block__search'))
	btnAction1(document.querySelector('.footer-big-block__staf'))
	btnAction1(document.querySelector('.footer-big-block__youtube'))

	document.querySelector('.footer-big-block__up').addEventListener('click', e => {
		TweenMax.to([document.documentElement, document.body], 1, { scrollTop: 0, ease: Power4.easeInOut })
	})
	document.querySelector('.footer-big-block__staf').addEventListener('click', e => {
		footerLineFixed()
		showCallPopup()
	})

}
//------------------------------------------------



// ---------------------------------------------------- слушатели событий вызова обратной связи из шапки и контента

if (typeof (document.getElementById('contact-header-call')) != 'undefined' && document.getElementById('contact-header-call') != null) {
	document.getElementById('contact-header-call').addEventListener('click', e => {
		footerLineFixed()
		showCallPopup()
	})
}

if (typeof (document.getElementById('error-header-call')) != 'undefined' && document.getElementById('error-header-call') != null) {
	document.getElementById('error-header-call').addEventListener('click', e => {
		footerLineFixed()
		showCallPopup()
	})
}


// ---------------------------------------------------- логика поиска
if (typeof (document.querySelector('.search-container')) != 'undefined' && document.querySelector('.search-container') != null) {
	document.getElementById('search-container__textarea').addEventListener('focus', e => {
		if (document.getElementById('search-container__textarea').value === 'Введите запрос') {
			document.getElementById('search-container__textarea').value = ''
		}
	})
	document.getElementById('search-container__textarea').addEventListener('blur', e => {
		if (document.getElementById('search-container__textarea').value === '') {
			document.getElementById('search-container__textarea').value = 'Введите запрос'
		}
	})
	document.getElementById('search-container__textarea').addEventListener('keydown', e => {
		if (e.which === 13) {
			e.preventDefault()
			if (document.getElementById('search-container__textarea').value !== '') {
				search()
			}
		}
	})
	document.querySelector('.search-container__search-block-icon').addEventListener('click', e => {
		if (document.getElementById('search-container__textarea').value !== 'Введите запрос') {
			search()
		}
	})

	function search() {
		let searchData = {
			search: document.getElementById('search-container__textarea').value
		}
		alert(JSON.stringify(searchData, null, 4)) // ! данные для поиска
		document.getElementById('search-container__textarea').blur()
		TweenMax.to([document.documentElement, document.body], 1, { scrollTop: window.innerHeight / 1.15, ease: Power4.easeInOut })
	}
}

//@prepros-append feedback.js