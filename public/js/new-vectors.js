(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"new_vectors_atlas_1", frames: [[241,0,129,388],[770,65,61,26],[0,0,239,1143],[638,65,130,39],[981,0,112,77],[0,1145,1141,25],[813,0,166,63],[372,0,131,130],[638,0,173,63],[505,0,131,130]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_10 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["new_vectors_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol44 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgoAfIAAg9IBRAAIAAA9g");
	this.shape.setTransform(4.075,3.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol44, new cjs.Rectangle(0,0,8.2,6.3), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,64.5,194), null);


(lib.scanning = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},12).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30.5,13);


(lib.randomFaceRight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		//this.rnd.text = parseInt(Math.random()*99999, 10);
		
		var rndNumber = parseInt(Math.random()*99999, 10);
		
		if( this.children.length < 1 ){
		
			var dealerTag = new cjs.Text( "TEST" , "10px prestolight", "#ffffff");
				dealerTag.name = "rnd";
				dealerTag.textAlign = "right";
				dealerTag.lineHeight = 12;
				dealerTag.lineWidth = 35;
				dealerTag.x = -44;
				dealerTag.y = -69;
				this.addChild( dealerTag );
		
		} else {
			this.children[0].text = rndNumber;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.randomFace = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		var rndNumber = parseInt(Math.random()*99999, 10);
		
		if( this.children.length < 1 ){
		
			var dealerTag = new cjs.Text( rndNumber , "10px prestolight", "#ffffff");
				dealerTag.name = "rnd";
				dealerTag.textAlign = "left";
				dealerTag.lineHeight = 12;
				dealerTag.lineWidth = 285;
				dealerTag.x = -77;
				dealerTag.y = -69;
				this.addChild( dealerTag );
		
		} else {
			this.children[0].text = rndNumber;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.random1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		//this.rnd.text = parseInt(Math.random()*99999999999999999999, 10);
		
		var rndNumber = parseInt(Math.random()*99999999999999999999, 10);
		
		if( this.children.length < 1 ){
		
			var dealerTag = new cjs.Text( "TEST" , "5.9px prestolight", "#ffffff");
				dealerTag.name = "rnd";
				dealerTag.textAlign = "left";
				dealerTag.lineHeight = 12;
				dealerTag.lineWidth = 35;
				dealerTag.x = 2;
				this.addChild( dealerTag );
		
		} else {
			this.children[0].text = rndNumber;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Overlay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg6lBQUMAAAignMB1LAAAMAAACgng");
	this.shape.setTransform(375,514);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Overlay, new cjs.Rectangle(0,0,750,1028), null);


(lib.Indicator_stroke = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F9F9F9").ss(1,1,1).p("AhLAPQgIgIAAgLQAAgMAIgIIA7g7IBbAJIAJBaIg8A8QgHAIgNAAQgKAAgJgIg");
	this.shape.setTransform(8.4,8.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Indicator_stroke, new cjs.Rectangle(-1,-1,18.8,18.9), null);


(lib.Indicator_full = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9F9F9").s().p("AgPBMIg8g9QgIgIAAgLQAAgMAIgIIA7g7IBbAJIAJBaIg7A8QgJAIgMAAQgJAAgKgIg");
	this.shape.setTransform(8.4,8.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Indicator_full, new cjs.Rectangle(0,0,16.8,16.9), null);


(lib.Group_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,119.5,571.5), null);


(lib.Arrows = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F9F9F9").ss(1,1,1).p("Ag5hxIBzBzIhvBw");
	this.shape.setTransform(48.2625,11.4);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(19).to({_off:false},0).to({_off:true},27).wait(9));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#F9F9F9").ss(1,1,1).p("Ag5hxIBzBzIhvBw");
	this.shape_1.setTransform(40.3125,11.4);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(14).to({_off:false},0).to({_off:true},27).wait(14));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#F9F9F9").ss(1,1,1).p("Ag5hxIBzBzIhvBw");
	this.shape_2.setTransform(13.7625,11.4);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3).to({_off:false},0).to({_off:true},25).wait(27));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#F9F9F9").ss(1,1,1).p("Ag5hxIBzBzIhvBw");
	this.shape_3.setTransform(5.8125,11.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).to({_off:true},25).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,56.1,24.8);


(lib.ScrollerText = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ak5FBIAAqBIJzAAIAAKBg");
	mask.setTransform(31.975,45.95);

	// Layer_1
	this.instance = new lib.Symbol1();
	this.instance.setTransform(32.2,110.75,1,1,0,0,0,32.2,96.9);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-17.3},34).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.6,13.9,62.8,64.19999999999999);


