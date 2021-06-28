let response_fill_all = 'Необходимо заполнить форму'
let response_name = 'Укажите Ваше имя'
let response_email = 'Укажите Ваш email'
let response_phone = 'Укажите Ваш номер'
let response_email_correct = 'Укажите Ваш корректный email'
let response_phone_correct = 'Укажите Ваш корректный номер'
let response_message = 'Введите текст сообщения'
let response_code = 'Введите проверочный код'
let response_code_correct = 'Неверный проверочный код'
let response_email_successfully = 'Сообщение успешно отправлено'
let response_call_successfully = 'Заявка успешно отправлена'

let nameSuccessfully = false
let emailAddrassSuccessfully = false
let phoneNumberSuccessfully = false
let messageSuccessfully = false
let codeSuccessfully = false

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function validateMobile(mobileNumber) {
	//? /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
	//? ^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$
	//? ^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$
	const re = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
	return re.test(String(mobileNumber));
}










// ? логика email popup -------------------------------------------------
function pressEnterFromPopUp(event) {
	if (event.which === 13) {
		event.preventDefault()
		sendMessageFromPopUp()
	}
}
function showEmailPopup() {
	resetEmailPopUpVariables()
	document.querySelector('.email-popup').style.opacity = 1
	document.querySelector('.email-popup').style.pointerEvents = 'auto'
	document.getElementById('email-popup__client-name').addEventListener('keydown', pressEnterFromPopUp)
	document.getElementById('email-popup__client-email-address').addEventListener('keydown', pressEnterFromPopUp)
	document.getElementById('email-popup__message').addEventListener('keydown', pressEnterFromPopUp)
	document.getElementById('email-popup__code').addEventListener('keydown', pressEnterFromPopUp)
}
function resetEmailPopUpVariables() {
	nameSuccessfully = false
	emailAddrassSuccessfully = false
	messageSuccessfully = false
	codeSuccessfully = false
	document.getElementById('email-popup__client-name').value = 'Ваше имя'
	document.getElementById('email-popup__client-email-address').value = 'Ваш email'
	document.getElementById('email-popup__message').value = 'Ваше сообщение'
	document.getElementById('email-popup__code').value = 'Введите код'
	document.getElementById('email-popup__info').style.opacity = 0
	document.getElementById('email-popup__info').style.color = '#da4e4d'
}
function sendMessageFromPopUp() {
	if (document.getElementById('email-popup__code').value === 'Введите код') {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_code
		codeSuccessfully = false
	} else {
		if (document.getElementById('email-popup__code').value.toUpperCase() !== 'J3ZB7') {
			document.getElementById('email-popup__info').style.opacity = 1
			document.getElementById('email-popup__info').textContent = response_code_correct
			codeSuccessfully = false
		} else {
			codeSuccessfully = true
		}
	}

	if (document.getElementById('email-popup__message').value === 'Ваше сообщение' || document.getElementById('email-popup__message').value === '') {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_message
		messageSuccessfully = false
	} else {
		messageSuccessfully = true
	}

	if (document.getElementById('email-popup__client-email-address').value === 'Ваш email') {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_email
		emailAddrassSuccessfully = false
	} else {
		if (validateEmail(document.getElementById('email-popup__client-email-address').value) == false) {
			document.getElementById('email-popup__info').style.opacity = 1
			document.getElementById('email-popup__info').textContent = response_email_correct
			emailAddrassSuccessfully = false
		} else {
			emailAddrassSuccessfully = true
		}

	}

	if (document.getElementById('email-popup__client-name').value === 'Ваше имя' || document.getElementById('email-popup__client-name').value === '') {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_name
		nameSuccessfully = false
	} else {
		nameSuccessfully = true
	}

	if (document.getElementById('email-popup__client-name').value === 'Ваше имя' &&
		document.getElementById('email-popup__client-email-address').value === 'Ваш email' &&
		document.getElementById('email-popup__message').value === 'Ваше сообщение' &&
		document.getElementById('email-popup__code').value === 'Введите код'
	) {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_fill_all
	}

	if (nameSuccessfully && emailAddrassSuccessfully && messageSuccessfully && codeSuccessfully) {
		// ! успешная обработка формы
		if (mobileMenuView) {
			hideMobileMenu()
		}
		document.getElementById('email-popup__client-name').removeEventListener('keydown', pressEnterFromPopUp)
		document.getElementById('email-popup__client-email-address').removeEventListener('keydown', pressEnterFromPopUp)
		document.getElementById('email-popup__message').removeEventListener('keydown', pressEnterFromPopUp)
		document.getElementById('email-popup__code').removeEventListener('keydown', pressEnterFromPopUp)

		document.getElementById('email-popup__client-name').blur()
		document.getElementById('email-popup__client-email-address').blur()
		document.getElementById('email-popup__message').blur()
		document.getElementById('email-popup__code').blur()

		let emailPopUpData = {
			name: document.getElementById('email-popup__client-name').value,
			email: document.getElementById('email-popup__client-email-address').value,
			message: document.getElementById('email-popup__message').value
		}
		alert(JSON.stringify(emailPopUpData, null, 4)) // ! данные для обработки

		document.querySelector('.email-popup').style.pointerEvents = 'none'
		document.getElementById('email-popup__info').style.color = '#d5f1bd'
		document.getElementById('email-popup__info').textContent = response_email_successfully
		document.getElementById('email-popup__info').style.opacity = 1

		setTimeout(function () {
			document.querySelector('.email-popup').style.opacity = 0
			resetEmailPopUpVariables()
			footerLineRelative()
		}, 2000)
	}
}


