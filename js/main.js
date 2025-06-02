console.log('auto-namber main.js')
let local_car_nambers, local_car_parking_by_time;
let local_car_nambers_entries, local_car_parking_by_time_entries;
let all_cars = {
	'all' : {},
	'car_nambers' : {},
	'car_parking_by_time' : {}
};
let tab__button_wrapper = document.querySelector('.tab__button-wrapper');
let tab_btns = tab__button_wrapper.querySelectorAll('.tab__button');
let tab_btns_len = tab_btns.length;
let tab__container_wrapper = document.querySelector('.tab__container-wrapper'); 
let tab__containers = tab__container_wrapper.querySelectorAll('.tab__container');
let tab__containers_len = tab__containers.length;

let tab__container_all = tab__container_wrapper.querySelector('.tab__container[data-name="all"]');
let tab__container_parking_by_time = tab__container_wrapper.querySelector('.tab__container[data-name="parking_by_time"]');
let tab__container_car_all = tab__container_wrapper.querySelector('.tab__container[data-name="all"]');
let tab__container_car_numbers = tab__container_wrapper.querySelector('.tab__container[data-name="car_nambers"]')
let table_body_search = document.querySelector('.table-body-search');
let search_form = document.querySelector('.form-table-search');


// установить локол сторыж, если ещё не учтановлен
// для car_nambers
if ( localStorage.getItem('car_nambers') == null )
{
	// console.log('car_nambers localStorage - false')
	// console.log('car_nambers js file')
	// console.dir(car_nambers)
	localStorage.setItem('car_nambers', JSON.stringify( car_nambers ) );
}
// для car_parking_by_time
if ( localStorage.getItem('car_parking_by_time') == null )
{
	// console.log('car_parking_by_time localStorage - false')
	// console.log('car_parking_by_time js file')
	// console.dir(car_parking_by_time)
	localStorage.setItem('car_parking_by_time', JSON.stringify( car_parking_by_time ) );
}

local_car_nambers = JSON.parse( localStorage.getItem('car_nambers') );
local_car_parking_by_time = JSON.parse( localStorage.getItem('car_parking_by_time') );

// console.log('local_car_nambers')
// console.dir(local_car_nambers)
// console.log('local_car_parking_by_time')
// console.dir(local_car_parking_by_time)
local_car_nambers_entries = Object.entries(local_car_nambers);
local_car_parking_by_time_entries = Object.entries(local_car_parking_by_time);
// console.dir(local_car_nambers_entries )
// console.dir(local_car_parking_by_time_entries )

// заполняем общий [ all_cars.all ] обьект ( car_nambers + car_parking_by_time )
for ( let i = 0; i < local_car_nambers_entries.length; i++ )
{
	//all_cars.car_nambers[local_car_nambers_entries[i][0]] = local_car_nambers_entries[i][1];
	all_cars.all[local_car_nambers_entries[i][0]] = local_car_nambers_entries[i][1];
}

for ( let i = 0; i < local_car_parking_by_time_entries.length; i++ )
{
	// local_car_nambers_entries
	all_cars.car_parking_by_time[local_car_parking_by_time_entries[i][0]] = local_car_parking_by_time_entries[i][1];
}
for ( let i = 0; i < local_car_nambers_entries.length; i++ )
{
	// console.log('all_cars.car_parking_by_time[i] ')
	// console.dir(all_cars.car_parking_by_time[i] )
	Object.assign(all_cars.all[i], all_cars.car_parking_by_time[i] );
}


