
loader.register('plain_tube/env', function(require) {
ENV = typeof ENV !== 'undefined' ? ENV : {
	EXPERIMENTAL_CONTROL_HELPER: true
};

});