(lib.Dotanim = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		var count = 45;
		 var current = 1;
		//this.dot1.alpha = getRandomInt(0,100)/100;
		
		for(current;current<count;current++){
			if(this["dot"+current] != undefined ){
				this["dot"+current].alpha = getRandomInt(0,100)/100;
			}
		}
		
		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min)) + min;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4));

	// Layer_4
	this.dot44 = new lib.Symbol44();
	this.dot44.name = "dot44";
	this.dot44.setTransform(128.7,36.7,1,1,0,0,0,4,3.1);

	this.dot40 = new lib.Symbol44();
	this.dot40.name = "dot40";
	this.dot40.setTransform(116.85,36.7,1,1,0,0,0,4,3.1);

	this.dot36 = new lib.Symbol44();
	this.dot36.name = "dot36";
	this.dot36.setTransform(104.6,36.7,1,1,0,0,0,4,3.1);

	this.dot32 = new lib.Symbol44();
	this.dot32.name = "dot32";
	this.dot32.setTransform(91.95,36.7,1,1,0,0,0,4,3.1);

	this.dot28 = new lib.Symbol44();
	this.dot28.name = "dot28";
	this.dot28.setTransform(80,36.7,1,1,0,0,0,4,3.1);

	this.dot24 = new lib.Symbol44();
	this.dot24.name = "dot24";
	this.dot24.setTransform(67.4,36.7,1,1,0,0,0,4,3.1);

	this.dot20 = new lib.Symbol44();
	this.dot20.name = "dot20";
	this.dot20.setTransform(54.65,36.7,1,1,0,0,0,4,3.1);

	this.dot16 = new lib.Symbol44();
	this.dot16.name = "dot16";
	this.dot16.setTransform(42.1,36.7,1,1,0,0,0,4,3.1);

	this.dot12 = new lib.Symbol44();
	this.dot12.name = "dot12";
	this.dot12.setTransform(29.35,36.7,1,1,0,0,0,4,3.1);

	this.dot8 = new lib.Symbol44();
	this.dot8.name = "dot8";
	this.dot8.setTransform(16.75,36.7,1,1,0,0,0,4,3.1);

	this.dot4 = new lib.Symbol44();
	this.dot4.name = "dot4";
	this.dot4.setTransform(4,36.7,1,1,0,0,0,4,3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dot4},{t:this.dot8},{t:this.dot12},{t:this.dot16},{t:this.dot20},{t:this.dot24},{t:this.dot28},{t:this.dot32},{t:this.dot36},{t:this.dot40},{t:this.dot44}]}).wait(4));

	// Layer_3
	this.dot43 = new lib.Symbol44();
	this.dot43.name = "dot43";
	this.dot43.setTransform(128.7,25.35,1,1,0,0,0,4,3.1);

	this.dot39 = new lib.Symbol44();
	this.dot39.name = "dot39";
	this.dot39.setTransform(116.85,25.35,1,1,0,0,0,4,3.1);

	this.dot35 = new lib.Symbol44();
	this.dot35.name = "dot35";
	this.dot35.setTransform(104.6,25.35,1,1,0,0,0,4,3.1);

	this.dot31 = new lib.Symbol44();
	this.dot31.name = "dot31";
	this.dot31.setTransform(91.95,25.35,1,1,0,0,0,4,3.1);

	this.dot27 = new lib.Symbol44();
	this.dot27.name = "dot27";
	this.dot27.setTransform(80,25.35,1,1,0,0,0,4,3.1);

	this.dot23 = new lib.Symbol44();
	this.dot23.name = "dot23";
	this.dot23.setTransform(67.4,25.35,1,1,0,0,0,4,3.1);

	this.dot19 = new lib.Symbol44();
	this.dot19.name = "dot19";
	this.dot19.setTransform(54.65,25.35,1,1,0,0,0,4,3.1);

	this.dot15 = new lib.Symbol44();
	this.dot15.name = "dot15";
	this.dot15.setTransform(42.1,25.35,1,1,0,0,0,4,3.1);

	this.dot11 = new lib.Symbol44();
	this.dot11.name = "dot11";
	this.dot11.setTransform(29.35,25.35,1,1,0,0,0,4,3.1);

	this.dot7 = new lib.Symbol44();
	this.dot7.name = "dot7";
	this.dot7.setTransform(16.75,25.35,1,1,0,0,0,4,3.1);

	this.dot3 = new lib.Symbol44();
	this.dot3.name = "dot3";
	this.dot3.setTransform(4,25.35,1,1,0,0,0,4,3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dot3},{t:this.dot7},{t:this.dot11},{t:this.dot15},{t:this.dot19},{t:this.dot23},{t:this.dot27},{t:this.dot31},{t:this.dot35},{t:this.dot39},{t:this.dot43}]}).wait(4));

	// Layer_2
	this.dot42 = new lib.Symbol44();
	this.dot42.name = "dot42";
	this.dot42.setTransform(128.7,14.45,1,1,0,0,0,4,3.1);

	this.dot38 = new lib.Symbol44();
	this.dot38.name = "dot38";
	this.dot38.setTransform(116.85,14.45,1,1,0,0,0,4,3.1);

	this.dot34 = new lib.Symbol44();
	this.dot34.name = "dot34";
	this.dot34.setTransform(104.6,14.45,1,1,0,0,0,4,3.1);

	this.dot30 = new lib.Symbol44();
	this.dot30.name = "dot30";
	this.dot30.setTransform(91.95,14.45,1,1,0,0,0,4,3.1);

	this.dot26 = new lib.Symbol44();
	this.dot26.name = "dot26";
	this.dot26.setTransform(80,14.45,1,1,0,0,0,4,3.1);

	this.dot22 = new lib.Symbol44();
	this.dot22.name = "dot22";
	this.dot22.setTransform(67.4,14.45,1,1,0,0,0,4,3.1);

	this.dot18 = new lib.Symbol44();
	this.dot18.name = "dot18";
	this.dot18.setTransform(54.65,14.45,1,1,0,0,0,4,3.1);

	this.dot14 = new lib.Symbol44();
	this.dot14.name = "dot14";
	this.dot14.setTransform(42.1,14.45,1,1,0,0,0,4,3.1);

	this.dot10 = new lib.Symbol44();
	this.dot10.name = "dot10";
	this.dot10.setTransform(29.35,14.45,1,1,0,0,0,4,3.1);

	this.dot6 = new lib.Symbol44();
	this.dot6.name = "dot6";
	this.dot6.setTransform(16.75,14.45,1,1,0,0,0,4,3.1);

	this.dot2 = new lib.Symbol44();
	this.dot2.name = "dot2";
	this.dot2.setTransform(4,14.45,1,1,0,0,0,4,3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dot2},{t:this.dot6},{t:this.dot10},{t:this.dot14},{t:this.dot18},{t:this.dot22},{t:this.dot26},{t:this.dot30},{t:this.dot34},{t:this.dot38},{t:this.dot42}]}).wait(4));

	// Layer_1
	this.dot41 = new lib.Symbol44();
	this.dot41.name = "dot41";
	this.dot41.setTransform(128.7,3.1,1,1,0,0,0,4,3.1);

	this.dot37 = new lib.Symbol44();
	this.dot37.name = "dot37";
	this.dot37.setTransform(116.85,3.1,1,1,0,0,0,4,3.1);

	this.dot33 = new lib.Symbol44();
	this.dot33.name = "dot33";
	this.dot33.setTransform(104.6,3.1,1,1,0,0,0,4,3.1);

	this.dot29 = new lib.Symbol44();
	this.dot29.name = "dot29";
	this.dot29.setTransform(91.95,3.1,1,1,0,0,0,4,3.1);

	this.dot25 = new lib.Symbol44();
	this.dot25.name = "dot25";
	this.dot25.setTransform(80,3.1,1,1,0,0,0,4,3.1);

	this.dot21 = new lib.Symbol44();
	this.dot21.name = "dot21";
	this.dot21.setTransform(67.4,3.1,1,1,0,0,0,4,3.1);

	this.dot17 = new lib.Symbol44();
	this.dot17.name = "dot17";
	this.dot17.setTransform(54.65,3.1,1,1,0,0,0,4,3.1);

	this.dot13 = new lib.Symbol44();
	this.dot13.name = "dot13";
	this.dot13.setTransform(42.1,3.1,1,1,0,0,0,4,3.1);

	this.dot9 = new lib.Symbol44();
	this.dot9.name = "dot9";
	this.dot9.setTransform(29.35,3.1,1,1,0,0,0,4,3.1);

	this.dot5 = new lib.Symbol44();
	this.dot5.name = "dot5";
	this.dot5.setTransform(16.75,3.1,1,1,0,0,0,4,3.1);

	this.dot1 = new lib.Symbol44();
	this.dot1.name = "dot1";
	this.dot1.setTransform(4,3.1,1,1,0,0,0,4,3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dot1},{t:this.dot5},{t:this.dot9},{t:this.dot13},{t:this.dot17},{t:this.dot21},{t:this.dot25},{t:this.dot29},{t:this.dot33},{t:this.dot37},{t:this.dot41}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,132.9,39.9);


