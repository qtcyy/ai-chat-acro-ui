"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["216"],{4732:function(t,e,a){function l(t,e){var a,l,r;t.accDescr&&(null===(a=e.setAccDescription)||void 0===a||a.call(e,t.accDescr)),t.accTitle&&(null===(l=e.setAccTitle)||void 0===l||l.call(e,t.accTitle)),t.title&&(null===(r=e.setDiagramTitle)||void 0===r||r.call(e,t.title))}a.d(e,{A:()=>l}),(0,a(60697).eW)(l,"populateCommonDb")},71537:function(t,e,a){a.d(e,{diagram:()=>C});var l=a(4732),r=a(60059),o=a(92721),i=a(60697),c=a(62313),n={packet:[]},s=structuredClone(n),d=i.vZ.packet,k=(0,i.eW)(()=>{let t=(0,r.Rb)({...d,...(0,i.iE)().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),p=(0,i.eW)(()=>s.packet,"getPacket"),b={pushWord:(0,i.eW)(t=>{t.length>0&&s.packet.push(t)},"pushWord"),getPacket:p,getConfig:k,clear:(0,i.eW)(()=>{(0,i.ZH)(),s=structuredClone(n)},"clear"),setAccTitle:i.GN,getAccTitle:i.eu,setDiagramTitle:i.g2,getDiagramTitle:i.Kr,getAccDescription:i.Mx,setAccDescription:i.U$},u=(0,i.eW)(t=>{(0,l.A)(t,b);let e=-1,a=[],r=1,{bitsPerRow:o}=b.getConfig();for(let{start:l,end:c,label:n}of t.blocks){if(c&&c<l)throw Error(`Packet block ${l} - ${c} is invalid. End must be greater than start.`);if(l!==e+1)throw Error(`Packet block ${l} - ${c??l} is not contiguous. It should start from ${e+1}.`);for(e=c??l,i.cM.debug(`Packet block ${l} - ${e} with label ${n}`);a.length<=o+1&&b.getPacket().length<1e4;){let[t,e]=g({start:l,end:c,label:n},r,o);if(a.push(t),t.end+1===r*o&&(b.pushWord(a),a=[],r++),!e)break;({start:l,end:c,label:n}=e)}}b.pushWord(a)},"populate"),g=(0,i.eW)((t,e,a)=>{if(void 0===t.end&&(t.end=t.start),t.start>t.end)throw Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*a?[t,void 0]:[{start:t.start,end:e*a-1,label:t.label},{start:e*a,end:t.end,label:t.label}]},"getNextFittingBlock"),f={parse:(0,i.eW)(async t=>{let e=await (0,c.Qc)("packet",t);i.cM.debug(e),u(e)},"parse")},h=(0,i.eW)((t,e,a,l)=>{let r=l.db,c=r.getConfig(),{rowHeight:n,paddingY:s,bitWidth:d,bitsPerRow:k}=c,p=r.getPacket(),b=r.getDiagramTitle(),u=n+s,g=u*(p.length+1)-(b?0:n),f=d*k+2,h=(0,o.P)(e);for(let[t,e]of(h.attr("viewbox",`0 0 ${f} ${g}`),(0,i.v2)(h,g,f,c.useMaxWidth),p.entries()))x(h,e,t,c);h.append("text").text(b).attr("x",f/2).attr("y",g-u/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),x=(0,i.eW)((t,e,a,l)=>{let{rowHeight:r,paddingX:o,paddingY:i,bitWidth:c,bitsPerRow:n,showBits:s}=l,d=t.append("g"),k=a*(r+i)+i;for(let t of e){let e=t.start%n*c+1,a=(t.end-t.start+1)*c-o;if(d.append("rect").attr("x",e).attr("y",k).attr("width",a).attr("height",r).attr("class","packetBlock"),d.append("text").attr("x",e+a/2).attr("y",k+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!s)continue;let l=t.end===t.start,i=k-2;d.append("text").attr("x",e+(l?a/2:0)).attr("y",i).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",l?"middle":"start").text(t.start),l||d.append("text").attr("x",e+a).attr("y",i).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}},"drawWord"),$={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},C={parser:f,db:b,renderer:{draw:h},styles:(0,i.eW)(function(){let{packet:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=(0,r.Rb)($,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles")}}}]);