console.log('all_cars')
console.dir(all_cars)
render_car_all( all_cars.all, tab__container_car_all );
render_car_numbers( all_cars.car_nambers, tab__container_car_numbers );
render_car_parking_by_time( all_cars.car_parking_by_time, tab__container_parking_by_time );
render_table_search( all_cars.all, table_body_search );
search_nubber( search_form, table_body_search );
// Render
function render_car_all( car, container )
{
	console.log('render_car_all( car, container )')
	let car_entries = Object.entries(car);
	let car_entries_length = car_entries.length;
	let all_cout = 0;
	let this_details, this_obj_entries, this_obj_entries_len;
	let details__content;
	container.innerHTML = '';
	for ( let i = 0; i < car_entries_length; i++ )
	{
		// console.log('---')
		// console.log('Number : '+ car_entries[i][0] )
		// console.dir(car_entries[i][1])
		container.innerHTML += `<details class="details" name="all" data-number="${car_entries[i][0]}">
		<summary class="details__summary">
		<span>${car_entries[i][0]}</span></summary>
		<div class="details__content" data-namber="${car_entries[i][0]}"></div>
		</details>`;
	}
	for ( let i = 0; i < car_entries_length; i++ )
	{
		this_details =  container.querySelector(`details[data-number="${car_entries[i][0]}"]`);
		details__content = this_details.querySelector('.details__content');
		this_obj_entries = Object.entries(car_entries[i][1]);
		this_obj_entries_len = this_obj_entries.length;
		details__content.innerHTML = '';
		let item_count = 0;
		for ( let y = 0; y < this_obj_entries_len; y++ )
		{
			item_count++;
			all_cout++;
			if ( this_obj_entries[y][1] != '')
			{
				details__content.innerHTML += `<p class="details__content_p">${this_obj_entries[y][0]} <span> ${this_obj_entries[y][1]} </span></p>`;
			}
			else
				{details__content.innerHTML += `<p class="details__content_p">${this_obj_entries[y][0]}</p>`;}
		}
		details__content.innerHTML += `<div class="details__footer">всего ${item_count}</div>`;
	}
	container.innerHTML += `<p class="w100 p-h3">всего : ${all_cout} </p>`;
}
// постоянные
function render_car_numbers( car, container )
{
	console.log('render_car_numbers( car, container )')
	let car_entries = Object.entries(car);
	console.dir(all_cars)
	let car_entries_length = car_entries.length;
	let all_cout = 0;
	let this_details, this_obj_entries, this_obj_entries_len;
	let details__content;
	container.innerHTML = 'car_nambers';
	for ( let i = 0; i < car_entries_length; i++ )
	{
		console.log('---')
		console.log('Number : '+ car_entries[i][0] )
		console.dir(car_entries[i][1])
		container.innerHTML += `<details class="details" name="all" data-number="${car_entries[i][0]}">
		<summary class="details__summary">
		<span>${car_entries[i][0]}</span></summary>
		<div class="details__content" data-namber="${car_entries[i][0]}"></div>
		</details>`;
	}
	for ( let i = 0; i < car_entries_length; i++ )
	{
		this_details =  container.querySelector(`details[data-number="${car_entries[i][0]}"]`);
		details__content = this_details.querySelector('.details__content');
		this_obj_entries = Object.entries(car_entries[i][1]);
		this_obj_entries_len = this_obj_entries.length;
		details__content.innerHTML = '';
		let item_count = 0;
		for ( let y = 0; y < this_obj_entries_len; y++ )
		{
			item_count++;
			all_cout++;
			if ( this_obj_entries[y][1] != '')
			{
				details__content.innerHTML += `<p class="details__content_p">${this_obj_entries[y][0]} <span> ${this_obj_entries[y][1]} </span></p>`;
			}
			else
				{details__content.innerHTML += `<p class="details__content_p">${this_obj_entries[y][0]}</p>`;}
		}
		details__content.innerHTML += `<div class="details__footer">всего ${item_count}</div>`;
	}
	container.innerHTML += `<p class="w100 p-h3">всего : ${all_cout} </p>`;
}
function render_car_parking_by_time( car, container )
{
	console.log('render_car_parking_by_time( car )')
	let car_entries = Object.entries(car);
	let car_entries_length = car_entries.length;
	let all_cout = 0;
	// console.dir(car_entries)
	// console.log(container)
	container.innerHTML = '';
	for ( let i = 0; i < car_entries_length; i++ )
	{
		// console.log('---')
		// console.log('Number : '+ car_entries[i][0] )
		// console.dir(car_entries[i][1])
		container.innerHTML += `<details class="details" name="car_parking_by_time" data-number="${car_entries[i][0]}">
		<summary class="details__summary">
		<span>${car_entries[i][0]}</span></summary>
		<div class="details__content" data-namber="${car_entries[i][0]}"></div>
		</details>`;
	}
	let this_details, this_obj_entries, this_obj_entries_len;
	let details__content;
	for ( let i = 0; i < car_entries_length; i++ )
	{
		this_details =  container.querySelector(`details[data-number="${car_entries[i][0]}"]`);
		details__content = this_details.querySelector('.details__content');
		this_obj_entries = Object.entries(car_entries[i][1]);
		this_obj_entries_len = this_obj_entries.length;
		details__content.innerHTML = '';
		let item_count = 0;
		for ( let y = 0; y < this_obj_entries_len; y++ )
		{
			item_count++;
			all_cout++;
			details__content.innerHTML += `<p class="details__content_p">${this_obj_entries[y][0]} <span> ${this_obj_entries[y][1]} </span></p>`;
		}
		details__content.innerHTML += `<div class="details__footer">всего ${item_count}</div>`;
	}
	container.innerHTML += `<p class="w100 p-h3">всего : ${all_cout} </p>`;
}
// 
function render_table_search( car, container )
{
	console.log('render_table_search()')
	
	console.log(container)
	let car_entries = Object.entries(car);
	let car_entries_length = car_entries.length;
	let all_cout = 0;
	let car_this_entries, car_this_entries_length = 0;
	container.innerHTML = '';
	console.dir(car_entries)
	for ( let i = 0; i < car_entries_length; i++ )
	{
		//console.log('-'+i+'-')
		//console.dir(car_entries[i][1])
		car_this_entries = Object.entries(car_entries[i][1])
		car_this_entries_length = car_this_entries.length;
		//console.dir(car_this_entries)
		container.innerHTML += `<tr class="table__tr_title">
				<td>${i}</td>
				<td>${i}</td>
			<tr>`;
		for ( let y = 0; y < car_this_entries_length; y++ )
		{
			//console.log('===')
			//console.log('number : ' + car_this_entries[y][0] + ' description : ' + car_this_entries[y][1]);
			container.innerHTML += `<tr>
				<td>${car_this_entries[y][0]}</td>
				<td>${car_this_entries[y][1]}</td>
			<tr>`; 
		}
	}
}
// searh
function search_nubber( form, container )
{
	let input_text = form.querySelector('.form__input-text[name="input-search-car"]')
	let form__btn_reset = form.querySelector('.form__btn[type="reset"]')
	let td_all;
	let td_count = 0;
	let search_check = false;

	form__btn_reset.addEventListener( 'click', () => {
		input_text.value = '';
	});
	form.addEventListener('submit', (e) => {
		e.preventDefault()
		td_all = container.querySelectorAll('td');
		td_count = td_all.length;
		search_check = false;
		input_text.style.color = '';
		input_text.style.borderColor = '';
		input_text.style.backgroundColor = '';
		if ( input_text.value != '' )
		{
			for ( let i = 0; i < td_count; i++ )
			{
				td_all[i].style.backgroundColor = "";
				td_all[i].style.color = "";
				input_text.style.borderColor = '';

				if ( td_all[i].textContent == input_text.value )
				{
					console.dir(td_all[i])
					console.log('td_all[i].offsetTop - ' + td_all[i].offsetTop)
					console.log('container.offsetTop - ' + container.offsetTop)
					console.dir(container)
					//td_all[i].offsetTop = container.offsetTop + 
					// td_all[i].style.position = 'fixed';
					// td_all[i].style.top = 150 + 'px'; 
					// td_all[i].scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );
					td_all[i].scrollIntoView( { behavior: "smooth", inline: "nearest" } );
					search_check = true;
					td_all[i].style.backgroundColor = "green";
					td_all[i].style.color = "#fff";
				}
			}
			if ( search_check == true )
			{
				input_text.style.borderColor = 'green';
			}
			else
			{
				input_text.style.borderColor = 'red';
				input_text.style.backgroundColor = 'red';
				input_text.style.color = '#fff';
			}
		}
		
	});
}
// tab show
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
