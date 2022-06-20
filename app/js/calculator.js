/**
 * GLOBAL VARIABLES.
 */
const calcForm = $("#c-calc-form")
const cModalLink = $("#c-modal-link")
const individualSquareSection = $('.calculator-individual-square')
const individualSquareText = $('#c-individual-square')
const individualSquareSlider = $('#c-individual-square-slider')
const individualSquareCard = $('#c-individual-card-square')
const firstpaySlider = $('#c-first-pay')
const termSlider = $('#c-term-pay')
const termTab = $('.form-range-tabs > .tab-item')
const periodTab = $(".calculator-periods .period")
const houseTab = $(".calculator-houses .house")
const includesHouse = $(".calculator-includes #includes-house")
let periodCost = parseInt($(".period--selected").data('period-price'))
let houseSquare = parseInt($(".house--selected").data('house-square'))
let individualSquareSliderValue = parseInt(individualSquareSlider.val())
let firstpaySliderValue = parseInt(firstpaySlider.val())
let termSliderValue = parseInt(termSlider.val())
let houseTotalCost = 0
let firstpayValue = 0
let termValue = 0


/**
 * Змінюємо назву будинку в секції "У вартість входить".
 */
includesHouse.text($('.house--selected').find('.house-meta .title').text())


/**
 * Обираємо період платежу: перезаписуємо ціну будинку.
 */
 periodTab.on('click', function() {
  // Забираємо активний клас у всіх елементів
  periodTab.removeClass('period--selected')
  // Додаємо активний клас
  $(this).addClass('period--selected')
  // Перезаписуємо змінну houseCost
  periodCost = $(this).data('period-price')

  // Виконуємо перерахунок функцій
  calcHouseCost()
  calcFirstpay(periodCost, houseSquare, firstpaySlider.val())
  calcTermpay(houseTotalCost, termSlider.val())

  // Показуємо персональну пропозицію
  cModalLink.addClass('shown')
})


/**
 * Обираємо тип будинку: перезаписуємо ціну будинку.
 */
houseTab.on('click', function() {
  // Забираємо активний клас у всіх елементів
  houseTab.removeClass('house--selected')
  // Додаємо активний клас
  $(this).addClass('house--selected')
  // Перезаписуємо змінну houseCost
  houseSquare = $(this).data('house-square') || individualSquareSlider.val()
  // Змінюємо назву будинку в секції "У вартість входить"
  includesHouse.text($(this).find('.house-meta .title').text())

  if ($(this).hasClass('house-individual')) {
    houseSquare = parseInt(individualSquareSlider.val())
    individualSquareSection.slideDown()
    individualSquareCard.html(individualSquareSlider.val() + ' м<sup>2</sup>')
  } else {
    individualSquareSection.slideUp()
  }

  // Виконуємо перерахунок функцій
  calcHouseCost()
  calcFirstpay(periodCost, houseSquare, firstpaySlider.val())
  calcTermpay(houseTotalCost, termSlider.val())

  // Показуємо персональну пропозицію
  cModalLink.addClass('shown')
})



/**
 * Ініціалізація ionRangeSlider();
 */
const individualSquareSliderMin = +individualSquareSlider.attr('min');
const individualSquareSliderMax = +individualSquareSlider.attr('max');
const individualSquareSliderStep = +individualSquareSlider.attr('step');

individualSquareSlider.ionRangeSlider({
  skin: 'round',
  min: individualSquareSliderMin,
  max: individualSquareSliderMax,
  step: individualSquareSliderStep,
  hide_min_max: true,
  grid: true,
  grid_num: 4,
})

firstpaySlider.ionRangeSlider({
  skin: 'round',
  values: [50, 60, 70, 80, 90],
  step: 10,
  hide_min_max: true,
  grid: true,
})

termSlider.ionRangeSlider({
  skin: 'round',
  min: 1,
  max: 12,
  hide_min_max: true,
  grid: true,
  grid_num: 11,
})


/**
 * Обраховуэмо вартість за будинок на основні вибраного типу будинку.
 */
