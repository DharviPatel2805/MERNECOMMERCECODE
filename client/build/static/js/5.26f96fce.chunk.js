(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1203:function(e,t,a){"use strict";a.r(t);var n=a(29),c=a(1),r=a.n(c),i=a(32),o=a(65),l=a(218),s=a.n(l),u=a(1222);t.default=function(){var e=Object(i.b)(),t=Object(i.c)(function(e){return Object(n.a)({},e)}),a=t.drawer,c=t.cart;return r.a.createElement(u.a,{className:"text-center",title:"Cart / ".concat(c.length," Product"),placement:"right",visible:a,onClose:function(){e({type:"SET_VISIBLE",payload:!1})}},c.map(function(e){return r.a.createElement("div",{key:e._id},r.a.createElement("div",null,e.images[0]?r.a.createElement("img",{src:e.images[0].url,style:{width:"auto",height:"100px",objectFit:"cover"}}):r.a.createElement("img",{src:s.a,style:{width:"auto",height:"100px",objectFit:"cover"}}),r.a.createElement("p",{className:"text-center bg-secondary text-light"},e.title," x ",e.count)))}),r.a.createElement(o.b,{to:"/cart"},r.a.createElement("button",{className:"btn text-center btn-info btn-block btn-raised ",onClick:function(){return e({type:"SET_VISIBLE",payload:!1})}},"Go To Cart")))}}}]);
//# sourceMappingURL=5.26f96fce.chunk.js.map