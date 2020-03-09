(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[14],{72:function(e,t,r){"use strict";r.d(t,"e",(function(){return p})),r.d(t,"f",(function(){return i})),r.d(t,"d",(function(){return l})),r.d(t,"b",(function(){return d})),r.d(t,"h",(function(){return f})),r.d(t,"g",(function(){return v})),r.d(t,"a",(function(){return m})),r.d(t,"c",(function(){return b}));var a=r(8),n=r.n(a),c=r(16),o=r(10),s=r.n(o),u=r(14),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/api/v1/products?limit=6&";return function(){var r=Object(c.a)(n.a.mark((function r(a){var c,o,u;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a({type:"PRODUCTS_LOADING"}),c=t+"&page=".concat(e,"&select=name,price,discountPrice,id,photo_id"),r.prev=2,r.next=5,s.a.get(c);case 5:o=r.sent,u=o.data,a({type:"GET_PRODUCTS",payload:{products:u.data,pagination:u.pagination,count:u.count,url:t}}),r.next=14;break;case 10:r.prev=10,r.t0=r.catch(2),console.log(r.t0.response?r.t0.response.data.error:r.t0.message),a({type:"PRODUCTS_ERROR",payload:r.t0.response?r.t0.response.data.error:r.t0.message});case 14:case"end":return r.stop()}}),r,null,[[2,10]])})));return function(e){return r.apply(this,arguments)}}()},i=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(r){var a,c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:"PRODUCTS_LOADING"}),t.prev=1,t.next=4,s.a.get("/api/v1/products/".concat(e));case 4:a=t.sent,c=a.data,r({type:"CURRENT_PRODUCT",payload:c.data}),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),console.log(t.t0),r({type:"PRODUCTS_ERROR",payload:t.t0.response?t.t0.response.data.error:t.t0.message});case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()},l=function(){return function(){var e=Object(c.a)(n.a.mark((function e(t){var r,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("/api/v1/cart");case 3:r=e.sent,a=r.data,t({type:"GET_CART",payload:a.data}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),t({type:"PRODUCTS_ERROR",payload:e.t0.response?e.t0.response.data.error:e.t0.message});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(r){var a,c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.post("/api/v1/cart",e);case 3:return a=t.sent,c=a.data,r({type:"SET_CART_TOKEN",payload:c.cart}),Object(u.a)(),t.abrupt("return",!1);case 10:return t.prev=10,t.t0=t.catch(0),console.log(t.t0),r({type:"PRODUCTS_ERROR",payload:t.t0.response?t.t0.response.data.error:t.t0.message}),t.abrupt("return",t.t0.response?t.t0.response.data.error:t.t0.message);case 15:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},f=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(r){var a,c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.put("/api/v1/cart/remove/".concat(e));case 3:a=t.sent,c=a.data,r({type:"SET_CART_TOKEN",payload:c.cart}),Object(u.a)(),r(l()),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0),r({type:"PRODUCTS_ERROR",payload:t.t0.response?t.t0.response.data.error:t.t0.message});case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},v=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(r){var a,c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.put("/api/v1/cart/reduce/".concat(e));case 3:a=t.sent,c=a.data,r({type:"SET_CART_TOKEN",payload:c.cart}),Object(u.a)(),r(l()),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0),r({type:"PRODUCTS_ERROR",payload:t.t0.response?t.t0.response.data.error:t.t0.message});case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return function(){var t=Object(c.a)(n.a.mark((function t(r){var a,c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.put("/api/v1/cart/add/".concat(e));case 3:a=t.sent,c=a.data,r({type:"SET_CART_TOKEN",payload:c.cart}),Object(u.a)(),r(l()),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),console.log(t.t0),r({type:"PRODUCTS_ERROR",payload:t.t0.response?t.t0.response.data.error:t.t0.message});case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},b=function(){return{type:"CLEAR_CART"}}},89:function(e,t,r){"use strict";r.r(t);var a=r(18),n=r(8),c=r.n(n),o=r(16),s=r(71),u=r(0),p=r.n(u),i=r(15),l=r(22),d=r(72),f=r(76),v=(r(75),r(6));function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(r,!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O={position:f.b.POSITION.BOTTOM_RIGHT};t.default=Object(i.b)((function(e){return{current:e.products.current,loading:e.products.loading,error:e.products.error}}),{getSingle:d.f,addToCart:d.b})((function(e){var t=e.history,r=e.match.params.id,n=e.current,i=e.loading,d=e.error,m=e.getSingle,y=e.addToCart,g=Object(u.useState)(null),E=Object(s.a)(g,2),h=E[0],R=E[1],T=Object(u.useState)(1),j=Object(s.a)(T,2),k=j[0],x=j[1];Object(u.useEffect)((function(){m(r)}),[]);var C=function(){var e=Object(o.a)(c.a.mark((function e(){var t,r,a,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.variations){e.next=14;break}if(t=Object.values(h),r=!0,t.forEach((function(e){e||(r=!1)})),r){e.next=6;break}return e.abrupt("return",f.b.error("Please set all your options...",O));case 6:return e.next=8,y({productID:n._id,variations:h,quantity:k});case 8:if(!(a=e.sent)){e.next=11;break}return e.abrupt("return",f.b.error("Error: ".concat(a),O));case 11:return e.abrupt("return",f.b.success("Item added to cart",O));case 14:return e.next=16,y({productID:n._id,quantity:k});case 16:if(!(o=e.sent)){e.next=19;break}return e.abrupt("return",f.b.error("Error: ".concat(o),O));case 19:return e.abrupt("return",f.b.success("Item added to cart",O));case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(d)return p.a.createElement("div",{className:"container"},p.a.createElement("h3",{className:"error"},"Error: ",d));if(!i&&null!==n){var _=null;if(n.variations){var w=Object.keys(n.variations),P=Object.values(n.variations);_={},w.forEach((function(e){_[e]=""})),null===h&&R(b({},_)),_=w.map((function(e,t){return p.a.createElement("p",{key:t},e.toUpperCase(),p.a.createElement("select",{name:e,onChange:function(e){return R(b({},h,Object(a.a)({},e.target.name,e.target.value)))}},p.a.createElement("option",{value:""},"Select"),P[t].map((function(e){return p.a.createElement("option",{value:e,key:e},e)}))))}))}return p.a.createElement("main",{className:"product-page"},p.a.createElement("div",{className:"container"},p.a.createElement("div",{className:"product-page-wrapper"},p.a.createElement(v.b,{className:"go-back-btn",to:"/store"},"Go Back"),p.a.createElement("div",{className:"product-page-grid"},p.a.createElement("div",{className:"product-page-image",style:{backgroundImage:"url(https://res.cloudinary.com/dnchnxwkl/image/upload/w_1000,c_fill/".concat(n.photo_id,")")}}),p.a.createElement("div",{className:"product-page-content"},p.a.createElement("h1",null,n.name),n.discountPrice?p.a.createElement("p",{className:"product-price"},p.a.createElement("span",null,n.price/100,"$"),n.discountPrice/100,"$"):p.a.createElement("p",{className:"product-price"},n.price/100,"$"),p.a.createElement("div",{className:"product-page-variations"},_&&_,p.a.createElement("p",null,"Quantity",p.a.createElement("input",{type:"number",name:"quantity",value:k,onChange:function(e){return x(e.target.value)}}))),p.a.createElement("button",{className:"add-to-cart-btn",onClick:C},"Add To Cart"))),p.a.createElement("div",{className:"product-page-description"},p.a.createElement("h4",null,"Description"),p.a.createElement("p",null,n.description)))),p.a.createElement(f.a,{autoClose:2e3,pauseOnFocusLoss:!1,onClick:function(){return t.push("/cart")}}))}return p.a.createElement("div",{className:"container"},p.a.createElement(l.a,null))}))}}]);
//# sourceMappingURL=14.eb4d86ef.chunk.js.map