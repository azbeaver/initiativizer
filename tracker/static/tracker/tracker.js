// Creature template
const creatureTemplate =
	'<tr class="creature">\n'
		+ '\t<td><input type="checkbox"></td>\n'
		+ '\t<td onclick="edit(this)"><p>Initiative</p></td>\n'
		+ '\t<td onclick="edit(this)"><p>Name</p></td>\n'
		+ '\t<td><input type="text" class="hp-box"> / <input type="text" class="hp-box"></td>\n'
		+ '\t<td><input type="text" class="notes-box" placeholder="Notes"></td>\n'
	+ '</tr>';

// Global variable for element being edited
var elementEditing = null;
// Global variable indicating when "edit state" is on - false by default
var isEditing = false;

// Function to put an individual into "edit state" by clicking on it
function edit(element) {
	// this function only applies when edit state is not on
	if(isEditing) {
		return;
	}
	
	stopEditing(elementEditing);
	elementEditing = element;

	let text = element.firstChild.textContent;
	element.innerHTML = '<input type="text" value="' + text + '" >';
	element.onclick = '';
}

function stopEditing(element) {
	if(element === null) {
		return;
	}

	let text = element.firstChild.value;
	element.innerHTML = '<p>' + text + '</p>';
	element.onclick = () => {
		edit(element);
	};
}

function makeDefaultState() {
	stopEditing(elementEditing);
	elementEditing = null;
}

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
