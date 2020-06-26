// Creature template
const creatureTemplate =
	'<tr class="creature" onclick="edit(this)">\n'
		+ '\t<td><input type="checkbox" name="num"></td>\n'
		+ '\t<td><p>Initiative</p></td>\n'
		+ '\t<td><p>Name</p></td>\n'
		+ '\t<td><input type="text" class="hp-box"> / <input type="text" class="hp-box"></td>\n'
		+ '\t<td><input type="text" class="notes-box" placeholder="Notes"></td>\n'
	+ '</tr>';

// Function to put a creature into "edit mode" by clicking on it
function edit(creature) {
	console.log(creature);
	var elements = creature.children;

	for(i = 0; i < elements.length; i++) {
		let element = elements[i].firstChild;
		if(element.tagName === 'P') {
			let text = element.firstChild.textContent;
			elements[i].innerHTML = '<input type="text" value="' + text + '" >';
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {

	// Add a new creature based on the template when add button clicked
	document.querySelector('#add').onclick = () => {
		const creature = creatureTemplate;
		document.querySelector('#creatures').innerHTML += creature;	
	};

	// Delete selected creatures when delete button is clicked
	document.querySelector('#delete').onclick = () => {
		var creatures = document.querySelectorAll('.creature');
		creatures.forEach( creature => {
			if(creature.children[0].firstElementChild.checked) {
				creature.remove();
			}
		});
	};	

});