document.getElementById('email-popup__send').addEventListener('click', e => {
	sendMessageFromPopUp()
})

document.getElementById('email-popup__cancel').addEventListener('click', e => {
	document.querySelector('.email-popup').style.opacity = 0
	document.querySelector('.email-popup').style.pointerEvents = 'none'
	resetEmailPopUpVariables()
	footerLineRelative()
	if (mobileMenuView) {
		hideMobileMenu()
	}
})

document.getElementById('email-popup__client-name').addEventListener('focus', e => {
	if (document.getElementById('email-popup__client-name').value === 'Ваше имя') {
		document.getElementById('email-popup__client-name').value = ''
	}
})
document.getElementById('email-popup__client-name').addEventListener('blur', e => {
	if (document.getElementById('email-popup__client-name').value === '') {
		document.getElementById('email-popup__client-name').value = 'Ваше имя'
	}
})

document.getElementById('email-popup__client-email-address').addEventListener('focus', e => {
	if (document.getElementById('email-popup__client-email-address').value === 'Ваш email') {
		document.getElementById('email-popup__client-email-address').value = ''
	}
})
document.getElementById('email-popup__client-email-address').addEventListener('blur', e => {
	if (document.getElementById('email-popup__client-email-address').value === '') {
		document.getElementById('email-popup__client-email-address').value = 'Ваш email'
	}
})

document.getElementById('email-popup__message').addEventListener('focus', e => {
	if (document.getElementById('email-popup__message').value === 'Ваше сообщение') {
		document.getElementById('email-popup__message').value = ''
	}
})
document.getElementById('email-popup__message').addEventListener('blur', e => {
	if (document.getElementById('email-popup__message').value === '') {
		document.getElementById('email-popup__message').value = 'Ваше сообщение'
	}
})

document.getElementById('email-popup__code').addEventListener('focus', e => {
	if (document.getElementById('email-popup__code').value === 'Введите код') {
		document.getElementById('email-popup__code').value = ''
	}
})
document.getElementById('email-popup__code').addEventListener('blur', e => {
	if (document.getElementById('email-popup__code').value === '') {
		document.getElementById('email-popup__code').value = 'Введите код'
	}
})
// ? popup email------------------------------------------------------------------------------
