(lib.CurvedIndicators3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// TL1
	this.instance = new lib.Indicator_stroke();
	this.instance.setTransform(-198.4,286.55,1,1,-1.7042,0,0,8.4,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({regY:8.3,rotation:92.4889,guide:{path:[-198.3,286.6,-415.8,7.4,-197.1,-275.3]}},70,cjs.Ease.cubicInOut).wait(15).to({regY:8.2,rotation:-1.7042,guide:{path:[-197.1,-275.3,-415.8,7.4,-198.3,286.6]}},60,cjs.Ease.cubicInOut).wait(2));

	// BL1
	this.instance_1 = new lib.Indicator_full();
	this.instance_1.setTransform(-198.3,286.65,1,1,0,0,0,8.5,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:8.6,rotation:91.2354,guide:{path:[-198.2,286.7,-415.9,7.4,-197,-275.4]}},69,cjs.Ease.cubicInOut).to({regX:8.4,regY:8.3,rotation:92.5082,guide:{path:[-197,-275.4,-197,-275.5,-196.9,-275.5]}},15,cjs.Ease.quadOut).wait(1).to({regY:8.4,rotation:92.1694,x:-198.5,y:-273.8},0).wait(1).to({rotation:91.8014,x:-199.65,y:-272.3},0).wait(1).to({rotation:91.4017,x:-201,y:-270.55},0).wait(1).to({rotation:90.9679,x:-202.45,y:-268.65},0).wait(1).to({rotation:90.4968,x:-204,y:-266.55},0).wait(1).to({rotation:89.9851,x:-205.7,y:-264.3},0).wait(1).to({rotation:89.4287,x:-207.55,y:-261.8},0).wait(1).to({rotation:88.8232,x:-209.55,y:-259.15},0).wait(1).to({rotation:88.163,x:-211.7,y:-256.15},0).wait(1).to({rotation:87.4419,x:-214.05,y:-252.9},0).wait(1).to({rotation:86.6522,x:-216.6,y:-249.25},0).wait(1).to({rotation:85.7845,x:-219.4,y:-245.25},0).wait(1).to({rotation:84.8277,x:-222.4,y:-240.85},0).wait(1).to({rotation:83.7674,x:-225.75,y:-235.85},0).wait(1).to({rotation:82.5855,x:-229.45,y:-230.2},0).wait(1).to({rotation:81.2584,x:-233.55,y:-223.8},0).wait(1).to({rotation:79.7547,x:-238.1,y:-216.5},0).wait(1).to({rotation:78.0306,x:-243.25,y:-207.9},0).wait(1).to({rotation:76.0235,x:-249.15,y:-197.7},0).wait(1).to({rotation:73.638,x:-255.95,y:-185.3},0).wait(1).to({rotation:70.7207,x:-263.9,y:-169.65},0).wait(1).to({rotation:67.0026,x:-273.25,y:-149.05},0).wait(1).to({rotation:61.9747,x:-284.6,y:-119.95},0).wait(1).to({rotation:54.7462,x:-297.4,y:-75.7},0).wait(1).to({rotation:45.4446,x:-306.2,y:-15.2},0).wait(1).to({rotation:37.5496,x:-305.4,y:39.75},0).wait(1).to({rotation:32.0228,x:-299.45,y:80.45},0).wait(1).to({rotation:27.9704,x:-292.15,y:110.45},0).wait(1).to({rotation:24.8083,x:-284.85,y:133.3},0).wait(1).to({rotation:22.2291,x:-278.05,y:151.55},0).wait(1).to({rotation:20.0597,x:-271.8,y:166.4},0).wait(1).to({rotation:18.1946,x:-266,y:178.9},0).wait(1).to({rotation:16.5648,x:-260.8,y:189.55},0).wait(1).to({rotation:15.1228,x:-255.95,y:198.85},0).wait(1).to({rotation:13.8346,x:-251.5,y:207},0).wait(1).to({rotation:12.6747,x:-247.45,y:214.25},0).wait(1).to({rotation:11.624,x:-243.65,y:220.7},0).wait(1).to({rotation:10.6671,x:-240.15,y:226.45},0).wait(1).to({rotation:9.792,x:-236.95,y:231.75},0).wait(1).to({rotation:8.9889,x:-233.9,y:236.5},0).wait(1).to({rotation:8.2496,x:-231.15,y:240.8},0).wait(1).to({rotation:7.5676,x:-228.5,y:244.8},0).wait(1).to({rotation:6.9371,x:-226.05,y:248.45},0).wait(1).to({rotation:6.3532,x:-223.85,y:251.8},0).wait(1).to({rotation:5.8118,x:-221.7,y:254.9},0).wait(1).to({rotation:5.3094,x:-219.75,y:257.75},0).wait(1).to({rotation:4.8426,x:-217.9,y:260.35},0).wait(1).to({rotation:4.4089,x:-216.15,y:262.8},0).wait(1).to({rotation:4.0058,x:-214.55,y:265.05},0).wait(1).to({rotation:3.631,x:-213.05,y:267.15},0).wait(1).to({rotation:3.2827,x:-211.65,y:269.05},0).wait(1).to({rotation:2.9592,x:-210.35,y:270.85},0).wait(1).to({rotation:2.6589,x:-209.15,y:272.5},0).wait(1).to({rotation:2.3803,x:-208,y:274},0).wait(1).to({rotation:2.1222,x:-206.95,y:275.4},0).wait(1).to({rotation:1.8835,x:-206,y:276.7},0).wait(1).to({rotation:1.6631,x:-205.1,y:277.9},0).wait(1).to({rotation:1.46,x:-204.25,y:278.95},0).wait(1).to({rotation:1.2733,x:-203.5,y:280},0).wait(1).to({rotation:1.1022,x:-202.8,y:280.9},0).wait(1).to({rotation:0.946,x:-202.2,y:281.75},0).wait(1).to({rotation:0.8038,x:-201.55,y:282.5},0).wait(1).to({rotation:0.6752,x:-201.05,y:283.2},0).wait(1).to({rotation:0.5595,x:-200.6,y:283.8},0).wait(1).to({rotation:0.4561,x:-200.15,y:284.35},0).wait(1).to({rotation:0.3645,x:-199.8,y:284.85},0).wait(1).to({rotation:0.2842,x:-199.45,y:285.25},0).wait(1).to({rotation:0.2148,x:-199.2,y:285.65},0).wait(1).to({rotation:0.1558,x:-198.9,y:285.95},0).wait(1).to({rotation:0.1069,x:-198.7,y:286.2},0).wait(1).to({rotation:0.0676,x:-198.55,y:286.4},0).wait(1).to({rotation:0.0376,x:-198.4,y:286.55},0).wait(1).to({rotation:0.0165,x:-198.35,y:286.7},0).wait(1).to({rotation:0.0041,x:-198.3,y:286.75},0).wait(1).to({regX:8.5,regY:8.2,rotation:0,y:286.65},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-314.5,-284.9,126.69999999999999,581.0999999999999);


