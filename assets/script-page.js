var myModal = new bootstrap.Modal(document.getElementById('productModal'));
var btns =  document.querySelectorAll('.btn-product-modal-info');
btns.forEach((item, i, arr) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		var url = "/products/" + item.dataset.handle;
		fetch(url)
		.then(response => response.json())
		.then(data => {
			document.getElementById('productModalLabel').innerHTML = data.title;
			document.querySelector('#productModal h3').innerHTML = item.dataset.price;
			document.querySelector('#productModal p').innerHTML = data.description;
			document.querySelector('#productModal img').src = data.featured_image;

			let variants = data.variants;
			let option = '';
			variants.forEach(function(item, i) { option += '<option value="' + item['id'] + '">' + item['title'] + '</option>'; });
			document.querySelector("#select_variant").innerHTML = option;
			myModal.show();
		}).catch(e => {
			console.log(e);
		});
	});
});

document.querySelector('#button_add_to_cart').addEventListener('click', function() {
	let variant = document.querySelector('#select_variant').value;
	let quantity = document.querySelector('#quantity').value;

	let data = {
		'items': [{
			'id': variant,
			'quantity': quantity
		}]
	};
	fetch('/cart/add.js', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data => {
		let container = document.querySelector('#show_alerts');
		let danger_alert = '';
		let success_alert = '';
		if(data.status == 422) {
			danger_alert = '<div class="toast show bg-danger" role="alert" aria-live="assertive" aria-atomic="true">';
			danger_alert += '<div class="toast-header">';
			danger_alert += '<strong class="me-auto">Error</strong>';
			danger_alert += '<small class="text-muted">Just Now</small>';
			danger_alert += '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>';
			danger_alert += '</div>';
			danger_alert += '<div class="toast-body">';
			danger_alert += 'Error? You have an Error!';
			danger_alert += '</div>';
			danger_alert += '</div>';
		} else {
			card_product_count();
			success_alert = '<div class="toast show bg-success" role="alert" aria-live="assertive" aria-atomic="true">';
			success_alert += '<div class="toast-header">';
			success_alert += '<strong class="me-auto">Success</strong>';
			success_alert += '<small class="text-muted">Just Now</small>';
			success_alert += '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>';
			success_alert += '</div>';
			success_alert += '<div class="toast-body">';
			success_alert += 'Success? You have successfully added it!';
			success_alert += '</div>';
			success_alert += '</div>';
		}

		container.innerHTML = danger_alert + success_alert;
	})
	.catch((error) => { console.error('Error:', error); });
});

var modalClose = document.getElementById('productModal');
modalClose.addEventListener('hidden.bs.modal', () => {
	document.getElementById('productModalLabel').innerHTML = '';
	document.querySelector('#productModal h3').innerHTML = '';
	document.querySelector('#productModal p').innerHTML = '';
	document.querySelector('#productModal img').src = '';
});

let btnsDecrease = document.querySelectorAll('.btn-decrease');
let btnsIncrease = document.querySelectorAll('.btn-increase');
let quantity = document.querySelector('.quantity');

for (let i = 0; i < btnsDecrease.length; i++) {
	let btnDecrease = btnsDecrease[i];
	btnDecrease.addEventListener('click', function() {
		if(btnDecrease.nextElementSibling.value > 1) {
			btnDecrease.nextElementSibling.value = parseInt(btnDecrease.nextElementSibling.value) - 1;
		}
	});
}

for (let i = 0; i < btnsIncrease.length; i++) {
	let btnIncrease = btnsIncrease[i];
	btnIncrease.addEventListener('click', function() {
		btnIncrease.previousElementSibling.value = parseInt(btnIncrease.previousElementSibling.value) + 1;
	});
}

card_product_count();
function card_product_count() {
	fetch('/cart.js')
	.then(response => response.json())
	.then(data => {
		document.querySelector('#card_product_count').innerHTML = data.items.length 
	});
}