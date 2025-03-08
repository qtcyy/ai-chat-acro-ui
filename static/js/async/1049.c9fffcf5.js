"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["1049"],{3824:function(e,t,o){o.d(t,{C:()=>k});var r=o(2596),l=o(58946),n=o(46499),s=o(77496),a=o(70041),i=o(72192),c=o(22108),d=o(50510),u=o(92384),h=o(21543),x=o(62024),p=o(17413),m=o(72517),g=o(72752),f=o(77276),v=o(81648);let b=x.ZP.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`,y=x.ZP.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${e=>"dark"===e.theme.mode?"#45454e":"#fff"};

  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,j=x.ZP.div`
  background: #fff;
  color: #535126;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${e=>e.show?"100%":"0%"};

  &:hover {
    background: rgb(238, 235, 226);
    color: black;
  }

  transition: all 0.2s ease;
`,w={"deepseek-r1-250120":"DeepSeek-R1","doubao-1-5-pro-32k-250115":"DouBao-1.5-Pro","doubao-1-5-lite-32k-250115":"DouBao-1.5-lite"},k=e=>{let{ask:t,loading:o,cancel:x,showTop:k,isHome:Z}=e;(0,g.s0)();let{selectedModel:N,setSelectedModel:$,insertText:S,setInsertText:C}=(0,f.o)(),{isDarkMode:T}=(0,v.F)(),P=async e=>{t(e)},{run:E}=(0,m.Z)(P,{debounceWait:200,manual:!0}),[I,O]=(0,h.useState)(""),[Y,D]=(0,h.useState)(!1);(0,h.useEffect)(()=>{S.trim()&&(console.log("insert text",S),O(S),C(""))},[S]);let J=(0,h.useCallback)(e=>{null==e||e.stopPropagation(),null==e||e.preventDefault(),""===I||o||(E(I),O(""))},[o,I,E]),M=(0,p.vO)();return(0,r.jsxs)(b,{className:e.className,style:e.style,children:[(0,r.jsx)("div",{className:"flex flex-row w-[60%] mb-3 ",children:(0,r.jsxs)("div",{className:"ml-auto mr-8 flex flex-row gap-1",children:[k&&(0,r.jsx)(j,{show:!o,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{o||null==M||M.toTop()},children:"Top"}),k&&(0,r.jsx)(j,{show:!o,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{o||null==M||M.toBottom()},children:"Bottom"})]})}),(0,r.jsxs)(y,{className:"p-3 min-h-[150px] max-h-[250px] rounded-xl w-[60%] min-w-[700px] flex flex-col items-center",children:[(0,r.jsx)("textarea",{className:`flex-[0.7] w-full text-lg ${T&&"bg-[#45454e]"}`,placeholder:"向我提问吧",value:I,onChange:e=>O(e.target.value),onCompositionStart:()=>D(!0),onCompositionEnd:()=>D(!1),draggable:!1,style:{resize:"none"},onKeyDown:e=>{"Enter"!==e.key||Y||(e.preventDefault(),e.stopPropagation(),J())}}),(0,r.jsxs)("div",{className:"flex-[0.3] w-full inline-flex flex-row items-center",children:[!Z&&(0,r.jsx)(n.Z,{droplist:(0,r.jsxs)(l.Z,{style:{width:"150px"},onClickMenuItem:e=>$(e),children:[(0,r.jsx)(l.Z.Item,{children:(0,r.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,r.jsx)("div",{children:"DeepSeek-R1"}),"deepseek-r1-250120"===N&&(0,r.jsx)(a.Z,{className:"ml-auto"})]})},"deepseek-r1-250120"),(0,r.jsx)(l.Z.Item,{children:(0,r.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,r.jsx)("div",{children:"DouBao-1.5-Pro"}),"doubao-1-5-pro-32k-250115"===N&&(0,r.jsx)(a.Z,{className:"ml-auto"})]})},"doubao-1-5-pro-32k-250115"),(0,r.jsx)(l.Z.Item,{children:(0,r.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,r.jsx)("div",{children:"DouBao-1.5-lite"}),"doubao-1-5-lite-32k-250115"===N&&(0,r.jsx)(a.Z,{className:"ml-auto"})]})},"doubao-1-5-lite-32k-250115")]}),children:(0,r.jsxs)("div",{className:"ml-2 px-2 py-1 hover:bg-[#eeebe2] rounded-lg transition-colors cursor-pointer",children:[w[N],(0,r.jsx)(i.Z,{})]})}),(0,r.jsxs)("div",{className:"ml-auto flex flex-row gap-2 justify-center items-center",children:[o&&(0,r.jsx)("div",{className:"text-xl text-white px-2 py-2 rounded-[50%] bg-red-500 cursor-pointer flex justify-center items-center",onClick:x,children:(0,r.jsx)(c.Z,{})}),(0,r.jsx)("div",{className:""===I?"flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200":"flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer",onClick:J,children:(0,r.jsx)(s.Z,{mini:!0,position:"top",content:""===I?"请输入问题":"点击发送",children:(0,r.jsx)("div",{className:"scale-150",children:o?(0,r.jsx)(d.Z,{}):(0,r.jsx)(u.Z,{})})})})]})]})]})]})}},64432:function(e,t,o){o.d(t,{p:()=>s});var r=o(2596),l=o(8007),n=o(3390);let s=n.ZP.create(()=>{let e=n.ZP.useModal(),t=()=>{e.hide(),setTimeout(()=>{e.remove()},300)};return(0,r.jsx)(l.Z,{visible:e.visible,onCancel:t,onConfirm:()=>{e.resolve(!0),t()},title:(0,r.jsx)("div",{className:"w-full flex text-xl",children:"永久删除会话"}),children:"本条会话数据将被永久删除，不可恢复及撤销。确定要删除吗？"})})},82297:function(e,t,o){o.d(t,{t:()=>p});var r=o(2596),l=o(8007),n=o(80233),s=o(79843),a=o(3390),i=o(62024),c=o(21543),d=o(53753),u=o(18223),h=o(81648);let x=i.ZP.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  color: ${e=>e.theme.colors.text};
`,p=a.ZP.create(e=>{let{chat:t}=e,o=a.ZP.useModal(),[s,i]=(0,c.useState)(t.name),[p,g]=(0,c.useState)(!1),[f,v]=(0,c.useState)(!1),{isDarkMode:b,theme:y}=(0,h.F)(),{getName:j}=(0,d.U)({messages:t.content,body:{model:"doubao-1-5-lite-32k-250115"}}),w=()=>{o.hide(),setTimeout(()=>{o.remove()},300)},k=async()=>{if(""!==s){v(!0);try{let e=await u.WY.post("/api/chat/history/update/name",{id:t.chatId,name:s});if(200!==e.data.code)throw Error(e.data.msg);o.resolve(s),w()}catch(e){console.error(e)}finally{v(!1)}}},Z=e=>{e.preventDefault(),e.target.select()},N=async()=>{g(!0);try{let e=await j();i(e),console.log(e)}catch(e){console.error("命名错误： ",e)}finally{g(!1)}};return(0,r.jsx)(l.Z,{visible:o.visible,onCancel:w,onConfirm:k,title:(0,r.jsx)("div",{style:{color:y.colors.text},children:"重命名对话"}),style:{background:y.colors.background},children:(0,r.jsxs)(x,{children:[(0,r.jsx)(m,{value:s,onChange:e=>i(e),placeholder:"请输入名称...",onFocus:e=>Z(e),allowClear:!0}),(0,r.jsx)(n.Z,{loading:p,onClick:N,children:"智能命名"})]})})}),m=(0,i.ZP)(s.Z)`
  ${e=>{let{theme:t}=e;return"dark"===t.mode&&(0,i.iv)`
      background: #575755;
    `}}
  .arco-input {
    color: ${e=>{let{theme:t}=e;return t.colors.text}};
  }
  .arco-input-inner-wrapper {
    &:focus {
      background: #666;
      color: #000;
    }
  }
  &:hover {
    background: #666666;
  }
`},14972:function(e,t,o){o.d(t,{_Q:()=>s,id:()=>a,mL:()=>n,s1:()=>l,xt:()=>i});var r=o(18223);async function l(){try{let e=await r.WY.get("/api/chat/history");if(200===e.data.code){let t=e.data.data,o=[];return t.map(e=>{let t=e.content;o.push({...e,content:JSON.parse(t),chatId:e.id})}),o}throw Error(e.data.msg)}catch(e){throw console.error(e),e}}async function n(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},o=await r.WY.post("/api/chat/history/write",t);if(200!==o.data.code)throw Error(o.data.msg)}catch(e){throw console.error(e),e}}async function s(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},o=await r.WY.post("/api/chat/history/update",t);if(200!==o.data.code)throw Error(o.data.msg)}catch(e){throw console.error(e),e}}async function a(e){console.log(e.content),console.log(JSON.stringify({...e.content}));try{let t=await r.WY.post("/api/chat/history/update/content",{id:e.id,content:JSON.stringify(e.content)});if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}async function i(e){try{let t=await r.WY.delete(`/api/chat/history/delete/${e}`);if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}},53753:function(e,t,o){o.d(t,{U:()=>l});var r=o(32398);let l=e=>{let t=e.messages.map(e=>{let t=e.content;return{role:e.role,content:(null==t?void 0:t.answer)??" "}});return t.push({role:"user",content:"现在我要为这则对话命名，以上的所有对话均为这则对话的信息。请帮我编写一个对话的标题。注意，在返回中只包含你编写的标题字符串，谢谢。"}),t=t.filter(e=>"start"!==e.role),{getName:async()=>{var o,l;console.log(t);let n=(null===(l=(await (0,r.Z)({method:"POST",url:"http://120.26.42.17:8080/proxy/chat/completions",headers:{...e.headers,"Content-Type":"application/json",Authorization:"Bearer sk-2f7f96daa57447c29397e024650634a9"},data:JSON.stringify({...e.body,messages:t,stream:!1})})).data.choices[0])||void 0===l?void 0:null===(o=l.message)||void 0===o?void 0:o.content)||"";return n||Promise.reject("type error")}}}},45527:function(e,t,o){o.d(t,{a:()=>h,z:()=>u});var r=o(2596),l=o(59537),n=o.n(l),s=o(21543),a=o(77276),i=o(47757),c=o(14972);let d=(0,s.createContext)(void 0),u=()=>(0,s.useContext)(d),h=e=>{let{chatLoadSignal:t,loginUsername:o}=(0,a.o)(),[l,u]=(0,s.useState)([]),h=async()=>{let e=[];try{console.log(o);let e=await (0,c.s1)();localStorage.setItem("chat-history",JSON.stringify(e??[])),u(e??[])}catch(o){let t=localStorage.getItem("chat-history");console.log(t),t?e=JSON.parse(t):localStorage.setItem("chat-history",JSON.stringify(e)),u(e)}},x=async e=>{o&&await (0,c.mL)(e)},p=async e=>{o&&await (0,c.xt)(e)};(0,i.Z)(async()=>{await h()},[t]);let m=(0,s.useCallback)(e=>{let t=e(l);localStorage.setItem("chat-history",JSON.stringify(t)),u(t)},[l]),g=async e=>{let t=l.filter(t=>t.chatId!==e);localStorage.setItem("chat-history",JSON.stringify(t)),await p(e),u(t)};return(0,r.jsx)(d.Provider,{value:{chats:l,addChat:e=>{l.push(e),localStorage.setItem("chat-history",JSON.stringify(l)),x(e),u(l)},sortByTime:()=>{let e=l.sort((e,t)=>n()(e.updateTime).isAfter(n()(t.updateTime))?-1:1);localStorage.setItem("chat-history",JSON.stringify([...e])),u([...e])},updateChat:m,removeAllChat:()=>{u([]),localStorage.removeItem("chat-history")},removeChat:g,getChatHistory:h},children:e.children})}},17413:function(e,t,o){o.d(t,{ID:()=>a,vO:()=>s});var r=o(2596),l=o(21543);let n=(0,l.createContext)(void 0),s=()=>(0,l.useContext)(n),a=e=>{let{children:t,ref:o,shouldScroll:l}=e;return(0,r.jsx)(n.Provider,{value:{target:o,toTop:e=>{if(!o.current.getScrollElement())return;let t=o.current.getScrollElement();t&&(e?t.scrollTo({top:0,behavior:"smooth"}):t.scrollTo({top:0}))},toBottom:e=>{if(!o.current.getScrollElement())return;let t=o.current.getScrollElement();t&&(e?t.scrollTo({top:t.scrollHeight,behavior:"smooth"}):t.scrollTo({top:t.scrollHeight}))},shouldScroll:l},children:t})}},31336:function(e,t,o){o.r(t),o.d(t,{ROLE:()=>Q,default:()=>K});var r=o(2596),l=o(36106),n=o(45527),s=o(62024),a=o(72752),i=o(59537),c=o.n(i),d=o(21543),u=o(821),h=o(77276);let x=e=>{let[t,o]=(0,d.useState)(e.initialMessages??[]),[r,l]=(0,d.useState)(!1),[n,s]=(0,d.useState)(0),{selectedModel:a}=(0,h.o)(),i=(0,d.useRef)(!1);(0,d.useEffect)(()=>{var l;0!==n&&!r&&(o(e=>[...e=e.map(e=>{var t;return e.role===Q.assistant&&(null===(t=e.content)||void 0===t?void 0:t.isEnd)&&(e.content.isEnd=!0),e})]),console.log(t),null===(l=e.onClose)||void 0===l||l.call(e))},[n,r]);let x=(0,d.useRef)(null);(0,d.useEffect)(()=>(x.current=new AbortController,()=>{x.current&&x.current.abort()}),[]);let p=(0,d.useCallback)(()=>{console.log("cancel"),x.current&&(x.current.abort(),x.current=new AbortController),l(!1),s(e=>e+1)},[]),m=(0,d.useCallback)((n,d)=>{if(console.log(n),r||!x.current)return;l(!0),console.log(n);let h=[{role:Q.user,content:d??"你是一个有帮助的智能助理，请帮助我解决问题"}];h.push(...t.map(e=>{var t;return{role:e.role,content:(null===(t=e.content)||void 0===t?void 0:t.answer)??""}})),(h=h.filter(e=>e.role!==Q.start)).push({role:Q.user,content:n}),o(e=>(e.push({role:Q.user,content:{id:String(e.length),answer:n,query:n,isEnd:!0,createTime:c()().format("YYYY-MM-DD HH:mm:ss")},key:String(e.length)}),[...e])),console.log(h);let p=!1,m="",g="";(0,u.L)("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",{method:"POST",signal:x.current.signal,headers:{"Content-Type":"application/json",Authorization:"Bearer sk-2f7f96daa57447c29397e024650634a9",Accept:"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive"},body:JSON.stringify({model:a,messages:h,stream:!0}),keepalive:!0,onopen:t=>(i.current||(i.current=!0,console.log("open state: ",i.current),o(e=>(e.push({role:Q.assistant,key:String(e.length),content:{id:String(e.length),answer:"",query:n,isEnd:!1}}),[...e])),e.onOpen&&e.onOpen()),Promise.resolve()),onmessage(e){var t,r,l,n;if("[DONE]"===e.data)return;let s=JSON.parse(e.data),a=null===(r=s.choices[0])||void 0===r?void 0:null===(t=r.delta)||void 0===t?void 0:t.reasoning_content,i=null===(n=s.choices[0])||void 0===n?void 0:null===(l=n.delta)||void 0===l?void 0:l.content;!p&&a?(p=!0,m+=a):a&&(m+=a),i&&(p=!1,g+=i),m=(m=(m=(m=m.replace(/\\\((.*?)\\\)/g,"$$$1$$")).replace(/\\\[(.*?)\\\]/g,"$$$$$1$$$$")).replaceAll("\\[","$$")).replaceAll("\\]","$$"),g=(g=(g=(g=g.replace(/\\\((.*?)\\\)/g,"$$$1$$")).replace(/\\\[(.*?)\\\]/g,"$$$$$1$$$$")).replaceAll("\\[","$$")).replaceAll("\\]","$$"),o(e=>{let t=e[e.length-1].content;return t={...t,answer:g,think:m,isThink:p},e[e.length-1].content=t,[...e]})},onerror(e){throw console.error(e),l(!1),i.current=!1,e},onclose(){l(!1),i.current=!1,setTimeout(()=>{s(e=>e+1)},50)}})},[l,a,e.onOpen,e.onClose]);return{messages:t,setMessages:o,ask:m,cancel:p,loading:r}};var p=o(3824),m=o(50510),g=o(55397),f=o(72192),v=o(56054),b=o(65579),y=o(57264),j=o(29640),w=o(96212),k=o(765),Z=o(26879),N=o(56750),$=o(17413),S=o(9533),C=o(77496),T=o(58946),P=o(46499),E=o(3390),I=o(82297),O=o(64432),Y=o(53753),D=o(18223),J=o(14972),M=o(47757),B=o(81648);let A=s.ZP.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`,H=s.ZP.div`
  position: sticky;
  display: flex;
  min-width: 375px;
  height: 56px;
  padding: 14px 50px;
  /* background: rgb(244, 242, 236); */
  background: ${e=>e.theme.colors.background};
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .title {
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {
      background: ${e=>"dark"===e.theme.mode?"#31313a":"#e5e7ed"};
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -20px; /* 控制渐变高度 */
    left: 0;
    width: 100%;
    height: 20px;
    ${e=>"dark"===e.theme.mode?(0,s.iv)`
            background: linear-gradient(
              to bottom,
              rgba(39, 39, 37, 1) 0%,
              rgba(39, 39, 37, 0) 100%
            );
          `:(0,s.iv)`
            background: linear-gradient(
              to bottom,
              rgba(244, 242, 236, 1) 0%,
              rgba(244, 242, 236, 0) 100%
            );
          `};

    pointer-events: none; /* 防止遮挡下方交互 */
  }
`,W=s.ZP.div`
  position: relative;
  display: inline-flex;
  padding: 16px;
  max-width: 70%;
  /* background: rgb(226, 224, 213); */
  background: ${e=>e.theme.colors.bubbleUserBg};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  font-family: sans-serif;
  font-size: 18px;
  margin-left: auto;
`,z=s.ZP.div`
  position: absolute;
  left: -15px;
  bottom: -12px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fff;

  display: flex;
  flex-direction: row;
  gap: 10px;
  color: gray;
  transition: color 0.2s ease;
  transition: opacity 0.2s ease;
`,R=s.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 300px;
  max-width: 80%;
  /* background: #fff; */
  /* background: rgb(250, 249, 246); */
  background: ${e=>e.theme.colors.bubbleAssistantBg};
  padding: 24px;
  font-family: serif;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,U=s.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: ${e=>"dark"===e.theme.mode?"rgb(36,36,36)":"#f1f1f1"};
  border-radius: 16px;
`,q=s.ZP.div`
  background: ${e=>"dark"===e.theme.mode?"rgb(36,36,36)":"#f1f1f1"};
  border-radius: 8px 0;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px; /* 控制渐变高度 */
    left: 0;
    width: 100%;
    height: 20px;
    ${e=>"dark"===e.theme.mode?(0,s.iv)`
            background: linear-gradient(
              to bottom,
              rgba(36, 36, 36, 1) 0%,
              rgba(39, 39, 37, 0) 100%
            );
          `:(0,s.iv)`
            background: linear-gradient(
              to bottom,
              rgba(244, 242, 236, 1) 0%,
              rgba(244, 242, 236, 0) 100%
            );
          `};
    pointer-events: none; /* 防止遮挡下方交互 */
  }