// ? логика email footer -------------------------------------------------
if (typeof (document.querySelector('.footer-big-block')) != 'undefined' && document.querySelector('.footer-big-block') != null) {

	document.getElementById('email-footer__client-name').addEventListener('keydown', pressEnterFromFooter)
	document.getElementById('email-footer__client-email-address').addEventListener('keydown', pressEnterFromFooter)
	document.getElementById('email-footer__message').addEventListener('keydown', pressEnterFromFooter)
	document.getElementById('email-footer__code').addEventListener('keydown', pressEnterFromFooter)

	function resetEmailFooterVariables() {
		document.getElementById('email-form-footer').style.pointerEvents = 'auto'
		nameSuccessfully = false
		emailAddrassSuccessfully = false
		messageSuccessfully = false
		codeSuccessfully = false
		document.getElementById('email-footer__client-name').value = 'Ваше имя'
		document.getElementById('email-footer__client-email-address').value = 'Ваш email'
		document.getElementById('email-footer__message').value = 'Ваше сообщение'
		document.getElementById('email-footer__code').value = 'Введите код'
		document.getElementById('email-footer__info').style.opacity = 0
		document.getElementById('email-footer__info').style.color = '#da4e4d'

		document.getElementById('email-footer__client-name').addEventListener('keydown', pressEnterFromFooter)
		document.getElementById('email-footer__client-email-address').addEventListener('keydown', pressEnterFromFooter)
		document.getElementById('email-footer__message').addEventListener('keydown', pressEnterFromFooter)
		document.getElementById('email-footer__code').addEventListener('keydown', pressEnterFromFooter)
	}

	function pressEnterFromFooter(event) {
		if (event.which === 13) {
			event.preventDefault()
			sendMessageFromFooter()
		}
	}


	function sendMessageFromFooter() {
		if (document.getElementById('email-footer__code').value === 'Введите код') {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_code
			codeSuccessfully = false
		} else {
			if (document.getElementById('email-footer__code').value.toUpperCase() !== 'J3ZB7') {
				document.getElementById('email-footer__info').style.opacity = 1
				document.getElementById('email-footer__info').textContent = response_code_correct
				codeSuccessfully = false
			} else {
				codeSuccessfully = true
			}
		}

		if (document.getElementById('email-footer__message').value === 'Ваше сообщение' || document.getElementById('email-footer__message').value === '') {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_message
			messageSuccessfully = false
		} else {
			messageSuccessfully = true
		}

		if (document.getElementById('email-footer__client-email-address').value === 'Ваш email') {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_email
			emailAddrassSuccessfully = false
		} else {
			if (validateEmail(document.getElementById('email-footer__client-email-address').value) == false) {
				document.getElementById('email-footer__info').style.opacity = 1
				document.getElementById('email-footer__info').textContent = response_email_correct
				emailAddrassSuccessfully = false
			} else {
				emailAddrassSuccessfully = true
			}

		}

		if (document.getElementById('email-footer__client-name').value === 'Ваше имя' || document.getElementById('email-footer__client-name').value === '') {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_name
			nameSuccessfully = false
		} else {
			nameSuccessfully = true
		}

		if (document.getElementById('email-footer__client-name').value === 'Ваше имя' &&
			document.getElementById('email-footer__client-email-address').value === 'Ваш email' &&
			document.getElementById('email-footer__message').value === 'Ваше сообщение' &&
			document.getElementById('email-footer__code').value === 'Введите код'
		) {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_fill_all
		}

		if (nameSuccessfully && emailAddrassSuccessfully && messageSuccessfully && codeSuccessfully) {
			// ! успешная обработка формы
			document.getElementById('email-footer__client-name').removeEventListener('keydown', pressEnterFromFooter)
			document.getElementById('email-footer__client-email-address').removeEventListener('keydown', pressEnterFromFooter)
			document.getElementById('email-footer__message').removeEventListener('keydown', pressEnterFromFooter)
			document.getElementById('email-footer__code').removeEventListener('keydown', pressEnterFromFooter)

			document.getElementById('email-footer__client-name').blur()
			document.getElementById('email-footer__client-email-address').blur()
			document.getElementById('email-footer__message').blur()
			document.getElementById('email-footer__code').blur()

			let emailFooterData = {
				name: document.getElementById('email-footer__client-name').value,
				email: document.getElementById('email-footer__client-email-address').value,
				message: document.getElementById('email-footer__message').value
			}
			alert(JSON.stringify(emailFooterData, null, 4)) // ! данные для обработки

			document.getElementById('email-form-footer').style.pointerEvents = 'none'
			document.getElementById('email-footer__info').style.color = '#d5f1bd'
			document.getElementById('email-footer__info').textContent = response_email_successfully
			document.getElementById('email-footer__info').style.opacity = 1

			setTimeout(function () {
				resetEmailFooterVariables()
			}, 2000)
		}
	}


	document.getElementById('email-footer__send').addEventListener('click', e => {
		sendMessageFromFooter()
	})

	document.getElementById('email-footer__client-name').addEventListener('focus', e => {
		if (document.getElementById('email-footer__client-name').value === 'Ваше имя') {
			document.getElementById('email-footer__client-name').value = ''
		}
	})
	document.getElementById('email-footer__client-name').addEventListener('blur', e => {
		if (document.getElementById('email-footer__client-name').value === '') {
			document.getElementById('email-footer__client-name').value = 'Ваше имя'
		}
	})

	document.getElementById('email-footer__client-email-address').addEventListener('focus', e => {
		if (document.getElementById('email-footer__client-email-address').value === 'Ваш email') {
			document.getElementById('email-footer__client-email-address').value = ''
		}
	})
	document.getElementById('email-footer__client-email-address').addEventListener('blur', e => {
		if (document.getElementById('email-footer__client-email-address').value === '') {
			document.getElementById('email-footer__client-email-address').value = 'Ваш email'
		}
	})

	document.getElementById('email-footer__message').addEventListener('focus', e => {
		if (document.getElementById('email-footer__message').value === 'Ваше сообщение') {
			document.getElementById('email-footer__message').value = ''
		}
	})
	document.getElementById('email-footer__message').addEventListener('blur', e => {
		if (document.getElementById('email-footer__message').value === '') {
			document.getElementById('email-footer__message').value = 'Ваше сообщение'
		}
	})

	document.getElementById('email-footer__code').addEventListener('focus', e => {
		if (document.getElementById('email-footer__code').value === 'Введите код') {
			document.getElementById('email-footer__code').value = ''
		}
	})
	document.getElementById('email-footer__code').addEventListener('blur', e => {
		if (document.getElementById('email-footer__code').value === '') {
			document.getElementById('email-footer__code').value = 'Введите код'
		}
	})
}
// ? footer email------------------------------------------------------------------------------





















