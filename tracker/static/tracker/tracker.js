// ---------------------------------------
// Add button functionality when DOM loads
// ---------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	
	// Exit edit state for an element when body is clicked
	document.body.onclick = srcEvent => {
		if(srcEvent.srcElement.tagName === 'BODY') {
			utilities.makeDefaultState();
		}
	};

	// Select all creatures checkbox
	document.querySelector('#select-all').onclick = srcEvent => {
		utilities.makeDefaultState();
		
		var creatures = document.querySelectorAll('.creature');
		creatures.forEach( creature => {
			creature.children[0].firstElementChild.checked = srcEvent.srcElement.checked;
		});
	};

	// Add a new creature based on the template when add button clicked
	document.querySelector('#add').onclick = () => {
		utilities.makeDefaultState();

		const creature = utilities.creatureTemplate;
		document.querySelector('#creatures').innerHTML += creature;	
	};

	// Delete selected creatures when delete button is clicked
	document.querySelector('#delete').onclick = () => {
		utilities.makeDefaultState();
		document.querySelector('#select-all').checked = false;

		var creatures = document.querySelectorAll('.creature');
		creatures.forEach( creature => {
			if(creature.children[0].firstElementChild.checked) {
				creature.remove();
			}
		});	
	};

});
