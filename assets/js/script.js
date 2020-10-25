'use strict';

$(function() {
	/*
  |--------------------------------------------------------------------------
  | Configure your website
  |--------------------------------------------------------------------------
  |
  | We provided several configuration variables for your ease of development.
  | Read their complete description and modify them based on your need.
  |
  */

	page.config({
		/*
    |--------------------------------------------------------------------------
    | Disable AOS on mobile
    |--------------------------------------------------------------------------
    |
    | If true, the Animate On Scroll animations don't run on mobile devices.
    |
    */

		disableAOSonMobile: true,

		/*
    |--------------------------------------------------------------------------
    | Smooth Scroll
    |--------------------------------------------------------------------------
    |
    | If true, the browser's scrollbar moves smoothly on scroll and gives your
    | visitor a better experience for scrolling.
    |
    */

		smoothScroll: true,
	});

	/*
  |--------------------------------------------------------------------------
  | Custom Javascript code
  |--------------------------------------------------------------------------
  |
  | Now that you configured your website, you can write additional Javascript
  | code below this comment. You might want to add more plugins and initialize
  | them in this file.
  |
  */

	$(document).on("click", ".toggle-password", function () {
		$(this).toggleClass("fa-eye fa-eye-slash");

		var input = $("#password");
		input.attr("type") === "password"
			? input.attr("type", "text")
			: input.attr("type", "password");
	});
	$(document).on("click", ".toggle-confirmPassword", function () {
		$(this).toggleClass("fa-eye fa-eye-slash");

		var input = $("#confirmPass");
		input.attr("type") === "password"
			? input.attr("type", "text")
			: input.attr("type", "password");
	});
	// filter toogle button
	$("#filterBtn").click(function () {
		$("#filter").slideToggle(1500);
	});

	// extras card
	$("#extras").click(function () {
		$("#extrasCard").slideToggle(1500);
	});
	$("#extrasCard").hide();
	
	// booking page search card
	$("#bookingFilterBtn").click(function () {
		$("#bookingFilterCard").slideToggle(1500);
	});




	// heart favorite
	$(document).on("click", ".toggle-heart", function () {
		$(this).toggleClass("fas text-dopal");
	});

	// modal
	$("#login , #close").click(function () {
		$("#modalLogin").slideToggle(1500);
	});
	$("#modalLogin").hide();

	
	/**********************/
	/*  booking page  */
	/**********************/
	// seats
	var firstSeatLabel = 1;

	$(document).ready(function () {
		var $cart = $("#selected-seats"),
			$counter = $("#counter"),
			$total = $("#total"),
			sc = $("#seat-map").seatCharts({
				map: [
					"ff_ff",
					"ff_ff",
					"ee_ee",
					"ee_ee",
					"ee___",
					"ee_ee",
					"ee_ee",
					"ee_ee",
					"eeeee",
				],
				seats: {
					f: {
						price: 100,
						classes: "first-class", //your custom CSS class
						category: "First Class",
					},
					e: {
						price: 40,
						classes: "economy-class", //your custom CSS class
						category: "Economy Class",
					},
				},
				naming: {
					top: false,
					getLabel: function (character, row, column) {
						return firstSeatLabel++;
					},
				},
				legend: {
					node: $("#legend"),
					items: [
						["f", "available", "First Class"],
						["e", "available", "Economy Class"],
						["f", "unavailable", "Already Booked"],
					],
				},
				click: function () {
					if (this.status() == "available") {
						//let's create a new <li> which we'll add to the cart items
						$(
							"<li>" +
								this.data().category +
								" Seat # " +
								this.settings.label +
								": <b>$" +
								this.data().price +
								'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>'
						)
							.attr("id", "cart-item-" + this.settings.id)
							.data("seatId", this.settings.id)
							.appendTo($cart);

						/*
						 * Lets update the counter and total
						 *
						 * .find function will not find the current seat, because it will change its stauts only after return
						 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
						 */
						$counter.text(sc.find("selected").length + 1);
						$total.text(recalculateTotal(sc) + this.data().price);

						return "selected";
					} else if (this.status() == "selected") {
						//update the counter
						$counter.text(sc.find("selected").length - 1);
						//and total
						$total.text(recalculateTotal(sc) - this.data().price);

						//remove the item from our cart
						$("#cart-item-" + this.settings.id).remove();

						//seat has been vacated
						return "available";
					} else if (this.status() == "unavailable") {
						//seat has been already booked
						return "unavailable";
					} else {
						return this.style();
					}
				},
			});

		//this will handle "[cancel]" link clicks
		$("#selected-seats").on("click", ".cancel-cart-item", function () {
			//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
			sc.get($(this).parents("li:first").data("seatId")).click();
		});

		//let's pretend some seats have already been booked
		sc.get(["1_2", "4_1", "7_1", "7_2"]).status("unavailable");
	});

	function recalculateTotal(sc) {
		var total = 0;

		//basically find every selected seat and sum its price
		sc.find("selected").each(function () {
			total += this.data().price;
		});

		return total;
	}

	

});

// stations check
// first choice
	$(".booking__stations--btns-1").click(function () {
		$(".booking__stations--i1").removeClass("d-none");
		$(".booking__stations--i2").addClass("d-none");

		$(".booking__stations--i3").addClass("d-none");
	});
	// second choice
	$(".booking__stations--btns-2").click(function () {
		$(".booking__stations--i1").addClass("d-none");
		$(".booking__stations--i2").removeClass("d-none");

		$(".booking__stations--i3").addClass("d-none");
	});
	// third choice
	$(".booking__stations--btns-3").click(function () {
		$(".booking__stations--i1").addClass("d-none");
		$(".booking__stations--i2").addClass("d-none");

		$(".booking__stations--i3").removeClass("d-none");
	});