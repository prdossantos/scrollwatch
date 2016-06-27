var scrollWatch;
;(function(window,document){
	scrollWatch = function(element,offset) {
		var el = element
		el = (typeof el == 'string' && el) ? document.querySelector(el) : document
		el = (typeof element == 'object') ? element : el

		offset = offset || 0
		
		var lastInnerHeight = 0;

		function hide(el)
		{
			if(el){
				el.style.display = 'none'
			}
		}

		function css(el,args)
		{
			console.log(el)	
		}

		function eventListener(direction,arg,effect)
		{
			let opt = {}

			el.addEventListener('scroll', function() {
				
				let y = this.scrollTop || this.pageYOffset
				if(!y) {
					y = (this.documentElement) ? this.documentElement.scrollTop : undefined
				}
				if(!y) return undefined

				if( direction.indexOf('down') > -1 && y > lastInnerHeight && y > offset) {
					if(typeof arg == 'function') {
						opt.top = y
						lastInnerHeight = y
						arg(this,opt,el)
					} else {
						arg = (typeof arg == 'string') ? document.querySelector(arg) : arg
						lastInnerHeight = y
						effect(arg)
					}
				}

			})

			return function(){}
		}

		function effects(direction,arg)
		{
			return {
				hide: eventListener(direction,arg,hide),
				css: eventListener(direction,arg,css)
			}
		}

		function to(direction,arg) 
		{
			if(typeof arg == 'function') {
				return eventListener(direction,arg)
			}

			if( typeof arg == 'string' && arg ) {
				return effects(direction,arg)
			}
		}

		return {
			to: to
		}
	} 
}(window,document));