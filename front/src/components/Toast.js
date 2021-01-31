import M from 'materialize-css';

export default (text = 'Не заданно', errorMsg = false) => {
	return M.toast({
		html: text,
		classes: errorMsg ? '#d32f2f red darken-2' : '#2e7d32 green darken-3',
	});
};