function calcHouseCost() {
  const periodDate = $(".period--selected > .period-meta > .title").text();
  const houseName = $(".house--selected > .house-meta > .title").text();
  let houseCost = periodCost * houseSquare
  let houseCostFormat = houseCost.toLocaleString('uk-UA')

  // Записуємо значення в блок "Загальні обрахунки"
  $("#c-total-cost-val").text(houseCostFormat)

  // Записуємо значення в модальне вікно "Залишити заявку"
  $("#cModal-period").val(periodDate)
  $("#cModalLabel-period").text(periodDate)
  $("#cModal-house").val(houseName)
  $("#cModal-square").val(houseSquare)
  $("#cModalLabel-square").html(houseSquare + ' м<sup>2</sup>')
  $("#cModalLabel-house").text(houseName)
  $("#cModal-price").val(houseCostFormat)
  $("#cModalLabel-price").text(houseCostFormat)

  return houseTotalCost = houseCost
};
calcHouseCost()


/**
 * Обраховуємо перший внесок
 */
function calcFirstpay(price = periodCost, square = houseSquare, percent = firstpaySliderValue) {
  let fpVal = Math.round( parseInt(price * square * percent / 100) )
  let fpFormat = fpVal.toLocaleString('uk-UA')

  // Записуємо значення в блок "Загальні обрахунки"
  $('#c-first-pay-val').text(fpFormat)
  $('#c-descr-firstpay-percent').text(percent)
  $('#c-descr-firstpay').text(fpFormat)

  // Записуємо значення в модальне вікно "Залишити заявку"
  $("#cModal-firstpay").val(fpFormat)
  $("#cModalLabel-firstpay").text(fpFormat)

  // Записуємо повернене значення в змінну
  return firstpayValue = fpVal
}
calcFirstpay()


/**
 * Обраховуємо платіж на період розтермінування
 */
function calcTermpay(price = houseTotalCost, term = termSliderValue) {
  let termVal = Math.round( parseInt(price - firstpayValue) / term )
  let termFormat = termVal.toLocaleString('uk-UA')

  // Записуємо значення в блок "Загальні обрахунки"
  $('#c-term-val').text(termSlider.val())
  $('#c-term-pay-val').text(termFormat)
  $('#c-descr-term').text(termSlider.val())
  $('#c-descr-termpay').text(termFormat)

  // Записуємо значення в модальне вікно "Залишити заявку"
  $("#cModal-term").val(termSlider.val())
  $("#cModal-termpay").val(termFormat)
  $("#cModalLabel-term").text(termSlider.val())
  $("#cModalLabel-termpay").text(termFormat)

  // Записуємо повернене значення в змінну
  return termVal = term
}
calcTermpay()


/**
 * Перераховуємо платежі, якщо користувач рухає повзунком.
 * Показуємо кнопку "Залишити заявку".
 */
individualSquareSlider.on("input change", function() {
  const thisValue = parseInt($(this).val())

  individualSquareCard.html(thisValue + ' м<sup>2</sup>')
  individualSquareText.html(thisValue + ' м<sup>2</sup>')
  houseSquare = parseInt(thisValue)

  calcHouseCost()
  calcFirstpay(periodCost, houseSquare, firstpaySlider.val())
  calcTermpay(houseTotalCost, termSlider.val())
})

firstpaySlider.on("input change", function() {
  calcFirstpay(periodCost, houseSquare, $(this).val())
  calcTermpay(houseTotalCost, termSlider.val())
})

termSlider.on("input change", function() {
  calcTermpay(houseTotalCost, $(this).val())
})

calcForm.on('input change', function() {
  cModalLink.addClass('shown')
})


/**
 * Генеруємо дані для PDF
 */
 $('#generate-calculator-pdf').on('click', function(event) {
	event.preventDefault();

	const form = $('#c-pdf-form');
	const periodPrice = $(".period--selected").data('period-price');
	const periodDate = $(".period--selected > .period-meta > .title").text();
	const periodMonths = $(".period--selected > .period-meta > .info").text();
	const houseName = $(".house--selected > .house-meta > .title").text();
	const houseCost = $("#c-total-cost-val").text();
	const firstpayPercent =  $('#c-first-pay').val();
	const firstpay = $("#c-first-pay-val").text();
	const term = $("#c-term-val").text();
	const termpay = $("#c-term-pay-val").text();

	$('#c-pdf-period-price').val(periodPrice)
	$('#c-pdf-period-date').val(periodDate)
	$('#c-pdf-period-months').val(periodMonths)
	$('#c-pdf-house').val(houseName)
	$('#c-pdf-square').val(houseSquare)
	$('#c-pdf-price').val('$' + houseCost)
	$('#c-pdf-firstpay-percent').val(firstpayPercent + '%')
	$('#c-pdf-firstpay').val('$' + firstpay)
	$('#c-pdf-term').val(term + ' міс.')
	$('#c-pdf-termpay').val('$' + termpay)

	form.submit();
})