// ? логика обратного звонка -------------------------------------------------
if (typeof (document.querySelector('.call-popup')) != 'undefined' && document.querySelector('.call-popup') != null) {
	function pressEnterFromPopUpCall(event) {
		if (event.which === 13) {
			event.preventDefault()
			sendMessageFromPopUpCall()
		}
	}

	function showCallPopup() {
		resetCallPopUpVariables()
		document.querySelector('.call-popup').style.opacity = 1
		document.querySelector('.call-popup').style.pointerEvents = 'auto'
		document.getElementById('call-popup__client-name').addEventListener('keydown', pressEnterFromPopUpCall)
		document.getElementById('call-popup__client-phone').addEventListener('keydown', pressEnterFromPopUpCall)
		document.getElementById('call-popup__code').addEventListener('keydown', pressEnterFromPopUpCall)

		document.getElementById('call-popup__client-phone').addEventListener('keypress', e => {
			// Отменяем ввод не цифр и символов для номера телефона
			if (!/[\d\s\-\(\)\+\_\:\=]/.test(e.key))
				e.preventDefault();
		});
	}
	function resetCallPopUpVariables() {
		nameSuccessfully = false
		phoneNumberSuccessfully = false
		codeSuccessfully = false
		document.getElementById('call-popup__client-name').value = 'Ваше имя'
		document.getElementById('call-popup__client-phone').value = 'Ваш номер'
		document.getElementById('call-popup__code').value = 'Введите код'
		document.getElementById('call-popup__info').style.opacity = 0
		document.getElementById('call-popup__info').style.color = '#da4e4d'
	}
	function sendMessageFromPopUpCall() {
		if (document.getElementById('call-popup__code').value === 'Введите код') {
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_code
			codeSuccessfully = false
		} else {
			if (document.getElementById('call-popup__code').value.toUpperCase() !== 'J3ZB7') {
				document.getElementById('call-popup__info').style.opacity = 1
				document.getElementById('call-popup__info').textContent = response_code_correct
				codeSuccessfully = false
			} else {
				codeSuccessfully = true
			}
		}

		if (document.getElementById('call-popup__client-phone').value === 'Ваш номер') {
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_phone
			phoneNumberSuccessfully = false
		} else {
			if (validateMobile(document.getElementById('call-popup__client-phone').value) == false) {
				document.getElementById('call-popup__info').style.opacity = 1
				document.getElementById('call-popup__info').textContent = response_phone_correct
				phoneNumberSuccessfully = false
			} else {
				phoneNumberSuccessfully = true
			}

		}

		if (document.getElementById('call-popup__client-name').value === 'Ваше имя' || document.getElementById('call-popup__client-name').value === '') {
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_name
			nameSuccessfully = false
		} else {
			nameSuccessfully = true
		}

		if (document.getElementById('call-popup__client-name').value === 'Ваше имя' &&
			document.getElementById('call-popup__client-phone').value === 'Ваш номер' &&
			document.getElementById('call-popup__code').value === 'Введите код'
		) {
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_fill_all
		}

		if (nameSuccessfully && phoneNumberSuccessfully && codeSuccessfully) {
			// ! успешная обработка формы
			document.getElementById('call-popup__client-name').removeEventListener('keydown', pressEnterFromPopUpCall)
			document.getElementById('call-popup__client-phone').removeEventListener('keydown', pressEnterFromPopUpCall)
			document.getElementById('call-popup__code').removeEventListener('keydown', pressEnterFromPopUpCall)

			document.getElementById('call-popup__client-name').blur()
			document.getElementById('call-popup__client-phone').blur()
			document.getElementById('call-popup__code').blur()

			let callPopUpData = {
				name: document.getElementById('call-popup__client-name').value,
				phone: document.getElementById('call-popup__client-phone').value,
			}
			alert(JSON.stringify(callPopUpData, null, 4)) // ! данные для обработки

			document.querySelector('.call-popup').style.pointerEvents = 'none'
			document.getElementById('call-popup__info').style.color = '#d5f1bd'
			document.getElementById('call-popup__info').textContent = response_call_successfully
			document.getElementById('call-popup__info').style.opacity = 1

			setTimeout(function () {
				document.querySelector('.call-popup').style.opacity = 0
				resetCallPopUpVariables()
				footerLineRelative()
			}, 2000)
		}
	}


	document.getElementById('call-popup__send').addEventListener('click', e => {
		sendMessageFromPopUpCall()
	})

	document.getElementById('call-popup__cancel').addEventListener('click', e => {
		document.querySelector('.call-popup').style.opacity = 0
		document.querySelector('.call-popup').style.pointerEvents = 'none'
		resetCallPopUpVariables()
		footerLineRelative()
	})

	document.getElementById('call-popup__client-name').addEventListener('focus', e => {
		if (document.getElementById('call-popup__client-name').value === 'Ваше имя') {
			document.getElementById('call-popup__client-name').value = ''
		}
	})
	document.getElementById('call-popup__client-name').addEventListener('blur', e => {
		if (document.getElementById('call-popup__client-name').value === '') {
			document.getElementById('call-popup__client-name').value = 'Ваше имя'
		}
	})

	document.getElementById('call-popup__client-phone').addEventListener('focus', e => {
		if (document.getElementById('call-popup__client-phone').value === 'Ваш номер') {
			document.getElementById('call-popup__client-phone').value = ''
		}
	})
	document.getElementById('call-popup__client-phone').addEventListener('blur', e => {
		if (document.getElementById('call-popup__client-phone').value === '') {
			document.getElementById('call-popup__client-phone').value = 'Ваш номер'
		}
	})

	document.getElementById('call-popup__code').addEventListener('focus', e => {
		if (document.getElementById('call-popup__code').value === 'Введите код') {
			document.getElementById('call-popup__code').value = ''
		}
	})
	document.getElementById('call-popup__code').addEventListener('blur', e => {
		if (document.getElementById('call-popup__code').value === '') {
			document.getElementById('call-popup__code').value = 'Введите код'
		}
	})
}
// ?  обратный звонок ------------------------------------------------------------------------------

