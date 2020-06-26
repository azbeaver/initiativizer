// Creature template
const creatureTemplate =
	'<tr class="creature">\n'
		+ '\t<td><input type="checkbox" name="num"></td>\n'
		+ '\t<td onclick="edit(this)"><p>Initiative</p></td>\n'
		+ '\t<td onclick="edit(this)"><p>Name</p></td>\n'
		+ '\t<td><input type="text" class="hp-box"> / <input type="text" class="hp-box"></td>\n'
		+ '\t<td><input type="text" class="notes-box" placeholder="Notes"></td>\n'
	+ '</tr>';

// Global variable for element being edited
var elementEditing = null;
// Global variable indicating when "edit mode" is on - false by default
var isEditing = false;

// Function to put an individual into "edit mode" by clicking on it
function edit(element) {
	// this function only applies when edit mode is not on
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
	if(elementEditing === null) {
		return;
	}

	let text = element.firstChild.value;
	element.innerHTML = '<p>' + text + '</p>';
	element.onclick = () => {
		edit(element);
	};
}

document.addEventListener('DOMContentLoaded', () => {
	
	// Exit edit mode for an element when body is clicked
	document.body.onclick = element => {
		if(element.srcElement.tagName === 'BODY') {
			stopEditing(elementEditing);
			elementEditing = null;
		}
	};

	// Add a new creature based on the template when add button clicked
	document.querySelector('#add').onclick = () => {
		stopEditing(elementEditing);
		elementEditing = null;
		const creature = creatureTemplate;
		document.querySelector('#creatures').innerHTML += creature;	
	};

	// Delete selected creatures when delete button is clicked
	document.querySelector('#delete').onclick = () => {
		stopEditing(elementEditing);
		elementEditing = null;
		var creatures = document.querySelectorAll('.creature');
		creatures.forEach( creature => {
			if(creature.children[0].firstElementChild.checked) {
				creature.remove();
			}
		});
	};	

});
