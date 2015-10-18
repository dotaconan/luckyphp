!function(){function e(e){return e.replace(b,"").replace(w,",").replace(E,"").replace(S,"").replace(x,"").split(T)}function t(e){return"'"+e.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function n(n,r){function i(e){return h+=e.split(/\n/).length-1,l&&(e=e.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),e&&(e=y[1]+t(e)+y[2]+"\n"),e}function s(t){var n=h;if(f?t=f(t,r):o&&(t=t.replace(/\n/g,function(){return h++,"$line="+h+";"})),0===t.indexOf("=")){var i=c&&!/^=[=#]/.test(t);if(t=t.replace(/^=[=#]?|[\s;]*$/g,""),i){var s=t.replace(/\s*\([^\)]+\)/,"");p[s]||/^(include|print)$/.test(s)||(t="$escape("+t+")")}else t="$string("+t+")";t=y[1]+t+y[2]}return o&&(t="$line="+n+";"+t),g(e(t),function(e){if(e&&!v[e]){var t;t="print"===e?w:"include"===e?E:p[e]?"$utils."+e:d[e]?"$helpers."+e:"$data."+e,S+=e+"="+t+",",v[e]=!0}}),t+"\n"}var o=r.debug,u=r.openTag,a=r.closeTag,f=r.parser,l=r.compress,c=r.escape,h=1,v={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},m="".trim,y=m?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],b=m?"$out+=text;return $out;":"$out.push(text);",w="function(){var text=''.concat.apply('',arguments);"+b+"}",E="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+b+"}",S="var $utils=this,$helpers=$utils.$helpers,"+(o?"$line=0,":""),x=y[0],T="return new String("+y[3]+");";g(n.split(u),function(e){e=e.split(a);var t=e[0],n=e[1];1===e.length?x+=i(t):(x+=s(t),n&&(x+=i(n)))});var N=S+x+T;o&&(N="try{"+N+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+t(n)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var C=new Function("$data","$filename",N);return C.prototype=p,C}catch(k){throw k.temp="function anonymous($data,$filename) {"+N+"}",k}}var r=function(e,t){return"string"==typeof t?m(t,{filename:e}):o(e,t)};r.version="3.0.0",r.config=function(e,t){i[e]=t};var i=r.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},s=r.cache={};r.render=function(e,t){return m(e,t)};var o=r.renderFile=function(e,t){var n=r.get(e)||v({filename:e,name:"Render Error",message:"Template not found"});return t?n(t):n};r.get=function(e){var t;if(s[e])t=s[e];else if("object"==typeof document){var n=document.getElementById(e);if(n){var r=(n.value||n.innerHTML).replace(/^\s*|\s*$/g,"");t=m(r,{filename:e})}}return t};var u=function(e,t){return"string"!=typeof e&&(t=typeof e,"number"===t?e+="":e="function"===t?u(e.call(e)):""),e},a={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},f=function(e){return a[e]},l=function(e){return u(e).replace(/&(?![\w#]+;)|[<>"']/g,f)},c=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},h=function(e,t){var n,r;if(c(e))for(n=0,r=e.length;r>n;n++)t.call(e,e[n],n,e);else for(n in e)t.call(e,e[n],n)},p=r.utils={$helpers:{},$include:o,$string:u,$escape:l,$each:h};r.helper=function(e,t){d[e]=t};var d=r.helpers=p.$helpers;r.onerror=function(e){var t="Template Error\n\n";for(var n in e)t+="<"+n+">\n"+e[n]+"\n\n";"object"==typeof console&&console.error(t)};var v=function(e){return r.onerror(e),function(){return"{Template Error}"}},m=r.compile=function(e,t){function r(n){try{return new a(n,u)+""}catch(r){return t.debug?v(r)():(t.debug=!0,m(e,t)(n))}}t=t||{};for(var o in i)void 0===t[o]&&(t[o]=i[o]);var u=t.filename;try{var a=n(e,t)}catch(f){return f.filename=u||"anonymous",f.name="Syntax Error",v(f)}return r.prototype=a.prototype,r.toString=function(){return a.toString()},u&&t.cache&&(s[u]=r),r},g=p.$each,y="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",b=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,w=/[^\w$]+/g,E=new RegExp(["\\b"+y.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),S=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,T=/^$|,+/;i.openTag="{{",i.closeTag="}}";var N=function(e,t){var n=t.split(":"),r=n.shift(),i=n.join(":")||"";return i&&(i=", "+i),"$helpers."+r+"("+e+i+")"};i.parser=function(e){e=e.replace(/^\s/,"");var t=e.split(" "),n=t.shift(),i=t.join(" ");switch(n){case"if":e="if("+i+"){";break;case"else":t="if"===t.shift()?" if("+t.join(" ")+")":"",e="}else"+t+"{";break;case"/if":e="}";break;case"each":var s=t[0]||"$data",o=t[1]||"as",u=t[2]||"$value",a=t[3]||"$index",f=u+","+a;"as"!==o&&(s="[]"),e="$each("+s+",function("+f+"){";break;case"/each":e="});";break;case"echo":e="print("+i+");";break;case"print":case"include":e=n+"("+t.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(i)){var l=!0;0===e.indexOf("#")&&(e=e.substr(1),l=!1);for(var c=0,h=e.split("|"),p=h.length,d=h[c++];p>c;c++)d=N(d,h[c]);e=(l?"=":"=#")+d}else e=r.helpers[n]?"=#"+n+"("+t.join(",")+");":"="+e}return e},"function"==typeof define?define("lib/plugin/template.min",[],function(){return r}):"undefined"!=typeof exports?module.exports=r:this.template=r}(),define("services/worksService",["jquery"],function($){var urlContainer={root:"static/scripts/data/",workList:"home-works-list.json",newsList:"home-news.json"};return{getWorkList:function(opt){var callback=opt.callback||$.noop,data=opt.data||"",beforeFunction=opt.beforeFunction||$.noop;beforeFunction&&typeof beforeFunction=="function"&&beforeFunction(opt);var url=urlContainer.root+urlContainer.workList;$.ajax({url:url,type:"get",async:!0,cache:!1,data:data,dataType:"json",success:function(e){},complete:function(xhr,message){opt.xhr=xhr;if(message=="success"){var responseText=xhr.responseText;opt.responseText=responseText;try{opt.jsondata=eval("("+responseText+")"),opt.errorMessage="",callback&&typeof callback=="function"&&callback(opt)}catch(e){opt.jsondata=null,opt.errorMessage="json数据不正确"}}else message=="error"&&(opt.jsondata=null,opt.errorMessage=xhr.statusText)}})},getNewsList:function(opt){var callback=opt.callback||$.noop,data=opt.data||"",beforeFunction=opt.beforeFunction||$.noop;beforeFunction&&typeof beforeFunction=="function"&&beforeFunction(opt);var url=urlContainer.root+urlContainer.newsList;$.ajax({url:url,type:"get",async:!0,cache:!1,data:data,dataType:"json",success:function(e){},complete:function(xhr,message){opt.xhr=xhr;if(message=="success"){var responseText=xhr.responseText;opt.responseText=responseText;try{opt.jsondata=eval("("+responseText+")"),opt.errorMessage="",callback&&typeof callback=="function"&&callback(opt)}catch(e){opt.jsondata=null,opt.errorMessage="json数据不正确"}}else message=="error"&&(opt.jsondata=null,opt.errorMessage=xhr.statusText)}})}}}),define("lib/control/slidePic",[],function(){function e(e){this.opt=e||{},this.box=this.opt.box||"#carousel",this.handle=this.opt.handle||".carousel-handle",this.handleEl=this.opt.handleEl||"span",this.list=this.opt.list||"ul",this.item=this.opt.item||"li",this.turnBtn=this.opt.turnBtn||".carousel-btn",this.delay=this.opt.delay||5e3,this.activeDelay=this.opt.activeDelay||!0,this.activeDelayTime=this.opt.activeDelayTime||300,this.speed=this.opt.speed||500,this.auto=this.opt.auto||!0,this.init(),this.callback=this.opt.callback||null}return e.prototype={init:function(){var e=this;e.index=0,e.box=$(e.box),e.list=e.box.find(e.list),e.items=e.list.find(e.item),e.turnBtn=e.box.find(e.turnBtn),e.handle=e.box.find(e.handle),e.initHandler(),e.btns=e.box.find(e.handle).find(e.handleEl),e.len=e.items.length,e.prev=e.items.eq(0),e.items.eq(0).css({zIndex:2}),e.timeHandle=0,e.tiptime=0,e.start()},initHandler:function(){var e=this,t=e.items.length;e.handle.empty();for(var n=0;n<t;n++)e.handle.append("<a href='javascript:void(0)'></a>");e.handle.find(e.handleEl).eq(0).addClass("on")},start:function(){function t(){e.timeHandle&&clearInterval(e.timeHandle),e.timeHandle=setInterval(function(){r()},e.delay)}function n(t){if(e.prev.index()==t)return;e.items.css({zIndex:"1"}),e.prev.css({zIndex:"2"});var n=e.items.eq(t).attr("data-backgroundImage");if(n){var r='<img src="'+n+'" width="100%" height="100%" />';e.items.eq(t).find("a").append(r)}e.items.eq(t).css({opacity:0,zIndex:"3"}).stop().animate({opacity:1},e.speed),e.btns.removeClass("on").eq(t).addClass("on"),e.index=t,e.prev=e.items.eq(t),e.callback&&typeof e.callback=="function"&&e.callback({box:e.box,index:e.index})}function r(){e.index=e.index>=e.len-1?e.index=0:e.index+=1,e.btns.eq(e.index).trigger("mouseover").trigger("mouseleave")}function i(){return e.index}var e=this;e.callback&&typeof e.callback=="function"&&e.callback({box:e.box,index:e.index}),e.btns.hover(function(t){var r=$(this),i=r.index(),t=t||window.event;t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,clearTimeout(e.tiptime),clearInterval(e.timeHandle),t.isTrigger==1?n(i):e.tiptime=setTimeout(function(){n(i)},e.activeDelayTime)},function(){clearTimeout(e.tiptime),t()}),t(),e.items.hover(function(){clearInterval(e.timeHandle)},function(){t()}),e.box.hover(function(){$.browser.msie&&$.browser.version>8?e.turnBtn.stop(!0,!0).fadeIn("fast"):e.turnBtn.show()},function(){$.browser.msie&&$.browser.version>8?e.turnBtn.stop(!0,!0).fadeOut("fast"):e.turnBtn.hide()}),e.turnBtn.live({mouseover:function(){e.timeHandle&&clearInterval(e.timeHandle),e.tiptime=0,e.timeHandle=0;var t=$(this);t.hasClass("carousel-prev")?t.addClass("carousel-prev-hover"):t.addClass("carousel-next-hover")},click:function(){var t=$(this).hasClass("carousel-prev"),r=i(),s=e.items.length-1;if(t){var o=r==0?s:r-1;n(o)}else{var u=r==s?0:r+1;n(u)}},mouseleave:function(){var e=$(this);e.hasClass("carousel-prev")?e.removeClass("carousel-prev-hover"):e.removeClass("carousel-next-hover"),t()}})}},e}),require&&require.config({baseUrl:"static/scripts",paths:{jquery:"lib/plugin/jquery",qrcode:"lib/qrcode/qrcode.min"},shim:{qrcode:["jquery"]}}),require(["jquery","lib/plugin/template.min","qrcode","services/worksService","lib/control/slidePic"],function(e,t,n,r,i){window.console||(window.console={log:function(e){}});var s=function(){return{init:function(){this.bindEvent(),this.initQrcode()},initQrcode:function(){setTimeout(function(){e("#qrcode").html("");if(e("#qrcode").qrcode){var t="table";try{var n=document.createElement("canvas").getContext("2d");t="canvas"}catch(r){t="table"}e("#qrcode").qrcode({render:t,width:116,height:116,color:"#3a3",text:"http://www.suning.com"})}},500)},bindEvent:function(){}}}();return s.init(),s}),define("home/page-home-index",function(){});