(lib.CurvedIndicators = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// TL1
	this.instance = new lib.Indicator_stroke();
	this.instance.setTransform(-194.8,-278.55,1,1,88.2958,0,0,8.4,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:8.4,rotation:88.351,x:-194.95,y:-278.5},0).wait(1).to({rotation:88.4181},0).wait(1).to({rotation:88.4975,x:-195,y:-278.55},0).wait(1).to({rotation:88.5897,y:-278.5},0).wait(1).to({rotation:88.6952,x:-194.95},0).wait(1).to({rotation:88.8145,x:-195,y:-278.55},0).wait(1).to({rotation:88.9481,y:-278.5},0).wait(1).to({rotation:89.0968,x:-194.95},0).wait(1).to({rotation:89.261,x:-195},0).wait(1).to({rotation:89.4415,x:-194.95},0).wait(1).to({rotation:89.6389,x:-195},0).wait(1).to({rotation:89.8541},0).wait(1).to({rotation:90.0878},0).wait(1).to({regY:8.3,rotation:90.341,x:-194.85},0).wait(1).to({regY:8.4,rotation:89.9291,x:-196.85,y:-276.05},0).wait(1).to({rotation:89.4792,x:-198.4,y:-273.95},0).wait(1).to({rotation:88.989,x:-200.25,y:-271.6},0).wait(1).to({rotation:88.4561,x:-202.2,y:-268.95},0).wait(1).to({rotation:87.8777,x:-204.4,y:-266.15},0).wait(1).to({rotation:87.2509,x:-206.7,y:-263.05},0).wait(1).to({rotation:86.5725,x:-209.15,y:-259.7},0).wait(1).to({rotation:85.8389,x:-211.85,y:-256.05},0).wait(1).to({rotation:85.0462,x:-214.6,y:-252.05},0).wait(1).to({rotation:84.1902,x:-217.7,y:-247.7},0).wait(1).to({rotation:83.2662,x:-221,y:-242.95},0).wait(1).to({rotation:82.2691,x:-224.45,y:-237.8},0).wait(1).to({rotation:81.1932,x:-228.2,y:-232.15},0).wait(1).to({rotation:80.0324,x:-232.2,y:-226},0).wait(1).to({rotation:78.78,x:-236.45,y:-219.2},0).wait(1).to({rotation:77.4288,x:-240.95,y:-211.85},0).wait(1).to({rotation:75.971,x:-245.7,y:-203.75},0).wait(1).to({rotation:74.3985,x:-250.8,y:-194.9},0).wait(1).to({rotation:72.7028,x:-256,y:-185.15},0).wait(1).to({rotation:70.8757,x:-261.55,y:-174.4},0).wait(1).to({rotation:68.9094,x:-267.3,y:-162.6},0).wait(1).to({rotation:66.7977,x:-273.1,y:-149.6},0).wait(1).to({rotation:64.5367,x:-279,y:-135.25},0).wait(1).to({rotation:62.1263,x:-284.8,y:-119.5},0).wait(1).to({rotation:59.5724,x:-290.35,y:-102.4},0).wait(1).to({rotation:56.8878,x:-295.5,y:-83.8},0).wait(1).to({rotation:54.0943,x:-299.9,y:-63.85},0).wait(1).to({rotation:51.2228,x:-303.5,y:-42.7},0).wait(1).to({rotation:48.3117,x:-305.8,y:-20.6},0).wait(1).to({rotation:45.4037,x:-306.9,y:2.05},0).wait(1).to({rotation:42.5418,x:-306.5,y:24.75},0).wait(1).to({rotation:39.7644,x:-304.7,y:47.05},0).wait(1).to({rotation:37.1025,x:-301.65,y:68.6},0).wait(1).to({rotation:34.5778,x:-297.65,y:89.05},0).wait(1).to({rotation:32.2029,x:-292.85,y:108.2},0).wait(1).to({rotation:29.9833,x:-287.4,y:125.85},0).wait(1).to({rotation:27.9184,x:-281.8,y:141.95},0).wait(1).to({rotation:26.0037,x:-276,y:156.7},0).wait(1).to({rotation:24.2323,x:-270.2,y:170},0).wait(1).to({rotation:22.596,x:-264.55,y:182.1},0).wait(1).to({rotation:21.0858,x:-259,y:193},0).wait(1).to({rotation:19.693,x:-253.8,y:202.95},0).wait(1).to({rotation:18.4089,x:-248.8,y:211.9},0).wait(1).to({rotation:17.2253,x:-244.1,y:220.05},0).wait(1).to({rotation:16.1348,x:-239.65,y:227.4},0).wait(1).to({rotation:15.1304,x:-235.5,y:234.1},0).wait(1).to({rotation:14.2057,x:-231.55,y:240.2},0).wait(1).to({rotation:13.3548,x:-227.95,y:245.75},0).wait(1).to({rotation:12.5725,x:-224.6,y:250.8},0).wait(1).to({rotation:11.8539,x:-221.45,y:255.35},0).wait(1).to({rotation:11.1947,x:-218.55,y:259.55},0).wait(1).to({rotation:10.5908,x:-215.85,y:263.3},0).wait(1).to({rotation:10.0387,x:-213.4,y:266.7},0).wait(1).to({rotation:9.5351,x:-211.1,y:269.85},0).wait(1).to({rotation:9.0769,x:-209.1,y:272.65},0).wait(1).to({rotation:8.6615,x:-207.2,y:275.15},0).wait(1).to({rotation:8.2862,x:-205.5,y:277.4},0).wait(1).to({rotation:7.9487,x:-203.95,y:279.45},0).wait(1).to({rotation:7.647,x:-202.5,y:281.3},0).wait(1).to({rotation:7.3791,x:-201.35,y:282.95},0).wait(1).to({rotation:7.1432,x:-200.25,y:284.3},0).wait(1).to({rotation:6.9376,x:-199.3,y:285.5},0).wait(1).to({rotation:6.7607,x:-198.5,y:286.6},0).wait(1).to({rotation:6.6113,x:-197.8,y:287.45},0).wait(1).to({rotation:6.4879,x:-197.25,y:288.2},0).wait(1).to({rotation:6.3893,x:-196.8,y:288.8},0).wait(1).to({rotation:6.3143,x:-196.4,y:289.2},0).wait(1).to({rotation:6.262,x:-196.15,y:289.5},0).wait(1).to({rotation:6.2313,x:-196.05,y:289.7},0).wait(1).to({regY:8.3,rotation:6.2212,x:-196,y:289.65},0).wait(1).to({regY:8.4,y:289.75},0).wait(14).to({regY:8.3,y:289.65},0).wait(1).to({regY:8.4,rotation:7.2486,x:-200.65,y:283.75},0).wait(1).to({rotation:8.3503,x:-204.6,y:278.6},0).wait(1).to({rotation:9.5275,x:-208.95,y:272.8},0).wait(1).to({rotation:10.781,x:-213.5,y:266.55},0).wait(1).to({rotation:12.1112,x:-218.3,y:259.8},0).wait(1).to({rotation:13.5185,x:-223.3,y:252.6},0).wait(1).to({rotation:15.0026,x:-228.5,y:244.85},0).wait(1).to({rotation:16.5628,x:-233.85,y:236.65},0).wait(1).to({rotation:18.1981,x:-239.35,y:227.8},0).wait(1).to({rotation:19.9066,x:-245,y:218.4},0).wait(1).to({rotation:21.6861,x:-250.75,y:208.4},0).wait(1).to({rotation:23.5334,x:-256.55,y:197.8},0).wait(1).to({rotation:25.4449,x:-262.3,y:186.6},0).wait(1).to({rotation:27.4161,x:-268.05,y:174.7},0).wait(1).to({rotation:29.4418,x:-273.7,y:162.2},0).wait(1).to({rotation:31.5162,x:-279.1,y:149},0).wait(1).to({rotation:33.6327,x:-284.25,y:135.2},0).wait(1).to({rotation:35.7842,x:-289.05,y:120.7},0).wait(1).to({rotation:37.9629,x:-293.5,y:105.65},0).wait(1).to({rotation:40.1609,x:-297.4,y:90.1},0).wait(1).to({rotation:42.3699,x:-300.75,y:74},0).wait(1).to({rotation:44.5814,x:-303.4,y:57.55},0).wait(1).to({rotation:46.7869,x:-305.35,y:40.65},0).wait(1).to({rotation:48.9783,x:-306.55,y:23.6},0).wait(1).to({rotation:51.1475,x:-306.95,y:6.4},0).wait(1).to({rotation:53.2871,x:-306.5,y:-10.75},0).wait(1).to({rotation:55.3901,x:-305.2,y:-27.85},0).wait(1).to({rotation:57.45,x:-303.25,y:-44.55},0).wait(1).to({rotation:59.461,x:-300.55,y:-60.95},0).wait(1).to({rotation:61.4182,x:-297.2,y:-76.8},0).wait(1).to({rotation:63.3172,x:-293.35,y:-92.1},0).wait(1).to({rotation:65.1544,x:-289,y:-106.7},0).wait(1).to({rotation:66.9266,x:-284.4,y:-120.6},0).wait(1).to({rotation:68.6317,x:-279.5,y:-133.85},0).wait(1).to({rotation:70.2678,x:-274.45,y:-146.25},0).wait(1).to({rotation:71.8338,x:-269.4,y:-158},0).wait(1).to({rotation:73.3287,x:-264.2,y:-169},0).wait(1).to({rotation:74.7524,x:-259.1,y:-179.3},0).wait(1).to({rotation:76.1049,x:-254.05,y:-188.9},0).wait(1).to({rotation:77.3865,x:-249.1,y:-197.85},0).wait(1).to({rotation:78.5978,x:-244.35,y:-206.2},0).wait(1).to({rotation:79.7398,x:-239.7,y:-213.95},0).wait(1).to({rotation:80.8135,x:-235.3,y:-221.1},0).wait(1).to({rotation:81.8201,x:-231.1,y:-227.75},0).wait(1).to({rotation:82.7608,x:-227.15,y:-233.85},0).wait(1).to({rotation:83.6372,x:-223.35,y:-239.45},0).wait(1).to({rotation:84.4506,x:-219.8,y:-244.7},0).wait(1).to({rotation:85.2027,x:-216.5,y:-249.4},0).wait(1).to({rotation:85.8949,x:-213.5,y:-253.7},0).wait(1).to({rotation:86.5288,x:-210.65,y:-257.6},0).wait(1).to({rotation:87.106,x:-208.1,y:-261.2},0).wait(1).to({rotation:87.6281,x:-205.7,y:-264.35},0).wait(1).to({rotation:88.0966,x:-203.6,y:-267.15},0).wait(1).to({rotation:88.5131,x:-201.75,y:-269.7},0).wait(1).to({rotation:88.879,x:-200.05,y:-271.9},0).wait(1).to({rotation:89.1957,x:-198.6,y:-273.8},0).wait(1).to({rotation:89.4649,x:-197.35,y:-275.35},0).wait(1).to({rotation:89.6877,x:-196.35,y:-276.7},0).wait(1).to({rotation:89.8656,x:-195.55,y:-277.75},0).wait(1).to({regX:8.5,regY:8.2,rotation:90,x:-194.8,y:-278.5},0).wait(2));

	// BL1
	this.instance_1 = new lib.Indicator_full();
	this.instance_1.setTransform(-194.7,-278.6,1,1,90,0,0,8.5,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:0,guide:{path:[-194.7,-278.6,-418.2,7.3,-195.9,289.7], orient:'fixed'}},69,cjs.Ease.cubicInOut).wait(1).to({regX:8.4,regY:8.4,x:-196.05,y:289.85},0).wait(14).to({regX:8.5,regY:8.2,x:-195.95,y:289.65},0).wait(1).to({regX:8.4,regY:8.4,rotation:0.3296,x:-197.45,y:288.05},0).wait(1).to({rotation:0.6877,x:-198.65,y:286.5},0).wait(1).to({rotation:1.0765,x:-200,y:284.7},0).wait(1).to({rotation:1.4986,x:-201.45,y:282.8},0).wait(1).to({rotation:1.9569,x:-203.1,y:280.75},0).wait(1).to({rotation:2.4547,x:-204.8,y:278.45},0).wait(1).to({rotation:2.996,x:-206.65,y:276},0).wait(1).to({rotation:3.5851,x:-208.7,y:273.3},0).wait(1).to({rotation:4.2274,x:-210.85,y:270.3},0).wait(1).to({rotation:4.9289,x:-213.25,y:266.95},0).wait(1).to({rotation:5.6973,x:-215.9,y:263.4},0).wait(1).to({rotation:6.5414,x:-218.7,y:259.35},0).wait(1).to({rotation:7.4723,x:-221.8,y:254.9},0).wait(1).to({rotation:8.5038,x:-225.25,y:249.9},0).wait(1).to({rotation:9.6537,x:-229,y:244.25},0).wait(1).to({rotation:10.9448,x:-233.2,y:237.8},0).wait(1).to({rotation:12.4077,x:-237.9,y:230.35},0).wait(1).to({rotation:14.085,x:-243.15,y:221.75},0).wait(1).to({rotation:16.0378,x:-249.15,y:211.4},0).wait(1).to({rotation:18.3585,x:-256.05,y:198.9},0).wait(1).to({rotation:21.1968,x:-264.1,y:183.2},0).wait(1).to({rotation:24.8141,x:-273.7,y:162.3},0).wait(1).to({rotation:29.7056,x:-285.15,y:132.8},0).wait(1).to({rotation:36.7382,x:-297.95,y:87.95},0).wait(1).to({rotation:45.7876,x:-306.45,y:26.45},0).wait(1).to({rotation:53.4685,x:-305.1,y:-29.6},0).wait(1).to({rotation:58.8455,x:-298.55,y:-71.05},0).wait(1).to({rotation:62.788,x:-290.7,y:-101.45},0).wait(1).to({rotation:65.8643,x:-283.05,y:-124.6},0).wait(1).to({rotation:68.3736,x:-275.95,y:-142.9},0).wait(1).to({rotation:70.4842,x:-269.5,y:-157.9},0).wait(1).to({rotation:72.2987,x:-263.6,y:-170.4},0).wait(1).to({rotation:73.8844,x:-258.15,y:-181.15},0).wait(1).to({rotation:75.2872,x:-253.25,y:-190.45},0).wait(1).to({rotation:76.5405,x:-248.75,y:-198.65},0).wait(1).to({rotation:77.6689,x:-244.6,y:-205.85},0).wait(1).to({rotation:78.6912,x:-240.8,y:-212.3},0).wait(1).to({rotation:79.6222,x:-237.2,y:-218.2},0).wait(1).to({rotation:80.4735,x:-233.95,y:-223.4},0).wait(1).to({rotation:81.2549,x:-230.85,y:-228.2},0).wait(1).to({rotation:81.974,x:-228.05,y:-232.6},0).wait(1).to({rotation:82.6376,x:-225.4,y:-236.5},0).wait(1).to({rotation:83.251,x:-222.95,y:-240.2},0).wait(1).to({rotation:83.819,x:-220.65,y:-243.55},0).wait(1).to({rotation:84.3457,x:-218.5,y:-246.65},0).wait(1).to({rotation:84.8346,x:-216.5,y:-249.55},0).wait(1).to({rotation:85.2887,x:-214.65,y:-252.15},0).wait(1).to({rotation:85.7106,x:-212.95,y:-254.55},0).wait(1).to({rotation:86.1029,x:-211.35,y:-256.85},0).wait(1).to({rotation:86.4674,x:-209.8,y:-258.95},0).wait(1).to({rotation:86.8063,x:-208.4,y:-260.85},0).wait(1).to({rotation:87.121,x:-207.1,y:-262.65},0).wait(1).to({rotation:87.4132,x:-205.85,y:-264.25},0).wait(1).to({rotation:87.6842,x:-204.7,y:-265.8},0).wait(1).to({rotation:87.9353,x:-203.65,y:-267.25},0).wait(1).to({rotation:88.1675,x:-202.7,y:-268.55},0).wait(1).to({rotation:88.382,x:-201.75,y:-269.7},0).wait(1).to({rotation:88.5796,x:-200.95,y:-270.85},0).wait(1).to({rotation:88.7612,x:-200.15,y:-271.85},0).wait(1).to({rotation:88.9277,x:-199.45,y:-272.8},0).wait(1).to({rotation:89.0797,x:-198.8,y:-273.6},0).wait(1).to({rotation:89.218,x:-198.25,y:-274.4},0).wait(1).to({rotation:89.3431,x:-197.7,y:-275.05},0).wait(1).to({rotation:89.4557,x:-197.2,y:-275.65},0).wait(1).to({rotation:89.5563,x:-196.8,y:-276.25},0).wait(1).to({rotation:89.6454,x:-196.4,y:-276.75},0).wait(1).to({rotation:89.7235,x:-196.05,y:-277.15},0).wait(1).to({rotation:89.791,x:-195.75,y:-277.5},0).wait(1).to({rotation:89.8484,x:-195.55,y:-277.85},0).wait(1).to({rotation:89.896,x:-195.35,y:-278.15},0).wait(1).to({rotation:89.9343,x:-195.15,y:-278.35},0).wait(1).to({rotation:89.9635,x:-195.05,y:-278.5},0).wait(1).to({rotation:89.984,x:-194.95,y:-278.6},0).wait(1).to({rotation:89.996,x:-194.9,y:-278.65},0).wait(1).to({regX:8.5,regY:8.2,rotation:90,x:-194.7,y:-278.6},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-314.7,-287.9,129.1,587.5);


