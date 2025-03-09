"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["1049"],{3824:function(e,t,o){o.d(t,{C:()=>k});var r=o(2596),n=o(58946),l=o(46499),s=o(77496),a=o(70041),i=o(72192),c=o(22108),d=o(50510),u=o(92384),h=o(21543),x=o(62024),m=o(17413),p=o(72517),g=o(72752),f=o(77276),v=o(81648);let b=x.ZP.div`
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
`,w=x.ZP.div`
  background: #fff;
  color: #535126;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${e=>e.show?"100%":"0%"};

  &:hover {
    background: rgb(238, 235, 226);
    color: black;
  }

  transition: all 0.2s ease;
`,j={"deepseek-r1":"DeepSeek-R1","qwen-omni-turbo":"Qwen Omni","qwq-32b":"qwq 32B"},k=e=>{let{ask:t,loading:o,cancel:x,showTop:k,isHome:N}=e;(0,g.s0)();let{selectedModel:Z,setSelectedModel:$,insertText:S,setInsertText:C}=(0,f.o)(),{isDarkMode:T}=(0,v.F)(),E=async e=>{t(e)},{run:I}=(0,p.Z)(E,{debounceWait:200,manual:!0}),[P,O]=(0,h.useState)(""),[Y,q]=(0,h.useState)(!1);(0,h.useEffect)(()=>{S.trim()&&(console.log("insert text",S),O(S),C(""))},[S]);let D=(0,h.useCallback)(e=>{null==e||e.stopPropagation(),null==e||e.preventDefault(),""===P||o||(I(P),O(""))},[o,P,I]),J=(0,m.vO)();return(0,r.jsxs)(b,{className:e.className,style:e.style,children:[(0,r.jsx)("div",{className:"flex flex-row w-[60%] mb-3 ",children:(0,r.jsxs)("div",{className:"ml-auto mr-8 flex flex-row gap-1",children:[k&&(0,r.jsx)(w,{show:!o,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{o||null==J||J.toTop()},children:"Top"}),k&&(0,r.jsx)(w,{show:!o,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{o||null==J||J.toBottom()},children:"Bottom"})]})}),(0,r.jsxs)(y,{className:"p-3 min-h-[150px] max-h-[250px] rounded-xl w-[60%] min-w-[700px] flex flex-col items-center",children:[(0,r.jsx)("textarea",{className:`flex-[0.7] w-full text-lg ${T&&"bg-[#45454e]"}`,placeholder:"向我提问吧",value:P,onChange:e=>O(e.target.value),onCompositionStart:()=>q(!0),onCompositionEnd:()=>q(!1),draggable:!1,style:{resize:"none"},onKeyDown:e=>{"Enter"!==e.key||Y||(e.preventDefault(),e.stopPropagation(),D())}}),(0,r.jsxs)("div",{className:"flex-[0.3] w-full inline-flex flex-row items-center",children:[!N&&(0,r.jsx)(l.Z,{droplist:(0,r.jsxs)(n.Z,{style:{width:"150px"},onClickMenuItem:e=>$(e),children:[(0,r.jsx)(n.Z.Item,{children:(0,r.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,r.jsx)("div",{children:"DeepSeek-R1"}),"deepseek-r1"===Z&&(0,r.jsx)(a.Z,{className:"ml-auto"})]})},"deepseek-r1"),(0,r.jsx)(n.Z.Item,{children:(0,r.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,r.jsx)("div",{children:"Qwen Omni"}),"qwen-omni-turbo"===Z&&(0,r.jsx)(a.Z,{className:"ml-auto"})]})},"qwen-omni-turbo"),(0,r.jsx)(n.Z.Item,{children:(0,r.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,r.jsx)("div",{children:"qwq 32B"}),"qwq-32b"===Z&&(0,r.jsx)(a.Z,{className:"ml-auto"})]})},"qwq-32b")]}),children:(0,r.jsxs)("div",{className:"ml-2 px-2 py-1 hover:bg-[#eeebe2] rounded-lg transition-colors cursor-pointer",children:[j[Z],(0,r.jsx)(i.Z,{})]})}),(0,r.jsxs)("div",{className:"ml-auto flex flex-row gap-2 justify-center items-center",children:[o&&(0,r.jsx)("div",{className:"text-xl text-white px-2 py-2 rounded-[50%] bg-red-500 cursor-pointer flex justify-center items-center",onClick:x,children:(0,r.jsx)(c.Z,{})}),(0,r.jsx)("div",{className:""===P?"flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200":"flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer",onClick:D,children:(0,r.jsx)(s.Z,{mini:!0,position:"top",content:""===P?"请输入问题":"点击发送",children:(0,r.jsx)("div",{className:"scale-150",children:o?(0,r.jsx)(d.Z,{}):(0,r.jsx)(u.Z,{})})})})]})]})]})]})}},64432:function(e,t,o){o.d(t,{p:()=>s});var r=o(2596),n=o(8007),l=o(3390);let s=l.ZP.create(()=>{let e=l.ZP.useModal(),t=()=>{e.hide(),setTimeout(()=>{e.remove()},300)};return(0,r.jsx)(n.Z,{visible:e.visible,onCancel:t,onConfirm:()=>{e.resolve(!0),t()},title:(0,r.jsx)("div",{className:"w-full flex text-xl",children:"永久删除会话"}),children:"本条会话数据将被永久删除，不可恢复及撤销。确定要删除吗？"})})},82297:function(e,t,o){o.d(t,{t:()=>m});var r=o(2596),n=o(8007),l=o(80233),s=o(79843),a=o(3390),i=o(62024),c=o(21543),d=o(53753),u=o(18223),h=o(81648);let x=i.ZP.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  color: ${e=>e.theme.colors.text};
`,m=a.ZP.create(e=>{let{chat:t}=e,o=a.ZP.useModal(),[s,i]=(0,c.useState)(t.name),[m,g]=(0,c.useState)(!1),[f,v]=(0,c.useState)(!1),{isDarkMode:b,theme:y}=(0,h.F)(),{getName:w}=(0,d.U)({messages:t.content,body:{model:"qwen-omni-turbo"}}),j=()=>{o.hide(),setTimeout(()=>{o.remove()},300)},k=async()=>{if(""!==s){v(!0);try{let e=await u.WY.post("/api/chat/history/update/name",{id:t.chatId,name:s});if(200!==e.data.code)throw Error(e.data.msg);o.resolve(s),j()}catch(e){console.error(e)}finally{v(!1)}}},N=e=>{e.preventDefault(),e.target.select()},Z=async()=>{g(!0);try{let e=await w();i(e),console.log(e)}catch(e){console.error("命名错误： ",e)}finally{g(!1)}};return(0,r.jsx)(n.Z,{visible:o.visible,onCancel:j,onConfirm:k,title:(0,r.jsx)("div",{style:{color:y.colors.text},children:"重命名对话"}),style:{background:y.colors.background},children:(0,r.jsxs)(x,{children:[(0,r.jsx)(p,{value:s,onChange:e=>i(e),placeholder:"请输入名称...",onFocus:e=>N(e),allowClear:!0}),(0,r.jsx)(l.Z,{loading:m,onClick:Z,children:"智能命名"})]})})}),p=(0,i.ZP)(s.Z)`
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
`},14972:function(e,t,o){o.d(t,{_Q:()=>s,id:()=>a,mL:()=>l,s1:()=>n,xt:()=>i});var r=o(18223);async function n(){try{let e=await r.WY.get("/api/chat/history");if(200===e.data.code){let t=e.data.data;console.log(t);let o=[];return t.map(e=>{let t=e.content;o.push({...e,content:JSON.parse(t),chatId:e.id})}),o}throw Error(e.data.msg)}catch(e){throw console.error(e),e}}async function l(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},o=await r.WY.post("/api/chat/history/write",t);if(200!==o.data.code)throw Error(o.data.msg)}catch(e){throw console.error(e),e}}async function s(e){console.log(e);try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},o=await r.WY.post("/api/chat/history/update",t);if(200!==o.data.code)throw Error(o.data.msg)}catch(e){throw console.error(e),e}}async function a(e){try{let t=await r.WY.post("/api/chat/history/update/content",{id:e.id,content:JSON.stringify(e.content)});if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}async function i(e){try{let t=await r.WY.delete(`/api/chat/history/delete/${e}`);if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}},53753:function(e,t,o){o.d(t,{U:()=>r});let r=e=>{let t=e.messages.map(e=>{let t=e.content;return{role:e.role,content:(null==t?void 0:t.answer)??" "}});return t.push({role:"user",content:"现在我要为这则对话命名，以上的所有对话均为这则对话的信息。请帮我编写一个对话的标题。注意，在返回中只包含你编写的标题字符串，谢谢。"}),t=t.filter(e=>"start"!==e.role),{getName:async()=>{console.log(t);let o=await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",{method:"POST",headers:{...e.headers,"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer sk-2f7f96daa57447c29397e024650634a9"},body:JSON.stringify({...e.body,messages:t,stream:!0})});if(!o.body)return Promise.reject("No response body");let r=o.body.getReader(),n=new TextDecoder("utf-8"),l="";for(;;){let{value:e,done:t}=await r.read();if(t)break;for(let t of n.decode(e,{stream:!0}).split("\n").filter(Boolean))if(t.startsWith("data: ")){let e=t.replace("data: ","").trim();if("[DONE]"===e)break;try{var s,a;let t=JSON.parse(e),o=null===(a=t.choices[0])||void 0===a?void 0:null===(s=a.delta)||void 0===s?void 0:s.content;o&&(l+=o)}catch(e){console.error("Parsing error:",e)}}}return l||Promise.reject("type error")}}}},45527:function(e,t,o){o.d(t,{a:()=>h,z:()=>u});var r=o(2596),n=o(59537),l=o.n(n),s=o(21543),a=o(77276),i=o(47757),c=o(14972);let d=(0,s.createContext)(void 0),u=()=>(0,s.useContext)(d),h=e=>{let{chatLoadSignal:t,loginUsername:o}=(0,a.o)(),[n,u]=(0,s.useState)([]),h=async()=>{let e=[];try{console.log(o);let e=await (0,c.s1)();localStorage.setItem("chat-history",JSON.stringify(e??[])),u(e??[])}catch(o){let t=localStorage.getItem("chat-history");console.log(t),t?e=JSON.parse(t):localStorage.setItem("chat-history",JSON.stringify(e)),u(e)}},x=async e=>{o&&await (0,c.mL)(e)},m=async e=>{o&&await (0,c.xt)(e)};(0,i.Z)(async()=>{await h()},[t]);let p=(0,s.useCallback)(e=>{let t=e(n);localStorage.setItem("chat-history",JSON.stringify(t)),u(t)},[n]),g=async e=>{let t=n.filter(t=>t.chatId!==e);localStorage.setItem("chat-history",JSON.stringify(t)),await m(e),u(t)};return(0,r.jsx)(d.Provider,{value:{chats:n,addChat:e=>{n.push(e),localStorage.setItem("chat-history",JSON.stringify(n)),x(e),u(n)},sortByTime:()=>{let e=n.sort((e,t)=>l()(e.updateTime).isAfter(l()(t.updateTime))?-1:1);localStorage.setItem("chat-history",JSON.stringify([...e])),u([...e])},updateChat:p,removeAllChat:()=>{u([]),localStorage.removeItem("chat-history")},removeChat:g,getChatHistory:h},children:e.children})}},17413:function(e,t,o){o.d(t,{ID:()=>a,vO:()=>s});var r=o(2596),n=o(21543);let l=(0,n.createContext)(void 0),s=()=>(0,n.useContext)(l),a=e=>{let{children:t,ref:o,shouldScroll:s,scrollTop:a,clientHeight:i}=e;return(0,n.useEffect)(()=>{o.current&&console.log(o.current.getScrollElement().scrollTop)},[o.current]),(0,r.jsx)(l.Provider,{value:{target:o,toTop:e=>{if(!o.current.getScrollElement())return;let t=o.current.getScrollElement();t&&(e?t.scrollTo({top:0,behavior:"smooth"}):t.scrollTo({top:0}))},toBottom:e=>{if(!o.current.getScrollElement())return;let t=o.current.getScrollElement();t&&(e?t.scrollTo({top:t.scrollHeight,behavior:"smooth"}):t.scrollTo({top:t.scrollHeight}))},shouldScroll:s,scrollTop:a,clientHeight:i},children:t})}},31336:function(e,t,o){o.r(t),o.d(t,{ROLE:()=>G,default:()=>V});var r=o(2596),n=o(36106),l=o(45527),s=o(62024),a=o(72752),i=o(59537),c=o.n(i),d=o(21543),u=o(821),h=o(77276);let x=e=>{let[t,o]=(0,d.useState)(e.initialMessages??[]),[r,n]=(0,d.useState)(!1),[l,s]=(0,d.useState)(0),{selectedModel:a}=(0,h.o)(),i=(0,d.useRef)(!1);(0,d.useEffect)(()=>{var n;0!==l&&!r&&(o(e=>[...e=e.map(e=>{var t;return e.role===G.assistant&&(null===(t=e.content)||void 0===t?void 0:t.isEnd)&&(e.content.isEnd=!0),e})]),console.log(t),null===(n=e.onClose)||void 0===n||n.call(e))},[l,r]);let x=(0,d.useRef)(null);(0,d.useEffect)(()=>(x.current=new AbortController,()=>{x.current&&x.current.abort()}),[]);let m=(0,d.useCallback)(()=>{console.log("cancel"),x.current&&(x.current.abort(),x.current=new AbortController),n(!1),s(e=>e+1)},[]),p=(0,d.useCallback)((l,d)=>{if(console.log(l),r||!x.current)return;n(!0),console.log(l);let h=[{role:G.user,content:d??"你是一个有帮助的智能助理，请帮助我解决问题"}];h.push(...t.map(e=>{var t;return{role:e.role,content:(null===(t=e.content)||void 0===t?void 0:t.answer)??""}})),(h=h.filter(e=>e.role!==G.start)).push({role:G.user,content:l}),o(e=>(e.push({role:G.user,content:{id:String(e.length),answer:l,query:l,isEnd:!0,createTime:c()().format("YYYY-MM-DD HH:mm:ss")},key:String(e.length)}),[...e])),console.log(h);let m=!1,p="",g="";(0,u.L)("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",{method:"POST",signal:x.current.signal,headers:{"Content-Type":"application/json",Authorization:"Bearer sk-2f7f96daa57447c29397e024650634a9",Accept:"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive"},body:JSON.stringify({model:a,messages:h,stream:!0}),keepalive:!0,onopen:t=>(i.current||(i.current=!0,console.log("open state: ",i.current),o(e=>(e.push({role:G.assistant,key:String(e.length),content:{id:String(e.length),answer:"",query:l,isEnd:!1}}),[...e])),e.onOpen&&e.onOpen()),Promise.resolve()),onmessage(e){var t,r,n,l;if("[DONE]"===e.data)return;let s=JSON.parse(e.data),a=null===(r=s.choices[0])||void 0===r?void 0:null===(t=r.delta)||void 0===t?void 0:t.reasoning_content,i=null===(l=s.choices[0])||void 0===l?void 0:null===(n=l.delta)||void 0===n?void 0:n.content;!m&&a?(m=!0,p+=a):a&&(p+=a),i&&(m=!1,g+=i),p=(p=(p=(p=p.replace(/\\\((.*?)\\\)/g,"$$$1$$")).replace(/\\\[(.*?)\\\]/g,"$$$$$1$$$$")).replaceAll("\\[","$$")).replaceAll("\\]","$$"),g=(g=(g=(g=g.replace(/\\\((.*?)\\\)/g,"$$$1$$")).replace(/\\\[(.*?)\\\]/g,"$$$$$1$$$$")).replaceAll("\\[","$$")).replaceAll("\\]","$$"),o(e=>{let t=e[e.length-1].content;return t={...t,answer:g,think:p,isThink:m},e[e.length-1].content=t,[...e]})},onerror(e){throw console.error(e),n(!1),i.current=!1,e},onclose(){n(!1),i.current=!1,setTimeout(()=>{s(e=>e+1)},50)}})},[n,a,e.onOpen,e.onClose]);return{messages:t,setMessages:o,ask:p,cancel:m,loading:r}};var m=o(3824),p=o(50510),g=o(55397),f=o(72192),v=o(56054),b=o(65579),y=o(57264),w=o(29640),j=o(96212),k=o(765),N=o(26879),Z=o(56750),$=o(17413),S=o(58946),C=o(9533),T=o(77496),E=o(46499),I=o(3390),P=o(82297),O=o(64432),Y=o(53753),q=o(18223),D=o(14972),J=o(47757),M=o(81648);let A=s.ZP.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`,B=s.ZP.div`
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
`,H=s.ZP.div`
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
`,W=s.ZP.div`
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
`,z=s.ZP.div`
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
`,R=s.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: ${e=>"dark"===e.theme.mode?"rgb(36,36,36)":"#f1f1f1"};
  border-radius: 16px;
`,Q=s.ZP.div`
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
`,U=s.ZP.div`
  position: sticky;
  /* top: 100vh; */
  bottom: 0px;
  width: 100%;
`,F=s.ZP.div`
  /* height: 50px; */
`,L=(0,s.ZP)(S.Z.Item)`
  &:hover {
    ${e=>"dark"===e.theme.mode&&(0,s.iv)`
        background: rgb(40, 40, 40);
      `}
  }
`,_=s.ZP.div`
  ${e=>e.$useColor&&(0,s.iv)`
      color: ${e=>e.theme.colors.text};
    `};
`,K=()=>{let e=c()();return 12>e.hour()?"早上好!":12===e.hour()?"中午好!":18>e.hour()?"下午好!":"晚上好!"},G={user:"user",assistant:"assistant",system:"system",start:"start"},V=()=>{var e,t;let o=(0,l.z)(),s=(0,$.vO)(),i=(0,a.UO)().chatId,{waitSendQuestion:u,setWaitSendQuestion:V,waitSendProps:X,setWaitSendProps:ee}=(0,h.o)(),et=(0,a.s0)(),eo=(0,a.TH)(),er=null===(e=eo.state)||void 0===e?void 0:e.from,{isDarkMode:en,theme:el}=(0,M.F)();if(!i)return null;let es=null==o?void 0:o.chats.find(e=>e.chatId===i);(0,d.useEffect)(()=>(console.log("chat start"),()=>{eo.pathname.startsWith("/ai/chat/page")||eu()}),[eo.pathname,i]),(0,J.Z)(async()=>{console.log(es=null==o?void 0:o.chats.find(e=>e.chatId===i)),es||(console.log(null==o?void 0:o.chats),es={chatId:i,name:"新建对话",isName:!1,content:[{role:G.start}],createTime:c()().format("YYYY-MM-DD HH:mm:ss"),updateTime:c()().format("YYYY-MM-DD HH:mm:ss")},null==o||o.addChat(es)),ei(es.content)},[i]),(0,d.useEffect)(()=>{u&&setTimeout(()=>{ec(u,X),V(void 0),ee(void 0)},200)},[u]);let{messages:ea,setMessages:ei,ask:ec,loading:ed,cancel:eu}=x({initialMessages:null==es?void 0:es.content,onOpen:()=>{},onMessage:()=>{},onClose:async()=>{console.log("start close"),ei(e=>{let t=e[e.length-1].content;return t&&(t.isEnd=!0),e[e.length-1].content=t,[...e]});let e=null==o?void 0:o.chats.find(e=>e.chatId===i),t="";console.log(ea),null==o||o.updateChat(e=>{let t=e.findIndex(e=>e.chatId===i),o=e[t];return o.content=ea,o.updateTime=c()().format("YYYY-MM-DD HH:mm:ss"),e[t]=o,[...e]}),console.log(null==o?void 0:o.chats),(0,D.id)({id:i,content:ea}),(null==e?void 0:e.isName)||ex(await ep())}}),eh=e=>{ei(e=>(e.pop(),[...e])),setTimeout(()=>{ec(e)},100)},ex=e=>{null==o||o.updateChat(t=>{let o=t.findIndex(e=>e.chatId===i);return t[o]={...t[o],isName:!0,name:e},(0,D._Q)(t[o]),[...t]})},em={[G.start]:{render:()=>(0,r.jsxs)("div",{className:"flex flex-col gap-8 mt-[100px] mb-[50px]",children:[(0,r.jsx)("div",{className:"text-3xl",children:K()}),(0,r.jsx)("div",{className:"text-xl",children:"你好，请问有什么可以帮您？"})]})},[G.assistant]:{render:e=>{let[t,o]=(0,d.useState)(!1),[l,s]=(0,d.useState)(!1),{onStart:a,onEnd:i,getCurrent:c,reset:u}=(0,q.HT)({init:0}),h=null==e?void 0:e.think,x=null==e?void 0:e.answer;(0,d.useEffect)(()=>{(null==e||!e.isEnd)&&((null==e?void 0:e.isThink)?a():(i(),ei(e=>{let t=e[e.length-1].content;return t&&(t.thinkTime=c()),[...e]}),u()))},[null==e?void 0:e.isThink]);let m=async()=>{C.Z.info("需要https安全环境部署")};return(0,r.jsxs)(z,{children:[h&&""!==h.trim()&&(0,r.jsxs)(R,{children:[(0,r.jsxs)(Q,{className:" sticky top-[55px] flex flex-row items-center",children:[(null==e?void 0:e.isThink)&&!e.isEnd&&ed?(0,r.jsxs)("div",{className:"my-2 text-xl flex flex-row items-center gap-2",children:[(0,r.jsx)("div",{children:"思考中..."}),(0,r.jsxs)("div",{children:[c()," s"]}),(0,r.jsx)(p.Z,{})]}):(0,r.jsxs)("div",{className:"my-2 text-xl flex flex-row items-center gap-2",children:[(0,r.jsx)("div",{children:"思考过程"}),(null==e?void 0:e.thinkTime)&&0!==e.thinkTime&&(0,r.jsxs)("div",{children:["用时",e.thinkTime," s"]})]}),(0,r.jsx)("div",{className:"ml-auto scale-125 p-1 cursor-pointer",onClick:()=>o(!t),children:t?(0,r.jsx)(g.Z,{}):(0,r.jsx)(f.Z,{})})]}),!t&&(0,r.jsx)(n.w1,{text:h})]}),(0,r.jsx)(n.w1,{text:x??" "}),(null==e?void 0:e.isEnd)&&(0,r.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,r.jsxs)("div",{className:`flex flex-row gap-1 items-center p-1 rounded-lg 
                    cursor-pointer ${en?"hover:bg-gray-700":"hover:bg-gray-200"} transition-colors `,onClick:m,children:[(0,r.jsx)(v.Z,{}),"复制"]}),e.id===String(ea.length-1)&&(0,r.jsxs)("div",{className:`flex flex-row gap-1 items-center p-1 rounded-lg 
                      cursor-pointer ${en?"hover:bg-gray-700":"hover:bg-gray-200"} transition-colors`,onClick:()=>eh(e.query),children:[(0,r.jsx)(b.Z,{}),"再试一次"]}),(0,r.jsxs)("div",{className:`flex flex-row gap-1 items-center p-1 rounded-lg 
                  cursor-pointer ${en?"hover:bg-gray-700":"hover:bg-gray-200"} transition-colors`,children:[(0,r.jsx)(y.Z,{}),"分享"]})]})]})}},[G.user]:{render:e=>{let t=null==e?void 0:e.answer,{setInsertText:o}=(0,h.o)();return(0,r.jsxs)(H,{className:"group",children:[(0,r.jsxs)(W,{className:" opacity-0 group-hover:opacity-100",children:[(0,r.jsx)(T.Z,{content:"复制",mini:!0,children:(0,r.jsx)(v.Z,{className:"hover:text-black cursor-pointer"})}),(0,r.jsx)(T.Z,{content:"插入",mini:!0,children:(0,r.jsx)(w.Z,{className:"hover:text-black cursor-pointer",onClick:()=>o(t??"")})}),(0,r.jsx)(T.Z,{content:"分享",mini:!0,children:(0,r.jsx)(y.Z,{className:"hover:text-black cursor-pointer"})})]}),t]})}}},{getName:ep}=(0,Y.U)({messages:ea,body:{model:"qwen-omni-turbo"}}),[eg,ef]=(0,d.useState)(!0),ev={1:async()=>{if(!(null==o?void 0:o.chats))return;let e=await I.ZP.show(P.t,{chat:o.chats.find(e=>e.chatId===i)});"string"==typeof e&&(null==o||o.updateChat(t=>{let o=t.findIndex(e=>e.chatId===i);return t[o].name=e,(0,D._Q)(t[o]),[...t]}))},2:()=>{},3:async()=>{await I.ZP.show(O.p)&&(await (null==o?void 0:o.removeChat(i)),er?et("/#"+er):et("/ai/chat/list"))}};return(0,r.jsxs)(A,{children:[(0,r.jsxs)(B,{children:[er&&(0,r.jsxs)("a",{className:" absolute left-4 flex flex-row gap-1 justify-center items-center",href:"/#"+er,children:[(0,r.jsx)(Z.Z,{}),"返回项目"]}),(0,r.jsx)(E.Z,{droplist:(()=>{let e=e=>{ev[e]()};return(0,r.jsxs)(S.Z,{onClickMenuItem:t=>e(t),style:{background:el.colors.componentBg,boxShadow:el.colors.boxShadow},children:[(0,r.jsx)(L,{children:(0,r.jsxs)(_,{$useColor:!0,className:` flex flex-row gap-4 items-center 
            justify-center text-lg pl-2 pr-10 `,children:[(0,r.jsx)(j.Z,{}),(0,r.jsx)("div",{children:"修改名称"})]})},"1"),(0,r.jsx)(L,{children:(0,r.jsxs)(_,{$useColor:!0,className:" flex flex-row gap-4 items-center justify-left text-lg pl-2 pr-10",children:[(0,r.jsx)(k.Z,{}),(0,r.jsx)("div",{children:"分享"})]})},"2"),(0,r.jsx)(L,{children:(0,r.jsxs)(_,{className:" flex flex-row gap-4 items-center justify-left text-lg pl-2 pr-10 text-red-500",children:[(0,r.jsx)(N.Z,{}),(0,r.jsx)("div",{children:"删除"})]})},"3")]})})(),trigger:"click",children:(0,r.jsxs)("div",{className:"title text-lg px-[16px] py-[4px] mt-1 flex flex-row justify-center items-center",children:[null==es?void 0:es.name,(0,r.jsx)(f.Z,{})]})})]}),(0,r.jsx)(n.qI,{items:ea,roles:em,autoScroll:eg,target:null==s?void 0:null===(t=s.target.current)||void 0===t?void 0:t.getScrollElement(),scrollStore:s,loading:ed}),(0,r.jsx)(F,{}),(0,r.jsx)(U,{children:(0,r.jsx)(m.C,{ask:ec,loading:ed,cancel:eu,showTop:!0})})]})}}}]);