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
		if(data.status == 422) {

		} else {
			
		}
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