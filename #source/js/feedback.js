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
let response_privacy = 'Необходимо согласиться на обработку данных'

let nameSuccessfully = false
let emailAddrassSuccessfully = false
let phoneNumberSuccessfully = false
let messageSuccessfully = false
let codeSuccessfully = false
let privacySuccessfully = false

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
document.getElementById('email-popup__checkbox-title').addEventListener('click', e => {
	if (privacySuccessfully) {
		privacySuccessfully = false
		document.getElementById('email-popup__checkbox').checked = false
	} else {
		privacySuccessfully = true
		document.getElementById('email-popup__checkbox').checked = true
	}
})

function showEmailPopup() {
	resetEmailPopUpVariables()
	document.querySelector('.email-popup').style.opacity = 1
	document.querySelector('.email-popup').style.pointerEvents = 'auto'
}

function resetEmailPopUpVariables() {
	nameSuccessfully = false
	emailAddrassSuccessfully = false
	messageSuccessfully = false
	privacySuccessfully = false
	document.getElementById('email-popup__checkbox').checked = true
	document.getElementById('email-popup__client-name').value = ''
	document.getElementById('email-popup__client-email-address').value = ''
	document.getElementById('email-popup__message').value = ''

	document.getElementById('email-popup__info').style.opacity = 0
	document.getElementById('email-popup__info').style.color = '#da4e4d'
}

