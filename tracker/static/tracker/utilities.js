// ----------------
// Utilities Module
// ----------------

var utilities = (function() {

	// Creature template
	const creatureTemplate =
		'<tr class="creature">\n'
			+ '\t<td><input type="checkbox"></td>\n'
			+ '\t<td onclick="utilities.edit(this)"><p class="initiative">Initiative</p></td>\n'
			+ '\t<td onclick="utilities.edit(this)"><p>Name</p></td>\n'
			+ '\t<td><input type="text" class="hp-box"> / <input type="text" class="hp-box"></td>\n'
			+ '\t<td><input type="text" class="notes-box" placeholder="Notes"></td>\n'
		+ '</tr>';

	// Global variable for element being edited
	var elementEditing = null;

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
		var temp = null;

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

	return {
		creatureTemplate: creatureTemplate,
		edit: edit,
		stopEditing: stopEditing,
		makeDefaultState: makeDefaultState
	};

})();