`,F=s.ZP.div`
  position: sticky;
  /* top: 100vh; */
  bottom: 0px;
  width: 100%;
`,L=s.ZP.div`
  /* height: 50px; */
`,_=()=>{let e=c()();return 12>e.hour()?"早上好!":12===e.hour()?"中午好!":18>e.hour()?"下午好!":"晚上好!"},Q={user:"user",assistant:"assistant",system:"system",start:"start"},K=()=>{var e,t;let o=(0,n.z)(),i=(0,$.vO)(),u=(0,a.UO)().chatId,{waitSendQuestion:K,setWaitSendQuestion:G,waitSendProps:V,setWaitSendProps:X}=(0,h.o)(),ee=(0,a.s0)(),et=(0,a.TH)(),eo=null===(e=et.state)||void 0===e?void 0:e.from;console.log(eo);let{isDarkMode:er,theme:el}=(0,B.F)();if(!u)return null;let en=null==o?void 0:o.chats.find(e=>e.chatId===u);(0,d.useEffect)(()=>(console.log("chat start"),()=>{et.pathname.startsWith("/ai/chat/page")||ed()}),[et.pathname,u]),(0,M.Z)(async()=>{console.log(es),(en=null==o?void 0:o.chats.find(e=>e.chatId===u))||(console.log(null==o?void 0:o.chats),en={chatId:u,name:"新建对话",isName:!1,content:[{role:Q.start}],createTime:c()().format("YYYY-MM-DD HH:mm:ss"),updateTime:c()().format("YYYY-MM-DD HH:mm:ss")},null==o||o.addChat(en)),ea(en.content)},[u]),(0,d.useEffect)(()=>{K&&setTimeout(()=>{ei(K,V),G(void 0),X(void 0)},200)},[K]);let{messages:es,setMessages:ea,ask:ei,loading:ec,cancel:ed}=x({initialMessages:null==en?void 0:en.content,onOpen:()=>{},onMessage:()=>{},onClose:async()=>{console.log("start close"),ea(e=>{let t=e[e.length-1].content;return t&&(t.isEnd=!0),e[e.length-1].content=t,[...e]}),console.log(es),null==o||o.updateChat(e=>{let t=e.findIndex(e=>e.chatId===u),o=e[t];return o.content=es,o.name=o.name,o.isName=o.isName||!1,o.updateTime=c()().format("YYYY-MM-DD HH:mm:ss"),e[t]=o,[...e]}),console.log(es),(0,J.id)({id:u,content:es})}}),eu=e=>{ea(e=>(e.pop(),[...e])),setTimeout(()=>{ei(e)},100)},eh={[Q.start]:{render:()=>(0,r.jsxs)("div",{className:"flex flex-col gap-8 mt-[100px] mb-[50px]",children:[(0,r.jsx)("div",{className:"text-3xl",children:_()}),(0,r.jsx)("div",{className:"text-xl",children:"你好，请问有什么可以帮您？"})]})},[Q.assistant]:{render:e=>{let[t,o]=(0,d.useState)(!1),[n,s]=(0,d.useState)(!1),{onStart:a,onEnd:i,getCurrent:c,reset:u}=(0,D.HT)({init:0}),h=null==e?void 0:e.think,x=null==e?void 0:e.answer;(0,d.useEffect)(()=>{(null==e||!e.isEnd)&&((null==e?void 0:e.isThink)?a():(i(),ea(e=>{let t=e[e.length-1].content;return t&&(t.thinkTime=c()),[...e]}),u()))},[null==e?void 0:e.isThink]);let p=async()=>{S.Z.info("需要https安全环境部署")};return(0,r.jsxs)(R,{children:[h&&""!==h.trim()&&(0,r.jsxs)(U,{children:[(0,r.jsxs)(q,{className:" sticky top-[55px] flex flex-row items-center",children:[(null==e?void 0:e.isThink)&&!e.isEnd&&ec?(0,r.jsxs)("div",{className:"my-2 text-xl flex flex-row items-center gap-2",children:[(0,r.jsx)("div",{children:"思考中..."}),(0,r.jsxs)("div",{children:[c()," s"]}),(0,r.jsx)(m.Z,{})]}):(0,r.jsxs)("div",{className:"my-2 text-xl flex flex-row items-center gap-2",children:[(0,r.jsx)("div",{children:"思考过程"}),(null==e?void 0:e.thinkTime)&&0!==e.thinkTime&&(0,r.jsxs)("div",{children:["用时",e.thinkTime," s"]})]}),(0,r.jsx)("div",{className:"ml-auto scale-125 p-1 cursor-pointer",onClick:()=>o(!t),children:t?(0,r.jsx)(g.Z,{}):(0,r.jsx)(f.Z,{})})]}),!t&&(0,r.jsx)(l.w1,{text:h})]}),(0,r.jsx)(l.w1,{text:x??" "}),(null==e?void 0:e.isEnd)&&(0,r.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,r.jsxs)("div",{className:`flex flex-row gap-1 items-center p-1 rounded-lg 
                    cursor-pointer ${er?"hover:bg-gray-700":"hover:bg-gray-200"} transition-colors `,onClick:p,children:[(0,r.jsx)(v.Z,{}),"复制"]}),e.id===String(es.length-1)&&(0,r.jsxs)("div",{className:`flex flex-row gap-1 items-center p-1 rounded-lg 
                      cursor-pointer ${er?"hover:bg-gray-700":"hover:bg-gray-200"} transition-colors`,onClick:()=>eu(e.query),children:[(0,r.jsx)(b.Z,{}),"再试一次"]}),(0,r.jsxs)("div",{className:`flex flex-row gap-1 items-center p-1 rounded-lg 
                  cursor-pointer ${er?"hover:bg-gray-700":"hover:bg-gray-200"} transition-colors`,children:[(0,r.jsx)(y.Z,{}),"分享"]})]})]})}},[Q.user]:{render:e=>{let t=null==e?void 0:e.answer,{setInsertText:o}=(0,h.o)();return(0,r.jsxs)(W,{className:"group",children:[(0,r.jsxs)(z,{className:" opacity-0 group-hover:opacity-100",children:[(0,r.jsx)(C.Z,{content:"复制",mini:!0,children:(0,r.jsx)(v.Z,{className:"hover:text-black cursor-pointer"})}),(0,r.jsx)(C.Z,{content:"插入",mini:!0,children:(0,r.jsx)(j.Z,{className:"hover:text-black cursor-pointer",onClick:()=>o(t??"")})}),(0,r.jsx)(C.Z,{content:"分享",mini:!0,children:(0,r.jsx)(y.Z,{className:"hover:text-black cursor-pointer"})})]}),t]})}}},{getName:ex}=(0,Y.U)({messages:es,body:{model:"doubao-1-5-lite-32k-250115"}}),[ep,em]=(0,d.useState)(!0),eg={1:async()=>{if(!(null==o?void 0:o.chats))return;let e=await E.ZP.show(I.t,{chat:o.chats.find(e=>e.chatId===u)});"string"==typeof e&&(null==o||o.updateChat(t=>{let o=t.findIndex(e=>e.chatId===u);return t[o].name=e,(0,J._Q)(t[o]),[...t]}))},2:()=>{},3:async()=>{await E.ZP.show(O.p)&&(await (null==o?void 0:o.removeChat(u)),eo?ee("/#"+eo):ee("/ai/chat/list"))}};return(0,r.jsxs)(A,{children:[(0,r.jsxs)(H,{children:[eo&&(0,r.jsxs)("a",{className:" absolute left-4 flex flex-row gap-1 justify-center items-center",href:"/#"+eo,children:[(0,r.jsx)(N.Z,{}),"返回项目"]}),(0,r.jsx)(P.Z,{droplist:(()=>{let e=e=>{eg[e]()},t=(0,s.ZP)(T.Z.Item)`
      &:hover {
        ${e=>"dark"===e.theme.mode&&(0,s.iv)`
            background: rgb(40, 40, 40);
          `}
      }
    `,o=s.ZP.div`
      ${e=>e.$useColor&&(0,s.iv)`
          color: ${e=>e.theme.colors.text};
        `};
    `;return(0,r.jsxs)(T.Z,{onClickMenuItem:t=>e(t),style:{background:el.colors.componentBg,boxShadow:el.colors.boxShadow},children:[(0,r.jsx)(t,{children:(0,r.jsxs)(o,{$useColor:!0,className:` flex flex-row gap-4 items-center 
            justify-center text-lg pl-2 pr-10 `,children:[(0,r.jsx)(w.Z,{}),(0,r.jsx)("div",{children:"修改名称"})]})},"1"),(0,r.jsx)(t,{children:(0,r.jsxs)(o,{$useColor:!0,className:" flex flex-row gap-4 items-center justify-left text-lg pl-2 pr-10",children:[(0,r.jsx)(k.Z,{}),(0,r.jsx)("div",{children:"分享"})]})},"2"),(0,r.jsx)(t,{children:(0,r.jsxs)(o,{className:" flex flex-row gap-4 items-center justify-left text-lg pl-2 pr-10 text-red-500",children:[(0,r.jsx)(Z.Z,{}),(0,r.jsx)("div",{children:"删除"})]})},"3")]})})(),trigger:"click",children:(0,r.jsxs)("div",{className:"title text-lg px-[16px] py-[4px] mt-1 flex flex-row justify-center items-center",children:[null==en?void 0:en.name,(0,r.jsx)(f.Z,{})]})})]}),(0,r.jsx)(l.qI,{items:es,roles:eh,autoScroll:ep,target:null==i?void 0:null===(t=i.target.current)||void 0===t?void 0:t.getScrollElement(),scrollStore:i}),(0,r.jsx)(L,{}),(0,r.jsx)(F,{children:(0,r.jsx)(p.C,{ask:ei,loading:ec,cancel:ed,showTop:!0})})]})}}}]);