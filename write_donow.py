content = r"""import React, { useState, useRef } from 'react'
const YG = {'Year 7':['Place value & rounding','Fractions','Decimals','Perimeter','Area of 2D shapes','Mean, median, mode','Probability','Angles in polygons'],'Year 8':['Percentages','Ratio & proportion','Simplifying expressions','Expanding brackets','Volume & surface area','Bar charts','Pie charts','Solving linear equations'],'Year 9':['Standard form','Powers & roots','Factorising','nth term sequences','Straight line graphs','Pythagoras theorem','Scatter graphs','Simultaneous equations'],'KS4 Foundation':['Solving quadratics','Trigonometry','Compound interest','Cumulative frequency','Box plots','Circle theorems','Transformations','Venn diagrams'],'KS4 Higher':['Circle theorems','Rearranging formulae','Quadratic graphs','Bearings','Simultaneous equations','Trigonometry','Surds','Functions'],'Functional Skills L1':['Money & budgeting','Time calculations','Measurement conversions','Reading charts','Percentages in context','Area & perimeter in context'],'Functional Skills L2':['Averages in context','Probability in context','Scale & maps','Data interpretation','Percentages in context','Measurement conversions']}
const AT=[['Place value & rounding','Number'],['Fractions','Number'],['Decimals','Number'],['Percentages','Number'],['Powers & roots','Number'],['Standard form','Number'],['Factors & multiples','Number'],['Ratio & proportion','Number'],['Compound interest','Number'],['Simplifying expressions','Algebra'],['Expanding brackets','Algebra'],['Factorising','Algebra'],['Solving linear equations','Algebra'],['Solving quadratics','Algebra'],['Simultaneous equations','Algebra'],['nth term sequences','Algebra'],['Straight line graphs','Algebra'],['Rearranging formulae','Algebra'],['Area of 2D shapes','Geometry'],['Perimeter','Geometry'],['Volume & surface area','Geometry'],['Angles in polygons','Geometry'],['Pythagoras theorem','Geometry'],['Trigonometry','Geometry'],['Circle theorems','Geometry'],['Transformations','Geometry'],['Bearings','Geometry'],['Surds','Geometry'],['Mean, median, mode','Statistics'],['Bar charts','Statistics'],['Pie charts','Statistics'],['Scatter graphs','Statistics'],['Probability','Statistics'],['Cumulative frequency','Statistics'],['Box plots','Statistics'],['Venn diagrams','Statistics'],['Money & budgeting','Functional'],['Time calculations','Functional'],['Measurement conversions','Functional'],['Reading charts','Functional'],['Percentages in context','Functional'],['Area & perimeter in context','Functional'],['Averages in context','Functional'],['Probability in context','Functional'],['Scale & maps','Functional'],['Data interpretation','Functional']].map(([l,c])=>({label:l,category:c}))
function shuffle(a){return[...a].sort(()=>Math.random()-0.5)}
export default function DoNow(){
const [mode,setMode]=useState('auto')
const [yg,setYg]=useState('Year 7')
const [topics,setTopics]=useState([{topic:'',difficulty:3},{topic:'',difficulty:3},{topic:'',difficulty:3}])
const [search,setSearch]=useState(['','',''])
const [drop,setDrop]=useState([false,false,false])
const [doNow,setDoNow]=useState(null)
const [loading,setLoading]=useState(false)
const [answers,setAnswers]=useState(false)
const [error,setError]=useState(null)
const ref=useRef()
async function generate(){
setLoading(true);setError(null);setDoNow(null)
let t
if(mode==='auto'){t=shuffle(YG[yg]||YG['Year 7']).slice(0,3).map(x=>({topic:x,difficulty:3}))}
else{if(topics.some(x=>!x.topic)){setError('Please select all 3 topics.');setLoading(false);return};t=topics}
const p=`You are a UK maths teacher creating a Do Now for ${mode==='auto'?yg:'a maths class'} following Edexcel IGCSE${yg.includes('Functional')?' Functional Skills':''}.
Return ONLY valid JSON, no markdown, no backticks:
{"vocabulary":{"word":"key maths term related to topics","definition":"clear student-friendly definition","example":"concrete example with numbers","emoji":"one emoji"},"questions":[{"topic":"${t[0].topic}","difficulty":${t[0].difficulty},"question":"curriculum question","answer":"full worked answer","needsDiagram":false,"diagramType":"none","diagramData":{}},{"topic":"${t[1].topic}","difficulty":${t[1].difficulty},"question":"curriculum question","answer":"full worked answer","needsDiagram":false,"diagramType":"none","diagramData":{}},{"topic":"${t[2].topic}","difficulty":${t[2].difficulty},"question":"curriculum question","answer":"full worked answer","needsDiagram":false,"diagramType":"none","diagramData":{}}],"challenge":{"question":"harder multi-step question","answer":"full worked answer with steps"}}
Rules: difficulty 1-2=basic,3-4=application,5-6=problem solving. For geometry set needsDiagram:true diagramType:triangle diagramData:{"sides":["3cm","4cm","?"],"angles":["90","",""],"type":"right"}. For statistics set needsDiagram:true diagramType:bar_chart diagramData:{"labels":["Mon","Tue","Wed"],"values":[5,8,3],"title":"Chart title","yLabel":"Frequency"}. Show all working in answers.`
try{
const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1500,messages:[{role:'user',content:p}]})})
const d=await r.json()
const txt=d.content[0].text.replace(/```json|```/g,'').trim()
setDoNow({...JSON.parse(txt),yg:mode==='auto'?yg:'Custom',date:new Date().toLocaleDateString('en-GB')})
}catch(e){setError('Could not generate questions. Please try again.')}
setLoading(false)
}
function print(){
const w=window.open('','_blank')
w.document.write('<html><head><title>Do Now</title><style>*{box-sizing:border-box;margin:0;padding:0;font-family:Arial,sans-serif}body{padding:24px;color:#1a1a1a}h1{font-size:20px;color:#2d6a2d;border-bottom:3px solid #2d6a2d;padding-bottom:10px;margin-bottom:16px}.meta{text-align:right;font-size:12px;color:#666;margin-top:-30px;margin-bottom:20px}.vocab{background:#fdf6e3;border:2px solid #c9a227;border-radius:8px;padding:14px;margin-bottom:16px}.vword{font-size:20px;font-weight:700;margin-bottom:4px}.vdef{font-size:14px;margin-bottom:3px}.vex{font-size:12px;color:#666;font-style:italic}.vuse{font-size:12px;color:#a07d10;margin-top:8px;padding-top:6px;border-top:1px solid #e8d080}.q{border:1px solid #ddd;border-left:4px solid #2d6a2d;border-radius:6px;padding:14px;margin-bottom:10px}.ql{font-size:11px;font-weight:700;color:#2d6a2d;text-transform:uppercase;margin-bottom:6px}.qt{font-size:16px;font-weight:500}.space{border-bottom:1px solid #ccc;height:36px;margin-top:14px}.ch{border:2px solid #c9a227;border-radius:6px;padding:14px;background:#fffdf0;margin-top:10px}.chl{font-size:11px;font-weight:700;color:#a07d10;text-transform:uppercase;margin-bottom:6px}.footer{margin-top:20px;text-align:center;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:8px}</style></head><body>'+ref.current.innerHTML+'</body></html>')
w.document.close();setTimeout(()=>{w.print();w.close()},400)
}
function diagram(q){
if(!q.needsDiagram||q.diagramType==='none')return null
const d=q.diagramData||{}
if(q.diagramType==='bar_chart'&&d.labels){
const mx=Math.max(...(d.values||[1])),W=260,H=130
return(<svg style={{marginTop:'10px',display:'block'}} width={W} height={H+40}><text x={W/2} y={12} textAnchor="middle" fontSize="11" fill="#333">{d.title}</text>{d.labels.map((l,i)=>{const bw=(W-60)/d.labels.length-4,bh=((d.values[i]||0)/mx)*H*0.85,x=38+i*((W-60)/d.labels.length)+2,y=H-bh+16;return<g key={i}><rect x={x} y={y} width={bw} height={bh} fill="#2d6a2d" opacity="0.8"/><text x={x+bw/2} y={H+28} textAnchor="middle" fontSize="10" fill="#333">{l}</text><text x={x+bw/2} y={y-3} textAnchor="middle" fontSize="10" fill="#333">{d.values[i]}</text></g>})}<line x1={36} y1={14} x2={36} y2={H+14} stroke="#333" strokeWidth="1.5"/><line x1={36} y1={H+14} x2={W-10} y2={H+14} stroke="#333" strokeWidth="1.5"/><text x={14} y={H/2+14} textAnchor="middle" fontSize="10" fill="#666" transform={`rotate(-90,14,${H/2+14})`}>{d.yLabel}</text></svg>)
}
if(q.diagramType==='triangle'){
return(<svg style={{marginTop:'10px',display:'block'}} width="180" height="130" viewBox="0 0 180 130"><polygon points={d.type==='right'?"20,110 150,110 150,25":"90,15 165,110 15,110"} fill="none" stroke="#1a4b8c" strokeWidth="2"/>{d.type==='right'&&<rect x="138" y="98" width="12" height="12" fill="none" stroke="#1a4b8c" strokeWidth="1.5"/>}{d.sides&&d.sides[0]&&<text x="85" y="125" textAnchor="middle" fontSize="12" fill="#333">{d.sides[0]}</text>}{d.sides&&d.sides[1]&&<text x="155" y="72" fontSize="12" fill="#333">{d.sides[1]}</text>}{d.sides&&d.sides[2]&&<text x="60" y="68" textAnchor="middle" fontSize="12" fill="#c00">{d.sides[2]}</text>}</svg>)
}
return null
}
const btn=(m)=>({padding:'8px 18px',borderRadius:'8px',border:'2px solid',borderColor:mode===m?'var(--green)':'var(--border)',background:mode===m?'var(--green-light)':'white',color:mode===m?'var(--green-dark)':'var(--muted)',fontWeight:mode===m?'600':'400',cursor:'pointer',fontSize:'14px'})
return(
<div>
<h1 style={{fontSize:'22px',fontWeight:'600',marginBottom:'24px'}}>Do Now Generator</h1>
<div style={{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'20px',marginBottom:'20px'}}>
<div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
<button style={btn('auto')} onClick={()=>setMode('auto')}>Auto — pick year group</button>
<button style={btn('custom')} onClick={()=>setMode('custom')}>Custom — pick topics</button>
</div>
{mode==='auto'?(
<div><label style={{fontSize:'13px',fontWeight:'500',display:'block',marginBottom:'8px'}}>Year group / Level</label>
<select value={yg} onChange={e=>setYg(e.target.value)} style={{padding:'9px 14px',border:'1px solid var(--border)',borderRadius:'7px',fontSize:'14px',minWidth:'220px'}}>
{Object.keys(YG).map(y=><option key={y}>{y}</option>)}
</select></div>
):(
<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
{[0,1,2].map(i=>(
<div key={i} style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
<div style={{position:'relative',flex:1,minWidth:'180px'}}>
<input value={search[i]} onChange={e=>{const s=[...search];s[i]=e.target.value;setSearch(s);const dr=[...drop];dr[i]=true;setDrop(dr);if(!e.target.value){const t=[...topics];t[i]={...t[i],topic:''};setTopics(t)}}} placeholder={'Topic '+(i+1)+'...'} style={{width:'100%',padding:'8px 12px',border:'1px solid var(--border)',borderRadius:'7px',fontSize:'14px'}}/>
{drop[i]&&search[i]&&(
<div style={{position:'absolute',top:'100%',left:0,right:0,background:'white',border:'1px solid var(--border)',borderRadius:'7px',zIndex:10,maxHeight:'150px',overflowY:'auto',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
{AT.filter(t=>t.label.toLowerCase().includes(search[i].toLowerCase())).map(t=>(
<div key={t.label} onClick={()=>{const s=[...search];s[i]=t.label;setSearch(s);const tp=[...topics];tp[i]={...tp[i],topic:t.label};setTopics(tp);const dr=[...drop];dr[i]=false;setDrop(dr)}} style={{padding:'8px 12px',cursor:'pointer',fontSize:'13px',borderBottom:'1px solid var(--border)'}} onMouseEnter={e=>e.currentTarget.style.background='var(--green-light)'} onMouseLeave={e=>e.currentTarget.style.background='white'}>
<span style={{color:'var(--muted)',fontSize:'11px',marginRight:'6px'}}>{t.category}</span>{t.label}
</div>
))}
</div>
)}
</div>
<div style={{display:'flex',gap:'3px',alignItems:'center'}}>
<span style={{fontSize:'12px',color:'var(--muted)',marginRight:'4px'}}>Difficulty:</span>
{[1,2,3,4,5,6].map(s=>(
<button key={s} onClick={()=>{const t=[...topics];t[i]={...t[i],difficulty:s};setTopics(t)}} style={{width:'26px',height:'26px',border:'none',borderRadius:'4px',cursor:'pointer',background:topics[i]?.difficulty>=s?'#c9a227':'#f0f0f0',color:topics[i]?.difficulty>=s?'white':'#999',fontSize:'12px',fontWeight:'600'}}>{s}</button>
))}
</div>
</div>
))}
</div>
)}
<div style={{marginTop:'18px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
<button onClick={generate} disabled={loading} style={{padding:'10px 26px',background:loading?'var(--muted)':'var(--green)',color:'white',border:'none',borderRadius:'8px',fontSize:'15px',fontWeight:'500',cursor:loading?'default':'pointer'}}>
{loading?'Generating...':'Generate Do Now'}
</button>
{doNow&&<>
<button onClick={()=>setAnswers(a=>!a)} style={{padding:'10px 18px',background:answers?'var(--blue)':'var(--blue-light)',color:answers?'white':'var(--blue)',border:'1px solid var(--blue)',borderRadius:'8px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>{answers?'Hide answers':'Show answers'}</button>
<button onClick={print} style={{padding:'10px 18px',background:'var(--gold-light)',color:'var(--gold-dark)',border:'1px solid var(--gold)',borderRadius:'8px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>Print / PDF</button>
<button onClick={generate} style={{padding:'10px 18px',background:'white',color:'var(--muted)',border:'1px solid var(--border)',borderRadius:'8px',fontSize:'14px',cursor:'pointer'}}>Regenerate</button>
</>}
</div>
{error&&<p style={{color:'#b91c1c',fontSize:'13px',marginTop:'10px'}}>{error}</p>}
</div>
{loading&&<div style={{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'60px',textAlign:'center'}}><p style={{fontSize:'40px',marginBottom:'12px'}}>⏳</p><p style={{fontSize:'16px',color:'var(--muted)'}}>Generating your Do Now — about 10 seconds...</p></div>}
{doNow&&!loading&&(
<div style={{background:'white',border:'1px solid var(--border)',borderRadius:'12px',padding:'28px'}}>
<div ref={ref}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',borderBottom:'3px solid #2d6a2d',paddingBottom:'12px',marginBottom:'18px'}}>
<div><h1 style={{fontSize:'20px',fontWeight:'700',color:'var(--green)'}}>Heath School — Maths Do Now</h1><p style={{fontSize:'13px',color:'var(--muted)'}}>{doNow.yg}</p></div>
<div style={{textAlign:'right',fontSize:'12px',color:'var(--muted)',lineHeight:'2'}}><div>Date: {doNow.date}</div><div>Name: _______________________</div><div>Class: _______________________</div></div>
</div>
<div style={{background:'#fdf6e3',border:'2px solid var(--gold)',borderRadius:'10px',padding:'16px',marginBottom:'18px'}}>
<div style={{fontSize:'11px',fontWeight:'700',color:'var(--gold-dark)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>📖 Key Word — Literacy Focus</div>
<div style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
<div style={{fontSize:'34px'}}>{doNow.vocabulary?.emoji}</div>
<div>
<div style={{fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>{doNow.vocabulary?.word}</div>
<div style={{fontSize:'14px',color:'#333',marginBottom:'4px',lineHeight:'1.5'}}>{doNow.vocabulary?.definition}</div>
<div style={{fontSize:'12px',color:'var(--muted)',fontStyle:'italic'}}>{doNow.vocabulary?.example}</div>
</div>
</div>
<div style={{marginTop:'10px',paddingTop:'8px',borderTop:'1px solid #e8d080',fontSize:'12px',color:'var(--gold-dark)',fontWeight:'500'}}>Use this word in a sentence: ________________________________________________</div>
</div>
<div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'14px'}}>
{doNow.questions?.map((q,i)=>(
<div key={i} style={{border:'1px solid var(--border)',borderLeft:'4px solid var(--green)',borderRadius:'8px',padding:'16px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
<div style={{fontSize:'11px',fontWeight:'700',color:'var(--green)',textTransform:'uppercase'}}>Question {i+1} — {q.topic}</div>
<div style={{fontSize:'12px',color:'var(--gold-dark)'}}>{'★'.repeat(q.difficulty||3)}{'☆'.repeat(6-(q.difficulty||3))}</div>
</div>
<div style={{fontSize:'16px',fontWeight:'500',lineHeight:'1.5'}}>{q.question}</div>
{diagram(q)}
{answers?<div style={{background:'var(--green-light)',borderRadius:'6px',padding:'10px 14px',marginTop:'10px',fontSize:'14px',color:'var(--green-dark)',fontWeight:'500'}}>✅ {q.answer}</div>:<div style={{borderBottom:'1px solid #ccc',marginTop:'18px',paddingBottom:'18px'}}/>}
</div>
))}
</div>
{doNow.challenge&&(
<div style={{border:'2px solid var(--gold)',borderRadius:'8px',padding:'16px',background:'#fffdf0'}}>
<div style={{fontSize:'11px',fontWeight:'700',color:'var(--gold-dark)',textTransform:'uppercase',marginBottom:'8px'}}>🌟 Challenge — ★★★★★★</div>
<div style={{fontSize:'16px',fontWeight:'500',lineHeight:'1.5'}}>{doNow.challenge.question}</div>
{answers&&<div style={{background:'#fdf6e3',borderRadius:'6px',padding:'10px 14px',marginTop:'10px',fontSize:'14px',color:'var(--gold-dark)'}}>✅ {doNow.challenge.answer}</div>}
{!answers&&<div style={{borderBottom:'1px solid #e8d080',marginTop:'26px'}}/>}
</div>
)}
<div style={{marginTop:'18px',paddingTop:'10px',borderTop:'1px solid var(--border)',textAlign:'center',fontSize:'11px',color:'var(--muted)'}}>Heath School Maths Hub · {doNow.yg} · {doNow.date}</div>
</div>
</div>
)}
{!doNow&&!loading&&(
<div style={{background:'white',border:'2px dashed var(--border)',borderRadius:'12px',padding:'60px',textAlign:'center',color:'var(--muted)'}}>
<div style={{fontSize:'48px',marginBottom:'12px'}}>🎲</div>
<p style={{fontSize:'16px'}}>Select a year group or topics and click Generate</p>
<p style={{fontSize:'13px',marginTop:'6px'}}>AI creates fresh questions every time — with diagrams, a literacy word and a challenge</p>
</div>
)}
</div>
)
}
"""
with open('/Users/bethtaylor/Downloads/heath-maths/src/pages/DoNow.js', 'w') as f:
    f.write(content)
print('done')
