(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],function(b){return a(b)})}else{if(typeof module==="object"&&typeof module.exports==="object"){module.exports=a(require("jquery"))}else{a(jQuery)}}})(function(a){if(typeof a.easing!=="undefined"){a.easing.jswing=a.easing.swing}var j=Math.pow,l=Math.sqrt,k=Math.sin,h=Math.cos,i=Math.PI,c=1.70158,d=c*1.525,e=c+1,f=(2*i)/3,g=(2*i)/4.5;function b(o){var n=7.5625,m=2.75;if(o<1/m){return n*o*o}else{if(o<2/m){return n*(o-=(1.5/m))*o+0.75}else{if(o<2.5/m){return n*(o-=(2.25/m))*o+0.9375}else{return n*(o-=(2.625/m))*o+0.984375}}}}a.extend(a.easing,{def:"easeOutQuad",swing:function(m){return a.easing[a.easing.def](m)},easeInQuad:function(m){return m*m},easeOutQuad:function(m){return 1-(1-m)*(1-m)},easeInOutQuad:function(m){return m<0.5?2*m*m:1-j(-2*m+2,2)/2},easeInCubic:function(m){return m*m*m},easeOutCubic:function(m){return 1-j(1-m,3)},easeInOutCubic:function(m){return m<0.5?4*m*m*m:1-j(-2*m+2,3)/2},easeInQuart:function(m){return m*m*m*m},easeOutQuart:function(m){return 1-j(1-m,4)},easeInOutQuart:function(m){return m<0.5?8*m*m*m*m:1-j(-2*m+2,4)/2},easeInQuint:function(m){return m*m*m*m*m},easeOutQuint:function(m){return 1-j(1-m,5)},easeInOutQuint:function(m){return m<0.5?16*m*m*m*m*m:1-j(-2*m+2,5)/2},easeInSine:function(m){return 1-h(m*i/2)},easeOutSine:function(m){return k(m*i/2)},easeInOutSine:function(m){return -(h(i*m)-1)/2},easeInExpo:function(m){return m===0?0:j(2,10*m-10)},easeOutExpo:function(m){return m===1?1:1-j(2,-10*m)},easeInOutExpo:function(m){return m===0?0:m===1?1:m<0.5?j(2,20*m-10)/2:(2-j(2,-20*m+10))/2},easeInCirc:function(m){return 1-l(1-j(m,2))},easeOutCirc:function(m){return l(1-j(m-1,2))},easeInOutCirc:function(m){return m<0.5?(1-l(1-j(2*m,2)))/2:(l(1-j(-2*m+2,2))+1)/2},easeInElastic:function(m){return m===0?0:m===1?1:-j(2,10*m-10)*k((m*10-10.75)*f)},easeOutElastic:function(m){return m===0?0:m===1?1:j(2,-10*m)*k((m*10-0.75)*f)+1},easeInOutElastic:function(m){return m===0?0:m===1?1:m<0.5?-(j(2,20*m-10)*k((20*m-11.125)*g))/2:j(2,-20*m+10)*k((20*m-11.125)*g)/2+1},easeInBack:function(m){return e*m*m*m-c*m*m},easeOutBack:function(m){return 1+e*j(m-1,3)+c*j(m-1,2)},easeInOutBack:function(m){return m<0.5?(j(2*m,2)*((d+1)*2*m-d))/2:(j(2*m-2,2)*((d+1)*(m*2-2)+d)+2)/2},easeInBounce:function(m){return 1-b(1-m)},easeOutBounce:b,easeInOutBounce:function(m){return m<0.5?(1-b(1-2*m))/2:(1+b(2*m-1))/2}});return a});