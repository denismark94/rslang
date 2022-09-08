(()=>{"use strict";var e={136:(e,t,n)=>{n.r(t)},314:(e,t,n)=>{n.r(t)},78:(e,t,n)=>{n.r(t)},474:(e,t,n)=>{n.r(t)},998:(e,t,n)=>{n.r(t)},387:(e,t,n)=>{n.r(t)},118:(e,t,n)=>{n.r(t)},354:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=s(n(541)),r=s(n(629));t.default=class{constructor(){this.state="main",this.model=new r.default,this.view=new o.default(this.model.baseURL),this.name="",this.token="",this.game="sprint",window.onpopstate=e=>this.route(e)}start(){this.view.draw(this.state),this.assignListeners(),this.changeCurrentPage(),localStorage.getItem("name")&&(this.name=localStorage.getItem("name"),this.token=localStorage.getItem("token"),document.querySelector(".name-login").innerHTML=this.name,document.querySelector(".btn-login").classList.add("active"))}changeCurrentPage(){this.view.textbook.draw_selectors(),this.assignTextBookListeners(),this.model.getPage(this.view.textbook.currentPage,this.view.textbook.currentChapter).then((e=>{this.view.textbook.draw_page(e)})).catch((e=>console.log(e)))}route(e){e.preventDefault();const t=window.location.hash.slice(1);t!==this.state&&(this.state=t,this.view.draw(this.state))}testAPI(e){const t={name:"Bob",email:"bob@hotmail.com",password:"password",id:"63092d553e8288001679d5e5",token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDkyZDU1M2U4Mjg4MDAxNjc5ZDVlNSIsImlhdCI6MTY2MjA0NDA3NywiZXhwIjoxNjYyMDU4NDc3fQ.Rcm43ZZzrgULxj3bRpnUhYWuWdMzplyXH3fcLA3s_ls"},n="5e9f5ee35eb9e72bc21af4a0",s={difficulty:"weak",optional:{learned:!1}},o={learnedWords:"0",optional:{}},r={wordsPerDay:"10",optional:{}};switch(e){case"page":this.model.getPage(0,0).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"getword":this.model.getWord(n).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"create":this.model.createUser(t).then((e=>{t.id=e.id})).catch((e=>console.log(e)));break;case"login":this.model.login(t).then((e=>{t.token=e.token,t.id=e.userId,console.log(t.token)})).catch((e=>console.log(e)));break;case"getuser":this.model.getUser(t.id,t.token).then((e=>{console.log(e),t.email=e.email,t.password=e.password})).catch((e=>console.log(e)));break;case"getuserwords":this.model.getUserWords(t.id,t.token).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"createuserword":this.model.createUserWord(t.id,n,t.token,s).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"markdifficult":s.difficulty="strong",this.model.updUserWord(t.id,n,t.token,s).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"marklearned":s.optional.learned=!0,this.model.updUserWord(t.id,n,t.token,s).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"getuserword":this.model.getUserWord(t.id,n,t.token).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"deluserword":console.log(this.model.delUserWord(t.id,n,t.token));break;case"getsettings":this.model.getSettings(t.id,t.token).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"updsettings":this.model.updSettings(t.id,t.token,r).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"getstat":this.model.getStat(t.id,t.token).then((e=>console.log(e))).catch((e=>console.log(e)));break;case"updstat":this.model.updStat(t.id,t.token,o).then((e=>console.log(e))).catch((e=>console.log(e)))}}assignListeners(){const e=document.querySelector("#btn-sign"),t=document.querySelector("#btn-login");e.addEventListener("click",(()=>{this.register()})),t.addEventListener("click",(()=>{this.login()})),document.getElementById("btn_sprint").addEventListener("click",(()=>{this.game="sprint",this.model.getBook().then((e=>{this.view.wordlist=e,this.view.showGame(this.game)})).catch((e=>console.log(e)))})),document.getElementById("btn_audiochallenge").addEventListener("click",(()=>{this.game="audiochallenge",this.model.getBook().then((e=>{this.view.wordlist=e,this.view.showGame(this.game)})).catch((e=>console.log(e)))})),document.getElementById("repeat_sprint").addEventListener("click",(()=>this.view.showGame(this.game))),document.getElementById("choose_game").addEventListener("click",(()=>this.view.showPicker())),document.getElementById("btn_yes").addEventListener("click",(e=>this.view.checkAnswer(e))),document.getElementById("btn_no").addEventListener("click",(e=>this.view.checkAnswer(e))),document.getElementById("play_audio").addEventListener("click",(()=>this.view.playAudio())),document.getElementById("next_question").addEventListener("click",(e=>this.view.checkAnswer(e))),document.querySelectorAll("#options button").forEach((e=>{e.addEventListener("click",(e=>this.view.checkAnswer(e)))})),document.getElementById("show_answer").addEventListener("click",(e=>this.view.checkAnswer(e)));const n=document.querySelector(".header"),s=document.querySelector(".popup-login"),o=document.querySelector(".nav"),r=document.querySelector(".body"),a=document.querySelector(".btn-login");document.querySelector("#sign-name").value="",document.querySelector("#sign-email").value="",document.querySelector("#sign-password").value="",document.querySelector("#login-email").value="",document.querySelector("#login-password").value="",n.addEventListener("click",(e=>{e.target.closest(".btn-nav")&&(o.classList.toggle("wrapped"),document.querySelector(".btn-nav").classList.toggle("active")),e.target.closest(".btn-login")&&(a.classList.contains("active")?(a.classList.remove("active"),document.querySelector(".name-login").innerHTML="",this.token="",this.name="",localStorage.setItem("name",""),localStorage.setItem("token","")):(s.classList.toggle("active"),s.classList.contains("active")&&r.classList.add("active"))),e.target.classList.contains("popup-login")&&(s.classList.remove("active"),r.classList.remove("active"))}))}assignTextBookListeners(){const e=document.querySelector(".prev"),t=document.querySelector(".next"),n=document.querySelectorAll(".numb");for(let e=0;e<n.length;e+=1)n[e].addEventListener("click",(()=>{this.view.textbook.currentPage=Number(n[e].textContent),this.changeCurrentPage()}));t&&t.addEventListener("click",(()=>{this.view.textbook.currentPage<29&&(this.view.textbook.currentPage+=1,this.changeCurrentPage())})),e&&e.addEventListener("click",(()=>{this.view.textbook.currentPage>0&&(this.view.textbook.currentPage-=1,this.changeCurrentPage())})),document.getElementById("chapter_selector").addEventListener("change",(e=>{const t=e.target.value;this.view.textbook.currentChapter=Number(t),this.changeCurrentPage()}))}login(){const e=document.querySelector(".btn-login"),t=document.querySelector("#login-email").value,n=document.querySelector("#login-password").value,s=document.querySelector(".name-login");""!=t&&""!=n||alert(" Требуется email или пароль.");const o={email:t,password:n};this.model.login(o).then((t=>{e.classList.add("active"),s.innerHTML=t.name,alert(`${t.name}  Добро пожаловать.`),this.name=t.name,localStorage.setItem("name",t.name),localStorage.setItem("token",t.token),document.querySelector(".popup-login").classList.remove("active"),document.querySelector(".body").classList.remove("active")})).catch((e=>alert(e))),document.querySelector("#login-email").value="",document.querySelector("#login-password").value=""}register(){const e=document.querySelector("#sign-name").value,t=document.querySelector("#sign-email").value,n=document.querySelector("#sign-password").value;if(0==t.length||0==n.length||0==e.length)alert(" Требуется ввести все данные.");else if(n.length<=3)alert("Требуется ввести корректный пароль не менее 8 символов.");else{const s={name:e,email:t,password:n};this.model.createUser(s).then((t=>{t.error?t.error.errors.forEach((e=>{alert(e.message)})):(alert(`${e} все хорошо.`),this.model.login(s).then((e=>{document.querySelector(".btn-login").classList.add("active"),document.querySelector(".name-login").innerHTML=e.name,alert(`${e.name}  Добро пожаловать.`),this.name=s.name,localStorage.setItem("name",s.name),localStorage.setItem("token",e.token),document.querySelector(".popup-login").classList.remove("active"),document.querySelector(".body").classList.remove("active")})).catch((e=>alert(e))))})).catch((()=>alert(`${e} уже зарегистрирован.`)))}document.querySelector("#sign-name").value="",document.querySelector("#sign-email").value="",document.querySelector("#sign-password").value=""}}},629:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.baseURL="https://rslang-22-learnwords.herokuapp.com"}getBook(){return fetch(this.baseURL+"/words").then((e=>e.json()))}getPage(e,t){const n=`${this.baseURL}/words?page=${e}&group=${t}`;return fetch(n).then((e=>e.json()))}getWord(e){const t=`${this.baseURL}/words/${e}`;return fetch(t).then((e=>e.json()))}createUser(e){return fetch(this.baseURL+"/users",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json()))}getUser(e,t){return fetch(this.baseURL+`/users?id=${e}`,{method:"GET",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"}}).then((e=>e.json()))}login(e){return fetch(this.baseURL+"/signin",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json())).catch((e=>{throw e}))}getUserWords(e,t){return fetch(this.baseURL+`/users/${e}/words`,{method:"GET",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"}}).then((e=>e.json()))}createUserWord(e,t,n,s){return fetch(this.baseURL+`/users/${e}/words/${t}`,{method:"POST",headers:{Authorization:`Bearer ${n}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)}).then((e=>e.json()))}getUserWord(e,t,n){return fetch(this.baseURL+`/users/${e}/words/${t}`,{method:"GET",headers:{Authorization:`Bearer ${n}`,Accept:"application/json","Content-Type":"application/json"}}).then((e=>e.json()))}updUserWord(e,t,n,s){return fetch(this.baseURL+`/users/${e}/words/${t}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)}).then((e=>e.json()))}delUserWord(e,t,n){return fetch(this.baseURL+`/users/${e}/words/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`,Accept:"application/json","Content-Type":"application/json"}}).then((e=>console.log(e.status)))}getStat(e,t){return fetch(this.baseURL+`/users/${e}/statistics`,{method:"GET",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"}}).then((e=>e.json()))}updStat(e,t,n){return fetch(this.baseURL+`/users/${e}/statistics`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)}).then((e=>e.json()))}getSettings(e,t){return fetch(this.baseURL+`/users/${e}/settings`,{method:"GET",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"}}).then((e=>e.json()))}updSettings(e,t,n){return fetch(this.baseURL+`/users/${e}/settings`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)}).then((e=>e.json()))}}},5:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{draw(){const e=document.createElement("footer"),t=document.createElement("a");t.setAttribute("href","https://gihub.com/denismark94"),t.textContent="denismark94";const n=document.createElement("span");n.textContent="2022";const s=document.createElement("img");return s.setAttribute("src","https://app.rs.school/static/images/logo-rsschool3.png"),e.appendChild(t),e.appendChild(n),e.appendChild(s),e}}},330:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),n(136),t.default=class{constructor(){this.pages=["Login","Main","Learn","Train"],console.log("header_constructor_stub")}draw(){const e=document.createElement("header"),t=document.createElement("nav");return this.pages.forEach((e=>{const n=document.createElement("a");n.textContent=e,n.setAttribute("href",`#${e.toLowerCase()}`),t.appendChild(n)})),e.appendChild(t),console.log("!"),e}}},69:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){console.log("main_constructor_stub")}draw(){const e=document.createElement("section"),t=document.createElement("article");let n=document.createElement("h2");n.textContent="RSLang";let s=document.createElement("p");s.textContent="Loreum Ipsium ....",t.appendChild(n),t.appendChild(s);const o=document.createElement("article");return n=document.createElement("h2"),n.textContent="Authors",s=document.createElement("p"),s.textContent="loreum ipsium",o.appendChild(n),o.appendChild(s),e.appendChild(t),e.appendChild(o),e}}},366:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this.pagesPerChapter=30,this.baseURL=e,this.currentChapter=0,this.currentPage=1,this.draw_selectors()}draw_page(e){const t=document.querySelector(".words");t.innerHTML="",e.forEach((e=>{t.appendChild(this.draw_word(e))}))}draw_selectors(){const e=document.querySelector(".pag-list");let t,n="",s=this.currentPage-1,o=this.currentPage+1;this.currentPage>1&&(n+='<li class="btn prev" ><span>‹Prev</span></li>'),this.currentPage>2&&(n+='<li class="numb"><span>1</span></li>',this.currentPage>3&&(n+='<li class="dots"><span>...</span></li>')),29==this.currentPage?s-=2:28==this.currentPage&&(s-=1),0==this.currentPage?o+=2:1==this.currentPage&&(o+=1);for(let e=s;e<=o;e++)e>29||(-1==e&&(e+=1),t=this.currentPage==e?"active":"",n+=`<li class="numb ${t}"><span>${e}</span></li>`);this.currentPage<28&&(this.currentPage<27&&(n+='<li class="dots"><span>...</span></li>'),n+='<li class="numb"><span>29</span></li>'),this.currentPage<29&&(n+='<li class="btn next"><span>Next›</span></li>'),e.innerHTML=n}playWord(e){return new Promise(((t,n)=>{e.play().catch((e=>n(e))),e.addEventListener("ended",(()=>{t("success")}))}))}draw_word(e){const t=document.createElement("div");t.id="_"+e.id,t.className="word-card";const n=document.createElement("img");n.className="association",n.src=this.baseURL+"/"+e.image,n.alt="association",t.appendChild(n);const s=document.createElement("div");s.className="contents";const o=document.createElement("div");o.className="title";const r=document.createElement("span");r.className="word",r.textContent=e.word,o.appendChild(r);const a=document.createElement("span");a.className="transcription",a.textContent=e.transcription,o.appendChild(a);const i=document.createElement("span");i.className="translate",i.textContent=e.wordTranslate,o.appendChild(i);const c=document.createElement("button");c.className="audio",c.textContent="Play",c.innerHTML=`<svg class="icon_audio" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg><audio class='word_audio' src="${this.baseURL+"/"+e.audio}"></audio><audio class='example_audio' src="${this.baseURL+"/"+e.audioExample}"></audio><audio class='meaning_audio' src="${this.baseURL+"/"+e.audioMeaning}"></audio>`,c.addEventListener("click",(()=>{const e=document.querySelector(`#${t.id} .word_audio`);console.log(e);const n=document.querySelector(`#${t.id} .example_audio`),s=document.querySelector(`#${t.id} .meaning_audio`);this.playWord(e).then((()=>this.playWord(n))).then((()=>this.playWord(s))).catch((e=>console.log(e)))})),o.appendChild(c),s.appendChild(o);const l=document.createElement("div");l.className="description";const d=document.createElement("p");d.className="en",d.innerHTML=e.textMeaning,l.appendChild(d);const h=document.createElement("p");h.className="ru",h.innerHTML=e.textMeaningTranslate,l.appendChild(h);const u=document.createElement("div");u.className="example";const m=document.createElement("p");m.className="en",m.innerHTML=e.textExample,u.appendChild(m);const p=document.createElement("p");return p.className="ru",p.innerHTML=e.textExampleTranslate,u.appendChild(p),s.appendChild(l),s.appendChild(u),t.appendChild(s),t}}},541:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=s(n(330)),r=s(n(366)),a=s(n(69)),i=s(n(5));t.default=class{constructor(e){this.url=e,this.header=new o.default,this.textbook=new r.default(e),this.main=new a.default,this.footer=new i.default,this.state="main",this.cntCorrect=0,this.cntIncorrect=0,this.score=0,this.wordlist=[],this.currentWordIndex=0,this.translate="",this.progress=0,this.options=[],this.dataChanging=!1}draw(e){var t;switch(document.querySelectorAll(".main").forEach((e=>{e.classList.add("hidden")})),e){case"login":document.title="Authorize";break;case"main":document.title="RS Lang";break;case"textbook":document.title="Textbook";break;case"train":document.title="Train"}null===(t=document.getElementById(e))||void 0===t||t.classList.remove("hidden")}hideElements(){document.querySelector(".games_picker").classList.add("hidden"),document.querySelector(".board").classList.add("hidden"),document.querySelector(".results").classList.add("hidden")}hideGames(){document.getElementById("sprint").classList.add("hidden"),document.getElementById("audiochallenge").classList.add("hidden")}showPicker(){this.hideElements(),document.querySelector(".games_picker").classList.remove("hidden")}showBoard(){this.hideElements(),document.querySelector(".board").classList.remove("hidden")}showGame(e){this.showBoard(),this.hideGames(),document.getElementById(e).classList.remove("hidden"),this.startGame(e)}startGame(e){switch(this.score=0,this.cntCorrect=0,this.cntIncorrect=0,this.progress=1,this.genPair(),this.refreshValues(),e){case"sprint":this.countdown();break;case"audiochallenge":this.playAudio()}}showResults(){this.hideElements(),document.querySelector(".results").classList.remove("hidden")}countdown(){let e=60;const t=document.querySelector("#countdown > h2");t.textContent=(e--).toString();const n=setInterval((function(s){e>=0?t.textContent=(e--).toString():(clearInterval(n),s.showResults())}),1e3,this)}clearAnswerButtons(){document.querySelectorAll("#options button").forEach((e=>{e.classList.remove("correct"),e.classList.remove("incorrect")}))}paintButton(e){var t;(null===(t=e.textContent)||void 0===t?void 0:t.includes(this.wordlist[this.currentWordIndex].word))?e.classList.add("correct"):e.classList.add("incorrect")}checkAnswer(e){var t;const n=this.wordlist[this.currentWordIndex].wordTranslate===this.translate,s=e.target,o=s.id;switch(o){case"btn_yes":this.cntCorrect+=n?1:0,this.score+=n?10:0,this.genPair(),this.refreshValues();break;case"btn_no":this.cntIncorrect+=n?0:1,this.score+=n?0:10,this.genPair(),this.refreshValues();break;case"next_question":console.log("check"),this.clearAnswerButtons(),this.progress<10?(this.progress++,this.genPair(),new Promise((e=>{this.refreshValues(),e("ok")})).then((()=>this.playAudio())).catch((e=>console.log(e)))):(this.refreshValues(),this.showResults());break;case"show_answer":document.querySelectorAll("#options button").forEach((e=>this.paintButton(e)))}if(o.includes("opt")){const e=this.wordlist[this.currentWordIndex].word;(null===(t=s.textContent)||void 0===t?void 0:t.includes(e))?(this.score+=10,this.cntCorrect++):this.cntIncorrect++,this.paintButton(s)}}refreshValues(){document.querySelector("#question .word").textContent=this.wordlist[this.currentWordIndex].word,document.querySelector("#question .translate").textContent=this.translate;const e=document.querySelector("#score h2"),t=document.getElementById("score_cnt");e.textContent=this.score.toString(),t.textContent=this.score.toString(),document.getElementById("correct_cnt").textContent=this.cntCorrect.toString(),document.getElementById("incorrect_cnt").textContent=this.cntIncorrect.toString(),document.getElementById("example_audio").src=this.url+"/"+this.wordlist[this.currentWordIndex].audio,document.getElementById("progressbar").style.width=10*this.progress+"%";const n=document.querySelectorAll("#options button");let s=0;n.forEach((e=>{e.textContent=`${s+1}. ${this.options[s]}`,s++}))}genPair(){this.currentWordIndex=this.getRandInt(this.wordlist.length),this.getRandInt(2)?this.translate=this.wordlist[this.currentWordIndex].wordTranslate:this.translate=this.wordlist[this.getRandInt(this.wordlist.length)].wordTranslate,this.options=[this.wordlist[this.currentWordIndex].word];let e="";for(let t=0;t<5;t++){do{e=this.wordlist[this.getRandInt(this.wordlist.length)].word}while(this.options.indexOf(e)>0);this.options.push(e)}let t=0;do{t=this.getRandInt(5)}while(0===t);[this.options[0],this.options[t]]=[this.options[t],this.options[0]]}getRandInt(e){return Math.floor(Math.random()*e)}playAudio(){document.getElementById("example_audio").play().catch((e=>console.log(e)))}}},341:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=s(n(354));n(387),n(78),n(474),n(118),n(314),n(998),(new o.default).start()}},t={};function n(s){var o=t[s];if(void 0!==o)return o.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(341)})();