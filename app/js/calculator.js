/**
 * Installment calculator
 */
const calcForm							= $("#c-calc-form");
const houseType							= $(".calculator-houses > .house");
let   houseCost								= $(".house--selected").data('house-price');
const firstPay							= $("#c-first-pay");
const termPay								= $("#c-term-pay");
const cTotalCost						= $("#c-total-cost-val > em").text();
const reqPay								= $("#c-req-pay-val > em").text();
const cFirstPay							= $("#c-first-pay-val > em");
const cMonthlyPay						= $("#c-monthly-val > em");
const cModalLink						= $("#c-modal-link");
const cModalFirstPay				= $("#cModal-firstPay");
const cModalMonthlyPay			= $("#cModal-monthlyPay");
const cModalLabelFirstPay		= $("#cModalLabel-firstPay");
const cModalLabelMonthlyPay	= $("#cModalLabel-monthlyPay");

const currentDate = new Date(2020, 6, 1);
const endDate = new Date(2022, 11, 31);
const monthsLeft = (endDate.getFullYear() - currentDate.getFullYear()) * 12 + endDate.getMonth() - currentDate.getMonth() + 1;
const quartersLeft = Math.floor(monthsLeft / 3);
console.log(currentDate);
console.log(endDate);
console.log(monthsLeft);
console.log(quartersLeft);
termPay.prop('max', monthsLeft);
const quartersArr = [];
for(let i = 1; i <= monthsLeft; i++) {
	quartersArr.push(i);
}
// console.log(startCalc.getMonth() - startCalc.getMonth());

// Show "Залишити заявку" when input first time changed
calcForm.one('input change', function() {
	cModalLink.addClass('show');
});

// Select house type
houseType.on('click', function() {
	houseType.removeClass('house--selected');
	$(this).addClass('house--selected');

	const houseData = $(this).data();
	houseCost = houseData.housePrice;
	$("#c-total-cost-val > em").text(houseData.housePrice);
	calculateFirstPay(houseCost, firstPay.val());
	calculateMonthlyPay(houseCost, termPay.val());
});

// Calculate values when load page
// $("#c-total-cost-val > em").text(houseCost);
cFirstPay.text(Math.round( parseInt(houseCost * firstPay.val() / 100 - reqPay) ));
cMonthlyPay.text(Math.round( parseInt(houseCost - cFirstPay.text() - reqPay) / termPay.val() ));
// cModalFirstPay.val(Math.round( ( parseInt(houseCost) * ( firstPay.val() / 100 ) ) ));
// cModalMonthlyPay.val(Math.round( ( parseInt(houseCost) - cFirstPay.text() ) / termPay.val() ));
// cModalLabelFirstPay.text(Math.round( ( parseInt(houseCost) * ( firstPay.val() / 100 ) ) ));
// cModalLabelMonthlyPay.text(Math.round( ( parseInt(houseCost) - cFirstPay.text() ) / termPay.val() ));

// Calculate function
function calculateFirstPay(price, value) {
	// Перший внесок
	cFirstPay.text(Math.round( parseInt(price * value / 100 - reqPay) ));
	// cModalFirstPay.val(Math.round( ( parseInt(price) * ( value / 100 ) ) ));
	// cModalLabelFirstPay.text(Math.round( ( parseInt(price) * ( value / 100 ) ) ));
	// Щомісячний платіж
	cMonthlyPay.text(Math.round( parseInt(price - cFirstPay.text() - reqPay) / termPay.val() ));
	// cModalMonthlyPay.val(Math.round( ( parseInt(price) - cFirstPay.text() ) / termPay.val() ));
	// cModalLabelMonthlyPay.text(Math.round( ( parseInt(price) - cFirstPay.text() ) / termPay.val() ));
}
function calculateMonthlyPay(price, value) {
	// Щомісячний платіж
	cMonthlyPay.text(Math.round( parseInt(price - cFirstPay.text() - reqPay) / value ));
	// cModalMonthlyPay.val(Math.round( ( parseInt(price) - cFirstPay.text() ) / value ));
	// cModalLabelMonthlyPay.text(Math.round( ( parseInt(price) - cFirstPay.text() ) / value ));
}

// Write the value when changing range input
firstPay.on("input change", function() {
	calculateFirstPay(houseCost, $(this).val());
});
termPay.on("input change", function() {
	calculateMonthlyPay(houseCost, $(this).val());
});