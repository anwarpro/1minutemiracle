(function(A){function e(e){for(var n,c,i=e[0],a=e[1],u=e[2],l=0,d=[];l<i.length;l++)c=i[l],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(A[n]=a[n]);s&&s(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),t()}function t(){for(var A,e=0;e<o.length;e++){for(var t=o[e],n=!0,c=1;c<t.length;c++){var a=t[c];0!==r[a]&&(n=!1)}n&&(o.splice(e--,1),A=i(i.s=t[0]))}return A}var n={},r={app:0},o=[];function c(A){return i.p+"js/"+({about:"about"}[A]||A)+"."+{about:"99ed5b38"}[A]+".js"}function i(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return A[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(A){var e=[],t=r[A];if(0!==t)if(t)e.push(t[2]);else{var n=new Promise((function(e,n){t=r[A]=[e,n]}));e.push(t[2]=n);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.src=c(A);var u=new Error;o=function(e){a.onerror=a.onload=null,clearTimeout(l);var t=r[A];if(0!==t){if(t){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;u.message="Loading chunk "+A+" failed.\n("+n+": "+o+")",u.name="ChunkLoadError",u.type=n,u.request=o,t[1](u)}r[A]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:a})}),12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(e)},i.m=A,i.c=n,i.d=function(A,e,t){i.o(A,e)||Object.defineProperty(A,e,{enumerable:!0,get:t})},i.r=function(A){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},i.t=function(A,e){if(1&e&&(A=i(A)),8&e)return A;if(4&e&&"object"===typeof A&&A&&A.__esModule)return A;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:A}),2&e&&"string"!=typeof A)for(var n in A)i.d(t,n,function(e){return A[e]}.bind(null,n));return t},i.n=function(A){var e=A&&A.__esModule?function(){return A["default"]}:function(){return A};return i.d(e,"a",e),e},i.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},i.p="/",i.oe=function(A){throw console.error(A),A};var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var s=u;o.push([0,"chunk-vendors"]),t()})({0:function(A,e,t){A.exports=t("56d7")},"0867":function(A,e){A.exports="data:image/jpeg;base64,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"},"56d7":function(A,e,t){"use strict";t.r(e);t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("7a23"),r=t("cf05"),o=t.n(r),c={class:"bg-gray-100 min-h-screen overflow-x-hidden w-full px-24"},i={class:"shadow-lg my-1 px-2 py-10 text-gray-900  bg-white w-full"},a={class:"flex items-center mx-12"},u=Object(n["g"])("img",{alt:"Vue logo",class:"h-10 h-10 p-1 rounded-full bg-gray-200 mr-2",src:o.a},null,-1),l=Object(n["g"])("h3",{class:"text-sm font-semibold"},"#1MinuteMiracle",-1),s=Object(n["f"])("Home"),d=Object(n["f"])("Generate Link");function b(A,e,t,r,o,b){var f=Object(n["v"])("router-link"),g=Object(n["v"])("router-view");return Object(n["p"])(),Object(n["d"])("div",c,[Object(n["g"])("div",i,[Object(n["g"])("div",a,[u,l,Object(n["g"])(f,{to:"/",class:"mx-2 text-blue-500"},{default:Object(n["B"])((function(){return[s]})),_:1}),Object(n["g"])(f,{to:"/generate",class:"text-blue-500"},{default:Object(n["B"])((function(){return[d]})),_:1})]),Object(n["g"])("div",null,[Object(n["g"])(g)])])])}var f={name:"App",components:{}};t("64be");f.render=b;var g=f,j=(t("def6"),t("d3b7"),t("6c02"));function p(A,e,t,r,o,c){var i=Object(n["v"])("miracle");return Object(n["p"])(),Object(n["d"])(i)}var m=t("0867"),y=t.n(m),h=Object(n["F"])("data-v-38bc8f75");Object(n["s"])("data-v-38bc8f75");var v=Object(n["g"])("div",{class:"mx-12 mt-4"},[Object(n["g"])("p",null,[Object(n["f"])(" Sometimes short is all we need or can have. A short image or small sentence can stop suicide "),Object(n["g"])("br"),Object(n["f"])(" We all are smart and creative, we just need that one spark and creativity "),Object(n["g"])("br"),Object(n["g"])("br"),Object(n["f"])(" Sometimes we don’t need to know how to do something. We just need to know what to do and why to do it. ")])],-1),w=Object(n["g"])("h1",{class:"text-lg font-bold text-gray-300 text-center"},"...",-1),O={key:0,class:"mx-64 text-red-500"},x=Object(n["g"])("h1",{class:"text-lg font-bold text-gray-300 text-center"},"...",-1),M={class:"flex justify-center"},B={class:"flex justify-center my-2"},E={ref:"output",class:"flex-none flex flex-col shadow-lg bg-gray-100 py-3 px-12 w-100"},Q=Object(n["g"])("div",{class:"flex items-center justify-center"},[Object(n["g"])("img",{src:y.a,alt:"Profile pic",class:"w-12 h-12 rounded-full"}),Object(n["g"])("h3",{class:"text-md font-medium text-gray-800 ml-3"},"@Shejadul Karim")],-1),H={class:"flex-none my-3 text-center"},I={class:"text-md text-justify font-semibold"};Object(n["q"])();var U=h((function(A,e,t,r,o,c){return Object(n["p"])(),Object(n["d"])(n["a"],null,[v,w,o.editing?(Object(n["p"])(),Object(n["d"])("p",O,"After editing done press enter")):Object(n["e"])("",!0),Object(n["g"])("div",{class:"my-2 mx-64 editor shadow px-10 py-5",ref:"editor",onBlur:e[1]||(e[1]=Object(n["E"])((function(){return c.editEnd.apply(c,arguments)}),["prevent"])),onKeydown:e[2]||(e[2]=Object(n["D"])(Object(n["E"])((function(){return c.endEdit.apply(c,arguments)}),["prevent"]),["enter"])),innerHTML:o.motive},null,40,["innerHTML"]),x,Object(n["g"])("div",M,[Object(n["g"])("button",{onClick:e[3]||(e[3]=function(){return c.toggle.apply(c,arguments)}),class:"rounded-lg py-1 px-2 bg-red-500 shadow text-white hover:bg-red-600 text-center"},Object(n["x"])(o.editing?"Done":"Edit"),1),Object(n["g"])("button",{onClick:e[4]||(e[4]=function(){return c.drawText.apply(c,arguments)}),class:"ml-2 rounded-lg py-1 px-2 bg-green-500 shadow text-white hover:bg-green-600 text-center"},"Download ")]),Object(n["g"])("div",B,[Object(n["g"])("div",E,[Q,Object(n["g"])("div",H,[Object(n["g"])("blockquote",I,Object(n["x"])(c.stripedhtml),1)])],512)])],64)})),S=(t("4160"),t("25f0"),t("159b"),t("e774")),k={name:"Miracle",data:function(){return{editing:!1,original:"Confidence is <b>kicking</b> your <b>special one</b> without <b>any fear of losing her</b>.",motive:"Confidence is <b>kicking</b> your <b>special one</b> without <b>any fear of losing her</b>."}},computed:{stripedhtml:function(){var A=/(<([^>]+)>)/gi;return this.motive.replaceAll(A,"")}},mounted:function(){this.$route.query.motive&&!this.$route.query.motive.toString.length&&(this.original=this.$route.query.motive,this.motive=this.$route.query.motive)},methods:{editEnd:function(){this.toggle()},endEdit:function(){this.toggle(),this.motive=this.$refs["editor"].innerHTML},drawText:function(){var A=this;S["a"](this.$refs["output"]).then((function(e){A.download(e)})).catch((function(A){console.error("oops, something went wrong!",A)}))},download:function(A){var e,t="motivational.png",n=document.createElement("a");n.download=t,n.href=A,document.createEvent?(e=document.createEvent("MouseEvents"),e.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(e)):n.fireEvent&&n.fireEvent("onclick")},toggle:function(){var A=this;this.editing=!this.editing,this.$refs["editor"].querySelectorAll("b").forEach((function(e){e.contentEditable=A.editing,A.editing?(e.classList.add("bg-gray-300"),e.classList.add("text-gray-800"),e.classList.add("px-2"),e.classList.add("py-1"),e.classList.add("rounded")):e.className=" "}))}}};k.render=U,k.__scopeId="data-v-38bc8f75";var D=k,V={name:"Home",components:{Miracle:D}};V.render=p;var W=V,Y=[{path:"/",name:"Home",component:W},{path:"/generate",name:"About",component:function(){return t.e("about").then(t.bind(null,"6878"))}}],C=Object(j["a"])({history:Object(j["b"])(),routes:Y}),F=C;Object(n["c"])(g).use(F).mount("#app")},"64be":function(A,e,t){"use strict";t("c894")},c894:function(A,e,t){},cf05:function(A,e,t){A.exports=t.p+"img/logo.82b9c7a5.png"},def6:function(A,e,t){}});
//# sourceMappingURL=app.a530aaa3.js.map