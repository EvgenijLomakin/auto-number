console.log('job main.js')
let tab__button_wrapper = document.querySelector('.tab__button-wrapper');
let tab_btns = tab__button_wrapper.querySelectorAll('.tab__button');
let tab_btns_len = tab_btns.length;
let tab__container_wrapper = document.querySelector('.tab__container-wrapper'); 
let tab__containers = tab__container_wrapper.querySelectorAll('.tab__container');
let tab__containers_len = tab__containers.length;
let list_car_namber = tab__container_wrapper.querySelector('.tab__container[data-name="list-car-namber"]');
let count_all_cars = 0;
let car_search__form = document.querySelector('.car-search__form');
let car_search__out_car_number = car_search__form.querySelector('.car-search__out-car-number');
let car_search__input = car_search__form.querySelector('.car-search__input');
let car_search__input_value;
let empty_number = false;

list_car_namber.innerHTML = '';

for ( let i = 0; i < car_nambers.length; i++ )
{
	list_car_namber.innerHTML += `<details class="details" data-namber="${i}" name="auto-number">
	<summary class="details__summary"><span>${i}</span></summary>
	<div class="details__content" data-namber="${i}"></div><!-- .details__content --></details>`;
}
for ( let i = 0; i < car_nambers.length; i++ )
{
	car_nambers[i].sort( ( a, b ) => a - b  );
	let details__content = list_car_namber.querySelector(`.details__content[data-namber="${i}"]`);
	for ( y = 0; y < car_nambers[i].length; y++ )
	{
		
		if ( (car_nambers[i][y] < 10) )
		{
			details__content.innerHTML += `<p class="details__content_p"><span>00${car_nambers[i][y]}</span></p>`;
		}
		else if ( (car_nambers[i][y] > 10) && (car_nambers[i][y] < 100) )
		{
			details__content.innerHTML += `<p class="details__content_p"><span>0${car_nambers[i][y]}</span></p>`;
		}
		else
		{
			details__content.innerHTML += `<p class="details__content_p"><span>${car_nambers[i][y]}</span></p>`;
		}
	}
	count_all_cars += car_nambers[i].length;
	details__content.innerHTML += `<p class="details__footer">всего - ${car_nambers[i].length}</p>`;
}
list_car_namber.innerHTML += `<p>всего машин: ${count_all_cars}</p>`

car_search__form.addEventListener('submit', (e) => {
	e.preventDefault();
	car_search__input_value = car_search__input.value * 1;
	
	if ( (car_search__input_value < 0 ) || (car_search__input_value > 999 ) )
	{
		car_search__out_car_number.dataset.show = 'false';
		car_search__out_car_number.innerHTML = ' 0 ... 999';
	}

	for ( let i = 0; i < car_nambers.length; i++ )
	{
		empty_number = car_nambers[i].includes( car_search__input_value );
		if ( empty_number )
		{
			break;
		}
		
	}
	if ( empty_number )
	{
		car_search__out_car_number.dataset.show = 'true';
	}
	else
	{
		car_search__out_car_number.dataset.show = 'false';
	}
});

tab__button_wrapper.addEventListener('click', (e) => {
	for ( let i = 0; i < tab_btns_len; i++ )
	{
		tab_btns[i].dataset.show = 'hide';
		tab__containers[i].dataset.show = 'hide';
		if ( tab_btns[i] == e.target )
		{
			tab_btns[i].dataset.show = 'show';
			tab__containers[i].dataset.show = 'show';
		}
	}
});