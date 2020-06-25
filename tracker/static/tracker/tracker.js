document.addEventListener('DOMContentLoaded', () => {

	// Template for creating a new creature
	const template = Handlebars.compile(document.querySelector('#new-creature').innerHTML);

	// Add a new creature based on the template when add button clicked
	document.querySelector('#add').onclick = () => {
		const creature = template();
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
