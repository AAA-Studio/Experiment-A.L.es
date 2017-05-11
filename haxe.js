(function () { "use strict";
var Part = function(p) {
	this.p = p;
	this.reset();
};
Part.prototype = {
	reset: function() {
		this.x = 50 + Math.random() * 700;
		this.y = Math.random() * 300;
		this.va = Math.random() * 15;
		this.vs = 1 + Math.random();
		this.vk = Math.random() * Math.PI * 2;
		this.vy = -(1 + Math.random()) * 0.3;
		this.glow = Math.random() * Math.PI * 2;
		this.alpha = 1;
		var scale = 0.75 + Math.random() * 0.5;
		this.p.style.width = scale * 16 + "px";
		this.p.style.height = scale * 16 + "px";
		this.p.style.zIndex = "" + ((scale > 1.15?3:0) | 0);
	}
	,update: function(dt) {
		this.vk += this.vs * dt * 0.01;
		var x = this.x + Math.sin(this.vk) * this.va;
		this.y += this.vy * dt;
		this.glow += 0.01 * dt;
		this.p.style.left = (x | 0) + "px";
		this.p.style.top = (this.y | 0) + "px";
		if(this.alpha < 1) this.alpha += 0.01 * dt;
		var alpha = (Math.sin(this.glow) * 0.5 + 0.8) * this.alpha * 0.5;
		this.p.style.opacity = "" + (alpha < 0?0:alpha);
		if(this.y < -16) {
			this.reset();
			this.y = Math.random() * 50 + 250;
			this.alpha = 0;
		}
	}
};
var Main = function() { };
Main.main = function() {
	var parts = [];
	var pcont = window.document.getElementById("pcont");
	var _g = 0;
	while(_g < 40) {
		var i = _g++;
		var p = window.document.createElement("img");
		p.className = "part";
		p.setAttribute("src","img/sparkleParticle.png");
		pcont.appendChild(p);
		parts.push(new Part(p));
	}
	var update = function(dt) {
		var _g1 = 0;
		while(_g1 < parts.length) {
			var p1 = parts[_g1];
			++_g1;
			p1.update(dt);
		}
	};
	var loop;
	var loop1 = null;
	loop1 = function(_) {
		update(1);
		try {
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(loop2) {
				window.setTimeout(loop2,17);
			};
			requestAnimationFrame(loop1);
			return true;
		} catch( e ) {
			console.log(e);
			return false;
		}
	};
	loop = loop1;
	loop(null);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
Main.main();
})();

//# sourceMappingURL=haxe.js.map