// stage content:
(lib.newvectors = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_13
	this.rand1 = new lib.randomFaceRight();
	this.rand1.name = "rand1";
	this.rand1.setTransform(763.3,660.2,1,1,0,0,0,32.8,4.7);

	this.rand1_1 = new lib.randomFaceRight();
	this.rand1_1.name = "rand1_1";
	this.rand1_1.setTransform(763.3,636.05,1,1,0,0,0,32.8,4.7);

	this.rand1_2 = new lib.randomFaceRight();
	this.rand1_2.name = "rand1_2";
	this.rand1_2.setTransform(763.3,612.4,1,1,0,0,0,32.8,4.7);

	this.rand1_3 = new lib.randomFaceRight();
	this.rand1_3.name = "rand1_3";
	this.rand1_3.setTransform(763.3,588.05,1,1,0,0,0,32.8,4.7);

	this.rand1_4 = new lib.randomFaceRight();
	this.rand1_4.name = "rand1_4";
	this.rand1_4.setTransform(763.3,564.35,1,1,0,0,0,32.8,4.7);

	this.rand1_5 = new lib.randomFaceRight();
	this.rand1_5.name = "rand1_5";
	this.rand1_5.setTransform(763.3,540.45,1,1,0,0,0,32.8,4.7);

	this.rand1_6 = new lib.randomFaceRight();
	this.rand1_6.name = "rand1_6";
	this.rand1_6.setTransform(763.3,516.3,1,1,0,0,0,32.8,4.7);

	this.rand1_7 = new lib.randomFace();
	this.rand1_7.name = "rand1_7";
	this.rand1_7.setTransform(187.3,660.2,1,1,0,0,0,32.8,4.7);

	this.rand1_8 = new lib.randomFace();
	this.rand1_8.name = "rand1_8";
	this.rand1_8.setTransform(187.3,636.05,1,1,0,0,0,32.8,4.7);

	this.rand1_9 = new lib.randomFace();
	this.rand1_9.name = "rand1_9";
	this.rand1_9.setTransform(187.3,612.4,1,1,0,0,0,32.8,4.7);

	this.rand1_10 = new lib.randomFace();
	this.rand1_10.name = "rand1_10";
	this.rand1_10.setTransform(187.3,588.05,1,1,0,0,0,32.8,4.7);

	this.rand1_11 = new lib.randomFace();
	this.rand1_11.name = "rand1_11";
	this.rand1_11.setTransform(187.3,564.35,1,1,0,0,0,32.8,4.7);

	this.rand1_12 = new lib.randomFace();
	this.rand1_12.name = "rand1_12";
	this.rand1_12.setTransform(187.3,540.45,1,1,0,0,0,32.8,4.7);

	this.rand1_13 = new lib.randomFace();
	this.rand1_13.name = "rand1_13";
	this.rand1_13.setTransform(187.3,516.3,1,1,0,0,0,32.8,4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.rand1_13},{t:this.rand1_12},{t:this.rand1_11},{t:this.rand1_10},{t:this.rand1_9},{t:this.rand1_8},{t:this.rand1_7},{t:this.rand1_6},{t:this.rand1_5},{t:this.rand1_4},{t:this.rand1_3},{t:this.rand1_2},{t:this.rand1_1},{t:this.rand1}]}).wait(142));

	// Layer_12
	this.instance = new lib.scanning();
	this.instance.setTransform(644.75,166.35,1,1,0,0,0,15.2,6.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(142));

	// Layer_11
	this.instance_1 = new lib.scanning();
	this.instance_1.setTransform(80.35,158.55,1,1,0,0,0,15.2,6.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(142));

	// Layer_10
	this.rand1_14 = new lib.random1();
	this.rand1_14.name = "rand1_14";
	this.rand1_14.setTransform(80.8,827.6,1,1,0,0,0,32.8,4.7);

	this.timeline.addTween(cjs.Tween.get(this.rand1_14).wait(142));

	// Layer_9
	this.rand1_15 = new lib.random1();
	this.rand1_15.name = "rand1_15";
	this.rand1_15.setTransform(97.95,202.6,1,1,0,0,0,32.8,4.7);

	this.timeline.addTween(cjs.Tween.get(this.rand1_15).wait(142));

	// Layer_15
	this.instance_2 = new lib.ScrollerText();
	this.instance_2.setTransform(95.25,241.05,1,1,0,0,0,30.2,43.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(142));

	// INTERFACE
	this.instance_3 = new lib.ScrollerText();
	this.instance_3.setTransform(77.65,866.15,1,1,0,0,0,30.2,43.1);

	this.instance_4 = new lib.ScrollerText();
	this.instance_4.setTransform(659.2,248.05,1,1,0,0,0,30.2,43.1);

	this.instance_5 = new lib.CachedBmp_7();
	this.instance_5.setTransform(354.5,927.9,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_6();
	this.instance_6.setTransform(48,784.45,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_5();
	this.instance_7.setTransform(97.45,175,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_4();
	this.instance_8.setTransform(629.55,159.85,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_3();
	this.instance_9.setTransform(629.55,97.85,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_2();
	this.instance_10.setTransform(65.05,152.35,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_1();
	this.instance_11.setTransform(65.05,90.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(142));

	// Layer_8
	this.instance_12 = new lib.Dotanim();
	this.instance_12.setTransform(338.85,950.9,0.6818,0.5175,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(142));

	// Layer_7
	this.instance_13 = new lib.CurvedIndicators();
	this.instance_13.setTransform(583.5,516.85,1,1,0,0,180,-195.3,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(142));

	// Layer_6
	this.instance_14 = new lib.CurvedIndicators3();
	this.instance_14.setTransform(547.05,516.85,1,1,0,0,180,-195.3,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(142));

	// Layer_5
	this.instance_15 = new lib.CurvedIndicators();
	this.instance_15.setTransform(178.15,516.85,1,1,0,0,0,-195.3,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(142));

	// Layer_4
	this.instance_16 = new lib.CurvedIndicators3();
	this.instance_16.setTransform(214.6,516.85,1,1,0,0,0,-195.3,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(142));

	// INTERFACE
	this.instance_17 = new lib.Arrows();
	this.instance_17.setTransform(619.75,513.05,1,1,0,0,0,27.1,11.4);

	this.instance_18 = new lib.Group_1();
	this.instance_18.setTransform(620.7,519.55,1,1,0,0,180,59.6,285.7);
	this.instance_18.alpha = 0.5;

	this.instance_19 = new lib.Group_1();
	this.instance_19.setTransform(143.1,519.55,1,1,0,0,0,59.6,285.7);
	this.instance_19.alpha = 0.5;

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F9F9F9").ss(1,1,1).p("EAzNgAIIHHAAEg6TgAIIHHAAEgWjgrUUgjaArnAi4ArCEAYggrUUAjaArngi4ArC");
	this.shape.setTransform(375.7,514.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17}]}).wait(142));

	// Layer_3
	this.instance_20 = new lib.Overlay();
	this.instance_20.setTransform(375,514,1,1,0,0,0,375,514);
	this.instance_20.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(142));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(375,514,375,516.9000000000001);
// library properties:
lib.properties = {
	id: '45028454193744079173F68B39DED014',
	width: 750,
	height: 1028,
	fps: 35,
	color: "#006666",
	opacity: 0.00,
	manifest: [
		{src:"images/new_vectors_atlas_1.png", id:"new_vectors_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['45028454193744079173F68B39DED014'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;