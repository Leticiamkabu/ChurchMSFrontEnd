(function(){"use strict";var e={8875:function(e,a,n){var s=n(5130),t=n(6768);const i={key:0,class:"welcome"},l={class:"welcome-container"},o={class:"button-container"};function r(e,a){const n=(0,t.g2)("router-view"),s=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.bF)(n),"/"===e.$route.path?((0,t.uX)(),(0,t.CE)("div",i,[(0,t.Lk)("div",l,[a[2]||(a[2]=(0,t.Lk)("h1",null,"Welcome to CTC CMS",-1)),a[3]||(a[3]=(0,t.Lk)("p",null,"Please log in or register to continue.",-1)),(0,t.Lk)("div",o,[(0,t.bF)(s,{to:"/login"},{default:(0,t.k6)((()=>a[0]||(a[0]=[(0,t.Lk)("button",{class:"login-btn"},"Login",-1)]))),_:1}),(0,t.bF)(s,{to:"/register"},{default:(0,t.k6)((()=>a[1]||(a[1]=[(0,t.Lk)("button",{class:"register-btn"},"Register",-1)]))),_:1})])])])):(0,t.Q3)("",!0)],64)}var c=n(1241);const d={},u=(0,c.A)(d,[["render",r],["__scopeId","data-v-035d01a7"]]);var m=u,h=n(1387);const b={class:"login-B"},p={class:"container"},k={class:"screen"},v={class:"screen__content"},g={class:"login__field"},f={class:"login__field"};function L(e,a,n,i,l,o){const r=(0,t.g2)("router-view");return(0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.bF)(r),(0,t.Lk)("div",b,[(0,t.Lk)("div",p,[(0,t.Lk)("div",k,[(0,t.Lk)("div",v,[(0,t.Lk)("form",{onSubmit:a[2]||(a[2]=(0,s.D$)(((...e)=>o.login&&o.login(...e)),["prevent"])),class:"login"},[(0,t.Lk)("div",g,[a[3]||(a[3]=(0,t.Lk)("i",{class:"login__icon fas fa-user"},null,-1)),(0,t.bo)((0,t.Lk)("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=e=>l.email=e),class:"login__input",placeholder:"User name / Email",required:""},null,512),[[s.Jo,l.email]])]),(0,t.Lk)("div",f,[a[4]||(a[4]=(0,t.Lk)("i",{class:"login__icon fas fa-lock"},null,-1)),(0,t.bo)((0,t.Lk)("input",{type:"password","onUpdate:modelValue":a[1]||(a[1]=e=>l.password=e),class:"login__input",placeholder:"Password",required:""},null,512),[[s.Jo,l.password]])]),a[5]||(a[5]=(0,t.Lk)("button",{type:"submit",class:"button login__submit"},[(0,t.Lk)("span",{class:"button__text"},"Log In Now"),(0,t.Lk)("i",{class:"button__icon fas fa-chevron-right"})],-1))],32),a[6]||(a[6]=(0,t.Fv)('<div class="social-login" data-v-51f10198><h3 data-v-51f10198>log in via</h3><div class="social-icons" data-v-51f10198><a href="#" class="social-login__icon fab fa-instagram" data-v-51f10198></a><a href="#" class="social-login__icon fab fa-facebook" data-v-51f10198></a><a href="#" class="social-login__icon fab fa-twitter" data-v-51f10198></a></div></div>',1))]),a[7]||(a[7]=(0,t.Fv)('<div class="screen__background" data-v-51f10198><span class="screen__background__shape screen__background__shape4" data-v-51f10198></span><span class="screen__background__shape screen__background__shape3" data-v-51f10198></span><span class="screen__background__shape screen__background__shape2" data-v-51f10198></span><span class="screen__background__shape screen__background__shape1" data-v-51f10198></span></div>',1))])])])],64)}n(4114);var y=n(4373),I={name:"LoginPage",data(){return{email:"",password:""}},methods:{async login(){console.info(this.email),console.info(this.password);try{const e=await y.A.post("https://churchmsbackend.onrender.com/auth/login",{email:this.email,password:this.password});console.info(e.data),"User login successful"===e.data.message?(localStorage.setItem("isAuthenticated","True"),this.$router.push("/home")):alert("Invalid credentials")}catch(e){console.error("Login error:",e),alert("An error occurred during login. Please try again.")}}}};const w=(0,c.A)(I,[["render",L],["__scopeId","data-v-51f10198"]]);var S=w;const x={class:"register-B"},A={class:"container"},E={class:"content"},N={class:"user-details"},C={class:"input-box"},R={class:"input-box"},U={class:"input-box"},P={class:"input-box"},V={class:"input-box"},W={class:"input-box"},M={key:0,class:"error"},Q={class:"gender-details"},Z={class:"button"},_=["disabled"];function B(e,a,n,i,l,o){const r=(0,t.g2)("router-view"),c=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.bF)(r),(0,t.Lk)("div",x,[(0,t.Lk)("div",A,[a[17]||(a[17]=(0,t.Lk)("div",{class:"title"},"Registration",-1)),(0,t.Lk)("div",E,[(0,t.Lk)("form",{onSubmit:a[8]||(a[8]=(0,s.D$)(((...e)=>o.register&&o.register(...e)),["prevent"])),action:"#"},[(0,t.Lk)("div",N,[(0,t.Lk)("div",C,[a[9]||(a[9]=(0,t.Lk)("span",{class:"details"},"First Name",-1)),(0,t.bo)((0,t.Lk)("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=e=>l.firstname=e),placeholder:"Enter your first name",required:""},null,512),[[s.Jo,l.firstname]])]),(0,t.Lk)("div",R,[a[10]||(a[10]=(0,t.Lk)("span",{class:"details"}," Last name",-1)),(0,t.bo)((0,t.Lk)("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=e=>l.lastname=e),placeholder:"Enter your last name",required:""},null,512),[[s.Jo,l.lastname]])]),(0,t.Lk)("div",U,[a[11]||(a[11]=(0,t.Lk)("span",{class:"details"},"Email",-1)),(0,t.bo)((0,t.Lk)("input",{type:"text","onUpdate:modelValue":a[2]||(a[2]=e=>l.email=e),placeholder:"Enter your email",required:""},null,512),[[s.Jo,l.email]])]),(0,t.Lk)("div",P,[a[12]||(a[12]=(0,t.Lk)("span",{class:"details"},"Phone Number",-1)),(0,t.bo)((0,t.Lk)("input",{type:"text","onUpdate:modelValue":a[3]||(a[3]=e=>l.phoneNumber=e),placeholder:"Enter your number",required:""},null,512),[[s.Jo,l.phoneNumber]])]),(0,t.Lk)("div",V,[a[13]||(a[13]=(0,t.Lk)("span",{class:"details"},"Password",-1)),(0,t.bo)((0,t.Lk)("input",{type:"password","onUpdate:modelValue":a[4]||(a[4]=e=>l.password=e),placeholder:"Enter your password",required:""},null,512),[[s.Jo,l.password]])]),(0,t.Lk)("div",W,[a[14]||(a[14]=(0,t.Lk)("span",{class:"details"},"Confirm Password",-1)),(0,t.bo)((0,t.Lk)("input",{type:"password","onUpdate:modelValue":a[5]||(a[5]=e=>l.confirmPassword=e),placeholder:"Confirm your password",required:""},null,512),[[s.Jo,l.confirmPassword]])]),o.passwordMismatch?((0,t.uX)(),(0,t.CE)("p",M,"Passwords do not match")):(0,t.Q3)("",!0)]),(0,t.Lk)("div",Q,[(0,t.bo)((0,t.Lk)("input",{type:"radio","onUpdate:modelValue":a[6]||(a[6]=e=>l.role=e),name:"gender",value:"ADMIN",id:"dot-1"},null,512),[[s.XL,l.role]]),(0,t.bo)((0,t.Lk)("input",{type:"radio","onUpdate:modelValue":a[7]||(a[7]=e=>l.role=e),name:"gender",value:"USER",id:"dot-2"},null,512),[[s.XL,l.role]]),a[15]||(a[15]=(0,t.Fv)('<span class="gender-title">Role</span><div class="category"><label for="dot-1"><span class="dot one"></span><span class="gender">Admin</span></label><label for="dot-2"><span class="dot two"></span><span class="gender">User</span></label></div>',2))]),(0,t.Lk)("div",Z,[(0,t.Lk)("input",{type:"submit",value:"Register",disabled:!o.isFormValid},null,8,_)]),(0,t.bF)(c,{to:"/"},{default:(0,t.k6)((()=>a[16]||(a[16]=[(0,t.Lk)("i",null," Back",-1)]))),_:1})],32)])])])],64)}var G={name:"RegisterationPage",data(){return{firstname:"",lastname:"",email:"",phoneNumber:"",password:"",confirmPassword:"",role:""}},computed:{passwordMismatch(){return this.password&&this.confirmPassword&&this.password!==this.confirmPassword},isFormValid(){return this.firstname&&this.lastname&&this.email&&this.phoneNumber&&this.password&&this.confirmPassword&&this.role&&!this.passwordMismatch}},methods:{async register(){if(this.isFormValid){const a={firstname:this.firstname,lastname:this.lastname,email:this.email,phoneNumber:this.phoneNumber,password:this.password,role:this.role};try{const e=await y.A.post("https://churchmsbackend.onrender.com/auth/create_user",{firstname:this.firstname,lastname:this.lastname,email:this.email,phoneNumber:this.phoneNumber,password:this.password,role:this.role});console.info(e),"User registeration successfully"===e.data.message?this.$router.push("/login"):alert(e)}catch(e){console.error("Registeration error:",e),alert("An error occurred during registeration. Please try again.")}console.log("Form is valid. Proceeding with registration...",a)}else console.log("Form is invalid")}}};const z=(0,c.A)(G,[["render",B]]);var F=z;function O(e,a,n,s,i,l){const o=(0,t.g2)("Navbar"),r=(0,t.g2)("Sidebar"),c=(0,t.g2)("router-view"),d=(0,t.g2)("ImageSlider");return(0,t.uX)(),(0,t.CE)("div",null,[(0,t.bF)(o),(0,t.bF)(r),(0,t.bF)(c),(0,t.bF)(d)])}var J="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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";function T(e,a,n,s,i,l){return a[0]||(a[0]=(0,t.Fv)('<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"></head><body><nav class="navbar"><div class="logo_item"><i class="bx bx-menu" id="sidebarOpen"></i><img src="'+J+'" alt=""><i>CTC CMS</i></div><div class="search_bar"><input type="text" placeholder="Search"></div><div class="navbar_content"><i class="bi bi-grid"></i><i class="bx bx-sun" id="darkLight"></i><i class="bx bx-bell"></i><img src="'+J+'" alt="" class="profile"></div></nav></body>',2))}var X={mounted(){document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector("#darkLight");e?e.addEventListener("click",(()=>{document.body.classList.toggle("dark"),document.body.classList.contains("dark")?e.classList.replace("bx-sun","bx-moon"):e.classList.replace("bx-moon","bx-sun")})):console.error("Dark mode toggle icon (darkLight) not found")}))}};const D=(0,c.A)(X,[["render",T]]);var Y=D;const K={class:"sidebar"},j={class:"menu_content"},q={class:"menu_items"},H={class:"item"},$={class:"item"};function ee(e,a,n,s,i,l){const o=(0,t.g2)("router-view"),r=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.bF)(o),(0,t.Lk)("nav",K,[(0,t.Lk)("div",j,[(0,t.Lk)("ul",q,[a[3]||(a[3]=(0,t.Lk)("div",{class:"menu_title menu_dahsboard"},null,-1)),(0,t.Lk)("li",H,[(0,t.bF)(r,{to:"/home",class:"nav_link submenu_item"},{default:(0,t.k6)((()=>a[0]||(a[0]=[(0,t.Lk)("span",{class:"navlink_icon"},[(0,t.Lk)("i",{class:"bx bx-home-alt"})],-1),(0,t.Lk)("span",{class:"navlink"},"Home",-1)]))),_:1})]),a[4]||(a[4]=(0,t.Fv)('<li class="item"><div href="#" class="nav_link submenu_item"><span class="navlink_icon"><i class="bx bx-grid-alt"></i></span><span class="navlink">Overview</span><i class="bx bx-chevron-right arrow-left"></i></div><ul class="menu_items submenu"><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a></ul></li>',1)),(0,t.Lk)("li",$,[(0,t.bF)(r,{to:"/attendance",class:"nav_link submenu_item"},{default:(0,t.k6)((()=>a[1]||(a[1]=[(0,t.Lk)("span",{class:"navlink_icon"},[(0,t.Lk)("i",{class:"bx bx-user"})],-1),(0,t.Lk)("span",{class:"navlink"},"Attendance",-1),(0,t.Lk)("i",{class:"bx bx-chevron-right arrow-left"},null,-1)]))),_:1}),a[2]||(a[2]=(0,t.Fv)('<ul class="menu_items submenu"><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a></ul>',1))]),a[5]||(a[5]=(0,t.Fv)('<li class="item"><div href="#" class="nav_link submenu_item"><span class="navlink_icon"><i class="bx bx-file"></i></span><span class="navlink">Reports</span><i class="bx bx-chevron-right arrow-left"></i></div><ul class="menu_items submenu"><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a><a href="#" class="nav_link sublink">Nav Sub Link</a></ul></li>',1))]),a[6]||(a[6]=(0,t.Fv)('<ul class="menu_items"><div class="menu_title menu_editor"></div><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bxs-magic-wand"></i></span><span class="navlink">Magic build</span></a></li><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-loader-circle"></i></span><span class="navlink">Filters</span></a></li><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-filter"></i></span><span class="navlink">Filter</span></a></li><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-cloud-upload"></i></span><span class="navlink">Upload new</span></a></li></ul><ul class="menu_items"><div class="menu_title menu_setting"></div><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-flag"></i></span><span class="navlink">Notice board</span></a></li><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-medal"></i></span><span class="navlink">Award</span></a></li><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-cog"></i></span><span class="navlink">Setting</span></a></li><li class="item"><a href="#" class="nav_link"><span class="navlink_icon"><i class="bx bx-layer"></i></span><span class="navlink">Features</span></a></li></ul><div class="bottom_content"><div class="bottom expand_sidebar"><span> Expand</span><i class="bx bx-log-in"></i></div><div class="bottom collapse_sidebar"><span> Collapse</span><i class="bx bx-log-out"></i></div></div>',3))])])],64)}var ae={mounted(){const e=document.querySelector(".sidebar"),a=document.querySelectorAll(".submenu_item"),n=document.querySelector("#sidebarOpen"),s=document.querySelector(".collapse_sidebar"),t=document.querySelector(".expand_sidebar");n.addEventListener("click",(()=>e.classList.toggle("close"))),s.addEventListener("click",(()=>{e.classList.add("close","hoverable")})),t.addEventListener("click",(()=>{e.classList.remove("close","hoverable")})),e.addEventListener("mouseenter",(()=>{e.classList.contains("hoverable")&&e.classList.remove("close")})),e.addEventListener("mouseleave",(()=>{e.classList.contains("hoverable")&&e.classList.add("close")})),a.forEach(((e,n)=>{e.addEventListener("click",(()=>{e.classList.toggle("show_submenu"),a.forEach(((e,a)=>{n!==a&&e.classList.remove("show_submenu")}))}))}))}};const ne=(0,c.A)(ae,[["render",ee]]);var se=ne,te=n(4232);const ie={class:"slider-container"},le=["src","alt"];function oe(e,a,n,s,i,l){return(0,t.uX)(),(0,t.CE)("div",ie,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(i.images,((e,a)=>((0,t.uX)(),(0,t.CE)("div",{key:a,class:"slide",style:(0,te.Tr)({opacity:i.currentSlide===a?1:0})},[(0,t.Lk)("img",{src:e,alt:`Image ${a+1}`},null,8,le)],4)))),128))])}var re={data(){return{images:[n(1131),n(9840),n(4978)],currentSlide:0}},mounted(){this.startSlider()},methods:{startSlider(){setInterval((()=>{this.currentSlide=(this.currentSlide+1)%this.images.length}),3e3)}}};const ce=(0,c.A)(re,[["render",oe],["__scopeId","data-v-63819354"]]);var de=ce,ue={components:{Navbar:Y,Sidebar:se,ImageSlider:de}};const me=(0,c.A)(ue,[["render",O],["__scopeId","data-v-3a18b78c"]]);var he=me;const be={class:"attendance-page"},pe={class:"main-content"},ke=["onClick"];function ve(e,a,n,i,l,o){const r=(0,t.g2)("Sidebar"),c=(0,t.g2)("Navbar");return(0,t.uX)(),(0,t.CE)("div",be,[(0,t.bF)(r),(0,t.Lk)("div",pe,[(0,t.bF)(c),a[5]||(a[5]=(0,t.Lk)("h1",null,"Attendance Management",-1)),(0,t.Lk)("form",{onSubmit:a[2]||(a[2]=(0,s.D$)(((...e)=>o.markAttendance&&o.markAttendance(...e)),["prevent"]))},[(0,t.bo)((0,t.Lk)("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=e=>l.name=e),placeholder:"Enter Name",required:"",onKeydown:a[1]||(a[1]=(0,s.jR)(((...e)=>o.checkName&&o.checkName(...e)),["enter"]))},null,544),[[s.Jo,l.name]]),a[3]||(a[3]=(0,t.Lk)("button",{type:"submit"},"Mark Attendance",-1))],32),a[6]||(a[6]=(0,t.Lk)("h2",null,"Attendance List",-1)),(0,t.Lk)("table",null,[a[4]||(a[4]=(0,t.Lk)("thead",null,[(0,t.Lk)("tr",null,[(0,t.Lk)("th",null,"Name"),(0,t.Lk)("th",null,"Date"),(0,t.Lk)("th",null,"Attendance Status")])],-1)),(0,t.Lk)("tbody",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(l.attendanceList,((e,a)=>((0,t.uX)(),(0,t.CE)("tr",{key:a,onClick:a=>o.populateName(e.name,e.membersId,e.attendanceStatus,e.attendanceID)},[(0,t.Lk)("td",null,(0,te.v_)(e.name),1),(0,t.Lk)("td",null,(0,te.v_)(e.date),1),(0,t.Lk)("td",null,(0,te.v_)(e.attendanceStatus),1)],8,ke)))),128))])])])])}var ge={components:{Sidebar:Y,Navbar:se},data(){return{name:"",isSearching:!1,isMarkingAttendance:!1,attendanceList:[],members_ID:"",currentStatus:"",attendanceIDS:""}},methods:{async checkName(){if(console.info("About to check name"),!this.isMarkingAttendance){this.isSearching=!0,console.log("Searching for:",this.name);try{const a=await y.A.get(`https://churchmsbackend.onrender.com/members/get_member_by_words/${this.name}`);if(console.info(a),"Members with the given names do not exist"!==a.data.detail){if(console.info("Member found"),a.data.length>0){console.info("Appending members"),this.attendanceList=[];for(const n of a.data)try{const e=await y.A.get(`https://churchmsbackend.onrender.com/attendance/get_attendance_by_member_id/${n.id}`);console.info(e);let a="NotMarked",s="";"Attendance with the given member ID does not exist"!==e.data.detail?(console.info("member attendance found"),a=e.data.status,s=e.data.id):(console.info("member attendance notfound"),a="NotMarked");const t=(new Date).toLocaleDateString(),i=`${n.firstname} ${n.othername} ${n.lastname}`;this.attendanceList.push({name:i,date:t,attendanceStatus:a,membersId:n.id,attendanceID:s})}catch(e){console.error("Error fetching attendance:",e)}this.name=""}}else alert(a.data.detail)}catch(a){console.error("Attendance error:",a),alert("An error occurred during attendance processing. Please try again.")}setTimeout((()=>{this.isSearching=!1}),500)}},async markAttendance(){if(this.isSearching)return;this.isMarkingAttendance=!0,console.info("you are in markAttendance"),console.info("member id",this.members_ID);const e=this.name.split(" "),a=e[0]||"",n=e[1]||"",s=e[2]||"";console.info("firstname",a),console.info("lastname",n),console.info("othername",s),console.info("attendance Status",this.currentStatus),console.info("attendance Id",this.attendanceIDS);let t="";if("NotMarked"!==this.currentStatus){"PRESENT"===this.currentStatus?t="ABSENT":"ABSENT"===this.currentStatus&&(t="PRESENT");try{const e=await y.A.patch(`https://churchmsbackend.onrender.com/attendance/update_individual_attendance_fields/${this.attendanceIDS}`,{status:t});console.info("this is me",e),console.info("dghjk ",e.data),e.data?(console.info("pass the if"),console.info("Attendance list is being updated"),this.attendanceList=[],this.attendanceList.push({name:e.data.fullname,date:e.data.date,attendanceStatus:e.data.status}),this.name="",setTimeout((()=>{this.isMarkingAttendance=!1}),500)):alert("Invalid Attendance details")}catch{console.info("Attendance not created, Try again")}}else try{const e=await y.A.post("https://churchmsbackend.onrender.com/attendance/create_attendance",{memberID:this.members_ID,firstname:a,lastname:s,othername:n,status:"PRESENT"});console.info(e),"Attendance creation successful"===e.data.message?(console.info("Attendance list is being updated"),this.attendanceList=[],this.attendanceList.push({name:e.data.Attendance.fullname,date:e.data.Attendance.date,attendanceStatus:e.data.Attendance.status}),this.name="",setTimeout((()=>{this.isMarkingAttendance=!1}),500)):alert("Invalid Attendance details")}catch{console.info("Attendance not created, Try again")}},populateName(e,a,n,s){console.info("am here too"),this.name=e,this.members_ID=a,this.currentStatus=n,this.attendanceIDS=s}}};const fe=(0,c.A)(ge,[["render",ve],["__scopeId","data-v-88766208"]]);var Le=fe;const ye={class:"main-container"},Ie={class:"content"};function we(e,a,n,s,i,l){const o=(0,t.g2)("router-view");return(0,t.uX)(),(0,t.CE)("div",ye,[(0,t.Lk)("div",{class:(0,te.C4)(["sidebar",{"sidebar--active":i.isSidebarActive}])},[(0,t.Lk)("ul",null,[(0,t.Lk)("li",{onClick:a[0]||(a[0]=e=>l.navigateTo("/home"))},"Home"),(0,t.Lk)("li",{onClick:a[1]||(a[1]=e=>l.navigateTo("/attendance"))},"Attendance"),(0,t.Lk)("li",{onClick:a[2]||(a[2]=e=>l.navigateTo("/members"))},"Members")])],2),(0,t.Lk)("div",Ie,[(0,t.Lk)("button",{onClick:a[3]||(a[3]=(...e)=>l.toggleSidebar&&l.toggleSidebar(...e)),class:"toggle-btn"},"☰ Toggle Sidebar"),(0,t.bF)(o)])])}var Se={data(){return{isSidebarActive:!1}},methods:{toggleSidebar(){this.isSidebarActive=!this.isSidebarActive},navigateTo(e){this.$router.push({name:e})}}};const xe=(0,c.A)(Se,[["render",we]]);var Ae=xe;const Ee=[{path:"/login",component:S},{path:"/register",component:F},{path:"/home",component:he},{path:"/attendance",component:Le},{path:"/members",component:Ae}],Ne=(0,h.aE)({history:(0,h.LA)(),routes:Ee});var Ce=Ne;(0,s.Ef)(m).use(Ce).mount("#app")},1131:function(e,a,n){e.exports=n.p+"img/hp1.54eaf885.png"},9840:function(e,a,n){e.exports=n.p+"img/hp2.2a5bfbda.png"},4978:function(e,a,n){e.exports=n.p+"img/hp3.972e484f.webp"}},a={};function n(s){var t=a[s];if(void 0!==t)return t.exports;var i=a[s]={exports:{}};return e[s].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(a,s,t,i){if(!s){var l=1/0;for(d=0;d<e.length;d++){s=e[d][0],t=e[d][1],i=e[d][2];for(var o=!0,r=0;r<s.length;r++)(!1&i||l>=i)&&Object.keys(n.O).every((function(e){return n.O[e](s[r])}))?s.splice(r--,1):(o=!1,i<l&&(l=i));if(o){e.splice(d--,1);var c=t();void 0!==c&&(a=c)}}return a}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[s,t,i]}}(),function(){n.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(a,{a:a}),a}}(),function(){n.d=function(e,a){for(var s in a)n.o(a,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:a[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={524:0};n.O.j=function(a){return 0===e[a]};var a=function(a,s){var t,i,l=s[0],o=s[1],r=s[2],c=0;if(l.some((function(a){return 0!==e[a]}))){for(t in o)n.o(o,t)&&(n.m[t]=o[t]);if(r)var d=r(n)}for(a&&a(s);c<l.length;c++)i=l[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},s=self["webpackChunkchurchapp"]=self["webpackChunkchurchapp"]||[];s.forEach(a.bind(null,0)),s.push=a.bind(null,s.push.bind(s))}();var s=n.O(void 0,[504],(function(){return n(8875)}));s=n.O(s)})();
//# sourceMappingURL=app.d78c065a.js.map