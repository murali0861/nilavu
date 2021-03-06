(function($) {
	$.fn.scale_aggregate = function() {
		var books_count = 0;
		var selected_platformapp = "";
		this.find('tbody').find('tr').each(function() {
			books_count = parseInt($(this).find('span.books.count').text());
		});
		this.find('tbody').find('tr').each(function() {
			selected_platformapp = $(this).attr('class');
		});

		$('#books_total').text(books_count).fadeIn('slow');
		$('#cb_count').val(books_count);
		$('#selected_platformapp').fadeIn('slow').html(
				'<div id="selected_platformapp"><b>' + selected_platformapp
						+ '</b></div>');

	};

})(jQuery);

jQuery(document)
		.ready(
				function() {

					var scale_counter = $('#scalebooks');

					// set the initial value of $0.00
					scale_counter.scale_aggregate();
					var $minus = '<a href="#" class="minus"><i class="icon-minus-sign-alt"></i></a>';
					var $plus = '<a href="#" class="plus"><i class="icon-plus-sign-alt"></i></a>';
					var $trash = '<td> <a href="#" class="trash"><i class="icon-trash"></i></a></td>';

					$("#platformapps input:radio")
							.on(
									"ifClicked",
									function() {
										$("#cb_next").attr("disabled", false); // enable
										$("#db_next").attr("disabled", false); // enable

										// next
										// button
										var service = $(this).attr("value");
										scale_counter.find('tr').remove();
										$('#scalebooks').scale_aggregate();
										scale_counter.find('tbody').append(
												'<tr class="' + service
														+ '"> </tr>');
										row = $('tr.' + service);
										row
												.append(
														'<td><div class="overlay"><i class="icon-trash"></i></div><i class="logo_'
																+ service
																+ '"></i></div></th>')
												.append(
														'<td class="instances">'
																+ $minus + '&nbsp;'
																+ '<span class="books count">1</span>&nbsp;'
																+ $plus
																+ '</td>')
												.append($trash);
										$('#scalebooks').scale_aggregate();
										// _gaq is a global goole analytic
										// object. We can track what the user
										// choose.
										// https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApi_gaq
										// _gaq.push(['_trackEvent',
										// 'Calculator', 'Service', service]);
									});

					$("[id^=githubsample_]").click(function() {
						var selected_github = $(this).next().attr("href");
						$("#deps_scm").val(selected_github);
						$("#deps_scm").fadeIn("slow");
					});

					// add the functionality to the +/- buttons
					scale_counter.delegate(
							'.instances a.plus',
							'click',
							function() {
								var instance = parseInt($(this).parents('tr')
										.find('.books.count').text());
								if (instance < 2) {
									instance = instance + 1;
									$(this).parent().find('.books').text(
											instance);
									scale_counter.scale_aggregate();
								}
								return false;
							})
							.delegate(
									'.instances a.minus',
									'click',
									function() {
										var value = parseInt($(this).parent()
												.find('.books').text());
										// set a min value
										if (value > 1) {
											value = value - 1;
											$(this).parent().find('.books')
													.text(value);
											scale_counter.scale_aggregate();
										}
										return false;
									}).delegate('a.trash', 'click', function() {
								var logo = $(this).parents('tr').attr('class');
								$(this).parents('tr').remove();
								scale_counter.scale_aggregate();
								return false;
							});

				});