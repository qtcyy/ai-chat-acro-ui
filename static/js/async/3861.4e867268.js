"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["3861"],{45620:function(e,t,r){r.r(t),r.d(t,{default:()=>X});var l=r(2596),o=r(58946),s=r(46499),a=r(56750),n=r(73618),i=r(9018),c=r(26879),d=r(29595),x=r(3390),u=r(21543),m=r(72752),h=r(62024),p=r(81648),f=r(8007);let g=x.ZP.create(e=>{let{project:t}=e,r=x.ZP.useModal(),[o,s]=(0,u.useState)(t.name),[a,n]=(0,u.useState)(t.description),[i,c]=(0,u.useState)(!1),d=()=>{r.hide(),setTimeout(()=>{r.remove()},300)};return(0,l.jsx)(b,{visible:r.visible,title:(0,l.jsx)(w,{children:"编辑项目信息"}),onCancel:d,onOk:()=>{if(!o.trim()){c(!0);return}r.resolve({name:o,description:a}),d()},children:(0,l.jsxs)(y,{children:[(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsx)("div",{className:"text-lg font-bold",children:"Name"}),(0,l.jsx)(j,{value:o,onChange:e=>s(e.target.value)}),i&&(0,l.jsx)("div",{className:"text-red-500 ml-auto font-bold",children:"请输入项目名称"})]}),(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsx)("div",{className:"text-lg font-bold",children:"Description"}),(0,l.jsx)(v,{rows:3,value:a,onChange:e=>n(e.target.value)})]})]})})}),v=h.ZP.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  resize: none;
`,j=h.ZP.input`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`,w=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  text-align: left;
`,b=(0,h.ZP)(f.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.background}};
`,y=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;var N=r(1731);let Z=x.ZP.create(()=>{let e=(0,x.dd)(),t=()=>{e.hide(),setTimeout(()=>{e.remove()},300)};return(0,l.jsx)(S,{title:(0,l.jsx)(P,{children:"删除项目"}),visible:e.visible,onCancel:t,onOk:()=>{e.resolve(!0),t()},children:(0,l.jsx)(k,{children:"确定删除项目吗？"})})}),k=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
`,P=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  text-align: left;
`,S=(0,h.ZP)(f.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
`;var I=r(3824);let C=x.ZP.create(e=>{let{project:t}=e,r=x.ZP.useModal(),[o,s]=(0,u.useState)(t.aiProps??""),a=()=>{r.hide(),setTimeout(()=>r.remove(),300)};return(0,l.jsx)(Y,{visible:r.visible,onCancel:a,onConfirm:()=>{o.trim()?r.resolve(o):r.reject(),a()},title:null,children:(0,l.jsxs)(T,{children:[(0,l.jsx)("div",{className:"text-xl font-bold",children:"设置项目的AI提示词"}),(0,l.jsx)($,{rows:10,placeholder:"请填写AI提示词",value:o,onChange:e=>s(e.target.value)})]})})}),$=h.ZP.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 20px;
  background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  resize: none;
`,T=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.text}};
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Y=(0,h.ZP)(f.Z)`
  background: ${e=>{let{theme:t}=e;return t.colors.background}};
`;var O=r(45527),D=r(78056),E=r(59537),H=r.n(E),J=r(77276),M=r(17753);let q=e=>{let t=H()(e),r=H()().diff(t,"second"),l=H()().diff(t,"minute"),o=H()().diff(t,"hour"),s=H()().diff(t,"day"),a=H()().diff(t,"month"),n=H()().diff(t,"year");return n?String(n)+"年":a?String(a)+"月":s?String(s)+"天":o?String(o)+"小时":l?String(l)+"分钟":String(r)+"秒"},B=h.ZP.div`
  transition: background 200ms ease;
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
  &:hover {
    background: ${e=>{let{theme:t}=e;return"dark"===t.mode?"#374151":"#e5e7eb"}};
  }
`,z=(0,h.ZP)(M.E.li)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  cursor: pointer;

  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  transition: background 200ms ease;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  }
`,F=h.ZP.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,W=h.ZP.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  max-width: 150px;
`,A=h.ZP.div`
  color: ${e=>{let{theme:t}=e;return t.colors.secondary}};
