(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1216:function(e,t,a){"use strict";a.r(t);var n=a(16),c=a(1),r=a.n(c),l=a(682),s=a.n(l);var o=function(e){var t=e.text;return r.a.createElement(s.a,{options:{strings:t,autoStart:!0,loop:!0}})},m=a(619),i=a(1224),u=a(697);var d=function(e){var t=e.count;return r.a.createElement("div",{className:"row"}," ",function(){for(var e=[],a=0;a<t;a++)e.push(r.a.createElement(i.a,{className:"col-md-4",key:a},r.a.createElement(u.a,{active:!0})));return e}()," ")},b=a(112),f=a(1211);var E=function(){var e=Object(c.useState)([]),t=Object(n.a)(e,2),a=t[0],l=t[1],s=Object(c.useState)(!1),o=Object(n.a)(s,2),i=o[0],u=o[1],E=Object(c.useState)(0),v=Object(n.a)(E,2),p=v[0],O=v[1],j=Object(c.useState)(1),g=Object(n.a)(j,2),N=g[0],h=g[1];Object(c.useEffect)(function(){S()},[N]),Object(c.useEffect)(function(){Object(b.f)().then(function(e){O(e.data),console.log(e.data)})},[]);var S=function(){u(!0),Object(b.e)("createdAt","desc",N).then(function(e){l(e.data),u(!1)})};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container "},i?r.a.createElement(d,{count:3}):r.a.createElement("div",{className:"row"},a.map(function(e){return r.a.createElement("div",{key:e._id,className:"col-md-4 pb-3"},r.a.createElement(m.a,{product:e}))}))),r.a.createElement("div",{className:"row"},r.a.createElement("nav",{className:"col-md-4 offset-md-4 text-center pt-4 "},r.a.createElement(f.a,{current:N,total:p/3*10,onChange:function(e){h(e),console.log(e)}}))))};var v=function(){var e=Object(c.useState)([]),t=Object(n.a)(e,2),a=t[0],l=t[1],s=Object(c.useState)(!1),o=Object(n.a)(s,2),i=o[0],u=o[1],E=Object(c.useState)(0),v=Object(n.a)(E,2),p=v[0],O=v[1],j=Object(c.useState)(1),g=Object(n.a)(j,2),N=g[0],h=g[1];Object(c.useEffect)(function(){S()},[N]),Object(c.useEffect)(function(){Object(b.f)().then(function(e){return O(e.data)})},[]);var S=function(){u(!0),Object(b.e)("sold","desc",N).then(function(e){l(e.data),u(!1)})};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},i?r.a.createElement(d,{count:3}):r.a.createElement("div",{className:"row"},a.map(function(e){return r.a.createElement("div",{key:e._id,className:"col-md-4 pb-3"},r.a.createElement(m.a,{product:e}))}))),r.a.createElement("div",{className:"row"},r.a.createElement("nav",{className:"col-md-4 offset-md-4 text-center pt-4 "},r.a.createElement(f.a,{defaultCurrent:N,total:p/3*10,onChange:function(e){return h(e)}}))))},p=a(65),O=a(89);var j=function(){var e=Object(c.useState)([]),t=Object(n.a)(e,2),a=t[0],l=t[1],s=Object(c.useState)(!1),o=Object(n.a)(s,2),m=o[0],i=o[1];return Object(c.useEffect)(function(){i(!0),Object(O.c)().then(function(e){l(e.data),i(!1)})},[]),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},m?r.a.createElement("h4",null,"Loading..."):a.map(function(e){return r.a.createElement("div",{key:e._id,className:"col btn btn-light  btn-raised m-3"},r.a.createElement(p.b,{to:"/category/".concat(e.slug),className:"font-weight-bold text-uppercase text-dark"},e.name))})))},g=a(167);var N=function(){var e=Object(c.useState)([]),t=Object(n.a)(e,2),a=t[0],l=t[1],s=Object(c.useState)(!1),o=Object(n.a)(s,2),m=o[0],i=o[1];return Object(c.useEffect)(function(){i(!0),Object(g.b)().then(function(e){l(e.data),i(!1)})},[]),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},m?r.a.createElement("h4",null,"Loading..."):a.map(function(e){return r.a.createElement("div",{key:e._id,className:"col btn btn-light  btn-raised m-3"},r.a.createElement(p.b,{to:"/sub/".concat(e.slug),className:"font-weight-bold text-uppercase text-dark"},e.name))})))},h=a(545);t.default=function(){var e=Object(c.useState)(["Latest Products","New Arrivals","Best Sellers"]),t=Object(n.a)(e,2),a=t[0],l=t[1];return Object(c.useEffect)(function(){Object(h.d)().then(function(e){e.data.map(function(e){e.set&&l(e.title)})})},[]),r.a.createElement("div",{className:"pl-0 pt-4 mt-5 relative"},r.a.createElement("div",{className:"jumbotron text-warning h1 text-center bgColor "},r.a.createElement(o,{text:a})),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col m-3"},r.a.createElement("h2",{className:" text-left m-2 "},r.a.createElement("b",{className:"h1"},"New Arrivals")),r.a.createElement("hr",{className:"bg-info border-2 border-top border-info "}))),r.a.createElement(E,null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col m-4"},r.a.createElement("h2",{className:" text-left m-2 "},r.a.createElement("b",{className:"h1"},"Best Sellers")),r.a.createElement("hr",{className:"bg-info border-2 border-top border-info "}))),r.a.createElement(v,null),r.a.createElement("h4",{className:"text-center text-white p-3 mt-5 mb-5 display-5 jumbotron bgColor"},"Categories"),r.a.createElement(j,null),r.a.createElement("h4",{className:"text-center text-white p-3 mt-5 mb-5 display-5 jumbotron bgColor"},"Sub Categories"),r.a.createElement(N,null),r.a.createElement("br",null),r.a.createElement("br",null))}},619:function(e,t,a){"use strict";var n=a(29),c=a(16),r=a(1),l=a.n(r),s=a(32),o=a(218),m=a.n(o),i=a(670),u=a(1224),d=a(243),b=a(1229),f=a(716),E=a(65),v=a(540),p=a.n(v),O=u.a.Meta;t.a=function(e){var t=e.product,a=Object(r.useState)("Click To Add"),o=Object(c.a)(a,2),v=o[0],j=o[1],g=t.title,N=t.description,h=t.images,S=t.slug,w=t.price,x=Object(s.b)();return l.a.createElement(l.a.Fragment,null,t&&t.ratings&&t.ratings.length>0?Object(i.a)(t):l.a.createElement("div",{className:"text-center pb-3 "},'"No Ratings Yet!"'),l.a.createElement(u.a,{hoverable:!0,cover:l.a.createElement("img",{alt:"",src:h&&h.length?h[0].url:m.a,style:{height:"150px",objectFit:"cover"},className:"p-2"}),actions:[l.a.createElement(E.b,{to:"/product/".concat(S)},l.a.createElement(b.a,{className:"text-success"}),l.a.createElement("br",null),"View Product"),l.a.createElement(d.a,{title:t.quantity>1&&v},l.a.createElement("a",{onClick:function(){var e=[];if("undefined"!==typeof window){localStorage.getItem("cart")&&(e=JSON.parse(localStorage.getItem("cart"))),e.push(Object(n.a)({},t,{count:1}));var a=p.a.uniqWith(e,p.a.isEqual);localStorage.setItem("cart",JSON.stringify(a)),j("Added"),x({type:"ADD_TO_CART",payload:a}),x({type:"SET_VISIBLE",payload:!0})}},disabled:t.quantity<1,href:""},l.a.createElement(f.a,{className:"text-danger"}),l.a.createElement("br",null),t.quantity<1?"Out Of Stock":"Add to Cart"))]},l.a.createElement(O,{title:"".concat(g," - $").concat(w),description:"".concat(N&&N.substring(0,30),"...")})))}},670:function(e,t,a){"use strict";a.d(t,"a",function(){return s});var n=a(1),c=a.n(n),r=a(620),l=a.n(r),s=function(e){if(e&&e.ratings){var t=e.ratings,a=[],n=t.length;t.map(function(e){return a.push(e.star)});var r=5*a.reduce(function(e,t){return e+t},0)/(5*n);return c.a.createElement("div",{className:"text-center pb-3 "},c.a.createElement("span",null,c.a.createElement(l.a,{starDimension:"20px",starSpacing:"2px",rating:r,starRatedColor:"red",editing:!1})," ","(",n,")"))}}}}]);
//# sourceMappingURL=3.24ca34c9.chunk.js.map