function sendMessageFromPopUp() {

	if (document.getElementById('email-popup__checkbox').checked == false) {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_privacy
		privacySuccessfully = false
	} else {
		privacySuccessfully = true
	}

	if (document.getElementById('email-popup__message').value === '') {
		document.getElementById('email-popup__message').focus()
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_message
		messageSuccessfully = false
	} else {
		messageSuccessfully = true
	}

	if (validateEmail(document.getElementById('email-popup__client-email-address').value) == false) {
		document.getElementById('email-popup__client-email-address').focus()
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_email_correct
		emailAddrassSuccessfully = false
	} else {
		emailAddrassSuccessfully = true
	}

	if (document.getElementById('email-popup__client-name').value === '') {
		document.getElementById('email-popup__client-name').focus()
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_name
		nameSuccessfully = false
	} else {
		nameSuccessfully = true
	}

	if (document.getElementById('email-popup__client-name').value === '' &&
		document.getElementById('email-popup__client-email-address').value === '' &&
		document.getElementById('email-popup__message').value === ''
	) {
		document.getElementById('email-popup__info').style.opacity = 1
		document.getElementById('email-popup__info').textContent = response_fill_all
	}

	if (nameSuccessfully && emailAddrassSuccessfully && messageSuccessfully && privacySuccessfully) {
		// ! успешная обработка формы
		let emailFooterData = {
			name: document.getElementById('email-popup__client-name').value,
			email: document.getElementById('email-popup__client-email-address').value,
			message: document.getElementById('email-popup__message').value
		}
		alert(JSON.stringify(emailFooterData, null, 4)) // ! данные для обработки

		document.querySelector('.email-popup').style.pointerEvents = 'none'
		document.getElementById('email-popup__info').style.color = '#d5f1bd'
		document.getElementById('email-popup__info').textContent = response_email_successfully
		document.getElementById('email-popup__info').style.opacity = 1

		setTimeout(function () {
			document.querySelector('.email-popup').style.opacity = 0
			document.querySelector('.email-popup').style.pointerEvents = 'none'
			resetEmailPopUpVariables()
			if (mobileMenuView) {
				hideMobileMenu()
			} else {
				footerLineRelative()
			}
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
// ? popup email------------------------------------------------------------------------------
























// ? логика email footer -------------------------------------------------
if (typeof (document.querySelector('.footer-big-block')) != 'undefined' && document.querySelector('.footer-big-block') != null) {
	document.getElementById('email-footer__checkbox-title').addEventListener('click', e => {
		if (privacySuccessfully) {
			privacySuccessfully = false
			document.getElementById('email-footer__checkbox').checked = false
		} else {
			privacySuccessfully = true
			document.getElementById('email-footer__checkbox').checked = true
		}
	})


	function resetEmailFooterVariables() {
		document.getElementById('email-form-footer').style.pointerEvents = 'auto'
		nameSuccessfully = false
		emailAddrassSuccessfully = false
		messageSuccessfully = false
		privacySuccessfully = false

		document.getElementById('email-footer__checkbox').checked = true
		document.getElementById('email-footer__client-name').value = ''
		document.getElementById('email-footer__client-email-address').value = ''
		document.getElementById('email-footer__message').value = ''

		document.getElementById('email-footer__info').style.opacity = 0
		document.getElementById('email-footer__info').style.color = '#da4e4d'
	}

	function sendMessageFromFooter() {

		if (document.getElementById('email-footer__checkbox').checked == false) {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_privacy
			privacySuccessfully = false
		} else {
			privacySuccessfully = true
		}

		if (document.getElementById('email-footer__message').value === '') {
			document.getElementById('email-footer__message').focus()
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_message
			messageSuccessfully = false
		} else {
			messageSuccessfully = true
		}

		if (validateEmail(document.getElementById('email-footer__client-email-address').value) == false) {
			document.getElementById('email-footer__client-email-address').focus()
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_email_correct
			emailAddrassSuccessfully = false
		} else {
			emailAddrassSuccessfully = true
		}

		if (document.getElementById('email-footer__client-name').value === '') {
			document.getElementById('email-footer__client-name').focus()
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_name
			nameSuccessfully = false
		} else {
			nameSuccessfully = true
		}

		if (document.getElementById('email-footer__client-name').value === '' &&
			document.getElementById('email-footer__client-email-address').value === '' &&
			document.getElementById('email-footer__message').value === ''
		) {
			document.getElementById('email-footer__info').style.opacity = 1
			document.getElementById('email-footer__info').textContent = response_fill_all
		}

		if (nameSuccessfully && emailAddrassSuccessfully && messageSuccessfully && privacySuccessfully) {
			// ! успешная обработка формы
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
}
// ? footer email------------------------------------------------------------------------------





















// ? логика обратного звонка -------------------------------------------------
if (typeof (document.querySelector('.call-popup')) != 'undefined' && document.querySelector('.call-popup') != null) {

	document.getElementById('call-popup__checkbox-title').addEventListener('click', e => {
		if (privacySuccessfully) {
			privacySuccessfully = false
			document.getElementById('call-popup__checkbox').checked = false
		} else {
			privacySuccessfully = true
			document.getElementById('call-popup__checkbox').checked = true
		}
	})

	function showCallPopup() {
		resetCallPopUpVariables()
		document.querySelector('.call-popup').style.opacity = 1
		document.querySelector('.call-popup').style.pointerEvents = 'auto'

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
		privacySuccessfully = false

		document.getElementById('call-popup__checkbox').checked = true
		document.getElementById('call-popup__client-name').value = ''
		document.getElementById('call-popup__client-phone').value = ''

		document.getElementById('call-popup__info').style.opacity = 0
		document.getElementById('call-popup__info').style.color = '#da4e4d'
	}
	function sendMessageFromPopUpCall() {
		if (document.getElementById('call-popup__checkbox').checked == false) {
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_privacy
			privacySuccessfully = false
		} else {
			privacySuccessfully = true
		}

		if (validateMobile(document.getElementById('call-popup__client-phone').value) == false) {
			document.getElementById('call-popup__client-phone').focus()
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_phone_correct
			phoneNumberSuccessfully = false
		} else {
			phoneNumberSuccessfully = true
		}

		if (document.getElementById('call-popup__client-name').value === '') {
			document.getElementById('call-popup__client-name').focus()
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_name
			nameSuccessfully = false
		} else {
			nameSuccessfully = true
		}

		if (document.getElementById('call-popup__client-name').value === '' &&
			document.getElementById('call-popup__client-phone').value === ''
		) {
			document.getElementById('call-popup__info').style.opacity = 1
			document.getElementById('call-popup__info').textContent = response_fill_all
		}

		if (nameSuccessfully && phoneNumberSuccessfully && privacySuccessfully) {
			// ! успешная обработка формы
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
				document.querySelector('.call-popup').style.pointerEvents = 'none'
				resetCallPopUpVariables()
				footerLineRelative() // todo проверить 
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

}
// ?  обратный звонок ------------------------------------------------------------------------------

