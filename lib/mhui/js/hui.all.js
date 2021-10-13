!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
var huiReSizeTimer, huiResizeNeedDo = new Array(),overHeader=false;
var hui = (function(selector){
	/* 语言包 */
	var _lang = {
		domEmpty    : '没有选中的dom元素',
		xhrError    : '无法加载XMLHttpRequest模块！',
		ajaxTimeout : '请求超时',
		quit        : '再按一次退出程序'
	};
	var _huiDeputes = new Array();
	/* 选择器 */
	var _hui = function(selector){
		if(!selector){selector = document;}
		var selectorType = typeof(selector);
		switch(selectorType){
			case 'string':
			var doms = document.querySelectorAll(selector);
			var reObj = {dom:doms, length:doms.length};
			break;
			case 'object':
			var reObj = {dom:[selector], length:1};
			break;
			default:
			return null;
		}
		reObj.__proto__ = hcExtends;
		return reObj;
	}
	function addFuns(doms){var reObj = {dom:doms, length:doms.length}; reObj.__proto__ = hcExtends; return reObj;}
	_hui.import = function(funName, path){
		if(!path){path = './js/';}
		new_element=document.createElement("script"); 
		new_element.setAttribute("type","text/javascript"); 
		new_element.setAttribute("src", path+'hui-'+funName+'.js'); 
		document.body.appendChild(new_element);
	}
	/* dom 操作扩展 */
	var hcExtends = {
		size : function(){return this.length},
		/* 值、属性、HTML、操作 */
		val : function(vars){
			if(typeof(vars) != 'undefined'){for(var i = 0; i < this.length; i++){this.dom[i].value = vars;} return this;}
			try{return this.dom[0].value;}catch(e){console.log(_lang.domEmpty); return null;}
		},
		html : function(html){
			if(this.length < 1){return this;}
			if(typeof(html) != 'undefined'){for(var i = 0; i < this.length; i++){this.dom[i].innerHTML = html;} return this;}
			try{return this.dom[0].innerHTML;}catch(e){console.log(_lang.domEmpty); return null;}
		},
		attr:function(attrName, val){
			if(val){this.setAttr(attrName, val);}else{return this.getAttr(attrName);}
		},
		getAttr : function(attrName){
			try{return this.dom[0].getAttribute(attrName);}catch(e){console.log(_lang.domEmpty); return null;}
		},
		setAttr : function(attrName, val){
			for(var i = 0; i < this.length; i++){this.dom[i].setAttribute(attrName, val);} return this;
		},
		removeAttr : function(attrName){
			for(var i = 0; i < this.length; i++){this.dom[i].removeAttribute(attrName);}
			return this;
		},
		/* 样式操作 */
		css : function(csses){
			for(var i = 0; i < this.length; i++){var styles = this.dom[i].style; for(var k in csses){styles[k] = csses[k];}}
			return this;
		},
		hasClass : function(cls){
			if(this.length != 1){return false;}
			return this.dom[0].className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		},
		addClass : function(cls){
			for(var i = 0; i < this.length; i++){
				if(!this.dom[i].className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))){this.dom[i].className += " " + cls;}
			}
			return this;
		},
		removeClass : function(cls){
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			for(var i = 0; i < this.length; i++){this.dom[i].className = this.dom[i].className.replace(reg, ' ');}
			return this;
		},
		hide : function(isAnimate){
			for(var i = 0; i < this.length; i++){
				if(isAnimate){
					var ctdom = hui(this.dom[i]);
					ctdom.addClass('hui-fade-out');
					setTimeout(function(){
						ctdom.dom[0].style.display = 'none';
						ctdom.removeClass('hui-fade-out');
					},300);
				}else{
					this.dom[i].style.display = 'none';
				}
			}
			return this;
		},
		show : function(isAnimate){
			for(var i = 0; i < this.length; i++){
				if(isAnimate){
					var ctdom = hui(this.dom[i]);
					ctdom.addClass('hui-fade-in');
					setTimeout(function(){
						ctdom.dom[0].style.display = 'block';
						ctdom.removeClass('hui-fade-in');
					},300);
				}else{
					this.dom[i].style.display = 'block';
				}
			}
			return this;
		},
		/* 事件 */
		click : function(callBack){
			for(var i = 0; i < this.length; i++){
				if(callBack == undefined){_hui(this.dom[i]).trigger('click');}
				this.dom[i].addEventListener('click', callBack);
			}
		},
		change : function(callBack){
			for(var i = 0; i < this.length; i++){this.dom[i].addEventListener('change',callBack);}
		},
		focusIn : function(callBack){
			for(var i = 0; i < this.length; i++){this.dom[i].addEventListener('focus',callBack);}
		},
		focusOut : function(callBack){
			for(var i = 0; i < this.length; i++){this.dom[i].addEventListener('focusout',callBack);}
		},
		on : function(eventType, sonSelector, callBack){
			_huiDeputes.push({selector:sonSelector, cb:callBack});
			for(var i = 0; i < this.length; i++){
				this.dom[i].addEventListener('click', function(e){this.ondo(e);}.bind(this));
			}
		},
		ondo : function(e){
			if(!e.target){return false;}
			for(var i = 0; i < _huiDeputes.length; i++){
				var objs = hui(_huiDeputes[i].selector);
				for(var ii = 0; ii < objs.length; ii++){
					if(objs.dom[ii] === e.target){objs.dom[ii].index = ii; _huiDeputes[i].cb(objs.dom[ii]); break;}
				}
			}
		},
		longTap : function(callBack){
			if(this.length < 1){return;}
			var timer = null, timerNum = 0, _self = this.dom[0];
			_self.addEventListener('longTapDo', callBack);
			_self.addEventListener('touchstart',function(){
				timer = setInterval(function(){
					if(timerNum >= 1000){
						_hui(_self).trigger('longTapDo'); timerNum = 0; clearInterval(timer);
					}else{
						timerNum += 100;
					}
				}, 100);
			});
			this.dom[0].addEventListener('touchend',function(){clearInterval(timer);});
		},
		scroll : function(callBack){
			for(var i = 0; i < this.length; i++){
				this.dom[i].addEventListener('scroll', callBack);
			}
		},
		swiper : null,
		swipe : function(callBack){
			if(this.length != 1){return;}
			this.swiper = new Hammer(this.dom[0]);
			this.swiper.on("pan", function(ev) {callBack(ev);});
		},
		swipeLeft : function(callBack){
			if(this.length != 1){return;}
			if(this.swiper == null){this.swiper = new Hammer(this.dom[0]);}
			this.swiper.on("swipeleft", function(ev) {callBack(ev);});
		},
		swipeRight : function(callBack){
			if(this.length != 1){return;}
			if(this.swiper == null){this.swiper = new Hammer(this.dom[0]);}
			this.swiper.on("swiperight", function(ev) {callBack(ev);});
		},
		swipeUp : function(callBack){
			if(this.length != 1){return;}
			if(this.swiper == null){this.swiper = new Hammer(this.dom[0]);}
			this.swiper.get('swipe').set({direction: Hammer.DIRECTION_ALL});
			this.swiper.on("swipeup", function(ev){callBack(ev);});
		},
		swipeDown : function(callBack){
			if(this.swiper == null){this.swiper = new Hammer(this.dom[0]);}
			this.swiper.get('swipe').set({direction: Hammer.DIRECTION_ALL});
			this.swiper.on("swipedown", function(ev){callBack(ev);});
		},
		swipeEnd : function(callBack){
			this.swiper.on("panend", function(ev){callBack(ev);});
		},
		trigger : function(eventType, eventData){
			var element = this.dom[0];
			element.dispatchEvent(new CustomEvent(eventType,{detail:eventData,bubbles:true, cancelable:true}));
		},
		/* dom 元素遍历 */
		each : function(callBack){
			if(!callBack){return;}
			for(var i = 0; i < this.length; i++){this.dom[i].index = i; callBack(this.dom[i]);}
		},
		/* 筛选器 */
		eq : function(index){return _hui(this.dom[index]);},
		last : function(){return _hui(this.dom[this.length - 1]);},
		first : function(){return _hui(this.dom[0]);},
		next : function(){return _hui(this.dom[0].nextElementSibling || this.dom[0].nextSibling);},
		parent : function(){return _hui(this.dom[0].parentNode);},
		siblings : function(){
			if(!this.dom[0]){return this;}
			var nodes=[], startNode = this.dom[0], nextNode, preNode;
			var currentNode = startNode;
			while(nextNode = currentNode.nextElementSibling){nodes.push(nextNode); currentNode = nextNode;}
			currentNode = startNode;
			while(preNode = currentNode.previousElementSibling){nodes.push(preNode); currentNode = preNode;}
			return addFuns(nodes);
		},
		even : function(){
			var doms = new Array();
			for(var i = 0; i < this.length; i++){if(i % 2 == 0){doms.push(this.dom[i]);}}
			return addFuns(doms);
		},
		odd : function(){
			var doms = new Array();
			for(var i = 0; i < this.length; i++){if(i % 2 == 1){doms.push(this.dom[i]);}}
			return addFuns(doms);
		},
		index : function(){
			if(this.length != 1){return null;}
			var nodes=[], startNode = this.dom[0],  preNode;
			while(preNode = startNode.previousElementSibling){nodes.push(preNode); startNode = preNode;}
			return nodes.length;
		},
		find : function(selector){
			if(this.length < 1){return this;}
			var doms = new Array();
			for(var i = 0; i < this.length; i++){
				var domsquery = this.dom[i].querySelectorAll(selector);
				for(var ii = 0; ii < domsquery.length; ii++){
					doms.push(domsquery[ii]);
				}
			}
			return addFuns(doms);
		},
		/* dom 操作 */
		clone : function(){
			var doms = new Array();
			for(var i = 0; i < this.length; i++){doms.push(this.dom[i].cloneNode(true));}
			return addFuns(doms);
		},
		appendTo : function(parentObj){
			if(typeof(parentObj) == 'object'){
				for(var i = 0; i < this.length; i++){parentObj.dom[0].appendChild(this.dom[i]);}
			}else if(typeof(parentObj) == 'string'){
				var parentDom = _hui(parentObj);
				if(parentDom.length >= 1){for(var i = 0; i < this.length; i++){parentDom.dom[0].appendChild(this.dom[i]);}}
			}
		},
		prependTo : function(parentObj){
			if(typeof(parentObj) == 'object'){
				for(var i = 0; i < this.length; i++){parentObj.dom[0].insertBefore(this.dom[i], parentObj.dom[0].firstChild);}
			}else if(typeof(parentObj) == 'string'){
				var parentDom = hui(parentObj);
				if(parentDom.length >= 1){
					for(var i = 0; i < this.length; i++){
						parentDom.dom[0].insertBefore(this.dom[i], parentDom.dom[0].firstChild);
					}
				}
			}
		},
		remove : function(){
			for(var i = 0; i < this.length; i++){this.dom[i].parentNode.removeChild(this.dom[i]);}
		},
		/* 宽、高获取 */
		height : function(isOffset){
			if(this.length != 1){return 0;}
			if(isOffset){return this.dom[0].offsetHeight;}
			return this.dom[0].clientHeight;
		},
		width : function(isOffset){
			if(this.length != 1){return 0;}
			if(isOffset){return this.dom[0].offsetWidth;}
			return this.dom[0].clientWidth;
		},
		/* 展示状态 */
		isShow : function(){
			if(this.length != 1){return true;}
			if(this.dom[0].currentStyle){var showRes = this.dom[0].currentStyle.display;}else{var showRes = getComputedStyle(this.dom[0], null).display;}
			if(showRes == 'none'){return false;} return true;
		},
		isHide : function(){return !this.isShow();},
		/* loadding button */
		loadingButton : function(loadingText, isIcon){
			if(!loadingText){loadingText = 'Loading...';} if(!isIcon){isIcon = true;}
			this.setAttr('HUI_BTN_RESET', this.html());
			var loadingHtml = '<div class="hui-loading-wrap"><div class="hui-loading" style="margin:8px 0px 0px 0px;"></div><div class="hui-loading-text">'+loadingText+'</div></div>';
			this.html(loadingHtml);
		},
		resetLoadingButton : function(){this.html(this.getAttr('HUI_BTN_RESET')); this.removeAttr('HUI_BTN_RESET');},
		buttonIsLoading : function(){if(this.attr('HUI_BTN_RESET')){return true;} return false;},
		/* point msg */
		pointMsg : function(msg, color, size, top, right, isRelative){
			if(this.length < 1){return false;} if(!isRelative){isRelative = true;}
			if(isRelative){this.dom[0].style.position = 'relative';}
			if(!msg){
				if(!color){color = '#ED2D22';} if(!size){size = '8px';} if(!top){top = '0px';} if(!right){right = '8px';}
				var HUI_RedPoint = this.find('.hui-point-msg'); if(HUI_RedPoint.length >= 1){return;}
				HUI_RedPoint = document.createElement('div'); HUI_RedPoint.className = 'hui-point-msg';
				HUI_RedPoint.style.width = size; HUI_RedPoint.style.height = size;
				HUI_RedPoint.style.background = color; HUI_RedPoint.style.top = top;
				HUI_RedPoint.style.right = right; hui(HUI_RedPoint).appendTo(this);
				return;
			}
			var HUI_RedPoint = this.find('.hui-number-point');
			if(!HUI_RedPoint.length){
				if(!color){color = '#ED2D22';} if(!size){size = '8px';} if(!top){top = '0px';} if(!right){right = '5px';}
				HUI_RedPoint = document.createElement('div'); HUI_RedPoint.className = 'hui-number-point';
				HUI_RedPoint.style.fontSize = size; HUI_RedPoint.style.background = color; HUI_RedPoint.style.top = top;
				if(typeof(msg) == 'number'){
					if(msg <= 99){
						hui(HUI_RedPoint).css({borderRadius:'50%', fontSize:'12px', lineHeight:'12px', width:'12px', height:'12px'});
					}else{
						HUI_RedPoint.style.borderRadius = '5px';
						HUI_RedPoint.style.padding = '1px 3px';
					}
				}else{
					HUI_RedPoint.style.borderRadius = '5px';
					HUI_RedPoint.style.padding = '1px 3px';
				}
				HUI_RedPoint.style.right = right;
				HUI_RedPoint.innerHTML = msg;
				hui(HUI_RedPoint).appendTo(this);
			}else{
				if(typeof(msg) == 'number'){
					if(msg <= 99){
						HUI_RedPoint.css({borderRadius:'50%', fontSize:'12px', lineHeight:'12px', width:'12px', padding:'2px', height:'12px'});
					}else{
						HUI_RedPoint.css({'borderRadius':'3px', padding:'1px 3px', fontSize:'10px'});
					}
				}else{
					HUI_RedPoint.css({borderRadius:'5px', padding:'1px 3px'});
				}
				HUI_RedPoint.html(msg);
			}
		},
		removePointMsg : function(){
			if(this.length < 1){return false;}
			var HUI_RedPoint = this.find('.hui-point-msg'); 
			if(HUI_RedPoint.length >= 1){HUI_RedPoint.remove();}
			var HUI_NumPoint = this.find('.hui-number-point'); 
			if(HUI_NumPoint.length >= 1){HUI_NumPoint.remove();}
		},
		/* switch box */
		switchBox : function(butNames, callBack){
			if(!butNames){butNames = ['Off', 'On'];}
			this.dom[0].onclick = function(){
				var thisObj = hui(this);
				var status = thisObj.hasClass('hui-switch-on');
				var span = thisObj.dom[0].getElementsByTagName('span');
				if(status){
					thisObj.removeClass('hui-switcn-on');
					span[0].innerHTML = butNames[0]; thisObj.removeClass('hui-switch-on');
					if(callBack){callBack(false);}
					return;
				}
				thisObj.addClass('hui-switch-on'); span[0].innerHTML = butNames[1];
				thisObj.addClass('hui-switch-on');
				if(callBack){callBack(true);}
			}
		},
		getSwitchVal : function(){
			if(this.hasClass('hui-switch-on')){return true;}
			return false;
		},
		progressBar : function(val){this.find('span').first().css({width:val+'%'});},
		/* ranging */
		ranging : function(callBack){this.dom[0].oninput = function(){callBack(this.value);}; this.dom.onchange = function(){callBack(this.value);}},
		rangeRuling : function(){
			for(var i = 0; i < this.length; i++){
				var html = '';
				for(var ii = 0; ii < 10; ii++){html += '<div><div></div></div>';}
				this.dom[i].innerHTML = html;
			}
		},
		/* offset */
		offset : function(){if(this.length != 1){return {left:0, top:0};} return _hui.offset(this.dom[0]);},
		scrollX : function(num, sonsTag, extraValue){
			if(this.length < 1){return} if(!num){num = 3;} if(!sonsTag){sonsTag = 'img';} if(!extraValue){extraValue = 0;}
			var setWitdh = hui(this.dom[0]).width() / num;
			for(var i = 0; i < this.length; i++){
				var cObj = hui(this.dom[i]), sons = cObj.find(sonsTag), total = sons.length;
				sons.css({'width':(setWitdh+extraValue)+'px', 'float':'left'});
				cObj.find('div').eq(0).css({width : (setWitdh * total) + 'px'});
				cObj.css({'overflowX' : 'auto'});
			}
		},
		scrollY : function(height){
			if(this.length < 1){return} if(!height){height = 150;}
			for(var i = 0; i < this.length; i++){
				var cObj = hui(this.dom[i]);
				hui(this.dom[i]).css({height:height+'px', 'overflowY':'auto'});
			}
		},
		unfold : function(height, text){
			if(this.length < 1){return} if(!height){height = 580;} if(!text){text = '展开全文';}
			this.css({height:height+'px'});
			var buttonDom = document.createElement('div');
			buttonDom.setAttribute('id', 'hui-unfold');
			buttonDom.innerHTML = '<span class="hui-icons hui-icons-down2"></span>' + text;
			hui(buttonDom).appendTo(this);
			hui('#hui-unfold').click(function(){
				hui(this).parent().css({height:'auto'});
				hui(this).remove();
			});
		}
	}
	_hui.offset = function(e){
		var offset  = {left:0, top:0}; offset.left = e.offsetLeft; offset.top  = e.offsetTop;
		while(e = e.offsetParent){offset.top += e.offsetTop; offset.left += e.offsetLeft;} return offset;
	};
	_hui.scrollTop = function(val){document.body.scrollTop = val;}
	
	/* ajax */
	_hui.ajax = function(sets){
		if(!sets){sets = {url:null};}
		if(!sets.url){return ;}
		var async = 'async' in sets ? sets.async : true;
		sets.type = 'type' in sets ? sets.type.toUpperCase() : 'GET';
		sets.backType = 'backType' in sets ? sets.backType.toUpperCase() : 'HTML';
		sets.beforeSend = 'beforeSend' in sets ? sets.beforeSend : null;
		sets.complete = 'complete' in sets ? sets.complete : null;
		sets.success = 'success' in sets ? sets.success : function(){};
		sets.error = 'error' in sets ? sets.error : function(e){console.log('ajax error : ' + JSON.stringify(e));}
		sets.ContentType = 'ContentType' in sets ? sets.ContentType : 'application/x-www-form-urlencoded';
		sets.header = 'header' in sets ? sets.header : false;
		var xhr = new window.XMLHttpRequest();
		xhr.open(sets.type, sets.url, async);
		if(typeof(xhr) == 'undefined'){if(sets.error){sets.error(_lang.xhrError);} return;}
		if(sets.header){
			for(var i = 0; i < sets.header.length; i++){
				xhr.setRequestHeader(sets.header[i][0], sets.header[i][1]);
			}
		}
		xhr.timeout = 'timeout' in sets ? sets.timeout : 0;
		if(sets.beforeSend){sets.beforeSend();}
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(sets.complete){sets.complete();}
				if(xhr.status == 200){
					if(sets.backType == 'HTML'){
						sets.success(xhr.responseText);
					}else if(sets.backType == 'JSON'){
						sets.success(JSON.parse(xhr.responseText));
					}
				}
			}
		}
		xhr.ontimeout = function(){sets.error(_lang.ajaxTimeout);}
		if(sets.error){xhr.onerror = function(e){sets.error(e);}}
		if(sets.type == 'POST'){
			var pd = '';
			if(sets.ContentType == 'application/x-www-form-urlencoded'){
				for(var k in sets.data){pd += encodeURIComponent(k)+'='+encodeURIComponent(sets.data[k])+'&';}
				pd = pd.substr(0, pd.length - 1);
			}else{
				pd = sets.data;
			}
			xhr.setRequestHeader('Content-Type', sets.ContentType);
			xhr.send(pd);
		}else{
			xhr.send();
		}
	};
	_hui.get = function(url, success, err){
		var sets = {url:url, type:'GET', backType:'HTML', success:success, error:err};
		this.ajax(sets);
	};
	_hui.getJSON = function(url, success, err){
		var sets = {url:url, type:'GET', backType:'JSON', success:success, error:err};
		this.ajax(sets);
	};
	_hui.post = function(url, pd ,success, err){
		var sets = {url:url, type:'POST',backType:'HTML', data:pd, success:success, error:err};
		this.ajax(sets);
	};
	_hui.postJSON = function(url, pd ,success, err){
		var sets = {url:url, type:'POST',backType:'JSON', data:pd, success:success, error:err};
		this.ajax(sets);
	};
	
	/* 通用操作 */
	_hui.version = 'hui 3.0';
	_hui.createDom = function(domTag, attrs){
		if(!attrs){return document.createElement(domTag);}
		var dom = document.createElement(domTag);
		for(var k in attrs){
			dom.setAttribute(k, attrs[k]);
		}
		return dom;
	};
	_hui.cAnda = function(domTag, attrs){
		var dom = this.createDom(domTag, attrs);
		document.body.appendChild(dom);
	};
	/* hui toast */
	_hui.toast = function(msg, timer){
		if(timer == undefined){timer = 'short';}
		if(typeof(plus) != 'undefined'){plus.nativeUI.toast(msg, {duration:timer}); return;}
		var toast = hui('#hui-toast');
		if(toast.length > 0){toast.remove();}
		var div = document.createElement('div');
		div.setAttribute('id','hui-toast');
		div.setAttribute('class', 'hui-fade-in');
		document.body.appendChild(div);
		toast = hui('#hui-toast');
		toast.html('<div id="hui-toast-msg">'+msg+'</div>');
		if(_hui.ToastTimer){clearTimeout(_hui.ToastTimer);}
		if(timer == 'short'){timer = 2000;}else{timer = 3500;}
		_hui.ToastTimer = setTimeout(function(){toast.remove();}, timer);
	};
	/* icon Toast */
	_hui.iconToast = function(msg, icon){
		if(icon == undefined){icon = 'success';}
		var iconToast = hui('#hui-icon-toast');
		if(iconToast.length < 1){
			var div = document.createElement('div');
			div.setAttribute('id','hui-icon-toast');
			div.innerHTML = '<div class="hui-icons"></div><div class="hui-text-center"></div>';
			document.body.appendChild(div);
			iconToast = hui('#hui-icon-toast');
		}else{return false;}
		iconToast.find('div').eq(0).addClass('hui-icons-'+icon);
		iconToast.find('div').eq(1).html(msg);
		setTimeout(function(){iconToast.remove();}, 2000);
	};
	_hui.ToastTimer = null;
	_hui.upToast = function(msg){
		var toast = hui('#hui-up-toast');
		if(toast.length > 0){toast.remove();}
		var div = document.createElement('div');
		div.setAttribute('id','hui-up-toast');
		document.body.appendChild(div);
		toast = hui('#hui-up-toast');
		toast.html(msg);
		if(_hui.ToastTimer){clearTimeout(_hui.ToastTimer);}
		_hui.ToastTimer = setTimeout(function(){toast.remove();}, 2500);
	};
	/* dialog */
	_hui.maskShow = function(){
		_hui.mask = document.getElementById('hui-mask');
		if(!_hui.mask){
			_hui.mask = document.createElement('div');
			_hui.mask.setAttribute('id', 'hui-mask');
			document.body.appendChild(_hui.mask);
		}
	};
	_hui.maskHide = function(){if(_hui.mask){document.body.removeChild(_hui.mask);}}
	_hui.maskTap  = function(callBack){_hui.mask.addEventListener('click', callBack);}
	_hui.dialogBase  = function(){
		hui.dialogDom = document.getElementById('hui-dialog');
		if(hui.dialogDom){document.body.removeChild(hui.dialogDom);}
		hui.dialogDom = document.createElement('div');
		hui.dialogDom.setAttribute('id', 'hui-dialog');
		hui.dialogDom.setAttribute('class', 'hui-fade-in');
		document.body.appendChild(hui.dialogDom);
		hui.maskShow();
	}
	_hui.dialogClose = function(){document.body.removeChild(hui.dialogDom); hui.maskHide();};
	_hui.dialogCallBack = null;
	_hui.alert = function(msg, btnName, callBack){
		hui.dialogCallBack = callBack;
		if(!btnName){btnName = '确定';}
		hui.dialogBase();
		hui.dialogDom.innerHTML = '<div id="hui-dialog-in"><div id="hui-dialog-msg">'+msg+'</div><div id="hui-dialog-btn-line">'+btnName+'</div></div>';
		var btn = document.getElementById('hui-dialog-btn-line');
		btn.onclick = function(){hui.dialogClose(); if(hui.dialogCallBack){hui.dialogCallBack();}}
	};
	_hui.confirm = function(msg, btnName, callBack, callBack2){
		if(!btnName){btnName = ['取消','确定'];}
		hui.dialogBase();
		hui.dialogDom.innerHTML = '<div id="hui-dialog-in"><div id="hui-dialog-msg">'+msg+'</div><div id="hui-dialog-btn-line"><div>'+btnName[0]+'</div><div>'+btnName[1]+'</div></div></div>';
		var btns = document.getElementById('hui-dialog-btn-line').getElementsByTagName('div');
		btns[0].onclick = function(){hui.dialogClose(); if(callBack2){callBack2();}};
		btns[1].onclick = function(){hui.dialogClose(); if(callBack){callBack();}};
	};
	_hui.prompt = function(msg, btnName, callBack, placeholder, val, callBack2){
		if(!btnName){btnName = ['取消','确定'];}
		if(!placeholder){placeholder = '';}
		if(!val){val = '';}
		hui.dialogBase();
		hui.dialogDom.innerHTML = '<div id="hui-dialog-in"><div id="hui-dialog-msg" style="padding-bottom:12px;">'+msg+'</div><div id="hui-dialog-input-in"><input type="text" id="hui-dialog-input" placeholder="'+placeholder+'" value="'+val+'" /></div><div style="height:15px;"></div><div id="hui-dialog-btn-line"><div>'+btnName[0]+'</div><div>'+btnName[1]+'</div></div></div>';
		var btns = document.getElementById('hui-dialog-btn-line').getElementsByTagName('div');
		btns[0].onclick = function(){
			if(callBack2){callBack2();}
			hui.dialogClose();
		};
		btns[1].onclick = function(){
			if(callBack){callBack(document.getElementById("hui-dialog-input").value);}
			hui.dialogClose();
		};
	};
	/* loading */
	_hui.loading = function(msg, isClose){
		if(msg){var loadingText = '<div id="hui-loading-text">'+msg+'</div>';}else{var loadingText = '';}
		var HUI_LoadingMask = document.getElementById('hui-transparent-mask');
		if(isClose){if(HUI_LoadingMask){HUI_LoadingMask.parentNode.removeChild(HUI_LoadingMask);} return false;}
		if(!HUI_LoadingMask){
			var HUI_LoadingMask = document.createElement('div');
			HUI_LoadingMask.setAttribute('id', 'hui-transparent-mask');
			HUI_LoadingMask.innerHTML = '<div id="hui-loading"><div id="hui-loading-in"><div></div><div></div><div></div><div></div><div></div></div>'+loadingText+'</div>';
			document.body.appendChild(HUI_LoadingMask);
		}
	};
	_hui.closeLoading = function(){
		var HUI_LoadingMask = document.getElementById('hui-transparent-mask');
		if(HUI_LoadingMask){HUI_LoadingMask.parentNode.removeChild(HUI_LoadingMask);}
	};
	_hui.h5Loading = function(isClose, title, options){
		if(isClose){plus.nativeUI.closeWaiting(); return ;}
		if(!title){title = ''}; if(!options){options = {};}
		plus.nativeUI.showWaiting(title, options);
	}
	/* action sheet */
	_hui.actionSheet = function(menus, cancel, callBack){
		hui.maskShow();
		var huiActionSheet = document.getElementById('hui-action-sheet');
		if(!huiActionSheet){
			var huiActionSheet = document.createElement('div');
			huiActionSheet.setAttribute('id', 'hui-action-sheet');
			document.body.appendChild(huiActionSheet);
			huiActionSheet = document.getElementById('hui-action-sheet');
		}
		var actionSheets = '<ul>';
		for(var i = 0; i < menus.length; i++){actionSheets += '<li huiASId="'+i+'">'+meuns[i]+'</li>';}
		huiActionSheet.innerHTML = actionSheets + '<li id="hui-action-sheet-cancel" huiASId="-1">'+cancel+'</li></ul>';
		hui.mask.removeEventListener('click', hui.actionSheetClose);
		hui.mask.addEventListener('click',hui.actionSheetClose);
		hui(huiActionSheet).find('li').click(function(){
			this.index = this.getAttribute('huiASId'); callBack(this); hui.actionSheetClose();
		});
	};
	_hui.actionSheetClose = function(){
		hui.maskHide();
		var huiActionSheet = document.getElementById('hui-action-sheet');
		if(huiActionSheet){document.body.removeChild(huiActionSheet);}
	}
	/* number box */
	_hui.numberBox = function(){
		var numberBoxes =  document.getElementsByClassName('hui-number-box');
		if(!numberBoxes){return;}
		for(var i = 0; i < numberBoxes.length; i++){
			var numberBox = numberBoxes[i], numberBoxL = numberBox.getElementsByClassName('reduce')[0];
			var numberBoxR = numberBox.getElementsByClassName('add')[0];
			numberBoxL.onclick = function(){
				var min = Number(this.parentNode.getAttribute('min'));
				var max = Number(this.parentNode.getAttribute('max'));
				var numberIn  = this.parentNode.getElementsByTagName('input')[0];
				var cNum = Number(numberIn.value);
				if(!cNum || cNum == NaN){cNum = min;} cNum -= 1;
				if(cNum < min){cNum = min;} numberIn.value = cNum;
				hui(numberIn).trigger('change');
			}
			numberBoxR.onclick = function(){
				var min = Number(this.parentNode.getAttribute('min'));
				var max = Number(this.parentNode.getAttribute('max'));
				var numberIn  = this.parentNode.getElementsByTagName('input')[0];
				var cNum = Number(numberIn.value);
				if(!cNum || cNum == NaN){cNum = min;}
				var cNum = Number(numberIn.value);
				if(!cNum || cNum == NaN){cNum = min;} cNum += 1;
				if(cNum > max){cNum = max;} numberIn.value = cNum;
				hui(numberIn).trigger('change');
			}
		}
	};
	/* lazy load */
	_hui.lazyLoad = function(className){
		_hui.timerForLazy = null;
		window.addEventListener('scroll', function(){
			clearTimeout(_hui.timerForLazy);
			_hui.timerForLazy = setTimeout(function(){_hui.lazyLoadNow(className)}, 200);
		});
		_hui.lazyLoadNow();
	};
	_hui.lazyLoadNow = function(className){
		if(!className){className = 'hui-lazy';}
		var winInfo = hui.winInfo(), imgs = new Array(), lazyObj = hui('.'+className);
		for(var i = 0; i < lazyObj.length; i++){
			var dom = lazyObj.dom[i], realSrc = dom.getAttribute('lazySrc');
			var setsY = hui.offset(dom);
			if(setsY.top >=  winInfo.height + winInfo.scrollTop){break;}
			dom.src = realSrc;
			hui(dom).removeClass(className);
		}
	};
	_hui.winInfo = function(){
		var winInfo = {height:0, width:0, scrollTop:0};
		if(window.innerHeight){
			winInfo.height = window.innerHeight;
		}else if((document.body)&&(document.body.clientHeight)){
			winInfo.height = document.body.clientHeight;
		}
		if(window.innerWidth){
			winInfo.width = window.innerWidth;
		}else if((document.body)&&(document.body.clientWidth)){
			winInfo.width = document.body.clientWidth;
		}
		if(document.documentElement && document.documentElement.scrollTop){
			winInfo.scrollTop = document.documentElement.scrollTop;
		}else if(document.body){
			winInfo.scrollTop = document.body.scrollTop;
		}
		return winInfo;
	};
	_hui.onScroll = function(callBack){
		window.addEventListener('scroll', function(e){
			var e = e || window.event;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			callBack(scrollTop);
		});
	};
	/* date picker */
	_hui.datePicker = function(){
		hui('.hui-date-picker').each(function(dom){
			var val = dom.getAttribute('value');
			if(val){hui(dom).addClass('hui-picker-valued');}
			dom.addEventListener('input', function(){hui(dom).addClass('hui-picker-valued');});
		});
	};
	/* slide menu */
	_hui.slideMenu = function(overheader){
	    hui(document.body).swipeLeft(function (e) { hui.showSlideMenu(); });
	    overHeader = overheader;
	};
	_hui.showSlideMenu = function () {
		hui.maskShow();
		var menu = hui('.hui-slide-menu').eq(0);
		if (!overHeader) {
		    var header = hui('.hui-header');
		    if (header.length > 0) {
		        var sets = header.offset();
		        menu.css({ top: (sets.top + 44 + hui.immersedStatusbarHeight) + 'px' });
		    }
		}
	    menu.removeClass('hui-slide-menu-hide');
	    menu.addClass('hui-slide-menu-show');
	    hui.maskTap(function(){_hui.closeSlideMenu();});
	};
	_hui.closeSlideMenu = function(){
	    var menu = hui('.hui-slide-menu').eq(0);
	    menu.removeClass('hui-slide-menu-show');
		menu.addClass('hui-slide-menu-hide');
		hui.maskHide();
	};
	/* swipe do */
	_hui.swipeDo = function(){
		hui('.hui-swipe-do').each(function(sobj){
			var sdObj    = hui(sobj);
			var sdwidth  = sdObj.width() + 1;
			sdObj.find('.hui-swipe-do-content').css({'width':sdwidth+'px'});
			var sdactions = sdObj.find('.hui-swipe-do-btn');
			var sdactionsWidth = 0;
			for(var i = 0; i < sdactions.length; i++){
				sdactionsWidth += sdactions.eq(i).width();
			}
			sdObj.find('.hui-swipe-do-doms').css({width: (sdactionsWidth + sdwidth) + 'px'});
			var sdHeight = sdObj.height();
			sdactions.css({height:sdHeight+'px', lineHeight:sdHeight+'px'});
		})
	};
	/* black mask */
	_hui.blackMask = function(){
		_hui.blackMasker = hui('#hui-black-mask');
		if(_hui.blackMasker.length < 1){hui.toast('请在HTML中创建#hui-black-mask'); return false;}
		_hui.blackMaskerAction = hui('#hui-black-action');
		_hui.blackMaskerAction.css({top:hui.immersedStatusbarHeight});
		hui('#hui-black-close').click(_hui.closeBlackMask);
	};
	_hui.shwoBlackMasker = function(){
		_hui.blackMasker.show(true);
		_hui.blackMaskerAction.show(true);
	};
	_hui.closeBlackMask = function(){
		_hui.blackMasker.hide(true);
		_hui.blackMaskerAction.hide(true);
	};
	/* tags */
	_hui.tags = function(selecter, func){
		var tagsMain = hui(selecter);
		var tags     = tagsMain.find('div');
		tags.click(function(){
			var cTags = hui(this);
			if(cTags.hasClass('hui-tags-active')){
				cTags.removeClass('hui-tags-active');
			}else{
				cTags.addClass('hui-tags-active');
			}
			if(func){func();}
		});
	}
	_hui.getTagsData = function(selecter){
		var tagsMain = hui(selecter);
		var tags     = tagsMain.find('.hui-tags-active');
		if(tags.length < 1){return false;}
		var resText = [], resVal = [];
		for(var i = 0; i < tags.length; i++){
			resText.push(tags.dom[i].innerText);
			resVal.push(tags.dom[i].getAttribute('tagVal'));
		}
		return {tagsText:resText, tagsVal:resVal};
	}
	/* count down */
	_hui.countdown = function(timer, domId, showType){
		if(!showType){showType = 1;}
		hui.countdownBase(timer, domId, showType);
		setInterval(function(){hui.countdownBase(timer, domId, showType);}, 1000);
	}
	_hui.countdownBase = function(timer, domId, showType){
		var reg    = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res    = timer.match(reg);
			if(res == null){console.log('时间格式错误'); return false;}
			var year  = parseInt(res[1]);
			if(year < 1000){console.log('时间格式错误'); return false;}
			var month = parseInt(res[2]);
			var day   = parseInt(res[3]);
			var h     = parseInt(res[4]);
			if(h < 0 || h > 24){console.log('时间格式错误'); return false;}
			var i     = parseInt(res[5]);
			if(i < 0 || i > 60){console.log('时间格式错误'); return false;}
			var s     = parseInt(res[6]);
			if(s < 0 || s > 60){console.log('时间格式错误'); return false;}
			var leftTime = (new Date(year, month - 1, day, h, i, s)) - new Date();
			if(leftTime > 0){
				var days     = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10);
				var hours    = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10);
				var minutes  = parseInt(leftTime / 1000 / 60 % 60, 10);
				var seconds  = parseInt(leftTime / 1000 % 60, 10);
			}else{var days = 0, hours    = 0, minutes  = 0, seconds  = 0;}
			var html     = '';
			var daysStr  = days.toString(), daysHtml = '';
			if(daysStr.length < 2){
				daysHtml += '<span>0</span><span>'+daysStr+'</span>';
			}else{
				for(var i = 0; i < daysStr.length; i++){daysHtml += '<span>'+daysStr[i]+'</span>';}
			}
			var hoursStr  = hours.toString(), hoursHtml = '';
			if(hoursStr.length < 2){
				hoursHtml += '<span>0</span><span>'+hoursStr+'</span>';
			}else{
				for(var i = 0; i < hoursStr.length; i++){hoursHtml += '<span>'+hoursStr[i]+'</span>';}
			}
			var minutesStr  = minutes.toString(), minutesHtml = '';
			if(minutesStr.length < 2){
				minutesHtml += '<span>0</span><span>'+minutesStr+'</span>';
			}else{
				for(var i = 0; i < minutesStr.length; i++){minutesHtml += '<span>'+minutesStr[i]+'</span>';}
			}
			var secondsStr  = seconds.toString(), secondsHtml = '';
			if(secondsStr.length < 2){
				secondsHtml += '<span>0</span><span>'+secondsStr+'</span>';
			}else{
				for(var i = 0; i < secondsStr.length; i++){secondsHtml += '<span>'+secondsStr[i]+'</span>';}
			}
			switch(showType){
				case 1 :
				html += daysHtml+'天'+hoursHtml+'时'+minutesHtml+'分'+secondsHtml+'秒';
				break;
				case 2 :
				html += hoursHtml+'时'+minutesHtml+'分'+secondsHtml+'秒';
				break;
				case 3 :
				html += hoursHtml+':'+minutesHtml+':'+secondsHtml;
				break;
				case 4 :
				html += minutesHtml+':'+secondsHtml;
				break;
				default:
				html += daysHtml+'天'+hoursHtml+'时'+minutesHtml+'分'+secondsHtml+'秒';
			}
			var domShow = hui(domId);
			domShow.addClass('hui-countdown');
			hui(domId).html(html);
	}
	/* scroll news */
	_hui.scrollNews = function(domId, speed){
		if(!speed){speed = 3000;}
		var dom = hui(domId);
		if(dom.length < 1){return false;}
		setInterval(function(){
			var firstNews = dom.find('.hui-scroll-news-items').eq(0);
			firstNews.addClass('hui-scroll-news-h0');
			setTimeout(function(){firstNews.removeClass('hui-scroll-news-h0'); firstNews.appendTo(dom);}, 800);
		}, speed);
	}
	_hui.resize  = function(callBack){huiResizeNeedDo.push(callBack);};
	/* ready */
	_hui.readyRe = /complete|loaded|interactive/;
	_hui.ready = function(callBack){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded', function(){
				var backBtn = document.getElementById('hui-back');
				if(backBtn){backBtn.onclick = _hui.Back;} if(callBack){callBack();}
			});
		}else if(document.attachEvent){
			document.attachEvent("onreadystatechange", function(){
				if(_hui.readyRe.test(document.readyState)){
					var backBtn = document.getElementById('hui-back');
					if(backBtn){backBtn.onclick = _hui.Back;} if(callBack){callBack();}
				}
			});
		}
	};
	_hui.backNumber = 0;
	_hui.Back = function(){
		if(!window.plus){history.back(); return ;}
		if(hui.BackDo){var res = hui.BackDo(); if(!res){return;}}
		var selfW = plus.webview.currentWebview();
		if(selfW.id == plus.runtime.appid || selfW.id == 'HBuilder'){
    		if(_hui.backNumber < 1){
    			hui.toast(_lang.quit);
    			_hui.backNumber++;
    			setTimeout(function(){_hui.backNumber = 0;}, 2000);
    		}else{
    			plus.webview.close(selfW, 'slide-out-right');
    		}
		}else{
			if(selfW.HuiIsClose){
				if(selfW.HuiIsClose == 'no'){return;}
				plus.webview.close(selfW, 'slide-out-right');
			}else{
				plus.webview.hide(selfW, 'slide-out-right');
			}
		}
	};
	_hui.back = _hui.Back;
	_hui.extend  = function(funName, fun){hcExtends[funName] = fun;}
	/* h5 plus 常用接口 */
	_hui.plusReady = function(callBack){
		document.addEventListener('plusready', function(){if(callBack){callBack();}});
	};
	_hui.open = function(winName, styles, isClose, extras){
		if(!window.plus){location.href = winName; return ;}
		if(!styles){styles= {};}
		var w = this.create(winName, styles, isClose, extras); plus.webview.show(w, 'slide-in-right'); return w;
	};
	_hui.create = function(winName, styles, isClose, extras){
		if(!isClose){isClose = false;} if(typeof(styles) == "undefined"){styles = {popGesture:"none"};}
		if(!styles.popGesture){styles.popGesture = 'none';} if(typeof(extras) == "undefined"){extras = {};}
		if(!styles.zindex){styles.zindex = 10;} extras.HuiIsClose = isClose;
		var w = plus.webview.getWebviewById(winName); if(w){return w;}
		w = plus.webview.create(winName, winName, styles, extras); return w;
	};
	_hui.subpages = function(subpages){
		//检查沉浸式
		var isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
		var StatusbarHeight = isImmersedStatusbar ? plus.navigator.getStatusbarHeight() : 0;
		var currentView = plus.webview.currentWebview();
		for(var i = 0; i < subpages.length; i++){
			var top = subpages[i][1].top;
			top =  parseInt(top);
			top += StatusbarHeight;
			subpages[i][1].top = top + 'px';
			var subView = this.create(subpages[i][0], subpages[i][1]);
			currentView.append(subView);
		}
	};
	_hui.drag    = function(prevView, nextView, callBack){
		var currentView = plus.webview.currentWebview();
		if(nextView){
			var _next = hui.getView(nextView.pageId);
			currentView.drag(
				{direction : "left", moveMode: "followFinger"},
                {view  :　_next, moveMode : "follow"},
                function(e){if(e.type == 'end' && e.result){if(nextView.callBack){nextView.callBack();}}}
			);
		}
		if(prevView){
			var _prev = hui.getView(prevView.pageId);
			currentView.drag(
				{direction : "right", moveMode: "followFinger"},
                {view  :　_prev, moveMode : "follow"},
                function(e){if(e.type == 'end' && e.result){if(prevView.callBack){prevView.callBack();}}}
			);
		}
	};
	_hui.close = function(vId){var w = plus.webview.getWebviewById(vId); if(w){w.close();}};
	_hui.allViews = function(){return plus.webview.all();};
	_hui.getView = function(vId){return plus.webview.getWebviewById(vId);};
	_hui.getViewById = function(vId){return plus.webview.getWebviewById(vId);};
	_hui.getCView = function(){return plus.webview.currentWebview();};
	_hui.closeView = function(view){if(!view){view = plus.webview.currentWebview();} plus.webview.close(view, 'slide-out-right', 300);};
	_hui.delay = function(func, timer){
		if(!timer){timer = 1000;}
		return setTimeout(func, timer); 
	}
	_hui.immersedStatusbarHeight = 0;
	_hui.ready(function(){document.body.addEventListener('touchstart', function (){});});
	return _hui;
})(document);
window.addEventListener('resize', function(){
	clearTimeout(huiReSizeTimer);
	if(huiResizeNeedDo.length < 1){return false;}
	huiReSizeTimer = setTimeout(function(){for(var i = 0; i < huiResizeNeedDo.length; i++){var fun = huiResizeNeedDo[i]; fun();}}, 100);
});
document.addEventListener('plusready', function(){
	//监听安卓返回键
	plus.key.addEventListener("backbutton", hui.Back);
	//处理沉浸式
	var isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
	if(isImmersedStatusbar){
		var huiHeader = hui('.hui-header');
		if(huiHeader.length > 0){
		    var StatusbarHeight = plus.navigator.getStatusbarHeight();
			hui.immersedStatusbarHeight = StatusbarHeight;
			hui('.hui-header').eq(0).css({'paddingTop':StatusbarHeight + 'px'});
			hui('#hui-back').css({top:StatusbarHeight+'px'});
			hui('#hui-header-menu').css({top:StatusbarHeight+'px'});
			hui('.hui-wrap').eq(0).css({'paddingTop':(StatusbarHeight+44)+'px'});
		}
	}
});
Array.prototype.shuffle = function(){this.sort(function(){return Math.random() - 0.5;});};
(function(){
	if(typeof(window.CustomEvent) === 'undefined'){
		function CustomEvent(event, params){params = params || {bubbles: false, cancelable:false, detail:undefined};
		var evt = document.createEvent('Events');
		var bubbles = true;
		for (var name in params){(name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name]);}
		evt.initEvent(event, bubbles, true); return evt;};
		CustomEvent.prototype = window.Event.prototype; 
		window.CustomEvent = CustomEvent;
	}
})();
hui.accordion = function (closeAll, firstShow) {
    if (typeof (closeAll) == 'undefined') { closeAll = false; }
    if (typeof (firstShow) == 'undefined') { firstShow = false; }
    hui('.hui-accordion').each(function (cDom) {
        var accordionTitle = hui(cDom).find('.hui-accordion-title');
        accordionTitle.click(function () {
            var accordionContent = hui(this).parent().find('.hui-accordion-content');
            var accordionTitleHtml = accordionTitle.html();
            if (accordionContent.isShow()) {
                accordionContent.hide();
                accordionTitle.removeClass('hui-accordion-title-up');
            } else {
                if (closeAll) { hui('.hui-accordion-content').hide(); hui('.hui-accordion-title').removeClass('hui-accordion-title-up'); }
                accordionContent.show();
                accordionTitle.addClass('hui-accordion-title-up');
            }
            hui.scrollTop(0);
        });
    });
    if (firstShow) { hui('.hui-accordion').eq(0).find('.hui-accordion-title').click(); }
};
hui.formInit = function () { hui.formTextClear(); hui.formPwdEye(); };
hui.formTextClear = function () {
    var textClears = document.getElementsByClassName('hui-input-clear');
    if (textClears.length < 1) { return; }
    for (var i = 0; i < textClears.length; i++) {
        textClears[i].onkeyup = function () {
            var HuiInputsClear = document.getElementById('hui-input-clear');
            if (!HuiInputsClear) {
                HuiInputsClearDiv = document.createElement("div");
                HuiInputsClearDiv.setAttribute("id", 'hui-input-clear')
                document.body.appendChild(HuiInputsClearDiv);
            }
            HuiInputsClear = document.getElementById('hui-input-clear');
            this.parentNode.appendChild(HuiInputsClear);
            var thisObj = this; HuiInputsClear.style.display = 'block';
            HuiInputsClear.onclick = function () { thisObj.value = ''; this.style.display = 'none'; }
        }
    }
};
hui.formPwdEye = function () {
    var eyes = document.getElementsByClassName('hui-pwd-eye');
    if (eyes.length < 1) { return; }
    for (var i = 0; i < eyes.length; i++) {
        var eye = document.createElement('div');
        eye.setAttribute('class', 'hui-pwd-eyes');
        eye.setAttribute('onclick', 'hui.eyesChange(this);');
        document.body.appendChild(eye);
        hui(eye).appendTo(hui(eyes[i]).parent());
    }
};
hui.eyesChange = function (o) {
    var _selfDom = hui(o), _inputDom = _selfDom.parent().find('.hui-input').eq(0);
    if (_selfDom.hasClass('hui-pwd-eyes-sed')) {
        _selfDom.removeClass('hui-pwd-eyes-sed');
        _inputDom.dom[0].type = 'password';
    } else {
        _selfDom.addClass('hui-pwd-eyes-sed');
        _inputDom.dom[0].setAttribute('type', 'text');
    }
};
function huiFormCheck(selector) {
    var formIn = hui(selector);
    if (formIn.length != 1) { return true; }
    var inputs = formIn.find('input'), selects = formIn.find('select'), textareas = formIn.find('textarea'); res = true;
    for (var i = 0; i < inputs.dom.length; i++) { res = huiFormCheckBase(inputs.dom[i]); if (!res) { break; } }
    if (res) { for (var i = 0; i < selects.dom.length; i++) { res = huiFormCheckBase(selects.dom[i]); if (!res) { break; } } }
    if (res) { for (var i = 0; i < textareas.dom.length; i++) { res = huiFormCheckBase(textareas.dom[i]); if (!res) { break; } } }
    if (typeof (huiFormCheckAttach) != 'undefined' && res) { if (!huiFormCheckAttach()) { return false; } }
    return res;
}
function huiFormCheckBase(obj) {
    var checkType = obj.getAttribute('checkType');
    if (!checkType) { return true; }
    var checkData = obj.getAttribute('checkData');
    var checkMsg = obj.getAttribute('checkMsg');
    if (!checkMsg) { return true; }
    var checkVal = obj.value;
    switch (checkType) {
        case 'string':
            checkVal = checkVal.trim();
            var reg = new RegExp('^.{' + checkData + '}$');
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'int':
            var reg = new RegExp('^\-?[0-9]{' + checkData + '}$');
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            var reg2 = new RegExp('^\-?0+[0-9]+$');
            if (reg2.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'between':
            if (!huiFormCheckNumber(checkVal, checkData, checkMsg)) { return false; }
            break;
        case 'betweenD':
            var reg = new RegExp('^\-?[0-9]+$');
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            if (!huiFormCheckNumber(checkVal, checkData, checkMsg)) { return false; }
            break;
        case 'betweenF':
            var reg = new RegExp('^\-?[0-9]+\.[0-9]+$');
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            if (!huiFormCheckNumber(checkVal, checkData, checkMsg)) { return false; }
            break;
        case 'same':
            if (checkVal != checkData) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'sameWithId':
            if (checkVal != hui('#' + checkData).val()) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'notSame':
            if (checkVal == checkData) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'notSameWithId':
            if (checkVal == hui(checkData).val()) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'email':
            var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'phone':
            var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'url':
            var reg = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'zipcode':
            var reg = /^[0-9]{6}$/;
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'reg':
            var reg = new RegExp(checkData);
            if (!reg.test(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
        case 'fun':
            eval('var res = ' + checkData + '("' + checkVal + '");');
            if (!res) { return huiFormCheckShowErrMsg(checkMsg); }
            break;
    }
    return true;
}
function huiFormCheckNumber(checkVal, checkData, checkMsg) {
    checkVal = Number(checkVal); if (isNaN(checkVal)) { return huiFormCheckShowErrMsg(checkMsg); }
    checkDataArray = checkData.split(',');
    if (checkDataArray[0] == '') {
        if (checkVal > Number(checkDataArray[1])) { return huiFormCheckShowErrMsg(checkMsg); }
    } else if (checkDataArray[1] == '') {
        if (checkVal < Number(checkDataArray[0])) { return huiFormCheckShowErrMsg(checkMsg); }
    } else {
        if (checkVal < Number(checkDataArray[0]) || checkVal > Number(checkDataArray[1])) { return huiFormCheckShowErrMsg(checkMsg); }
    }
    return true;
}
function huiFormCheckShowErrMsg(checkMsg) { hui.toast(checkMsg); return false; }
hui.getFormData = function (formId, reType) {
    hui.formTpmValForChecked = {};
    if (formId.substr(0, 1) == '#') { formId = formId.substr(1, formId.length - 1); }
    if (reType == undefined) { reType = 'obj'; }
    var elements = hui.formGetElements(formId);
    var queryComponents = new Array();
    var returnObj = {};
    for (var i = 0; i < elements.length; i++) {
        var queryComponent = hui.serializeElement(elements[i]);
        if (queryComponent) { queryComponents.push(queryComponent); }
    }
    var restr = queryComponents.join('&');
    if (reType != 'obj') { return restr; }
    var arrExplode = restr.split('&');
    for (var i = 0; i < arrExplode.length; i++) {
        var cArr = arrExplode[i].split('=');
        eval('returnObj.' + cArr[0] + ' = decodeURIComponent(cArr[1]);');
    }
    return returnObj;
}
hui.serializeElement = function (elementObj) {
    var method = elementObj.tagName.toLowerCase();
    var parameter = hui.getInputs(elementObj, method);
    if (parameter) {
        if (parameter[0].substr(-2) == '[]') {
            var subName = parameter[0].substr(0, parameter[0].length - 2);
            if (hui.formTpmValForChecked.subName != undefined) {
                hui.formTpmValForChecked.subName += ',' + parameter[1];
            } else {
                hui.formTpmValForChecked.subName = parameter[1];
            }
            var key = subName;
            return key + '=' + encodeURIComponent(hui.formTpmValForChecked.subName);
        }
        var key = encodeURIComponent(parameter[0]);
        return key + '=' + encodeURIComponent(parameter[1]);
    } else {
        return false;
    }
}

hui.getInputs = function (elementObj, method) {
    if (elementObj.name == '') { return false; }
    if (method == 'textarea' || method == 'select') { return [elementObj.name, elementObj.value]; }
    switch (elementObj.type.toLowerCase()) {
        case 'submit':
        case 'hidden':
        case 'password':
        case 'text':
        case 'number':
        case 'email':
        case 'tel':
        case 'url':
            return [elementObj.name, elementObj.value];
        case 'checkbox':
        case 'radio':
            return hui.inputSelector(elementObj);
    }
    return false;
}

hui.inputSelector = function (elementObj) {
    if (elementObj.checked) { return [elementObj.name, elementObj.value]; }
    return false;
}

hui.formGetElements = function (formId) {
    var form = document.getElementById(formId);
    var elements = new Array();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++) { elements.push(tagElements[j]); }
    tagElements = form.getElementsByTagName('textarea');
    for (var j = 0; j < tagElements.length; j++) { elements.push(tagElements[j]); }
    tagElements = form.getElementsByTagName('select');
    for (var j = 0; j < tagElements.length; j++) { elements.push(tagElements[j]); }
    return elements;
}
!function (t, i) { "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.Cropper = i() }(this, function () { "use strict"; var t = "undefined" != typeof window ? window : {}, i = "cropper", e = i + "-crop", a = i + "-disabled", n = i + "-hidden", o = i + "-hide", h = i + "-modal", r = i + "-move", s = "action", c = "preview", l = "crop", d = "cropend", p = "cropmove", m = "cropstart", u = "load", g = t.PointerEvent ? "pointerdown" : "touchstart mousedown", f = t.PointerEvent ? "pointermove" : "touchmove mousemove", v = t.PointerEvent ? "pointerup pointercancel" : "touchend touchcancel mouseup", w = "wheel mousewheel DOMMouseScroll", x = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/, b = /^data:/, y = /^data:image\/jpeg;base64,/, C = /^(img|canvas)$/i, M = { viewMode: 0, dragMode: "crop", aspectRatio: NaN, data: null, preview: "", responsive: !0, restore: !0, checkCrossOrigin: !0, checkOrientation: !0, modal: !0, guides: !0, center: !0, highlight: !0, background: !0, autoCrop: !0, autoCropArea: .8, movable: !0, rotatable: !0, scalable: !0, zoomable: !0, zoomOnTouch: !0, zoomOnWheel: !0, wheelZoomRatio: .1, cropBoxMovable: !0, cropBoxResizable: !0, toggleDragModeOnDblclick: !0, minCanvasWidth: 0, minCanvasHeight: 0, minCropBoxWidth: 0, minCropBoxHeight: 0, minContainerWidth: 200, minContainerHeight: 100, ready: null, cropstart: null, cropmove: null, cropend: null, crop: null, zoom: null }, D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, B = function (t, i) { if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function") }, k = function () { function t(t, i) { for (var e = 0; e < i.length; e++) { var a = i[e]; a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a) } } return function (i, e, a) { return e && t(i.prototype, e), a && t(i, a), i } }(), E = function (t) { if (Array.isArray(t)) { for (var i = 0, e = Array(t.length); i < t.length; i++)e[i] = t[i]; return e } return Array.from(t) }, T = Number.isNaN || t.isNaN; function W(t) { return "number" == typeof t && !T(t) } function N(t) { return void 0 === t } function H(t) { return "object" === (void 0 === t ? "undefined" : D(t)) && null !== t } var L = Object.prototype.hasOwnProperty; function Y(t) { if (!H(t)) return !1; try { var i = t.constructor, e = i.prototype; return i && e && L.call(e, "isPrototypeOf") } catch (t) { return !1 } } function X(t) { return "function" == typeof t } function O(t, i) { if (t && X(i)) if (Array.isArray(t) || W(t.length)) { var e = t.length, a = void 0; for (a = 0; a < e && !1 !== i.call(t, t[a], a, t); a += 1); } else H(t) && Object.keys(t).forEach(function (e) { i.call(t, t[e], e, t) }); return t } function S(t) { for (var i = arguments.length, e = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++)e[a - 1] = arguments[a]; if (H(t) && e.length > 0) { if (Object.assign) return Object.assign.apply(Object, [t].concat(e)); e.forEach(function (i) { H(i) && Object.keys(i).forEach(function (e) { t[e] = i[e] }) }) } return t } function z(t, i) { for (var e = arguments.length, a = Array(e > 2 ? e - 2 : 0), n = 2; n < e; n++)a[n - 2] = arguments[n]; return function () { for (var e = arguments.length, n = Array(e), o = 0; o < e; o++)n[o] = arguments[o]; return t.apply(i, a.concat(n)) } } var R = /\.\d*(?:0|9){12}\d*$/i; function A(t) { var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e11; return R.test(t) ? Math.round(t * i) / i : t } var I = /^(width|height|left|top|marginLeft|marginTop)$/; function U(t, i) { var e = t.style; O(i, function (t, i) { I.test(i) && W(t) && (t += "px"), e[i] = t }) } function j(t, i) { if (i) if (W(t.length)) O(t, function (t) { j(t, i) }); else if (t.classList) t.classList.add(i); else { var e = t.className.trim(); e ? e.indexOf(i) < 0 && (t.className = e + " " + i) : t.className = i } } function P(t, i) { i && (W(t.length) ? O(t, function (t) { P(t, i) }) : t.classList ? t.classList.remove(i) : t.className.indexOf(i) >= 0 && (t.className = t.className.replace(i, ""))) } function q(t, i, e) { i && (W(t.length) ? O(t, function (t) { q(t, i, e) }) : e ? j(t, i) : P(t, i)) } var $ = /([a-z\d])([A-Z])/g; function Q(t) { return t.replace($, "$1-$2").toLowerCase() } function Z(t, i) { return H(t[i]) ? t[i] : t.dataset ? t.dataset[i] : t.getAttribute("data-" + Q(i)) } function F(t, i, e) { H(e) ? t[i] = e : t.dataset ? t.dataset[i] = e : t.setAttribute("data-" + Q(i), e) } function K(t, i) { if (H(t[i])) try { delete t[i] } catch (e) { t[i] = null } else if (t.dataset) try { delete t.dataset[i] } catch (e) { t.dataset[i] = null } else t.removeAttribute("data-" + Q(i)) } var V = /\s+/; function G(t, i, e) { var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}; if (X(e)) { var n = i.trim().split(V); n.length > 1 ? O(n, function (i) { G(t, i, e, a) }) : t.removeEventListener ? t.removeEventListener(i, e, a) : t.detachEvent && t.detachEvent("on" + i, e) } } function J(t, i, e) { var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}; if (X(e)) { var n = i.trim().split(V); if (n.length > 1) O(n, function (i) { J(t, i, e, a) }); else { if (a.once) { var o = e; e = function () { for (var n = arguments.length, h = Array(n), r = 0; r < n; r++)h[r] = arguments[r]; return G(t, i, e, a), o.apply(t, h) } } t.addEventListener ? t.addEventListener(i, e, a) : t.attachEvent && t.attachEvent("on" + i, e) } } } function _(t, i, e) { if (t.dispatchEvent) { var a = void 0; return X(Event) && X(CustomEvent) ? a = N(e) ? new Event(i, { bubbles: !0, cancelable: !0 }) : new CustomEvent(i, { detail: e, bubbles: !0, cancelable: !0 }) : N(e) ? (a = document.createEvent("Event")).initEvent(i, !0, !0) : (a = document.createEvent("CustomEvent")).initCustomEvent(i, !0, !0, e), t.dispatchEvent(a) } return !t.fireEvent || t.fireEvent("on" + i) } function tt(t) { var i = document.documentElement, e = t.getBoundingClientRect(); return { left: e.left + ((window.scrollX || i && i.scrollLeft || 0) - (i && i.clientLeft || 0)), top: e.top + ((window.scrollY || i && i.scrollTop || 0) - (i && i.clientTop || 0)) } } var it = t.location, et = /^(https?:)\/\/([^:/?#]+):?(\d*)/i; function at(t) { var i = t.match(et); return i && (i[1] !== it.protocol || i[2] !== it.hostname || i[3] !== it.port) } function nt(t) { var i = "timestamp=" + (new Date).getTime(); return t + (-1 === t.indexOf("?") ? "?" : "&") + i } function ot(t) { var i = t.rotate, e = t.scaleX, a = t.scaleY, n = t.translateX, o = t.translateY, h = []; W(n) && 0 !== n && h.push("translateX(" + n + "px)"), W(o) && 0 !== o && h.push("translateY(" + o + "px)"), W(i) && 0 !== i && h.push("rotate(" + i + "deg)"), W(e) && 1 !== e && h.push("scaleX(" + e + ")"), W(a) && 1 !== a && h.push("scaleY(" + a + ")"); var r = h.length ? h.join(" ") : "none"; return { WebkitTransform: r, msTransform: r, transform: r } } var ht = t.navigator, rt = ht && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(ht.userAgent); function st(t, i) { var e = t.pageX, a = t.pageY, n = { endX: e, endY: a }; return i ? n : S({ startX: e, startY: a }, n) } var ct = Number.isFinite || t.isFinite; function lt(t) { var i = t.aspectRatio, e = t.height, a = t.width, n = function (t) { return ct(t) && t > 0 }; return n(a) && n(e) ? e * i > a ? e = a / i : a = e * i : n(a) ? e = a / i : n(e) && (a = e * i), { width: a, height: e } } var dt = String.fromCharCode; var pt = /^data:.*,/; function mt(t) { var i = new DataView(t), e = void 0, a = void 0, n = void 0, o = void 0; if (255 === i.getUint8(0) && 216 === i.getUint8(1)) for (var h = i.byteLength, r = 2; r < h;) { if (255 === i.getUint8(r) && 225 === i.getUint8(r + 1)) { n = r; break } r += 1 } if (n) { var s = n + 10; if ("Exif" === function (t, i, e) { var a = "", n = void 0; for (e += i, n = i; n < e; n += 1)a += dt(t.getUint8(n)); return a }(i, n + 4, 4)) { var c = i.getUint16(s); if (((a = 18761 === c) || 19789 === c) && 42 === i.getUint16(s + 2, a)) { var l = i.getUint32(s + 4, a); l >= 8 && (o = s + l) } } } if (o) { var d = i.getUint16(o, a), p = void 0, m = void 0; for (m = 0; m < d; m += 1)if (p = o + 12 * m + 2, 274 === i.getUint16(p, a)) { p += 8, e = i.getUint16(p, a), i.setUint16(p, 1, a); break } } return e } var ut = { render: function () { this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox() }, initContainer: function () { var t = this.element, i = this.options, e = this.container, a = this.cropper; j(a, n), P(t, n); var o = { width: Math.max(e.offsetWidth, Number(i.minContainerWidth) || 200), height: Math.max(e.offsetHeight, Number(i.minContainerHeight) || 100) }; this.containerData = o, U(a, { width: o.width, height: o.height }), j(t, n), P(a, n) }, initCanvas: function () { var t = this.containerData, i = this.imageData, e = this.options.viewMode, a = Math.abs(i.rotate) % 180 == 90, n = a ? i.naturalHeight : i.naturalWidth, o = a ? i.naturalWidth : i.naturalHeight, h = n / o, r = t.width, s = t.height; t.height * h > t.width ? 3 === e ? r = t.height * h : s = t.width / h : 3 === e ? s = t.width / h : r = t.height * h; var c = { aspectRatio: h, naturalWidth: n, naturalHeight: o, width: r, height: s }; c.left = (t.width - r) / 2, c.top = (t.height - s) / 2, c.oldLeft = c.left, c.oldTop = c.top, this.canvasData = c, this.limited = 1 === e || 2 === e, this.limitCanvas(!0, !0), this.initialImageData = S({}, i), this.initialCanvasData = S({}, c) }, limitCanvas: function (t, i) { var e = this.options, a = this.containerData, n = this.canvasData, o = this.cropBoxData, h = e.viewMode, r = n.aspectRatio, s = this.cropped && o; if (t) { var c = Number(e.minCanvasWidth) || 0, l = Number(e.minCanvasHeight) || 0; h > 1 ? (c = Math.max(c, a.width), l = Math.max(l, a.height), 3 === h && (l * r > c ? c = l * r : l = c / r)) : h > 0 && (c ? c = Math.max(c, s ? o.width : 0) : l ? l = Math.max(l, s ? o.height : 0) : s && (c = o.width, (l = o.height) * r > c ? c = l * r : l = c / r)); var d = lt({ aspectRatio: r, width: c, height: l }); c = d.width, l = d.height, n.minWidth = c, n.minHeight = l, n.maxWidth = 1 / 0, n.maxHeight = 1 / 0 } if (i) if (h) { var p = a.width - n.width, m = a.height - n.height; n.minLeft = Math.min(0, p), n.minTop = Math.min(0, m), n.maxLeft = Math.max(0, p), n.maxTop = Math.max(0, m), s && this.limited && (n.minLeft = Math.min(o.left, o.left + (o.width - n.width)), n.minTop = Math.min(o.top, o.top + (o.height - n.height)), n.maxLeft = o.left, n.maxTop = o.top, 2 === h && (n.width >= a.width && (n.minLeft = Math.min(0, p), n.maxLeft = Math.max(0, p)), n.height >= a.height && (n.minTop = Math.min(0, m), n.maxTop = Math.max(0, m)))) } else n.minLeft = -n.width, n.minTop = -n.height, n.maxLeft = a.width, n.maxTop = a.height }, renderCanvas: function (t, i) { var e = this.canvasData, a = this.imageData; if (i) { var n = function (t) { var i = t.width, e = t.height, a = t.degree; if (90 == (a = Math.abs(a) % 180)) return { width: e, height: i }; var n = a % 90 * Math.PI / 180, o = Math.sin(n), h = Math.cos(n), r = i * h + e * o, s = i * o + e * h; return a > 90 ? { width: s, height: r } : { width: r, height: s } }({ width: a.naturalWidth * Math.abs(a.scaleX || 1), height: a.naturalHeight * Math.abs(a.scaleY || 1), degree: a.rotate || 0 }), o = n.width, h = n.height, r = e.width * (o / e.naturalWidth), s = e.height * (h / e.naturalHeight); e.left -= (r - e.width) / 2, e.top -= (s - e.height) / 2, e.width = r, e.height = s, e.aspectRatio = o / h, e.naturalWidth = o, e.naturalHeight = h, this.limitCanvas(!0, !1) } (e.width > e.maxWidth || e.width < e.minWidth) && (e.left = e.oldLeft), (e.height > e.maxHeight || e.height < e.minHeight) && (e.top = e.oldTop), e.width = Math.min(Math.max(e.width, e.minWidth), e.maxWidth), e.height = Math.min(Math.max(e.height, e.minHeight), e.maxHeight), this.limitCanvas(!1, !0), e.left = Math.min(Math.max(e.left, e.minLeft), e.maxLeft), e.top = Math.min(Math.max(e.top, e.minTop), e.maxTop), e.oldLeft = e.left, e.oldTop = e.top, U(this.canvas, S({ width: e.width, height: e.height }, ot({ translateX: e.left, translateY: e.top }))), this.renderImage(t), this.cropped && this.limited && this.limitCropBox(!0, !0) }, renderImage: function (t) { var i = this.canvasData, e = this.imageData, a = e.naturalWidth * (i.width / i.naturalWidth), n = e.naturalHeight * (i.height / i.naturalHeight); S(e, { width: a, height: n, left: (i.width - a) / 2, top: (i.height - n) / 2 }), U(this.image, S({ width: e.width, height: e.height }, ot(S({ translateX: e.left, translateY: e.top }, e)))), t && this.output() }, initCropBox: function () { var t = this.options, i = this.canvasData, e = t.aspectRatio, a = Number(t.autoCropArea) || .8, n = { width: i.width, height: i.height }; e && (i.height * e > i.width ? n.height = n.width / e : n.width = n.height * e), this.cropBoxData = n, this.limitCropBox(!0, !0), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), n.width = Math.max(n.minWidth, n.width * a), n.height = Math.max(n.minHeight, n.height * a), n.left = i.left + (i.width - n.width) / 2, n.top = i.top + (i.height - n.height) / 2, n.oldLeft = n.left, n.oldTop = n.top, this.initialCropBoxData = S({}, n) }, limitCropBox: function (t, i) { var e = this.options, a = this.containerData, n = this.canvasData, o = this.cropBoxData, h = this.limited, r = e.aspectRatio; if (t) { var s = Number(e.minCropBoxWidth) || 0, c = Number(e.minCropBoxHeight) || 0, l = Math.min(a.width, h ? n.width : a.width), d = Math.min(a.height, h ? n.height : a.height); s = Math.min(s, a.width), c = Math.min(c, a.height), r && (s && c ? c * r > s ? c = s / r : s = c * r : s ? c = s / r : c && (s = c * r), d * r > l ? d = l / r : l = d * r), o.minWidth = Math.min(s, l), o.minHeight = Math.min(c, d), o.maxWidth = l, o.maxHeight = d } i && (h ? (o.minLeft = Math.max(0, n.left), o.minTop = Math.max(0, n.top), o.maxLeft = Math.min(a.width, n.left + n.width) - o.width, o.maxTop = Math.min(a.height, n.top + n.height) - o.height) : (o.minLeft = 0, o.minTop = 0, o.maxLeft = a.width - o.width, o.maxTop = a.height - o.height)) }, renderCropBox: function () { var t = this.options, i = this.containerData, e = this.cropBoxData; (e.width > e.maxWidth || e.width < e.minWidth) && (e.left = e.oldLeft), (e.height > e.maxHeight || e.height < e.minHeight) && (e.top = e.oldTop), e.width = Math.min(Math.max(e.width, e.minWidth), e.maxWidth), e.height = Math.min(Math.max(e.height, e.minHeight), e.maxHeight), this.limitCropBox(!1, !0), e.left = Math.min(Math.max(e.left, e.minLeft), e.maxLeft), e.top = Math.min(Math.max(e.top, e.minTop), e.maxTop), e.oldLeft = e.left, e.oldTop = e.top, t.movable && t.cropBoxMovable && F(this.face, s, e.width >= i.width && e.height >= i.height ? "move" : "all"), U(this.cropBox, S({ width: e.width, height: e.height }, ot({ translateX: e.left, translateY: e.top }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output() }, output: function () { this.preview(), this.complete && _(this.element, l, this.getData()) } }, gt = { initPreview: function () { var t = this.crossOrigin, i = this.options.preview, e = t ? this.crossOriginUrl : this.url, a = document.createElement("img"); if (t && (a.crossOrigin = t), a.src = e, this.viewBox.appendChild(a), this.image2 = a, i) { var n = i.querySelector ? [i] : document.querySelectorAll(i); this.previews = n, O(n, function (i) { var a = document.createElement("img"); F(i, c, { width: i.offsetWidth, height: i.offsetHeight, html: i.innerHTML }), t && (a.crossOrigin = t), a.src = e, a.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', function (t) { for (; t.firstChild;)t.removeChild(t.firstChild) }(i), i.appendChild(a) }) } }, resetPreview: function () { O(this.previews, function (t) { var i = Z(t, c); U(t, { width: i.width, height: i.height }), t.innerHTML = i.html, K(t, c) }) }, preview: function () { var t = this.imageData, i = this.canvasData, e = this.cropBoxData, a = e.width, n = e.height, o = t.width, h = t.height, r = e.left - i.left - t.left, s = e.top - i.top - t.top; this.cropped && !this.disabled && (U(this.image2, S({ width: o, height: h }, ot(S({ translateX: -r, translateY: -s }, t)))), O(this.previews, function (i) { var e = Z(i, c), l = e.width, d = e.height, p = l, m = d, u = 1; a && (m = n * (u = l / a)), n && m > d && (p = a * (u = d / n), m = d), U(i, { width: p, height: m }), U(i.getElementsByTagName("img")[0], S({ width: o * u, height: h * u }, ot(S({ translateX: -r * u, translateY: -s * u }, t)))) })) } }, ft = { bind: function () { var t = this.element, i = this.options, e = this.cropper; X(i.cropstart) && J(t, m, i.cropstart), X(i.cropmove) && J(t, p, i.cropmove), X(i.cropend) && J(t, d, i.cropend), X(i.crop) && J(t, l, i.crop), X(i.zoom) && J(t, "zoom", i.zoom), J(e, g, this.onCropStart = z(this.cropStart, this)), i.zoomable && i.zoomOnWheel && J(e, w, this.onWheel = z(this.wheel, this)), i.toggleDragModeOnDblclick && J(e, "dblclick", this.onDblclick = z(this.dblclick, this)), J(t.ownerDocument, f, this.onCropMove = z(this.cropMove, this)), J(t.ownerDocument, v, this.onCropEnd = z(this.cropEnd, this)), i.responsive && J(window, "resize", this.onResize = z(this.resize, this)) }, unbind: function () { var t = this.element, i = this.options, e = this.cropper; X(i.cropstart) && G(t, m, i.cropstart), X(i.cropmove) && G(t, p, i.cropmove), X(i.cropend) && G(t, d, i.cropend), X(i.crop) && G(t, l, i.crop), X(i.zoom) && G(t, "zoom", i.zoom), G(e, g, this.onCropStart), i.zoomable && i.zoomOnWheel && G(e, w, this.onWheel), i.toggleDragModeOnDblclick && G(e, "dblclick", this.onDblclick), G(t.ownerDocument, f, this.onCropMove), G(t.ownerDocument, v, this.onCropEnd), i.responsive && G(window, "resize", this.onResize) } }, vt = { resize: function () { var t = this.options, i = this.container, e = this.containerData, a = Number(t.minContainerWidth) || 200, n = Number(t.minContainerHeight) || 100; if (!(this.disabled || e.width <= a || e.height <= n)) { var o = i.offsetWidth / e.width; if (1 !== o || i.offsetHeight !== e.height) { var h = void 0, r = void 0; t.restore && (h = this.getCanvasData(), r = this.getCropBoxData()), this.render(), t.restore && (this.setCanvasData(O(h, function (t, i) { h[i] = t * o })), this.setCropBoxData(O(r, function (t, i) { r[i] = t * o }))) } } }, dblclick: function () { if (!this.disabled && "none" !== this.options.dragMode) { this.setDragMode((t = this.dragBox, i = e, (t.classList ? t.classList.contains(i) : t.className.indexOf(i) > -1) ? "move" : "crop")); var t, i } }, wheel: function (t) { var i = this, e = Number(this.options.wheelZoomRatio) || .1, a = 1; this.disabled || (t.preventDefault(), this.wheeling || (this.wheeling = !0, setTimeout(function () { i.wheeling = !1 }, 50), t.deltaY ? a = t.deltaY > 0 ? 1 : -1 : t.wheelDelta ? a = -t.wheelDelta / 120 : t.detail && (a = t.detail > 0 ? 1 : -1), this.zoom(-a * e, t))) }, cropStart: function (t) { if (!this.disabled) { var i = this.options, e = this.pointers, a = void 0; t.changedTouches ? O(t.changedTouches, function (t) { e[t.identifier] = st(t) }) : e[t.pointerId || 0] = st(t), a = Object.keys(e).length > 1 && i.zoomable && i.zoomOnTouch ? "zoom" : Z(t.target, s), x.test(a) && !1 !== _(this.element, m, { originalEvent: t, action: a }) && (t.preventDefault(), this.action = a, this.cropping = !1, "crop" === a && (this.cropping = !0, j(this.dragBox, h))) } }, cropMove: function (t) { var i = this.action; if (!this.disabled && i) { var e = this.pointers; t.preventDefault(), !1 !== _(this.element, p, { originalEvent: t, action: i }) && (t.changedTouches ? O(t.changedTouches, function (t) { S(e[t.identifier], st(t, !0)) }) : S(e[t.pointerId || 0], st(t, !0)), this.change(t)) } }, cropEnd: function (t) { if (!this.disabled) { var i = this.action, e = this.pointers; t.changedTouches ? O(t.changedTouches, function (t) { delete e[t.identifier] }) : delete e[t.pointerId || 0], i && (t.preventDefault(), Object.keys(e).length || (this.action = ""), this.cropping && (this.cropping = !1, q(this.dragBox, h, this.cropped && this.options.modal)), _(this.element, d, { originalEvent: t, action: i })) } } }, wt = { change: function (t) { var i = this.options, e = this.canvasData, a = this.containerData, o = this.cropBoxData, h = this.pointers, r = this.action, s = i.aspectRatio, c = o.left, l = o.top, d = o.width, p = o.height, m = c + d, u = l + p, g = 0, f = 0, v = a.width, w = a.height, x = !0, b = void 0; !s && t.shiftKey && (s = d && p ? d / p : 1), this.limited && (g = o.minLeft, f = o.minTop, v = g + Math.min(a.width, e.width, e.left + e.width), w = f + Math.min(a.height, e.height, e.top + e.height)); var y = h[Object.keys(h)[0]], C = { x: y.endX - y.startX, y: y.endY - y.startY }, M = function (t) { switch (t) { case "e": m + C.x > v && (C.x = v - m); break; case "w": c + C.x < g && (C.x = g - c); break; case "n": l + C.y < f && (C.y = f - l); break; case "s": u + C.y > w && (C.y = w - u) } }; switch (r) { case "all": c += C.x, l += C.y; break; case "e": if (C.x >= 0 && (m >= v || s && (l <= f || u >= w))) { x = !1; break } M("e"), d += C.x, s && (p = d / s, l -= C.x / s / 2), d < 0 && (r = "w", d = 0); break; case "n": if (C.y <= 0 && (l <= f || s && (c <= g || m >= v))) { x = !1; break } M("n"), p -= C.y, l += C.y, s && (d = p * s, c += C.y * s / 2), p < 0 && (r = "s", p = 0); break; case "w": if (C.x <= 0 && (c <= g || s && (l <= f || u >= w))) { x = !1; break } M("w"), d -= C.x, c += C.x, s && (p = d / s, l += C.x / s / 2), d < 0 && (r = "e", d = 0); break; case "s": if (C.y >= 0 && (u >= w || s && (c <= g || m >= v))) { x = !1; break } M("s"), p += C.y, s && (d = p * s, c -= C.y * s / 2), p < 0 && (r = "n", p = 0); break; case "ne": if (s) { if (C.y <= 0 && (l <= f || m >= v)) { x = !1; break } M("n"), p -= C.y, l += C.y, d = p * s } else M("n"), M("e"), C.x >= 0 ? m < v ? d += C.x : C.y <= 0 && l <= f && (x = !1) : d += C.x, C.y <= 0 ? l > f && (p -= C.y, l += C.y) : (p -= C.y, l += C.y); d < 0 && p < 0 ? (r = "sw", p = 0, d = 0) : d < 0 ? (r = "nw", d = 0) : p < 0 && (r = "se", p = 0); break; case "nw": if (s) { if (C.y <= 0 && (l <= f || c <= g)) { x = !1; break } M("n"), p -= C.y, l += C.y, d = p * s, c += C.y * s } else M("n"), M("w"), C.x <= 0 ? c > g ? (d -= C.x, c += C.x) : C.y <= 0 && l <= f && (x = !1) : (d -= C.x, c += C.x), C.y <= 0 ? l > f && (p -= C.y, l += C.y) : (p -= C.y, l += C.y); d < 0 && p < 0 ? (r = "se", p = 0, d = 0) : d < 0 ? (r = "ne", d = 0) : p < 0 && (r = "sw", p = 0); break; case "sw": if (s) { if (C.x <= 0 && (c <= g || u >= w)) { x = !1; break } M("w"), d -= C.x, c += C.x, p = d / s } else M("s"), M("w"), C.x <= 0 ? c > g ? (d -= C.x, c += C.x) : C.y >= 0 && u >= w && (x = !1) : (d -= C.x, c += C.x), C.y >= 0 ? u < w && (p += C.y) : p += C.y; d < 0 && p < 0 ? (r = "ne", p = 0, d = 0) : d < 0 ? (r = "se", d = 0) : p < 0 && (r = "nw", p = 0); break; case "se": if (s) { if (C.x >= 0 && (m >= v || u >= w)) { x = !1; break } M("e"), p = (d += C.x) / s } else M("s"), M("e"), C.x >= 0 ? m < v ? d += C.x : C.y >= 0 && u >= w && (x = !1) : d += C.x, C.y >= 0 ? u < w && (p += C.y) : p += C.y; d < 0 && p < 0 ? (r = "nw", p = 0, d = 0) : d < 0 ? (r = "sw", d = 0) : p < 0 && (r = "ne", p = 0); break; case "move": this.move(C.x, C.y), x = !1; break; case "zoom": this.zoom(function (t) { var i = S({}, t), e = []; return O(t, function (t, a) { delete i[a], O(i, function (i) { var a = Math.abs(t.startX - i.startX), n = Math.abs(t.startY - i.startY), o = Math.abs(t.endX - i.endX), h = Math.abs(t.endY - i.endY), r = Math.sqrt(a * a + n * n), s = (Math.sqrt(o * o + h * h) - r) / r; e.push(s) }) }), e.sort(function (t, i) { return Math.abs(t) < Math.abs(i) }), e[0] }(h), t), x = !1; break; case "crop": if (!C.x || !C.y) { x = !1; break } b = tt(this.cropper), c = y.startX - b.left, l = y.startY - b.top, d = o.minWidth, p = o.minHeight, C.x > 0 ? r = C.y > 0 ? "se" : "ne" : C.x < 0 && (c -= d, r = C.y > 0 ? "sw" : "nw"), C.y < 0 && (l -= p), this.cropped || (P(this.cropBox, n), this.cropped = !0, this.limited && this.limitCropBox(!0, !0)) }x && (o.width = d, o.height = p, o.left = c, o.top = l, this.action = r, this.renderCropBox()), O(h, function (t) { t.startX = t.endX, t.startY = t.endY }) } }, xt = { crop: function () { return this.ready && !this.disabled && (this.cropped || (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && j(this.dragBox, h), P(this.cropBox, n)), this.setCropBoxData(this.initialCropBoxData)), this }, reset: function () { return this.ready && !this.disabled && (this.imageData = S({}, this.initialImageData), this.canvasData = S({}, this.initialCanvasData), this.cropBoxData = S({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this }, clear: function () { return this.cropped && !this.disabled && (S(this.cropBoxData, { left: 0, top: 0, width: 0, height: 0 }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), P(this.dragBox, h), j(this.cropBox, n)), this }, replace: function (t) { var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; return !this.disabled && t && (this.isImg && (this.element.src = t), i ? (this.url = t, this.image.src = t, this.ready && (this.image2.src = t, O(this.previews, function (i) { i.getElementsByTagName("img")[0].src = t }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.load(t))), this }, enable: function () { return this.ready && (this.disabled = !1, P(this.cropper, a)), this }, disable: function () { return this.ready && (this.disabled = !0, j(this.cropper, a)), this }, destroy: function () { var t = this.element, e = this.image; return this.loaded ? (this.isImg && this.replaced && (t.src = this.originalUrl), this.unbuild(), P(t, n)) : this.isImg ? G(t, u, this.onStart) : e && e.parentNode.removeChild(e), K(t, i), this }, move: function (t, i) { var e = this.canvasData, a = e.left, n = e.top; return this.moveTo(N(t) ? t : a + Number(t), N(i) ? i : n + Number(i)) }, moveTo: function (t) { var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t, e = this.canvasData, a = !1; return t = Number(t), i = Number(i), this.ready && !this.disabled && this.options.movable && (W(t) && (e.left = t, a = !0), W(i) && (e.top = i, a = !0), a && this.renderCanvas(!0)), this }, zoom: function (t, i) { var e = this.canvasData; return t = (t = Number(t)) < 0 ? 1 / (1 - t) : 1 + t, this.zoomTo(e.width * t / e.naturalWidth, null, i) }, zoomTo: function (t, i, e) { var a = this.options, n = this.canvasData, o = n.width, h = n.height, r = n.naturalWidth, s = n.naturalHeight; if ((t = Number(t)) >= 0 && this.ready && !this.disabled && a.zoomable) { var c = r * t, l = s * t; if (!1 === _(this.element, "zoom", { originalEvent: e, oldRatio: o / r, ratio: c / r })) return this; if (e) { var d = this.pointers, p = tt(this.cropper), m = d && Object.keys(d).length ? function (t) { var i = 0, e = 0, a = 0; return O(t, function (t) { var n = t.startX, o = t.startY; i += n, e += o, a += 1 }), { pageX: i /= a, pageY: e /= a } }(d) : { pageX: e.pageX, pageY: e.pageY }; n.left -= (c - o) * ((m.pageX - p.left - n.left) / o), n.top -= (l - h) * ((m.pageY - p.top - n.top) / h) } else Y(i) && W(i.x) && W(i.y) ? (n.left -= (c - o) * ((i.x - n.left) / o), n.top -= (l - h) * ((i.y - n.top) / h)) : (n.left -= (c - o) / 2, n.top -= (l - h) / 2); n.width = c, n.height = l, this.renderCanvas(!0) } return this }, rotate: function (t) { return this.rotateTo((this.imageData.rotate || 0) + Number(t)) }, rotateTo: function (t) { return W(t = Number(t)) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = t % 360, this.renderCanvas(!0, !0)), this }, scaleX: function (t) { var i = this.imageData.scaleY; return this.scale(t, W(i) ? i : 1) }, scaleY: function (t) { var i = this.imageData.scaleX; return this.scale(W(i) ? i : 1, t) }, scale: function (t) { var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t, e = this.imageData, a = !1; return t = Number(t), i = Number(i), this.ready && !this.disabled && this.options.scalable && (W(t) && (e.scaleX = t, a = !0), W(i) && (e.scaleY = i, a = !0), a && this.renderCanvas(!0, !0)), this }, getData: function () { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = this.options, e = this.imageData, a = this.canvasData, n = this.cropBoxData, o = void 0; if (this.ready && this.cropped) { o = { x: n.left - a.left, y: n.top - a.top, width: n.width, height: n.height }; var h = e.width / e.naturalWidth; O(o, function (i, e) { i /= h, o[e] = t ? Math.round(i) : i }) } else o = { x: 0, y: 0, width: 0, height: 0 }; return i.rotatable && (o.rotate = e.rotate || 0), i.scalable && (o.scaleX = e.scaleX || 1, o.scaleY = e.scaleY || 1), o }, setData: function (t) { var i = this.options, e = this.imageData, a = this.canvasData, n = {}; if (X(t) && (t = t.call(this.element)), this.ready && !this.disabled && Y(t)) { var o = !1; i.rotatable && W(t.rotate) && t.rotate !== e.rotate && (e.rotate = t.rotate, o = !0), i.scalable && (W(t.scaleX) && t.scaleX !== e.scaleX && (e.scaleX = t.scaleX, o = !0), W(t.scaleY) && t.scaleY !== e.scaleY && (e.scaleY = t.scaleY, o = !0)), o && this.renderCanvas(!0, !0); var h = e.width / e.naturalWidth; W(t.x) && (n.left = t.x * h + a.left), W(t.y) && (n.top = t.y * h + a.top), W(t.width) && (n.width = t.width * h), W(t.height) && (n.height = t.height * h), this.setCropBoxData(n) } return this }, getContainerData: function () { return this.ready ? S({}, this.containerData) : {} }, getImageData: function () { return this.loaded ? S({}, this.imageData) : {} }, getCanvasData: function () { var t = this.canvasData, i = {}; return this.ready && O(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function (e) { i[e] = t[e] }), i }, setCanvasData: function (t) { var i = this.canvasData, e = i.aspectRatio; return X(t) && (t = t.call(this.element)), this.ready && !this.disabled && Y(t) && (W(t.left) && (i.left = t.left), W(t.top) && (i.top = t.top), W(t.width) ? (i.width = t.width, i.height = t.width / e) : W(t.height) && (i.height = t.height, i.width = t.height * e), this.renderCanvas(!0)), this }, getCropBoxData: function () { var t = this.cropBoxData, i = void 0; return this.ready && this.cropped && (i = { left: t.left, top: t.top, width: t.width, height: t.height }), i || {} }, setCropBoxData: function (t) { var i = this.cropBoxData, e = this.options.aspectRatio, a = void 0, n = void 0; return X(t) && (t = t.call(this.element)), this.ready && this.cropped && !this.disabled && Y(t) && (W(t.left) && (i.left = t.left), W(t.top) && (i.top = t.top), W(t.width) && t.width !== i.width && (a = !0, i.width = t.width), W(t.height) && t.height !== i.height && (n = !0, i.height = t.height), e && (a ? i.height = i.width / e : n && (i.width = i.height * e)), this.renderCropBox()), this }, getCroppedCanvas: function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; if (!this.ready || !window.HTMLCanvasElement) return null; var i = this.canvasData, e = function (t, i, e, a) { var n = i.naturalWidth, o = i.naturalHeight, h = i.rotate, r = void 0 === h ? 0 : h, s = i.scaleX, c = void 0 === s ? 1 : s, l = i.scaleY, d = void 0 === l ? 1 : l, p = e.aspectRatio, m = e.naturalWidth, u = e.naturalHeight, g = a.fillColor, f = void 0 === g ? "transparent" : g, v = a.imageSmoothingEnabled, w = void 0 === v || v, x = a.imageSmoothingQuality, b = void 0 === x ? "low" : x, y = a.maxWidth, C = void 0 === y ? 1 / 0 : y, M = a.maxHeight, D = void 0 === M ? 1 / 0 : M, B = a.minWidth, k = void 0 === B ? 0 : B, T = a.minHeight, W = void 0 === T ? 0 : T, N = document.createElement("canvas"), H = N.getContext("2d"), L = lt({ aspectRatio: p, width: C, height: D }), Y = lt({ aspectRatio: p, width: k, height: W }), X = Math.min(L.width, Math.max(Y.width, m)), O = Math.min(L.height, Math.max(Y.height, u)), S = [-n / 2, -o / 2, n, o]; return N.width = A(X), N.height = A(O), H.fillStyle = f, H.fillRect(0, 0, X, O), H.save(), H.translate(X / 2, O / 2), H.rotate(r * Math.PI / 180), H.scale(c, d), H.imageSmoothingEnabled = w, H.imageSmoothingQuality = b, H.drawImage.apply(H, [t].concat(E(S.map(function (t) { return Math.floor(A(t)) })))), H.restore(), N }(this.image, this.imageData, i, t); if (!this.cropped) return e; var a = this.getData(), n = a.x, o = a.y, h = a.width, r = a.height, s = h / r, c = lt({ aspectRatio: s, width: t.maxWidth || 1 / 0, height: t.maxHeight || 1 / 0 }), l = lt({ aspectRatio: s, width: t.minWidth || 0, height: t.minHeight || 0 }), d = lt({ aspectRatio: s, width: t.width || h, height: t.height || r }), p = d.width, m = d.height; p = Math.min(c.width, Math.max(l.width, p)), m = Math.min(c.height, Math.max(l.height, m)); var u = document.createElement("canvas"), g = u.getContext("2d"); u.width = A(p), u.height = A(m), g.fillStyle = t.fillColor || "transparent", g.fillRect(0, 0, p, m); var f = t.imageSmoothingEnabled, v = void 0 === f || f, w = t.imageSmoothingQuality; g.imageSmoothingEnabled = v, w && (g.imageSmoothingQuality = w); var x = e.width, b = e.height, y = n, C = o, M = void 0, D = void 0, B = void 0, k = void 0, T = void 0, W = void 0; y <= -h || y > x ? (y = 0, M = 0, B = 0, T = 0) : y <= 0 ? (B = -y, y = 0, T = M = Math.min(x, h + y)) : y <= x && (B = 0, T = M = Math.min(h, x - y)), M <= 0 || C <= -r || C > b ? (C = 0, D = 0, k = 0, W = 0) : C <= 0 ? (k = -C, C = 0, W = D = Math.min(b, r + C)) : C <= b && (k = 0, W = D = Math.min(r, b - C)); var N = [y, C, M, D]; if (T > 0 && W > 0) { var H = p / h; N.push(B * H, k * H, T * H, W * H) } return g.drawImage.apply(g, [e].concat(E(N.map(function (t) { return Math.floor(A(t)) })))), u }, setAspectRatio: function (t) { var i = this.options; return this.disabled || N(t) || (i.aspectRatio = Math.max(0, t) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this }, setDragMode: function (t) { var i = this.options, a = this.dragBox, n = this.face; if (this.loaded && !this.disabled) { var o = "crop" === t, h = i.movable && "move" === t; F(a, s, t = o || h ? t : "none"), q(a, e, o), q(a, r, h), i.cropBoxMovable || (F(n, s, t), q(n, e, o), q(n, r, h)) } return this } }, bt = t.Cropper, yt = function () { function t(i) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; if (B(this, t), !i || !C.test(i.tagName)) throw new Error("The first argument is required and must be an <img> or <canvas> element."); this.element = i, this.options = S({}, M, Y(e) && e), this.complete = !1, this.cropped = !1, this.disabled = !1, this.isImg = !1, this.limited = !1, this.loaded = !1, this.ready = !1, this.replaced = !1, this.wheeling = !1, this.originalUrl = "", this.canvasData = null, this.cropBoxData = null, this.previews = null, this.pointers = {}, this.init() } return k(t, [{ key: "init", value: function () { var t = this.element, e = t.tagName.toLowerCase(), a = void 0; if (!Z(t, i)) { if (F(t, i, this), "img" === e) { if (this.isImg = !0, a = t.getAttribute("src") || "", this.originalUrl = a, !a) return; a = t.src } else "canvas" === e && window.HTMLCanvasElement && (a = t.toDataURL()); this.load(a) } } }, { key: "load", value: function (t) { var i = this; if (t) { this.url = t, this.imageData = {}; var e = this.element, a = this.options; if (a.checkOrientation && window.ArrayBuffer) if (b.test(t)) y.test(t) ? this.read(function (t) { var i = t.replace(pt, ""), e = atob(i), a = new ArrayBuffer(e.length), n = new Uint8Array(a); return O(n, function (t, i) { n[i] = e.charCodeAt(i) }), a }(t)) : this.clone(); else { var n = new XMLHttpRequest; n.onerror = function () { i.clone() }, n.onload = function () { i.read(n.response) }, a.checkCrossOrigin && at(t) && e.crossOrigin && (t = nt(t)), n.open("get", t), n.responseType = "arraybuffer", n.withCredentials = "use-credentials" === e.crossOrigin, n.send() } else this.clone() } } }, { key: "read", value: function (t) { var i = this.options, e = this.imageData, a = mt(t), n = 0, o = 1, h = 1; if (a > 1) { this.url = function (t, i) { var e = ""; return O(new Uint8Array(t), function (t) { e += dt(t) }), "data:" + i + ";base64," + btoa(e) }(t, "image/jpeg"); var r = function (t) { var i = 0, e = 1, a = 1; switch (t) { case 2: e = -1; break; case 3: i = -180; break; case 4: a = -1; break; case 5: i = 90, a = -1; break; case 6: i = 90; break; case 7: i = 90, e = -1; break; case 8: i = -90 }return { rotate: i, scaleX: e, scaleY: a } }(a); n = r.rotate, o = r.scaleX, h = r.scaleY } i.rotatable && (e.rotate = n), i.scalable && (e.scaleX = o, e.scaleY = h), this.clone() } }, { key: "clone", value: function () { var t = this.element, i = this.url, e = void 0, a = void 0; this.options.checkCrossOrigin && at(i) && ((e = t.crossOrigin) ? a = i : (e = "anonymous", a = nt(i))), this.crossOrigin = e, this.crossOriginUrl = a; var n = document.createElement("img"); e && (n.crossOrigin = e), n.src = a || i; var h = z(this.start, this), r = z(this.stop, this); this.image = n, this.onStart = h, this.onStop = r, this.isImg ? t.complete ? this.start() : J(t, u, h) : (J(n, u, h), J(n, "error", r), j(n, o), t.parentNode.insertBefore(n, t.nextSibling)) } }, { key: "start", value: function (t) { var i = this, e = this.isImg ? this.element : this.image; t && (G(e, u, this.onStart), G(e, "error", this.onStop)), function (t, i) { if (!t.naturalWidth || rt) { var e = document.createElement("img"), a = document.body || document.documentElement; e.onload = function () { i(e.width, e.height), rt || a.removeChild(e) }, e.src = t.src, rt || (e.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", a.appendChild(e)) } else i(t.naturalWidth, t.naturalHeight) }(e, function (t, e) { S(i.imageData, { naturalWidth: t, naturalHeight: e, aspectRatio: t / e }), i.loaded = !0, i.build() }) } }, { key: "stop", value: function () { var t = this.image; G(t, u, this.onStart), G(t, "error", this.onStop), t.parentNode.removeChild(t), this.image = null } }, { key: "build", value: function () { var t = this; if (this.loaded) { this.ready && this.unbuild(); var e = this.element, a = this.options, c = this.image, d = e.parentNode, p = document.createElement("div"); p.innerHTML = '<div class="cropper-container"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>'; var m = p.querySelector("." + i + "-container"), u = m.querySelector("." + i + "-canvas"), g = m.querySelector("." + i + "-drag-box"), f = m.querySelector("." + i + "-crop-box"), v = f.querySelector("." + i + "-face"); this.container = d, this.cropper = m, this.canvas = u, this.dragBox = g, this.cropBox = f, this.viewBox = m.querySelector("." + i + "-view-box"), this.face = v, u.appendChild(c), j(e, n), d.insertBefore(m, e.nextSibling), this.isImg || P(c, o), this.initPreview(), this.bind(), a.aspectRatio = Math.max(0, a.aspectRatio) || NaN, a.viewMode = Math.max(0, Math.min(3, Math.round(a.viewMode))) || 0, this.cropped = a.autoCrop, a.autoCrop ? a.modal && j(g, h) : j(f, n), a.guides || j(f.getElementsByClassName(i + "-dashed"), n), a.center || j(f.getElementsByClassName(i + "-center"), n), a.background && j(m, i + "-bg"), a.highlight || j(v, "cropper-invisible"), a.cropBoxMovable && (j(v, r), F(v, s, "all")), a.cropBoxResizable || (j(f.getElementsByClassName(i + "-line"), n), j(f.getElementsByClassName(i + "-point"), n)), this.setDragMode(a.dragMode), this.render(), this.ready = !0, this.setData(a.data), this.completing = setTimeout(function () { X(a.ready) && J(e, "ready", a.ready, { once: !0 }), _(e, "ready"), _(e, l, t.getData()), t.complete = !0 }, 0) } } }, { key: "unbuild", value: function () { this.ready && (this.complete || clearTimeout(this.completing), this.ready = !1, this.complete = !1, this.initialImageData = null, this.initialCanvasData = null, this.initialCropBoxData = null, this.containerData = null, this.canvasData = null, this.cropBoxData = null, this.unbind(), this.resetPreview(), this.previews = null, this.viewBox = null, this.cropBox = null, this.dragBox = null, this.canvas = null, this.container = null, this.cropper.parentNode.removeChild(this.cropper), this.cropper = null) } }], [{ key: "noConflict", value: function () { return window.Cropper = bt, t } }, { key: "setDefaults", value: function (t) { S(M, Y(t) && t) } }]), t }(); return S(yt.prototype, ut, gt, ft, vt, wt, xt), yt });

var huiImgCuter = (function () {
    var _huiImgCuter = function (aspectRatio, saveWidth) {
        if (!aspectRatio) { aspectRatio = 1; }
        if (!saveWidth) { saveWidth = 200; }
        //添加选择域
        var inputObj = hui.createDom('input');
        inputObj.setAttribute('type', 'file');
        inputObj.setAttribute('accept', 'image/*');
        inputObj.setAttribute('id', 'hui-img-cuter-file');
        hui(inputObj).appendTo('#hui-img-cuter-select');
        //绑定选择图片按钮
        this.bindSelect = function (selector) {
            hui(selector).click(function () {
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", true, true);
                document.getElementById("hui-img-cuter-file").dispatchEvent(a);
            });
        }
        //初始化
        this.Cuter = hui.createDom('div', { id: 'hui-img-cuter' });
        this.Cuter.innerHTML = '<div id="hui-img-cuter-img"></div>';
        document.body.appendChild(this.Cuter);
        this.Cuter = hui('#hui-img-cuter');
        this.CuterImg = hui('#hui-img-cuter-img');
        hui('#hui-img-cuter-file').change(function () {
            hui.loading('加载图片...');
            var reader = new FileReader();
            reader.onload = function (e) {
                _cuterSelf.CuterImg.html('<img src="' + e.target.result + '" />');
                _cuterSelf.cropper = new Cropper(_cuterSelf.CuterImg.find('img').eq(0).dom[0], {
                    resizable: false,
                    aspectRatio: aspectRatio,
                    ready: function () {
                        croppable = true;
                    }
                });
                hui.closeLoading();
            };
            if (this.files[0]) { reader.readAsDataURL(this.files[0]); } else { hui.closeLoading(); }
        });
        this.getImgData = function () {
            if (!_cuterSelf.cropper) { return false; }
            var canvas = _cuterSelf.cropper.getCroppedCanvas({ width: saveWidth, height: saveWidth * aspectRatio });
            return canvas.toDataURL();
        }
        _cuterSelf = this;
    }
    return _huiImgCuter;
})();
var HUI_PickerTimer = null, HUI_PickerId = 1;
function huiPickerHide(id) { hui('.hui-picker').hide(); }
function huiPicker(selector, callBack) {
    this.unSelectedColor = "#9e9e9e";
    this.selectedColor = "#000000";
    this.unSelectedFontSize = "14px";
    this.selectedFontSize = "14px";
    this.pickerBtn = hui(selector);
    this.pickerId = 'HUI_PickerMain' + HUI_PickerId;
    this.relevance = true;
    var huiPickerMain = document.createElement('div');
    huiPickerMain.setAttribute('class', 'hui-picker');
    huiPickerMain.setAttribute('id', this.pickerId);
    huiPickerMain.innerHTML = '<div class="hui-picker-menu">' +
        '<div class="hui-fl hui-button hui-button-small" style="color:#999999;" onclick="huiPickerHide();">取消</div>' +
        '<div class="hui-fr hui-button hui-button-small hui-primary" id="HUI_PickerConfirm' + HUI_PickerId + '">确定</div>' +
        '</div>' +
        '<div class="hui-picker-list-in"></div>' +
        '<div class="hui-picker-line"></div>';
    document.body.appendChild(huiPickerMain);
    this.pickerMain = hui('#' + this.pickerId);
    this.listAll = null; this.level = 1; var thisObj = this;
    hui('#HUI_PickerConfirm' + HUI_PickerId).click(function () {
        huiPickerHide(thisObj.pickerId);
        if (callBack) { callBack(); }
    });
    HUI_PickerId++;
    this.pickerBtn.click(function () { hui('.hui-picker').hide(); thisObj.pickerMain.show(); if (thisObj.onshow) { setTimeout(thisObj.onshow, 10) } });
    this.onshow = null;
    this.bindData = function (index, data) {
        this.relevance = false;
        var lists = this.pickerMain.find('.hui-picker-list');
        if (lists.length < 1) {
            var listsHtml = '';
            var cWidth = parseInt(100 / this.level) + '%';
            for (var i = 0; i < this.level; i++) {
                listsHtml += '<div class="hui-picker-list" huiseindex="0" huisevalue="0" huisetext="" levelNumber="' + i + '" style="width:' + cWidth + ';"></div>';
            }
            this.pickerMain.find('.hui-picker-list-in').eq(0).html(listsHtml);
        }
        this.listAll = this.pickerMain.find('.hui-picker-list');
        var html = '';
        for (var ii = 0; ii < data.length; ii++) { html += '<div pickVal="' + data[ii].value + '">' + data[ii].text + '</div>'; }
        this.listAll.eq(index).html('<div style="height:96px;"><input type="hidden" value="0" /></div>' + html + '<div style="height:66px;"></div>');
        this.listAll.eq(index).dom[0].addEventListener('scroll', this.scrollFun);
        //默认第一个被选中
        this.listAll.eq(index).find('div').eq(1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
        if (typeof (data[0]) != 'undefined') {
            this.listAll.eq(index).attr('huisevalue', data[0].value);
            this.listAll.eq(index).attr('huisetext', data[0].text);
        }
    }
    this.bindRelevanceData = function (data) {
        this.dataSave = data;
        //加载选项列表
        var lists = this.pickerMain.find('.hui-picker-list');
        if (lists.length < 1) {
            var listsHtml = '';
            var cWidth = parseInt(100 / this.level) + '%';
            for (var i = 0; i < this.level; i++) {
                listsHtml += '<div class="hui-picker-list" huiseindex="0" huisevalue="0" huisetext="" levelNumber="' + i + '" style="width:' + cWidth + ';"></div>';
            }
            this.pickerMain.find('.hui-picker-list-in').eq(0).html(listsHtml);
        }
        this.listAll = this.pickerMain.find('.hui-picker-list');
        //循环设置选项
        var newData = data;
        for (var i = 0; i < this.level; i++) {
            if (i >= 1) {
                if (newData[0].children) { newData = newData[0].children; } else { newData = new Array(); }
            }
            this.listAll.eq(i).html('');
            var html = '';
            for (var ii = 0; ii < newData.length; ii++) { html += '<div pickVal="' + newData[ii].value + '">' + newData[ii].text + '</div>'; }
            this.listAll.eq(i).html('<div style="height:96px;"><input type="hidden" value="0" /></div>' + html + '<div style="height:66px;"></div>');
            this.listAll.eq(i).dom[0].addEventListener('scroll', this.scrollFun);
            //默认第一个被选中
            this.listAll.eq(i).find('div').eq(1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
            if (typeof (newData[0]) != 'undefined') {
                this.listAll.eq(i).attr('huisevalue', newData[0].value);
                this.listAll.eq(i).attr('huisetext', newData[0].text);
            }
        }
    }
    this.scrollFun = function () {
        var scTop = this.scrollTop, scObj = this;
        if (HUI_PickerTimer != null) { clearTimeout(HUI_PickerTimer); }
        HUI_PickerTimer = setTimeout(function () { thisObj.scrollDo(scTop, scObj); }, 50);
    }
    this.scrollDo = function (scTop, scObj) {
        scObj.removeEventListener('scroll', this.scrollFun);
        var cList = hui(scObj), index = Math.round(scTop / 30), oldIndex = scObj.getAttribute('huiseindex');
        scObj.setAttribute('huiseindex', index);
        var selectDom = cList.find('div').eq(index + 1);
        scObj.setAttribute('huisevalue', selectDom.attr('pickVal'));
        scObj.setAttribute('huisetext', selectDom.html());
        scObj.scrollTop = index * 30;
        cList.find('div').eq(index + 1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize, 'transform': 'scale(1)' }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
        var levelNumber = Number(scObj.getAttribute('levelNumber'));
        if (levelNumber < this.level - 1 && thisObj.relevance) {
            if (oldIndex != index) { this.nextReBind(index, levelNumber + 1); }
        }
        setTimeout(function () { scObj.addEventListener('scroll', thisObj.scrollFun); }, 100);
    }
    this.setSelectedTexts = function (texts) {
        var allList = this.pickerMain.find('.hui-picker-list');
        for (var i = 0; i < texts.length; i++) {
            var clist = allList.eq(i);
            var items = clist.find("[pickVal]");
            for (var j = 0; j < items.length; j++) {
                if (items.eq(j).html() == texts[i]) {
                    this.scrollDo(30 * j, clist.dom[0]);
                    break;
                }
            }
        }
    }
    this.setSelectedVals = function (vals) {
        var allList = this.pickerMain.find('.hui-picker-list');
        for (var i = 0; i < vals.length; i++) {
            var clist = allList.eq(i);
            var items = clist.find("[pickVal]");
            for (var j = 0; j < items.length; j++) {
                if (items.eq(j).attr('pickval') == vals[i]) {
                    this.scrollDo(30 * j, clist.dom[0]);
                    break;
                }
            }
        }
    }
    this.nextReBind = function (index, level) {
        var allList = this.pickerMain.find('.hui-picker-list');
        var bindList = allList.eq(level);
        bindList.html('');
        var html = '', newData = this.dataSave;
        //向上逐层寻找
        for (var k = 0; k < level; k++) {
            var pIndex = allList.eq(k).attr('huiseindex');
            if (newData[pIndex].children) {
                newData = newData[pIndex].children;
            } else {
                newData = new Array();
            }
        }
        if (newData.length > 0) {
            for (var ii = 0; ii < newData.length; ii++) { html += '<div pickVal="' + newData[ii].value + '">' + newData[ii].text + '</div>'; }
            bindList.html('<div style="height:96px;"></div>' + html + '<div style="height:66px;"></div>');
            bindList.dom[0].scrollTop = 0;
            bindList.dom[0].setAttribute('huiseindex', 0);
            bindList.dom[0].setAttribute('huisevalue', newData[0].value);
            bindList.dom[0].setAttribute('huisetext', newData[0].text);
        } else {
            bindList.dom[0].setAttribute('huiseindex', 0);
            bindList.dom[0].setAttribute('huisevalue', 0);
            bindList.dom[0].setAttribute('huisetext', '');
        }
        if (newData.length > 0) {
            allList.eq(level).find('div').eq(1).css({ color: this.selectedColor, 'fontSize': this.selectedFontSize }).siblings().css({ color: this.unSelectedColor, 'fontSize': this.unSelectedFontSize });
        }
        if (level < this.level - 1) { this.nextReBind(0, level + 1); }
    }

    this.getVal = function (index) {
        if (!index) { index = 0; }
        return this.pickerMain.find('.hui-picker-list').eq(index).attr('huisevalue');
    }
    this.getText = function (index) {
        if (!index) { index = 0; }
        return this.pickerMain.find('.hui-picker-list').eq(index).attr('huisetext');
    }
}
hui.extend('popoverMsg', function (directionX, directionY, msg, width, height, addSets) {
    if (this.length < 1) { return; }
    if (!directionX) { directionX = 'left'; }
    if (!directionY) { directionY = 'down'; }
    if (!addSets) { addSets = { left: 0, top: 0 }; }
    if (!width) { width = this.width(); }
    if (!height) { height = 'auto'; } else { height += 'px'; }
    var thisObj = this;
    this.dom[0].onclick = function () {
        hui.maskShow();
        var HUI_PopoverMsg = document.getElementById('hui-popover-msg');
        if (!HUI_PopoverMsg) {
            HUI_PopoverMsg = document.createElement('div');
            HUI_PopoverMsg.setAttribute('id', 'hui-popover-msg');
            document.body.appendChild(HUI_PopoverMsg);
        }
        HUI_PopoverMsg.style.width = width + 'px';
        var heightStyle = '', sets = thisObj.offset();
        if (height != 'auto') { heightStyle = ' style="height:' + height + '; overflow-Y:auto;"' }
        if (directionX == 'left' && directionY == 'down') {
            HUI_PopoverMsg.innerHTML = '<div><div class="hui-arrow-up"></div></div><div id="hui-popover-msg-text"' + heightStyle + '>' + msg + '</div>';
            HUI_PopoverMsg.style.top = sets.top + thisObj.height() + addSets.top + 'px';
            HUI_PopoverMsg.style.left = sets.left + addSets.left + 'px';
        } else if (directionX == 'right' && directionY == 'down') {
            HUI_PopoverMsg.innerHTML = '<div><div class="hui-arrow-up hui-fr"></div></div><div id="hui-popover-msg-text"' + heightStyle + '>' + msg + '</div>';
            HUI_PopoverMsg.style.top = sets.top + thisObj.height() + addSets.top + 'px';
            HUI_PopoverMsg.style.left = sets.left + thisObj.width() - width + addSets.left + 'px';
        } else if (directionX == 'left' && directionY == 'up') {
            HUI_PopoverMsg.innerHTML = '<div id="hui-popover-msg-text"' + heightStyle + '>' + msg + '</div><div><div class="hui-arrow-down"></div></div>';
            HUI_PopoverMsg.style.top = sets.top - hui(HUI_PopoverMsg).height() + addSets.top + 'px';
            HUI_PopoverMsg.style.left = sets.left + addSets.left + 'px';
        } else if (directionX == 'right' && directionY == 'up') {
            HUI_PopoverMsg.innerHTML = '<div id="hui-popover-msg-text"' + heightStyle + '>' + msg + '</div><div><div class="hui-arrow-down hui-fr"></div></div>';
            HUI_PopoverMsg.style.top = sets.top - hui(HUI_PopoverMsg).height() + addSets.top + 'px';
            HUI_PopoverMsg.style.left = sets.left + thisObj.width() - width + addSets.left + 'px';
        }
        document.body.appendChild(HUI_PopoverMsg);
        hui('#hui-mask').click(function () { hui.maskHide(); hui(HUI_PopoverMsg).remove(); });
    };
});
hui.extend('selectBeautify', function (callBack, isIcon) {
    if (this.length != 1) { return false; } if (typeof (isIcon) == 'undefined') { isIcon = true; }
    this.hide();
    this.selectParent = this.parent();
    this.selectHtml = this.dom[0].options[this.dom[0].selectedIndex].text;
    var div = document.createElement('div');
    div.innerHTML = this.selectHtml + ' <span class="hui-icons hui-icons-down2"></span>';
    hui(div).appendTo(this.selectParent);
    this.selectMenuParent = hui('#hui-select-beautify');
    if (this.selectMenuParent.length < 1) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'hui-select-beautify');
        document.body.appendChild(dom);
        this.selectMenuParent = hui('#hui-select-beautify');
    }
    var thisObj = this;
    this.selectParent.click(function () {
        var sets = hui.offset(this), heigth = hui(this).height(true);
        thisObj.selectMenuParent.css({ top: (sets.top + heigth) + 'px' });
        var selectListHtml = '<div><ul>';
        var sedIndexVal = thisObj.dom[0].selectedIndex;
        for (var i = 0; i < thisObj.dom[0].options.length; i++) {
            if (i == sedIndexVal && isIcon) {
                selectListHtml += '<li class="hui-select-beautify-sed" liIndex="' + i + '">' + thisObj.dom[0].options[i].text + '</li>';
            } else {
                selectListHtml += '<li liIndex="' + i + '">' + thisObj.dom[0].options[i].text + '</li>';
            }
        }
        selectListHtml += '</ul></div>';
        thisObj.selectMenuParent.html(selectListHtml);
        thisObj.selectMenuParent.show();
        var lis = thisObj.selectMenuParent.find('li');
        lis.click(function () {
            var cIndex = Number(this.getAttribute('liIndex'));
            thisObj.dom[0].selectedIndex = cIndex;
            thisObj.selectParent.find('div').html(thisObj.dom[0].options[cIndex].text + ' <span class="hui-icons hui-icons-down2"></span>');
            thisObj.selectMenuParent.hide();
            if (callBack) { callBack(thisObj.dom[0].value); }
        });
        hui('#hui-mask').click(function () {
            thisObj.selectMenuParent.hide();
        });
    });
});
hui.refreshY = 0, hui.refreshIng = false, hui.refreshTitle, hui.refreshIcon1, hui.refreshNumber = 0, hui.loadMoreText = '';
hui.refresh = function (selector, func, icons1, icons2, loading) {
    if (!icons1) { icons1 = '<span class="hui-icons hui-icons-down"></span>继续下拉刷新'; }
    hui.refreshIcon1 = icons1;
    if (!icons2) { icons2 = '<span class="hui-icons hui-icons-up"></span>释放立即刷新'; }
    if (!loading) { loading = '<div class="hui-loading-wrap"><div class="hui-loading" style="margin:18px 5px 0px 0px;"></div><div class="hui-loading-text">加载中</div></div>'; }
    var dom = hui(selector); hui.refreshTitle = dom.find('.hui-refresh-icon');
    hui.refreshTitle.html(icons1);
    var huiRefreshStartY = 0, winInfo;
    dom.dom[0].addEventListener('touchstart', function (e) {
        hui.refreshY = 0;
        winInfo = hui.winInfo();
        huiRefreshStartY = e.touches[0].clientY;
    }, false);
    dom.dom[0].addEventListener('touchmove', function (e) {
        if (winInfo.scrollTop > 1) { return false; }
        hui.refreshY = e.changedTouches[0].clientY - huiRefreshStartY;
        hui.refreshY = hui.refreshY / 4;
        if (hui.refreshY < 1 || hui.refreshY >= 60) { return; }
        if (hui.refreshY >= 50) { hui.refreshTitle.html(icons2); }
        hui.refreshTitle.css({ 'marginTop': (hui.refreshY - 60) + 'px' });
    }, false);
    dom.dom[0].addEventListener('touchend', function (e) {
        if (hui.refreshIng) { return false; }
        if (winInfo.scrollTop > 1) { return false; }
        if (hui.refreshY >= 50) {
            hui.refreshIng = true;
            hui.refreshTitle.html(loading);
            hui.refreshNumber++;
            func();
        } else {
            hui.refreshIng = false;
            hui.refreshTitle.css({ 'marginTop': '-60px' });
        }
    }, false);
    hui.refreshIng = true;
    func();
}
hui.endRefresh = function () {
    hui.refreshIng = false;
    hui.refreshTitle.css({ 'marginTop': '-60px' });
    hui.refreshTitle.html(hui.refreshIcon1);
}
/* 上拉加载更多 */
hui.loadMoreEnd = false;
hui.loadMore = function (func, title, loading) {
    if (!title) { title = '<span class="hui-icons hui-icons-up"></span>上拉加载更多'; }
    if (!loading) { loading = '<div class="hui-loading-wrap"><div class="hui-loading" style="margin:8px 5px 0px 0px;"></div><div class="hui-loading-text">加载中</div></div>'; }
    hui.loadMoreText = title;
    var dom = hui('#hui-load-more'), winInfo = hui.winInfo();
    if (dom.length < 1) {
        dom = document.createElement('div');
        dom.setAttribute('id', 'hui-load-more');
        dom.innerHTML = title;
        document.body.appendChild(dom);
        dom = hui('#hui-load-more');
    }
    var loadMoreTimer = null;
    hui.onScroll(function (e) {
        if (hui.refreshIng || hui.loadMoreEnd) { return false; }
        if (loadMoreTimer != null) { clearTimeout(loadMoreTimer); }
        loadMoreTimer = setTimeout(function () {
            var sets = dom.offset();
            if (sets.top < e + winInfo.height) {
                hui.refreshIng = true;
                dom.html(loading);
                func();
            }
        }, 200);
    });
}
hui.endLoadMore = function (isEnd, endMsg) {
    if (!endMsg) { endMsg = '已经加载全部'; }
    var dom = hui('#hui-load-more');
    if (isEnd) { dom.html(endMsg); hui.loadMoreEnd = true; }
    hui.refreshIng = false;
}
hui.resetLoadMore = function () {
    hui.loadMoreEnd = false;
    hui('#hui-load-more').html(hui.loadMoreText);
}
function huiStar(selector) {
    this.dom = hui(selector);
    this.starNum = 5;
    this.size = 35;
    this.color = '#CCCCCC';
    this.colorActive = '#F9BE66';
    var _self = this;
    this.draw = function () {
        if (this.dom.length < 1) { return; }
        var starHtml = '';
        for (var i = 0; i < this.starNum; i++) {
            starHtml += '<div class="hui-fl hui-icons hui-icons-star" style="font-size:' + this.size + 'px; color:' + this.color + ';" starVal="' + (i + 1) + '"></div>';
        }
        this.dom.html(starHtml);
        this.dom.find('div').click(function () {
            var starVal = this.getAttribute('starVal');
            var stars = _self.dom.find('div');
            stars.css({ color: _self.color });
            _self.dom.attr('starVal', starVal);
            for (var i = 0; i < starVal; i++) {
                stars.dom[i].style.color = _self.colorActive;
            }
            if (_self.change) { _self.change(starVal); }
        });
    }
    this.getVal = function () {
        var starVal = this.dom.attr('starVal');
        if (!starVal) { return 0; }
        return Number(starVal);
    }
}
function huiSwipe(selector) {
    this.swipe = hui(selector);
    this.swipeIn = this.swipe.find('.hui-swipe-items')
    this.items = this.swipe.find('.hui-swipe-item');
    this.itemSize = this.items.length;
    this.realSize = this.items.length + 2;
    this.scale = 1 / this.realSize;
    this.swipeIn.css({ width: this.realSize * 100 + '%' });
    this.items.css({ width: this.scale * 100 + '%' });
    this.width = this.swipe.width();
    this.index = 1;
    this.speed = 1000;
    this.delay = 5000;
    this.timer = null;
    this.indicatorOn = true;
    this.autoPlay = true;
    var _self = this;
    var lastItem = this.items.last();
    this.items.eq(0).clone().appendTo(this.swipeIn);
    lastItem.clone().prependTo(this.swipeIn);
    this.items = this.swipe.find('.hui-swipe-item');
    this.swipeIn.css({ transform: 'translate3d(' + this.scale * -100 + '%, 0px, 0px)' });
    /* 进度标示 */
    this.indicator = this.swipe.find('.hui-swipe-indicator');
    if (this.indicator.length < 1) {
        var indicatorDom = document.createElement('div');
        indicatorDom.setAttribute('class', 'hui-swipe-indicator');
        var html = '<div class="hui-fr">';
        for (var i = 0; i < this.itemSize; i++) { html += '<div class="hui-swipe-indicators"></div>'; }
        indicatorDom.innerHTML = html + '</div>';
        hui(indicatorDom).appendTo(this.swipe);
    }
    this.indicator = this.swipe.find('.hui-swipe-indicator');
    this.indicator.find('.hui-swipe-indicators').eq(0).addClass('hui-swipe-indicator-active');
    this.items.show();
    this.changeIndicator = function (index) {
        setTimeout(function () {
            _self.indicator.find('.hui-swipe-indicators').removeClass('hui-swipe-indicator-active');
            _self.indicator.find('.hui-swipe-indicators').eq(index - 1).addClass('hui-swipe-indicator-active');
        }, 500);
    };
    //监测滑动
    this.swpieMove = 0;
    this.swipe.swipe(function (e) {
        if (_self.timer) { clearTimeout(_self.timer); }
        _self.moveScale = e.deltaX / _self.width * - 1 * _self.scale * 1.5;
        _self.moveScale += (_self.index) * _self.scale;
        _self.swipeIn.dom[0].style.transform = 'translate3d(' + (_self.moveScale * -100) + '%, 0px, 0px)';
    });
    this.swipe.swipeEnd(function (e) {
        _self.index = Math.round(_self.moveScale / _self.scale);
        _self.change();
    });
    this.change = function () {
        if (_self.timer) { clearTimeout(_self.timer); }
        _self.swipeIn.dom[0].style.transform = 'translate3d(' + (_self.scale * _self.index * -100) + '%, 0px, 0px)';
        _self.swipeIn.dom[0].style.transition = 'linear 300ms';
        setTimeout(function () { _self.swipeIn.dom[0].style.transition = 'none'; }, 300);
        if (_self.index < 1) {
            _self.index = this.itemSize;
            setTimeout(function () {
                _self.swipeIn.dom[0].style.transform = 'translate3d(' + (_self.scale * _self.index * -100) + '%, 0px, 0px)';
                _self.swipeIn.dom[0].style.transition = 'none';
            }, 200);
            _self.changeIndicator(_self.index);
        } else if (_self.index > _self.itemSize) {
            _self.index = 1;
            setTimeout(function () {
                _self.swipeIn.dom[0].style.transform = 'translate3d(' + (_self.scale * _self.index * -100) + '%, 0px, 0px)';
                _self.swipeIn.dom[0].style.transition = 'none';
            }, 200);
            _self.changeIndicator(_self.index);
        } else {
            _self.changeIndicator(_self.index);
        }
        if (_self.autoPlay) { _self.timer = setTimeout(function () { _self.index++; _self.change(); }, _self.delay); }
    };
    this.run = function () {
        if (this.autoPlay) { this.timer = setTimeout(_self.change, _self.delay); }
        if (this.indicatorOn) { this.indicator.show(); }
    }
}
hui.tab = function (selector) {
    var tabLists = hui(selector);
    for (var i = 0; i < tabLists.length; i++) { var tabRun = new huiTabListBase(tabLists.dom[i]); }
}
huiTabListBase = function (dom) {
    this.swipe = hui(dom);
    this.swipeIn = this.swipe.find('.hui-tab-body-items')
    this.items = this.swipe.find('.hui-tab-item');
    this.itemSize = this.items.length;
    this.scale = 1 / this.itemSize;
    this.swipeIn.css({ width: this.itemSize * 100 + '%' });
    this.items.css({ width: this.scale * 100 + '%' });
    this.width = this.swipe.width();
    this.index = 0;
    this.titles = this.swipe.find('.hui-tab-title');
    this.titles.find('div').css({ width: this.scale * 100 + '%' });
    this.titles.find('div').first().addClass('hui-tab-active');
    this.titles.find('div').click(function () {
        _self.index = hui(this).index()
        _self.changeTo();
    });
    var _self = this;
    //监测滑动
    this.swipeIn.swipe(function (e) {
        this.isMove = true;
        if (_self.index >= _self.itemSize - 1 && e.deltaX < 0) {
            this.isMove = false;
            return false;
        } else if (_self.index == 0 && e.deltaX > 0) {
            this.isMove = false;
            return false;
        }
        _self.moveScale = e.deltaX / _self.width * - 1 * _self.scale * 1.5;
        _self.moveScale += (_self.index) * _self.scale;
        _self.swipeIn.dom[0].style.transform = 'translate3d(' + (_self.moveScale * -100) + '%, 0px, 0px)';
    });
    this.swipeIn.swipeEnd(function (e) {
        if (!this.isMove) { return false; }
        _self.index = Math.round(_self.moveScale / _self.scale);
        _self.changeTo();
    });
    this.changeTo = function () {
        _self.swipeIn.dom[0].style.transform = 'translate3d(' + (_self.scale * _self.index * -100) + '%, 0px, 0px)';
        _self.swipeIn.dom[0].style.transition = 'linear 300ms';
        setTimeout(function () { _self.swipeIn.dom[0].style.transition = 'none'; }, 300);
        _self.titles.find('div').removeClass('hui-tab-active');
        _self.titles.find('div').eq(_self.index).addClass('hui-tab-active');
    };
}
function huiTouchPwd(sets, callBack) {
    this.sets = sets;
    this.init = function () {
        var wrap = document.getElementById(this.sets.wrapDiv);
        var html = '<canvas id="huiH5LookCanvas" width="' + this.sets.width + '" height="' + this.sets.height + '" display:inline-block;"></canvas>';
        wrap.innerHTML = html;
        this.canvas = document.getElementById('huiH5LookCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.createCircle();
        var self = this;
        this.canvas.addEventListener("touchstart", function (e) {
            e.preventDefault();
            var po = self.getPosition(e);
            for (var i = 0; i < self.arr.length; i++) {
                if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                    self.touchStart = { x: self.arr[i].x, y: self.arr[i].y };
                    self.lastPoint.push(self.arr[i]);
                    self.drawPoint();
                    break;
                }
            }
        }, false);
        this.canvas.addEventListener("touchmove", function (e) {
            if (self.touchStart) { self.move(self.getPosition(e)); }
        }, false);
        this.canvas.addEventListener("touchend", function (e) {
            if (!self.touchStart) { return false; }
            self.touchStart = null;
            var pwd = '';
            for (var i = 0; i < self.lastPoint.length; i++) {
                pwd += self.lastPoint[i].index;
            }
            callBack(pwd);
            setTimeout(function () { self.createCircle(); }, 300);
        }, false);
    }
    this.move = function (po) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.arr.length; i++) { this.drawCle(this.arr[i].x, this.arr[i].y); }
        this.drawPoint();
        this.drawLine(po);
        for (var i = 0; i < this.arr.length; i++) {
            var pt = this.arr[i];
            if (Math.abs(po.x - pt.x) < this.r && Math.abs(po.y - pt.y) < this.r) {
                if (this.lastPoint[this.lastPoint.length - 1] != pt) { this.lastPoint.push(pt); }
                this.drawPoint();
                break;
            }
        }
    }
    //绘制线条
    this.drawLine = function (po) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#3388FF';
        this.ctx.moveTo(this.touchStart.x, this.touchStart.y);
        for (var i = 1; i < this.lastPoint.length; i++) { this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y); }
        this.ctx.lineTo(po.x, po.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    //绘制圆心
    this.drawPoint = function (x, y) {
        for (var i = 0; i < this.lastPoint.length; i++) {
            this.ctx.fillStyle = '#3399FF';
            this.ctx.beginPath();
            this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
    //获取touch点相对于canvas的坐标
    this.getPosition = function (e) {
        var rect = e.currentTarget.getBoundingClientRect();
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    this.createCircle = function () {
        var n = this.sets.pointNum;
        var count = 0;
        this.r = this.ctx.canvas.width / (2 + 4 * n);
        this.lastPoint = [];
        this.arr = [];
        var r = this.r;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                count++;
                var obj = {
                    x: j * 4 * r + 3 * r,
                    y: i * 4 * r + 3 * r,
                    index: count
                };
                this.arr.push(obj);
            }
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.arr.length; i++) { this.drawCle(this.arr[i].x, this.arr[i].y); }
    }
    this.drawCle = function (x, y) {
        this.ctx.strokeStyle = '#CCC';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    this.init();
}
function huiWaterfall(idSelector) {
    this.Waterfall = hui(idSelector);
    if (this.Waterfall.length != 1) {
        console.log('请使用id选择器');
        return false;
    }
    this.WaterfallLeft = hui('#hui-water-fall-left');
    if (this.WaterfallLeft.length < 1) {
        var div = document.createElement('div');
        div.setAttribute('id', 'hui-water-fall-left');
        this.Waterfall.dom[0].appendChild(div);
        this.WaterfallLeft = hui('#hui-water-fall-left');
    }
    this.WaterfallRight = hui('#hui-water-fall-right');
    if (this.WaterfallRight.length < 1) {
        var div = document.createElement('div');
        div.setAttribute('id', 'hui-water-fall-right');
        this.Waterfall.dom[0].appendChild(div);
        this.WaterfallRight = hui('#hui-water-fall-right');
    }
    this.WaterTmp = hui('#HUI_WaterTmp');
    if (this.WaterTmp.length < 1) {
        var div = document.createElement('div');
        div.setAttribute('id', 'hui-water-tmp');
        this.Waterfall.dom[0].appendChild(div);
        this.WaterTmp = hui('#hui-water-tmp');
    }
    this.addItems = function (doms) {
        this.WaterTmp.html(doms);
        var items = this.WaterTmp.find('.hui-water-items');
        for (var i = 0; i < items.length; i++) {
            if (i % 2 != 0) {
                hui(items.dom[i]).appendTo(this.WaterfallRight);
            } else {
                hui(items.dom[i]).appendTo(this.WaterfallLeft);
            }
        }
    }
}