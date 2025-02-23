"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([["637"],{4732:function(e,t,a){function i(e,t){var a,i,l;e.accDescr&&(null===(a=t.setAccDescription)||void 0===a||a.call(t,e.accDescr)),e.accTitle&&(null===(i=t.setAccTitle)||void 0===i||i.call(t,e.accTitle)),e.title&&(null===(l=t.setDiagramTitle)||void 0===l||l.call(t,e.title))}a.d(t,{A:()=>i}),(0,a(60697).eW)(i,"populateCommonDb")},82149:function(e,t,a){a.d(t,{diagram:()=>v});var i=a(4732),l=a(60059),r=a(92721),n=a(60697),o=a(62313),c=a(92147),s=n.vZ.pie,p={sections:new Map,showData:!1,config:s},d=p.sections,u=p.showData,g=structuredClone(s),f=(0,n.eW)(()=>structuredClone(g),"getConfig"),h=(0,n.eW)(()=>{d=new Map,u=p.showData,(0,n.ZH)()},"clear"),x=(0,n.eW)(e=>{let{label:t,value:a}=e;d.has(t)||(d.set(t,a),n.cM.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),m=(0,n.eW)(()=>d,"getSections"),w=(0,n.eW)(e=>{u=e},"setShowData"),S=(0,n.eW)(()=>u,"getShowData"),T={getConfig:f,clear:h,setDiagramTitle:n.g2,getDiagramTitle:n.Kr,setAccTitle:n.GN,getAccTitle:n.eu,setAccDescription:n.U$,getAccDescription:n.Mx,addSection:x,getSections:m,setShowData:w,getShowData:S},$=(0,n.eW)((e,t)=>{(0,i.A)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),y={parse:(0,n.eW)(async e=>{let t=await (0,o.Qc)("pie",e);n.cM.debug(t),$(t,T)},"parse")},D=(0,n.eW)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),C=(0,n.eW)(e=>{let t=[...e.entries()].map(e=>({label:e[0],value:e[1]})).sort((e,t)=>t.value-e.value);return(0,c.ve8)().value(e=>e.value)(t)},"createPieArcs"),v={parser:y,db:T,renderer:{draw:(0,n.eW)((e,t,a,i)=>{n.cM.debug("rendering pie chart\n"+e);let o=i.db,s=(0,n.nV)(),p=(0,l.Rb)(o.getConfig(),s.pie),d=(0,r.P)(t),u=d.append("g");u.attr("transform","translate(225,225)");let{themeVariables:g}=s,[f]=(0,l.VG)(g.pieOuterStrokeWidth);f??(f=2);let h=p.textPosition,x=(0,c.Nb1)().innerRadius(0).outerRadius(185),m=(0,c.Nb1)().innerRadius(185*h).outerRadius(185*h);u.append("circle").attr("cx",0).attr("cy",0).attr("r",185+f/2).attr("class","pieOuterCircle");let w=o.getSections(),S=C(w),T=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],$=(0,c.PKp)(T);u.selectAll("mySlices").data(S).enter().append("path").attr("d",x).attr("fill",e=>$(e.data.label)).attr("class","pieCircle");let y=0;w.forEach(e=>{y+=e}),u.selectAll("mySlices").data(S).enter().append("text").text(e=>(e.data.value/y*100).toFixed(0)+"%").attr("transform",e=>"translate("+m.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let D=u.selectAll(".legend").data($.domain()).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*$.domain().length/2)+")");D.append("rect").attr("width",18).attr("height",18).style("fill",$).style("stroke",$),D.data(S).append("text").attr("x",22).attr("y",14).text(e=>{let{label:t,value:a}=e.data;return o.getShowData()?`${t} [${a}]`:t});let v=512+Math.max(...D.selectAll("text").nodes().map(e=>(null==e?void 0:e.getBoundingClientRect().width)??0));d.attr("viewBox",`0 0 ${v} 450`),(0,n.v2)(d,450,v,p.useMaxWidth)},"draw")},styles:D}}}]);