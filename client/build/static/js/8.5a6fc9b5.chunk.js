(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[8],{71:function(e,t,r){"use strict";function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],a=!0,n=!1,c=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(l){n=!0,c=l}finally{try{a||null==i.return||i.return()}finally{if(n)throw c}}return r}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(t,"a",(function(){return a}))},92:function(e,t,r){"use strict";r.r(t);var a=r(18),n=r(71),c=r(0),o=r.n(c),i=r(15),l=r(6),u=r(19);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(r,!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.default=Object(i.b)((function(e){return{user:e.auth.user,error:e.auth.error,redirect:e.auth.redirect}}),{registerUser:u.f,clearRedirection:u.b})((function(e){var t=e.history,r=e.error,i=e.registerUser,u=e.user,s=e.clearRedirection,m=e.redirect;Object(c.useEffect)((function(){if(null!==u)if(m){var e=m;s(),t.push(e)}else t.push("/")}),[u]);var f=Object(c.useState)({name:"",email:"",password:""}),b=Object(n.a)(f,2),y=b[0],h=b[1],d=Object(c.useState)({city:"",address:"",state:"",country:""}),g=Object(n.a)(d,2),O=g[0],v=g[1],j=function(e){return h(p({},y,Object(a.a)({},e.target.name,e.target.value)))},E=function(e){return v(p({},O,Object(a.a)({},e.target.name,e.target.value)))};return o.a.createElement("main",{className:"register bc-form"},o.a.createElement("h1",{className:"bc-form-title"},"Register User"),r&&o.a.createElement("p",{className:"error"},r),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),i(p({},y,{location:O}))}},o.a.createElement("input",{type:"text",name:"name",placeholder:"Name",value:y.name,onChange:j}),o.a.createElement("input",{type:"email",name:"email",placeholder:"Email",value:y.email,onChange:j}),o.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:y.password,onChange:j}),o.a.createElement("input",{type:"text",name:"country",placeholder:"Country",value:O.country,onChange:E}),o.a.createElement("input",{type:"text",name:"state",placeholder:"State",value:O.state,onChange:E}),o.a.createElement("input",{type:"text",name:"city",placeholder:"City",value:O.city,onChange:E}),o.a.createElement("input",{type:"text",name:"address",placeholder:"Address",value:O.address,onChange:E}),o.a.createElement("button",{className:"bc-form-btn",type:"submit"},"Register")),o.a.createElement(l.b,{className:"bc-form-link",to:"/login"},"Have account? ",o.a.createElement("span",null,"click here to log in.")))}))}}]);
//# sourceMappingURL=8.5a6fc9b5.chunk.js.map