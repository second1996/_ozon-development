/**
 * GLOBAL VARIABLES.
 */
const calcForm = $("#c-calc-form");
const cModalLink = $("#c-modal-link");
const reqPay = 10000;
const firstpaySlider = $('#c-first-pay');
const termSlider = $('#c-term-pay');
const termTab = $('.form-range-tabs > .tab-item');
const houseTab = $(".calculator-houses > .house");
let houseCost = parseInt($(".house--selected").data('house-price'));
let firstpaySliderValue = parseInt(firstpaySlider.val());
let termSliderValue = parseInt(termSlider.val());
let firstpayValue = '';
let termValue = '';


/**
 * Функція обрахунку ціни за будинок на основні вибраного типу будинку.
 */
function calcHouseCost() {
  const houseCostFormat = houseCost.toLocaleString('uk-UA');
  $("#c-total-cost-val").text(houseCostFormat);
};
calcHouseCost();


/**
 * Обираємо тип будинку: переписуємо ціну будинку.
 */
houseTab.on('click', function() {
  // Забираємо активний клас у всіх елементів
  houseTab.removeClass('house--selected');
  // Додаємо активний клас
  $(this).addClass('house--selected');
  // Перезаписуємо змінну houseCost
  houseCost = $(this).data('house-price');
  calcHouseCost();
  calcFirstpay(houseCost, firstpaySlider.val());
  calcTermpay(houseCost, termSlider.val());
});


/**
 * Термін розтермінування: помісячно/квартально
 */
const currentDate = new Date();
const endDate = new Date(2022, 11, 31);
const monthsLeft = (endDate.getFullYear() - currentDate.getFullYear()) * 12 + endDate.getMonth() - currentDate.getMonth() + 1;
const quartersLeft = Math.floor(monthsLeft / 3);
const quartersArr = [];
const monthsArr = [];

for(let i = 1; i <= quartersLeft; i++) {
  quartersArr.push(i);
}
for(let j = 1; j <= monthsLeft; j++) {
  monthsArr.push(j);
}


/**
 * Ініціалізація ionRangeSlider();
 */
firstpaySlider.ionRangeSlider({
  skin: 'round',
  values: [30,40,50,60,70,80,90],
  step: 10,
  hide_min_max: true,
  grid: true,
});
termSlider.ionRangeSlider({
  skin: 'round',
  values: monthsArr,
  hide_min_max: true,
  grid: true,
  // grid_num: 12,
});


/**
 * Таби помісячно/квартально.
 * Оновлюємо значення слайдерів.
 */
termTab.on('click', function() {
  const termType = $(this).data('term-type');
  const termRS = termSlider.data('ionRangeSlider');

  termTab.removeClass('tab-item--selected');
  $(this).addClass('tab-item--selected');
  if( termType === 'months' ) {
    termRS.update({
      values: monthsArr,
    });
  } else {
    termRS.update({
      values: quartersArr,
    });
  }
});


/**
 * Обраховуємо перший внесок
 */
function calcFirstpay(price = houseCost, persent = firstpaySliderValue) {
  let fpVal = Math.round(parseInt(price * persent / 100 - reqPay));
  let fpFormat = fpVal.toLocaleString('uk-UA');
  $('#c-first-pay-val').text(fpFormat);
  return firstpayValue = fpVal;
}
calcFirstpay();


/**
 * Обраховуємо платіж на період розтермінування
 */
function calcTermpay(price = houseCost, term = termSliderValue) {
  let termVal = Math.round( parseInt(price - firstpayValue) / term )
  let termFormat = termVal.toLocaleString('uk-UA');
  $('#c-term-val').text(termFormat);
  return termVal = term;
}
calcTermpay();


/**
 * Перераховуємо платежі, якщо користувач рухає повзунком.
 * Показуємо кнопку "Залишити заявку".
 */
firstpaySlider.on("input change", function() {
  calcFirstpay(houseCost, $(this).val());
  calcTermpay(houseCost, termSlider.val());
});
termSlider.on("input change", function() {
  calcTermpay(houseCost, $(this).val());
});
calcForm.one('input change', function() {
  cModalLink.addClass('show');
});