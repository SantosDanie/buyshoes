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
			document.querySelector('#productModal .modal-footer a').href = data.url;
			myModal.show();
		}).catch(e => {
			console.log(e);
		});
	});
});

var modalClose = document.getElementById('productModal');
modalClose.addEventListener('hidden.bs.modal', () => {
	document.getElementById('productModalLabel').innerHTML = '';
	document.querySelector('#productModal h3').innerHTML = '';
	document.querySelector('#productModal p').innerHTML = '';
	document.querySelector('#productModal img').src = '';
	document.querySelector('#productModal .modal-footer a').href = '';
});