`,Q=h.ZP.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 36px;
  background: ${e=>{let{theme:t}=e;return t.colors.bubbleUserBg}};
`,L=h.ZP.div`
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  transition: background 200ms ease;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.colors.componentBg}};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`,R=h.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.secondary}};
  padding: 16px;
  border-radius: 16px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.background}};
`,U=h.ZP.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
`,K=h.ZP.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
`,_=h.ZP.div`
  display: flex;
  padding-right: 24px;
  width: 100%;
  margin-top: 48px;
  flex-direction: row;
  gap: 32px;
`,G=h.ZP.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  height: 64px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    ${e=>{let{theme:t}=e;return`${t.colors.background}00`}},
    ${e=>{let{theme:t}=e;return t.colors.background}}
  );
`,V=h.ZP.div`
  padding-left: 24px;
  display: flex;
  width: calc(100vw - 108px);
  flex-direction: column;
`,X=()=>{let e=(0,m.UO)().id,t=(0,m.TH)(),r=(0,m.s0)(),{isDarkMode:h}=(0,p.F)(),{projects:f,updateProject:v,deleteProject:j}=(0,N.E)(),w=f.find(t=>t.id===e),[b,y]=(0,u.useState)(w??{id:"-1",name:"unknown",chatIds:[],createTime:"-1",updateTime:"-1"}),k=(0,O.z)(),{setWaitSendQuestion:P,setWaitSendProps:S}=(0,J.o)(),[$,T]=(0,u.useState)((()=>{let e=new Set(b.chatIds),t=null==k?void 0:k.chats.filter(t=>e.has(t.chatId));return t?t.sort((e,t)=>H()(e.updateTime).isAfter(t.updateTime)?-1:1):[]})());if(!w||!e)return(0,l.jsx)("div",{children:"项目不存在"});let Y=async()=>{let t=await x.ZP.show(C,{project:b});console.log(t),t&&(v(r=>{let l=r.findIndex(t=>t.id===e),o=[...r];return -1!==l&&(o[l]={...o[l],aiProps:t,updateTime:H()().format("YYYY-MM-DD HH:mm:ss")}),o}),console.log(f),y(e=>({...e,aiProps:t})))};return(0,l.jsxs)(V,{children:[(0,l.jsxs)(G,{className:"w-full pr-8",children:[(0,l.jsxs)("a",{href:"/#/ai/chat/projects",className:"text-base flex flex-row gap-1 items-center",children:[(0,l.jsx)(a.Z,{className:"scale-125"}),"所有项目"]}),(0,l.jsx)(s.Z,{droplist:(()=>{let t=async t=>{switch(t){case"edit":let l=await x.ZP.show(g,{project:b});l&&(v(t=>{let r=t.findIndex(t=>t.id===e),o=[...t];return -1!==r&&(o[r]={...o[r],...l,updateTime:H()().format("YYYY-MM-DD HH:mm:ss")}),o}),y(e=>({...e,...l})));break;case"remove":await x.ZP.show(Z)&&(j(e),r("/ai/chat/projects"))}};return(0,l.jsxs)(o.Z,{className:`w-[6rem] ${h&&"bg-gray-700 border-none"}`,onClickMenuItem:t,children:[(0,l.jsx)(o.Z.Item,{className:`${h&&"hover:bg-gray-500"}`,children:(0,l.jsx)("div",{className:`w-5 ${h&&"text-white"}`,children:"编辑"})},"edit"),(0,l.jsx)(o.Z.Item,{className:`${h&&"hover:bg-gray-500"}`,children:(0,l.jsx)("div",{className:"w-5 text-red-500",children:"删除"})},"remove")]})})(),trigger:["click"],children:(0,l.jsx)("div",{className:`ml-auto rounded-lg px-2 py-1 scale-125 cursor-pointer ${h?"hover:bg-gray-700":"hover:bg-gray-200"}`,children:(0,l.jsx)(n.Z,{})})})]}),(0,l.jsxs)(_,{children:[(0,l.jsxs)(K,{children:[(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsxs)("div",{className:"text-3xl font-bold font-serif flex flex-row gap-2 items-center",children:[(0,l.jsx)(i.Z,{}),null==b?void 0:b.name]}),(0,l.jsx)("div",{className:"text-sm text-gray-500",children:null==b?void 0:b.description})]}),(0,l.jsx)(I.C,{className:"mt-4",ask:l=>{if(console.log(l),!l.trim())return;let o=(0,D.Z)();null==k||k.addChat({chatId:o,name:"新建对话",content:[{role:"start"}],createTime:H()().format("YYYY-MM-DD HH:mm:ss"),updateTime:H()().format("YYYY-MM-DD HH:mm:ss")}),v(t=>{let r=t.findIndex(t=>t.id===e),l=[...t];return -1!==r&&(l[r]={...l[r],chatIds:[...l[r].chatIds,o],updateTime:H()().format("YYYY-MM-DD HH:mm:ss")}),l}),y(e=>({...e,chatIds:[...e.chatIds,o]})),S(b.aiProps),P(l),r(`/ai/chat/page/${o}`,{state:{from:t.pathname}})},loading:!1,cancel:()=>{},isHome:!0}),(0,l.jsx)(F,{className:"mt-5",children:$.map(e=>{let o=async t=>{t.stopPropagation(),null==k||k.removeChat(e.chatId),T(t=>t.filter(t=>t.chatId!==e.chatId))};return(0,l.jsxs)(z,{className:"group",whileTap:{scale:.95},onClick:()=>{r(`/ai/chat/page/${e.chatId}`,{state:{from:t.pathname}})},children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("div",{className:"text-lg font-serif",children:e.name}),(0,l.jsx)(B,{className:"ml-auto px-2 py-1 border-gray-500 hidden group-hover:flex justify-center items-center text-base rounded-md cursor-pointer",onClick:o,children:(0,l.jsx)(c.Z,{})})]}),(0,l.jsxs)(A,{children:["上一次更新：",q(e.updateTime),"前"]})]},e.chatId)})})]}),(0,l.jsx)(U,{children:(0,l.jsxs)(R,{children:[(0,l.jsxs)("div",{className:"flex flex-row items-center",children:[(0,l.jsx)("div",{className:"text-lg font-bold font-serif",children:"项目知识"}),(0,l.jsx)(L,{className:"ml-auto py-1 px-3 text-xl rounded-lg mr-2 text-center items-center cursor-pointer",children:"+"})]}),(0,l.jsx)("div",{className:"mt-2 p-2",children:(0,l.jsx)(L,{className:"p-2 rounded-lg flex cursor-pointer",onClick:Y,children:b.aiProps?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(W,{children:b.aiProps}),(0,l.jsx)("div",{className:"text-blue-500 ml-auto text-base font-bold",children:"Edit"})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{children:"设置提示词"}),(0,l.jsx)(A,{className:"ml-auto",children:"Optional"})]})})}),(0,l.jsxs)(Q,{className:" rounded-lg justify-center items-center",children:[(0,l.jsx)("div",{className:"text-4xl",children:(0,l.jsx)(d.Z,{})}),(0,l.jsx)(A,{children:"尚未添加任何知识。将 PDF、文档或其他文本添加到项目知识库中，DeepSeek 将在每次项目对话中引用这些文本。"})]})]})})]})]})}},3824:function(e,t,r){r.d(t,{C:()=>N});var l=r(2596),o=r(58946),s=r(46499),a=r(77496),n=r(70041),i=r(72192),c=r(22108),d=r(50510),x=r(92384),u=r(21543),m=r(62024),h=r(17413),p=r(72517),f=r(72752),g=r(77276),v=r(81648);let j=m.ZP.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`,w=m.ZP.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${e=>"dark"===e.theme.mode?"#45454e":"#fff"};

  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,b=m.ZP.div`
  background: #fff;
  color: #535126;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${e=>e.show?"100%":"0%"};

  &:hover {
    background: rgb(238, 235, 226);
    color: black;
  }

  transition: all 0.2s ease;
`,y={"deepseek-r1":"DeepSeek-R1","qwen-omni-turbo":"Qwen Omni","qwq-32b":"qwq 32B"},N=e=>{let{ask:t,loading:r,cancel:m,showTop:N,isHome:Z}=e;(0,f.s0)();let{selectedModel:k,setSelectedModel:P,insertText:S,setInsertText:I}=(0,g.o)(),{isDarkMode:C}=(0,v.F)(),$=async e=>{t(e)},{run:T}=(0,p.Z)($,{debounceWait:200,manual:!0}),[Y,O]=(0,u.useState)(""),[D,E]=(0,u.useState)(!1);(0,u.useEffect)(()=>{S.trim()&&(console.log("insert text",S),O(S),I(""))},[S]);let H=(0,u.useCallback)(e=>{null==e||e.stopPropagation(),null==e||e.preventDefault(),""===Y||r||(T(Y),O(""))},[r,Y,T]),J=(0,h.vO)();return(0,l.jsxs)(j,{className:e.className,style:e.style,children:[(0,l.jsx)("div",{className:"flex flex-row w-[60%] mb-3 ",children:(0,l.jsxs)("div",{className:"ml-auto mr-8 flex flex-row gap-1",children:[N&&(0,l.jsx)(b,{show:!r,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{r||null==J||J.toTop()},children:"Top"}),N&&(0,l.jsx)(b,{show:!r,className:"py-1 px-4 cursor-pointer rounded-md ",onClick:()=>{r||null==J||J.toBottom()},children:"Bottom"})]})}),(0,l.jsxs)(w,{className:"p-3 min-h-[150px] max-h-[250px] rounded-xl w-[60%] min-w-[700px] flex flex-col items-center",children:[(0,l.jsx)("textarea",{className:`flex-[0.7] w-full text-lg ${C&&"bg-[#45454e]"}`,placeholder:"向我提问吧",value:Y,onChange:e=>O(e.target.value),onCompositionStart:()=>E(!0),onCompositionEnd:()=>E(!1),draggable:!1,style:{resize:"none"},onKeyDown:e=>{"Enter"!==e.key||D||(e.preventDefault(),e.stopPropagation(),H())}}),(0,l.jsxs)("div",{className:"flex-[0.3] w-full inline-flex flex-row items-center",children:[!Z&&(0,l.jsx)(s.Z,{droplist:(0,l.jsxs)(o.Z,{style:{width:"150px"},onClickMenuItem:e=>P(e),children:[(0,l.jsx)(o.Z.Item,{children:(0,l.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,l.jsx)("div",{children:"DeepSeek-R1"}),"deepseek-r1"===k&&(0,l.jsx)(n.Z,{className:"ml-auto"})]})},"deepseek-r1"),(0,l.jsx)(o.Z.Item,{children:(0,l.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,l.jsx)("div",{children:"Qwen Omni"}),"qwen-omni-turbo"===k&&(0,l.jsx)(n.Z,{className:"ml-auto"})]})},"qwen-omni-turbo"),(0,l.jsx)(o.Z.Item,{children:(0,l.jsxs)("div",{className:"flex flex-row w-full items-center",children:[(0,l.jsx)("div",{children:"qwq 32B"}),"qwq-32b"===k&&(0,l.jsx)(n.Z,{className:"ml-auto"})]})},"qwq-32b")]}),children:(0,l.jsxs)("div",{className:"ml-2 px-2 py-1 hover:bg-[#eeebe2] rounded-lg transition-colors cursor-pointer",children:[y[k],(0,l.jsx)(i.Z,{})]})}),(0,l.jsxs)("div",{className:"ml-auto flex flex-row gap-2 justify-center items-center",children:[r&&(0,l.jsx)("div",{className:"text-xl text-white px-2 py-2 rounded-[50%] bg-red-500 cursor-pointer flex justify-center items-center",onClick:m,children:(0,l.jsx)(c.Z,{})}),(0,l.jsx)("div",{className:""===Y?"flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200":"flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer",onClick:H,children:(0,l.jsx)(a.Z,{mini:!0,position:"top",content:""===Y?"请输入问题":"点击发送",children:(0,l.jsx)("div",{className:"scale-150",children:r?(0,l.jsx)(d.Z,{}):(0,l.jsx)(x.Z,{})})})})]})]})]})]})}},14972:function(e,t,r){r.d(t,{_Q:()=>a,id:()=>n,mL:()=>s,s1:()=>o,xt:()=>i});var l=r(18223);async function o(){try{let e=await l.WY.get("/api/chat/history");if(200===e.data.code){let t=e.data.data;console.log(t);let r=[];return t.map(e=>{let t=e.content;r.push({...e,content:JSON.parse(t),chatId:e.id})}),r}throw Error(e.data.msg)}catch(e){throw console.error(e),e}}async function s(e){try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},r=await l.WY.post("/api/chat/history/write",t);if(200!==r.data.code)throw Error(r.data.msg)}catch(e){throw console.error(e),e}}async function a(e){console.log(e);try{let t={...e,content:JSON.stringify(e.content),id:e.chatId},r=await l.WY.post("/api/chat/history/update",t);if(200!==r.data.code)throw Error(r.data.msg)}catch(e){throw console.error(e),e}}async function n(e){try{let t=await l.WY.post("/api/chat/history/update/content",{id:e.id,content:JSON.stringify(e.content)});if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}async function i(e){try{let t=await l.WY.delete(`/api/chat/history/delete/${e}`);if(200!==t.data.code)throw Error(t.data.msg)}catch(e){throw console.error(e),e}}},45527:function(e,t,r){r.d(t,{a:()=>u,z:()=>x});var l=r(2596),o=r(59537),s=r.n(o),a=r(21543),n=r(77276),i=r(47757),c=r(14972);let d=(0,a.createContext)(void 0),x=()=>(0,a.useContext)(d),u=e=>{let{chatLoadSignal:t,loginUsername:r}=(0,n.o)(),[o,x]=(0,a.useState)([]),u=async()=>{let e=[];try{console.log(r);let e=await (0,c.s1)();localStorage.setItem("chat-history",JSON.stringify(e??[])),x(e??[])}catch(r){let t=localStorage.getItem("chat-history");console.log(t),t?e=JSON.parse(t):localStorage.setItem("chat-history",JSON.stringify(e)),x(e)}},m=async e=>{r&&await (0,c.mL)(e)},h=async e=>{r&&await (0,c.xt)(e)};(0,i.Z)(async()=>{await u()},[t]);let p=(0,a.useCallback)(e=>{let t=e(o);localStorage.setItem("chat-history",JSON.stringify(t)),x(t)},[o]),f=async e=>{let t=o.filter(t=>t.chatId!==e);localStorage.setItem("chat-history",JSON.stringify(t)),await h(e),x(t)};return(0,l.jsx)(d.Provider,{value:{chats:o,addChat:e=>{o.push(e),localStorage.setItem("chat-history",JSON.stringify(o)),m(e),x(o)},sortByTime:()=>{let e=o.sort((e,t)=>s()(e.updateTime).isAfter(s()(t.updateTime))?-1:1);localStorage.setItem("chat-history",JSON.stringify([...e])),x([...e])},updateChat:p,removeAllChat:()=>{x([]),localStorage.removeItem("chat-history")},removeChat:f,getChatHistory:u},children:e.children})}},1731:function(e,t,r){r.d(t,{E:()=>a,F:()=>i});var l=r(2596),o=r(21543);let s=(0,o.createContext)({projects:[],addProject:()=>{},updateProject:()=>{},deleteProject:()=>{}}),a=()=>(0,o.useContext)(s),n="ai-chat-projects",i=e=>{let{children:t}=e,[r,a]=(0,o.useState)((()=>{let e=localStorage.getItem(n);return e?JSON.parse(e):(localStorage.setItem(n,JSON.stringify([])),[])})()),i=e=>{localStorage.setItem(n,JSON.stringify(e))};return(0,l.jsx)(s.Provider,{value:{projects:r,addProject:e=>{let t=[...r,e];i(t),a(t)},updateProject:e=>{let t=e(r);i(t),a(t)},deleteProject:e=>{let t=r.filter(t=>t.id!==e);i(t),a(t)}},children:t})}},17413:function(e,t,r){r.d(t,{ID:()=>n,vO:()=>a});var l=r(2596),o=r(21543);let s=(0,o.createContext)(void 0),a=()=>(0,o.useContext)(s),n=e=>{let{children:t,ref:r,shouldScroll:a,scrollTop:n,clientHeight:i}=e;return(0,o.useEffect)(()=>{r.current&&console.log(r.current.getScrollElement().scrollTop)},[r.current]),(0,l.jsx)(s.Provider,{value:{target:r,toTop:e=>{if(!r.current.getScrollElement())return;let t=r.current.getScrollElement();t&&(e?t.scrollTo({top:0,behavior:"smooth"}):t.scrollTo({top:0}))},toBottom:e=>{if(!r.current.getScrollElement())return;let t=r.current.getScrollElement();t&&(e?t.scrollTo({top:t.scrollHeight,behavior:"smooth"}):t.scrollTo({top:t.scrollHeight}))},shouldScroll:a,scrollTop:n,clientHeight:i},children:t})}}}]);