"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["2458"],{91316:function(t,e,s){s.d(e,{j:()=>o,q:()=>n});var i=s(60697),r=s(92147),n=(0,i.eW)((t,e)=>{let s;return"sandbox"===e&&(s=(0,r.Ys)("#i"+t)),("sandbox"===e?(0,r.Ys)(s.nodes()[0].contentDocument.body):(0,r.Ys)("body")).select(`[id="${t}"]`)},"getDiagramElement"),o=(0,i.eW)((t,e,s,r)=>{t.attr("class",s);let{width:n,height:o,x:c,y:h}=a(t,e);(0,i.v2)(t,o,n,r);let d=l(c,h,n,o,e);t.attr("viewBox",d),i.cM.debug(`viewBox configured: ${d} with padding: ${e}`)},"setupViewPortForSVG"),a=(0,i.eW)((t,e)=>{var s;let i=(null===(s=t.node())||void 0===s?void 0:s.getBBox())||{width:0,height:0,x:0,y:0};return{width:i.width+2*e,height:i.height+2*e,x:i.x,y:i.y}},"calculateDimensionsWithPadding"),l=(0,i.eW)((t,e,s,i,r)=>`${t-r} ${e-r} ${s} ${i}`,"createViewBox")},70290:function(t,e,s){s.d(e,{Ee:()=>tB,J8:()=>l,_$:()=>O,bH:()=>tN});var i=s(91316),r=s(10288),n=s(60059),o=s(60697),a=function(){var t=(0,o.eW)(function(t,e,s,i){for(s=s||{},i=t.length;i--;s[t[i]]=e);return s},"o"),e=[1,2],s=[1,3],i=[1,4],r=[2,4],n=[1,9],a=[1,11],l=[1,16],c=[1,17],h=[1,18],d=[1,19],u=[1,32],p=[1,20],y=[1,21],g=[1,22],f=[1,23],S=[1,24],m=[1,26],_=[1,27],b=[1,28],T=[1,29],k=[1,30],E=[1,31],v=[1,34],x=[1,35],$=[1,36],C=[1,37],D=[1,33],L=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],A=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],I=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],W={trace:(0,o.eW)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"--\x3e":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,classDef:38,CLASSDEF_ID:39,CLASSDEF_STYLEOPTS:40,DEFAULT:41,style:42,STYLE_IDS:43,STYLEDEF_STYLEOPTS:44,class:45,CLASSENTITY_IDS:46,STYLECLASS:47,direction_tb:48,direction_bt:49,direction_rl:50,direction_lr:51,eol:52,";":53,EDGE_STATE:54,STYLE_SEPARATOR:55,left_of:56,right_of:57,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"--\x3e",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"classDef",39:"CLASSDEF_ID",40:"CLASSDEF_STYLEOPTS",41:"DEFAULT",42:"style",43:"STYLE_IDS",44:"STYLEDEF_STYLEOPTS",45:"class",46:"CLASSENTITY_IDS",47:"STYLECLASS",48:"direction_tb",49:"direction_bt",50:"direction_rl",51:"direction_lr",53:";",54:"EDGE_STATE",55:"STYLE_SEPARATOR",56:"left_of",57:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[52,1],[52,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:(0,o.eW)(function(t,e,s,i,r,n,o){var a=n.length-1;switch(r){case 3:return i.setRootDoc(n[a]),n[a];case 4:this.$=[];break;case 5:"nl"!=n[a]&&(n[a-1].push(n[a]),this.$=n[a-1]);break;case 6:case 7:case 12:this.$=n[a];break;case 8:this.$="nl";break;case 13:let l=n[a-1];l.description=i.trimColon(n[a]),this.$=l;break;case 14:this.$={stmt:"relation",state1:n[a-2],state2:n[a]};break;case 15:let c=i.trimColon(n[a]);this.$={stmt:"relation",state1:n[a-3],state2:n[a-1],description:c};break;case 19:this.$={stmt:"state",id:n[a-3],type:"default",description:"",doc:n[a-1]};break;case 20:var h=n[a],d=n[a-2].trim();if(n[a].match(":")){var u=n[a].split(":");h=u[0],d=[d,u[1]]}this.$={stmt:"state",id:h,type:"default",description:d};break;case 21:this.$={stmt:"state",id:n[a-3],type:"default",description:n[a-5],doc:n[a-1]};break;case 22:this.$={stmt:"state",id:n[a],type:"fork"};break;case 23:this.$={stmt:"state",id:n[a],type:"join"};break;case 24:this.$={stmt:"state",id:n[a],type:"choice"};break;case 25:this.$={stmt:"state",id:i.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:n[a-1].trim(),note:{position:n[a-2].trim(),text:n[a].trim()}};break;case 29:this.$=n[a].trim(),i.setAccTitle(this.$);break;case 30:case 31:this.$=n[a].trim(),i.setAccDescription(this.$);break;case 32:case 33:this.$={stmt:"classDef",id:n[a-1].trim(),classes:n[a].trim()};break;case 34:this.$={stmt:"style",id:n[a-1].trim(),styleClass:n[a].trim()};break;case 35:this.$={stmt:"applyClass",id:n[a-1].trim(),styleClass:n[a].trim()};break;case 36:i.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 37:i.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 38:i.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 39:i.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 42:case 43:this.$={stmt:"state",id:n[a].trim(),type:"default",description:""};break;case 44:case 45:this.$={stmt:"state",id:n[a-2].trim(),classes:[n[a].trim()],type:"default",description:""}}},"anonymous"),table:[{3:1,4:e,5:s,6:i},{1:[3]},{3:5,4:e,5:s,6:i},{3:6,4:e,5:s,6:i},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:n,5:a,8:8,9:10,10:12,11:13,12:14,13:15,16:l,17:c,19:h,22:d,24:u,25:p,26:y,27:g,28:f,29:S,32:25,33:m,35:_,37:b,38:T,42:k,45:E,48:v,49:x,50:$,51:C,54:D},t(L,[2,5]),{9:38,10:12,11:13,12:14,13:15,16:l,17:c,19:h,22:d,24:u,25:p,26:y,27:g,28:f,29:S,32:25,33:m,35:_,37:b,38:T,42:k,45:E,48:v,49:x,50:$,51:C,54:D},t(L,[2,7]),t(L,[2,8]),t(L,[2,9]),t(L,[2,10]),t(L,[2,11]),t(L,[2,12],{14:[1,39],15:[1,40]}),t(L,[2,16]),{18:[1,41]},t(L,[2,18],{20:[1,42]}),{23:[1,43]},t(L,[2,22]),t(L,[2,23]),t(L,[2,24]),t(L,[2,25]),{30:44,31:[1,45],56:[1,46],57:[1,47]},t(L,[2,28]),{34:[1,48]},{36:[1,49]},t(L,[2,31]),{39:[1,50],41:[1,51]},{43:[1,52]},{46:[1,53]},t(A,[2,42],{55:[1,54]}),t(A,[2,43],{55:[1,55]}),t(L,[2,36]),t(L,[2,37]),t(L,[2,38]),t(L,[2,39]),t(L,[2,6]),t(L,[2,13]),{13:56,24:u,54:D},t(L,[2,17]),t(I,r,{7:57}),{24:[1,58]},{24:[1,59]},{23:[1,60]},{24:[2,46]},{24:[2,47]},t(L,[2,29]),t(L,[2,30]),{40:[1,61]},{40:[1,62]},{44:[1,63]},{47:[1,64]},{24:[1,65]},{24:[1,66]},t(L,[2,14],{14:[1,67]}),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,13:15,16:l,17:c,19:h,21:[1,68],22:d,24:u,25:p,26:y,27:g,28:f,29:S,32:25,33:m,35:_,37:b,38:T,42:k,45:E,48:v,49:x,50:$,51:C,54:D},t(L,[2,20],{20:[1,69]}),{31:[1,70]},{24:[1,71]},t(L,[2,32]),t(L,[2,33]),t(L,[2,34]),t(L,[2,35]),t(A,[2,44]),t(A,[2,45]),t(L,[2,15]),t(L,[2,19]),t(I,r,{7:72}),t(L,[2,26]),t(L,[2,27]),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,13:15,16:l,17:c,19:h,21:[1,73],22:d,24:u,25:p,26:y,27:g,28:f,29:S,32:25,33:m,35:_,37:b,38:T,42:k,45:E,48:v,49:x,50:$,51:C,54:D},t(L,[2,21])],defaultActions:{5:[2,1],6:[2,2],46:[2,46],47:[2,47]},parseError:(0,o.eW)(function(t,e){if(e.recoverable)this.trace(t);else{var s=Error(t);throw s.hash=e,s}},"parseError"),parse:(0,o.eW)(function(t){var e=this,s=[0],i=[],r=[null],n=[],a=this.table,l="",c=0,h=0,d=0,u=n.slice.call(arguments,1),p=Object.create(this.lexer),y={yy:{}};for(var g in this.yy)Object.prototype.hasOwnProperty.call(this.yy,g)&&(y.yy[g]=this.yy[g]);p.setInput(t,y.yy),y.yy.lexer=p,y.yy.parser=this,void 0===p.yylloc&&(p.yylloc={});var f=p.yylloc;n.push(f);var S=p.options&&p.options.ranges;function m(){var t;return"number"!=typeof(t=i.pop()||p.lex()||1)&&(t instanceof Array&&(t=(i=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof y.yy.parseError?this.parseError=y.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,o.eW)(function(t){s.length=s.length-2*t,r.length=r.length-t,n.length=n.length-t},"popStack"),(0,o.eW)(m,"lex");for(var _,b,T,k,E,v,x,$,C,D={};;){if(T=s[s.length-1],this.defaultActions[T]?k=this.defaultActions[T]:(null==_&&(_=m()),k=a[T]&&a[T][_]),void 0===k||!k.length||!k[0]){var L="";for(v in C=[],a[T])this.terminals_[v]&&v>2&&C.push("'"+this.terminals_[v]+"'");L=p.showPosition?"Parse error on line "+(c+1)+":\n"+p.showPosition()+"\nExpecting "+C.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==_?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(L,{text:p.match,token:this.terminals_[_]||_,line:p.yylineno,loc:f,expected:C})}if(k[0]instanceof Array&&k.length>1)throw Error("Parse Error: multiple actions possible at state: "+T+", token: "+_);switch(k[0]){case 1:s.push(_),r.push(p.yytext),n.push(p.yylloc),s.push(k[1]),_=null,b?(_=b,b=null):(h=p.yyleng,l=p.yytext,c=p.yylineno,f=p.yylloc,d>0&&d--);break;case 2:if(x=this.productions_[k[1]][1],D.$=r[r.length-x],D._$={first_line:n[n.length-(x||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(x||1)].first_column,last_column:n[n.length-1].last_column},S&&(D._$.range=[n[n.length-(x||1)].range[0],n[n.length-1].range[1]]),void 0!==(E=this.performAction.apply(D,[l,h,c,y.yy,k[1],r,n].concat(u))))return E;x&&(s=s.slice(0,-1*x*2),r=r.slice(0,-1*x),n=n.slice(0,-1*x)),s.push(this.productions_[k[1]][0]),r.push(D.$),n.push(D._$),$=a[s[s.length-2]][s[s.length-1]],s.push($);break;case 3:return!0}}return!0},"parse")},w={EOF:1,parseError:(0,o.eW)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,o.eW)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,o.eW)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,o.eW)(function(t){var e=t.length,s=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),s.length-1&&(this.yylineno-=s.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:s?(s.length===i.length?this.yylloc.first_column:0)+i[i.length-s.length].length-s[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,o.eW)(function(){return this._more=!0,this},"more"),reject:(0,o.eW)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,o.eW)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,o.eW)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,o.eW)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,o.eW)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,o.eW)(function(t,e){var s,i,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(i=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],s=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),s)return s;if(this._backtrack)for(var n in r)this[n]=r[n];return!1},"test_match"),next:(0,o.eW)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,s,i,r=this._currentRules(),n=0;n<r.length;n++)if((s=this._input.match(this.rules[r[n]]))&&(!e||s[0].length>e[0].length)){if(e=s,i=n,this.options.backtrack_lexer){if(!1!==(t=this.test_match(s,r[n])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[i]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,o.eW)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,o.eW)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,o.eW)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,o.eW)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,o.eW)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,o.eW)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,o.eW)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,o.eW)(function(t,e,s,i){switch(s){case 0:return 41;case 1:case 42:return 48;case 2:case 43:return 49;case 3:case 44:return 50;case 4:case 45:return 51;case 5:case 6:case 8:case 9:case 10:case 11:case 54:case 56:case 62:break;case 7:case 77:return 5;case 12:case 32:return this.pushState("SCALE"),17;case 13:case 33:return 18;case 14:case 20:case 34:case 49:case 52:this.popState();break;case 15:return this.begin("acc_title"),33;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),35;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),38;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),39;case 25:return this.popState(),40;case 26:return this.pushState("CLASS"),45;case 27:return this.popState(),this.pushState("CLASS_STYLE"),46;case 28:return this.popState(),47;case 29:return this.pushState("STYLE"),42;case 30:return this.popState(),this.pushState("STYLEDEF_STYLES"),43;case 31:return this.popState(),44;case 35:this.pushState("STATE");break;case 36:case 39:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),25;case 37:case 40:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),26;case 38:case 41:return this.popState(),e.yytext=e.yytext.slice(0,-10).trim(),27;case 46:this.pushState("STATE_STRING");break;case 47:return this.pushState("STATE_ID"),"AS";case 48:case 64:return this.popState(),"ID";case 50:return"STATE_DESCR";case 51:return 19;case 53:return this.popState(),this.pushState("struct"),20;case 55:return this.popState(),21;case 57:return this.begin("NOTE"),29;case 58:return this.popState(),this.pushState("NOTE_ID"),56;case 59:return this.popState(),this.pushState("NOTE_ID"),57;case 60:this.popState(),this.pushState("FLOATING_NOTE");break;case 61:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 63:return"NOTE_TEXT";case 65:return this.popState(),this.pushState("NOTE_TEXT"),24;case 66:return this.popState(),e.yytext=e.yytext.substr(2).trim(),31;case 67:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),31;case 68:case 69:return 6;case 70:return 16;case 71:return 54;case 72:return 24;case 73:return e.yytext=e.yytext.trim(),14;case 74:return 15;case 75:return 28;case 76:return 55;case 78:return"INVALID"}},"anonymous"),rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,29,35,42,43,44,45,54,55,56,57,71,72,73,74,75],inclusive:!1},FLOATING_NOTE_ID:{rules:[64],inclusive:!1},FLOATING_NOTE:{rules:[61,62,63],inclusive:!1},NOTE_TEXT:{rules:[66,67],inclusive:!1},NOTE_ID:{rules:[65],inclusive:!1},NOTE:{rules:[58,59,60],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[31],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[30],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,33,34],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[48],inclusive:!1},STATE_STRING:{rules:[49,50],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,36,37,38,39,40,41,46,47,51,52,53],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,35,53,57,68,69,70,71,72,73,74,76,77,78],inclusive:!0}}};function O(){this.yy={}}return W.lexer=w,(0,o.eW)(O,"Parser"),O.prototype=W,W.Parser=O,new O}();a.parser=a;var l=a,c="state",h="relation",d="default",u="divider",p="fill:none",y="fill: #333",g="text",f="normal",S="rect",m="rectWithTitle",_="divider",b="roundedWithTitle",T="statediagram",k=`${T}-state`,E="transition",v=`${E} note-edge`,x=`${T}-note`,$=`${T}-cluster`,C=`${T}-cluster-alt`,D="parent",L="note",A="----",I=`${A}${L}`,W=`${A}${D}`,w=(0,o.eW)(function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"TB";if(!t.doc)return e;let s=e;for(let e of t.doc)"dir"===e.stmt&&(s=e.value);return s},"getDir"),O={getClasses:(0,o.eW)(function(t,e){return e.db.extract(e.db.getRootDocV2()),e.db.getClasses()},"getClasses"),draw:(0,o.eW)(async function(t,e,s,a){o.cM.info("REF0:"),o.cM.info("Drawing state diagram (v2)",e);let{securityLevel:l,state:c,layout:h}=(0,o.nV)();a.db.extract(a.db.getRootDocV2());let d=a.db.getData(),u=(0,i.q)(e,l);d.type=a.type,d.layoutAlgorithm=h,d.nodeSpacing=(null==c?void 0:c.nodeSpacing)||50,d.rankSpacing=(null==c?void 0:c.rankSpacing)||50,d.markers=["barb"],d.diagramId=e,await (0,r.sY)(d,u),n.w8.insertTitle(u,"statediagramTitleText",(null==c?void 0:c.titleTopMargin)??25,a.db.getDiagramTitle()),(0,i.j)(u,8,T,(null==c?void 0:c.useMaxWidth)??!0)},"draw"),getDir:w},N=new Map,B=0;function R(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:A,r=null!==s&&s.length>0?`${i}${s}`:"";return`state-${t}${r}-${e}`}(0,o.eW)(R,"stateDomId");var Y=(0,o.eW)((t,e,s,i,r,n,a,l)=>{o.cM.trace("items",e),e.forEach(e=>{switch(e.stmt){case c:case d:j(t,e,s,i,r,n,a,l);break;case h:{j(t,e.state1,s,i,r,n,a,l),j(t,e.state2,s,i,r,n,a,l);let c={id:"edge"+B,start:e.state1.id,end:e.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:p,labelStyle:"",label:o.SY.sanitizeText(e.description,(0,o.nV)()),arrowheadStyle:y,labelpos:"c",labelType:g,thickness:f,classes:E,look:a};r.push(c),B++}}})},"setupDoc"),F=(0,o.eW)(function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"TB",s=e;if(t.doc)for(let e of t.doc)"dir"===e.stmt&&(s=e.value);return s},"getDir");function P(t,e,s){if(!e.id||"</join></fork>"===e.id||"</choice>"===e.id)return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(t=>{if(s.get(t)){let i=s.get(t);e.cssCompiledStyles=[...e.cssCompiledStyles,...i.styles]}}));let i=t.find(t=>t.id===e.id);i?Object.assign(i,e):t.push(e)}function M(t){var e;return(null==t?void 0:null===(e=t.classes)||void 0===e?void 0:e.join(" "))??""}function G(t){return(null==t?void 0:t.styles)??[]}(0,o.eW)(P,"insertOrUpdateNode"),(0,o.eW)(M,"getClassesFromDbInfo"),(0,o.eW)(G,"getStylesFromDbInfo");var j=(0,o.eW)((t,e,s,i,r,n,a,l)=>{let c=e.id,h=s.get(c),T=M(h),E=G(h);if(o.cM.info("dataFetcher parsedItem",e,h,E),"root"!==c){var A,w;let s=S;!0===e.start?s="stateStart":!1===e.start&&(s="stateEnd"),e.type!==d&&(s=e.type),N.get(c)||N.set(c,{id:c,shape:s,description:o.SY.sanitizeText(c,(0,o.nV)()),cssClasses:`${T} ${k}`,cssStyles:E});let h=N.get(c);e.description&&(Array.isArray(h.description)?(h.shape=m,h.description.push(e.description)):(null===(w=h.description)||void 0===w?void 0:w.length)>0?(h.shape=m,h.description===c?h.description=[e.description]:h.description=[h.description,e.description]):(h.shape=S,h.description=e.description),h.description=o.SY.sanitizeTextOrArray(h.description,(0,o.nV)())),(null===(A=h.description)||void 0===A?void 0:A.length)===1&&h.shape===m&&("group"===h.type?h.shape=b:h.shape=S),!h.type&&e.doc&&(o.cM.info("Setting cluster for XCX",c,F(e)),h.type="group",h.isGroup=!0,h.dir=F(e),h.shape=e.type===u?_:b,h.cssClasses=`${h.cssClasses} ${$} ${n?C:""}`);let O={labelStyle:"",shape:h.shape,label:h.description,cssClasses:h.cssClasses,cssCompiledStyles:[],cssStyles:h.cssStyles,id:c,dir:h.dir,domId:R(c,B),type:h.type,isGroup:"group"===h.type,padding:8,rx:10,ry:10,look:a};if(O.shape===_&&(O.label=""),t&&"root"!==t.id&&(o.cM.trace("Setting node ",c," to be child of its parent ",t.id),O.parentId=t.id),O.centerLabel=!0,e.note){let t={labelStyle:"",shape:"note",label:e.note.text,cssClasses:x,cssStyles:[],cssCompilesStyles:[],id:c+I+"-"+B,domId:R(c,B,L),type:h.type,isGroup:"group"===h.type,padding:(0,o.nV)().flowchart.padding,look:a,position:e.note.position},s=c+W,n={labelStyle:"",shape:"noteGroup",label:e.note.text,cssClasses:h.cssClasses,cssStyles:[],id:c+W,domId:R(c,B,D),type:"group",isGroup:!0,padding:16,look:a,position:e.note.position};B++,n.id=s,t.parentId=s,P(i,n,l),P(i,t,l),P(i,O,l);let d=c,u=t.id;"left of"===e.note.position&&(d=t.id,u=c),r.push({id:d+"-"+u,start:d,end:u,arrowhead:"none",arrowTypeEnd:"",style:p,labelStyle:"",classes:v,arrowheadStyle:y,labelpos:"c",labelType:g,thickness:f,look:a})}else P(i,O,l)}e.doc&&(o.cM.trace("Adding nodes children "),Y(e,e.doc,s,i,r,!n,a,l))},"dataFetcher"),V=(0,o.eW)(()=>{N.clear(),B=0},"reset"),z="start",U="color",H="fill";function X(){return new Map}(0,o.eW)(X,"newClassesList");var J=[],K=[],q="LR",Z=[],Q=X(),tt=(0,o.eW)(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),te={root:tt()},ts=te.root,ti=0,tr=0,tn=(0,o.eW)(t=>JSON.parse(JSON.stringify(t)),"clone"),to=(0,o.eW)(t=>{o.cM.info("Setting root doc",t),Z=t},"setRootDoc"),ta=(0,o.eW)(()=>Z,"getRootDoc"),tl=(0,o.eW)((t,e,s)=>{if(e.stmt===h)tl(t,e.state1,!0),tl(t,e.state2,!1);else if(e.stmt===c&&("[*]"===e.id?(e.id=s?t.id+"_start":t.id+"_end",e.start=s):e.id=e.id.trim()),e.doc){let t;let s=[],i=[];for(t=0;t<e.doc.length;t++)if(e.doc[t].type===u){let r=tn(e.doc[t]);r.doc=tn(i),s.push(r),i=[]}else i.push(e.doc[t]);if(s.length>0&&i.length>0){let t={stmt:c,id:(0,n.Ox)(),type:"divider",doc:tn(i)};s.push(tn(t)),e.doc=s}e.doc.forEach(t=>tl(e,t,!0))}},"docTranslator"),tc=(0,o.eW)(()=>(tl({id:"root"},{id:"root",doc:Z},!0),{id:"root",doc:Z}),"getRootDocV2"),th=(0,o.eW)(t=>{let e;e=t.doc?t.doc:t,o.cM.info(e),tu(!0),o.cM.info("Extract initial document:",e),e.forEach(t=>{switch(o.cM.warn("Statement",t.stmt),t.stmt){case c:td(t.id.trim(),t.type,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles);break;case h:tk(t.state1,t.state2,t.description);break;case"classDef":t$(t.id.trim(),t.classes);break;case"style":{let e=t.id.trim().split(","),s=t.styleClass.split(",");e.forEach(t=>{let e=tp(t);if(void 0===e){let s=t.trim();td(s),e=tp(s)}e.styles=s.map(t=>{var e;return null===(e=t.replace(/;/g,""))||void 0===e?void 0:e.trim()})})}break;case"applyClass":tD(t.id.trim(),t.styleClass)}});let s=ty(),i=(0,o.nV)().look;V(),j(void 0,tc(),s,J,K,!0,i,Q),J.forEach(t=>{if(Array.isArray(t.label)){if(t.description=t.label.slice(1),t.isGroup&&t.description.length>0)throw Error("Group nodes can only have label. Remove the additional description for node ["+t.id+"]");t.label=t.label[0]}})},"extract"),td=(0,o.eW)(function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,c=null==t?void 0:t.trim();if(ts.states.has(c)?(ts.states.get(c).doc||(ts.states.get(c).doc=s),ts.states.get(c).type||(ts.states.get(c).type=e)):(o.cM.info("Adding state ",c,i),ts.states.set(c,{id:c,descriptions:[],type:e,doc:s,note:r,classes:[],styles:[],textStyles:[]})),i&&(o.cM.info("Setting state description",c,i),"string"==typeof i&&tE(c,i.trim()),"object"==typeof i&&i.forEach(t=>tE(c,t.trim()))),r){let t=ts.states.get(c);t.note=r,t.note.text=o.SY.sanitizeText(t.note.text,(0,o.nV)())}n&&(o.cM.info("Setting state classes",c,n),("string"==typeof n?[n]:n).forEach(t=>tD(c,t.trim()))),a&&(o.cM.info("Setting state styles",c,a),("string"==typeof a?[a]:a).forEach(t=>tL(c,t.trim()))),l&&(o.cM.info("Setting state styles",c,a),("string"==typeof l?[l]:l).forEach(t=>tA(c,t.trim())))},"addState"),tu=(0,o.eW)(function(t){J=[],K=[],ts=(te={root:tt()}).root,ti=0,Q=X(),t||(0,o.ZH)()},"clear"),tp=(0,o.eW)(function(t){return ts.states.get(t)},"getState"),ty=(0,o.eW)(function(){return ts.states},"getStates"),tg=(0,o.eW)(function(){o.cM.info("Documents = ",te)},"logDocuments"),tf=(0,o.eW)(function(){return ts.relations},"getRelations");function tS(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=t;return"[*]"===t&&(ti++,e=`${z}${ti}`),e}function tm(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;return"[*]"===t?z:e}function t_(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=t;return"[*]"===t&&(ti++,e=`end${ti}`),e}function tb(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;return"[*]"===t?"end":e}function tT(t,e,s){let i=tS(t.id.trim()),r=tm(t.id.trim(),t.type),n=tS(e.id.trim()),a=tm(e.id.trim(),e.type);td(i,r,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),td(n,a,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),ts.relations.push({id1:i,id2:n,relationTitle:o.SY.sanitizeText(s,(0,o.nV)())})}(0,o.eW)(tS,"startIdIfNeeded"),(0,o.eW)(tm,"startTypeIfNeeded"),(0,o.eW)(t_,"endIdIfNeeded"),(0,o.eW)(tb,"endTypeIfNeeded"),(0,o.eW)(tT,"addRelationObjs");var tk=(0,o.eW)(function(t,e,s){if("object"==typeof t)tT(t,e,s);else{let i=tS(t.trim()),r=tm(t),n=t_(e.trim()),a=tb(e);td(i,r),td(n,a),ts.relations.push({id1:i,id2:n,title:o.SY.sanitizeText(s,(0,o.nV)())})}},"addRelation"),tE=(0,o.eW)(function(t,e){let s=ts.states.get(t),i=e.startsWith(":")?e.replace(":","").trim():e;s.descriptions.push(o.SY.sanitizeText(i,(0,o.nV)()))},"addDescription"),tv=(0,o.eW)(function(t){return":"===t.substring(0,1)?t.substr(2).trim():t.trim()},"cleanupLabel"),tx=(0,o.eW)(()=>"divider-id-"+ ++tr,"getDividerId"),t$=(0,o.eW)(function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";Q.has(t)||Q.set(t,{id:t,styles:[],textStyles:[]});let s=Q.get(t);null!=e&&e.split(",").forEach(t=>{let e=t.replace(/([^;]*);/,"$1").trim();if(RegExp(U).exec(t)){let t=e.replace(H,"bgFill").replace(U,H);s.textStyles.push(t)}s.styles.push(e)})},"addStyleClass"),tC=(0,o.eW)(function(){return Q},"getClasses"),tD=(0,o.eW)(function(t,e){t.split(",").forEach(function(t){let s=tp(t);if(void 0===s){let e=t.trim();td(e),s=tp(e)}s.classes.push(e)})},"setCssClass"),tL=(0,o.eW)(function(t,e){let s=tp(t);void 0!==s&&s.styles.push(e)},"setStyle"),tA=(0,o.eW)(function(t,e){let s=tp(t);void 0!==s&&s.textStyles.push(e)},"setTextStyle"),tI=(0,o.eW)(()=>q,"getDirection"),tW=(0,o.eW)(t=>{q=t},"setDirection"),tw=(0,o.eW)(t=>t&&":"===t[0]?t.substr(1).trim():t.trim(),"trimColon"),tO=(0,o.eW)(()=>{let t=(0,o.nV)();return{nodes:J,edges:K,other:{},config:t,direction:w(tc())}},"getData"),tN={getConfig:(0,o.eW)(()=>(0,o.nV)().state,"getConfig"),getData:tO,addState:td,clear:tu,getState:tp,getStates:ty,getRelations:tf,getClasses:tC,getDirection:tI,addRelation:tk,getDividerId:tx,setDirection:tW,cleanupLabel:tv,lineType:{LINE:0,DOTTED_LINE:1},relationType:{AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},logDocuments:tg,getRootDoc:ta,setRootDoc:to,getRootDocV2:tc,extract:th,trimColon:tw,getAccTitle:o.eu,setAccTitle:o.GN,getAccDescription:o.Mx,setAccDescription:o.U$,addStyleClass:t$,setCssClass:tD,addDescription:tE,setDiagramTitle:o.g2,getDiagramTitle:o.Kr},tB=(0,o.eW)(t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,"getStyles")}}]);