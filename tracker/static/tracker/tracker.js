// ----------------
// Global Variables
// ----------------

// Creature template
const creatureTemplate =
	'<tr class="creature">\n'
		+ '\t<td><input type="checkbox"></td>\n'
		+ '\t<td onclick="edit(this)"><p class="initiative">Initiative</p></td>\n'
		+ '\t<td onclick="edit(this)"><p>Name</p></td>\n'
		+ '\t<td><input type="text" class="hp-box"> / <input type="text" class="hp-box"></td>\n'
		+ '\t<td><input type="text" class="notes-box" placeholder="Notes"></td>\n'
	+ '</tr>';

// Global variable for element being edited
var elementEditing = null;


// -----------------
// Various Functions
// -----------------

// Function to put an individual into "edit state" by clicking on it
function edit(element) {
	stopEditing(elementEditing);
	elementEditing = element;

	var text = element.firstChild.textContent;
	element.innerHTML = '<input type="text" class="' + element.firstChild.className + '" value="' + text + '" >';
	element.onclick = '';
}

// Function that takes an element out of edit state, including sorting it
function stopEditing(element) {
	if(element === null) {
		return;
	}
	
	var text = element.firstChild.value;
	element.innerHTML = '<p class="' + element.firstChild.className + '">' + text + '</p>';
	element.onclick = () => {
		edit(element);
	};

	if(element.parentElement != null) {
		sortElement(element.parentElement);
	}
}

// Function that sorts a row in the table by bubbling up
//
// PRE: table was sorted before this element was changed
function sortElement(element) {
	var elementValue = Number(element.querySelector('.initiative').textContent);
	var up = element.previousElementSibling;
	if(up != null) {
		var upValue = Number(up.querySelector('.initiative').textContent);
	}
	var down = element.nextElementSibling;
	if(down != null) {
		var downValue = Number(down.querySelector('.initiative').textContent);
	}
	var temp;

	// Bubble up if greater
	if(up != null) {
		while(elementValue > upValue || (!isNaN(elementValue) && isNaN(upValue))) {
			temp = up.innerHTML;
			up.innerHTML = element.innerHTML;
			element.innerHTML = temp;

			up = up.previousElementSibling;
			if(up === null) {
				return;
			}
			upValue = Number(up.querySelector('.initiative').textContent);
			element = element.previousElementSibling;
			console.log(element);
			elementValue = Number(element.querySelector('.initiative').textContent);
		}
	}
	// Bubble down if less
	else if(down != null) {
		while(elementValue < downValue || (isNaN(elementValue) && !isNaN(downValue))) {
			temp = down.innerHTML;
			down.innerHTML = element.innerHTML;
			element.innerHTML = temp;

			down = down.nextElementSibling;
			if(down === null) {
				return;
			}
			downValue = Number(down.querySelector('.initiative').textContent);
			element = element.nextElementSibling;
			elementValue = Number(element.querySelector('.initiative').textContent);
		}
	}
}

// Function that resets the edit states of all elements
function makeDefaultState() {
	stopEditing(elementEditing);
	elementEditing = null;
}


// ---------------------------------------
// Add button functionality when DOM loads
// ---------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	
	// Exit edit state for an element when body is clicked
	document.body.onclick = srcEvent => {
		if(srcEvent.srcElement.tagName === 'BODY') {
			makeDefaultState();
		}
	};

	// Select all creatures checkbox
	document.querySelector('#select-all').onclick = srcEvent => {
		makeDefaultState();
		
		var creatures = document.querySelectorAll('.creature');
		creatures.forEach( creature => {
			creature.children[0].firstElementChild.checked = srcEvent.srcElement.checked;
		});
	};

	// Add a new creature based on the template when add button clicked
	document.querySelector('#add').onclick = () => {
		makeDefaultState();

		const creature = creatureTemplate;
		document.querySelector('#creatures').innerHTML += creature;	
	};

	// Delete selected creatures when delete button is clicked
	document.querySelector('#delete').onclick = () => {
		makeDefaultState();
		document.querySelector('#select-all').checked = false;

		var creatures = document.querySelectorAll('.creature');
		creatures.forEach( creature => {
			if(creature.children[0].firstElementChild.checked) {
				creature.remove();
			}
		});	
	};

});
