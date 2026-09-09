<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SCC Check — Procedimentos e Tickets</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#F5F6F3;--surface:#FFF;--border:#DEE2DB;--text:#1B231F;--text-2:#5C665F;
  --accent:#1F5C4E;--accent-dark:#173F35;--accent-soft:#E3EFE9;--danger:#9C4A3B;
  --danger-soft:#F4E5E1;--warning:#8A641F;--warning-soft:#F6EEDC;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.shell{max-width:1180px;margin:0 auto;padding:28px 20px 64px}
.header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}
h1,h2,h3{font-family:Fraunces,serif;margin:0}
.header h1{font-size:30px}.header p{color:var(--text-2);font-size:14px;margin:7px 0 0}
.badge{display:inline-block;background:var(--accent-soft);color:var(--accent);padding:6px 10px;border-radius:99px;font-size:12px;font-weight:600}
.layout{display:grid;grid-template-columns:260px 1fr;gap:24px;align-items:start}
.sidebar{border-right:1px solid var(--border);padding-right:18px}
.nav-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-2);margin:0 0 9px}
.nav-item{display:flex;align-items:center;gap:9px;padding:11px 10px;border-radius:7px;cursor:pointer;font-size:14px;font-weight:500;margin-bottom:2px}
.nav-item:hover,.nav-item.active{background:var(--accent-soft);color:var(--accent)}
.nav-icon{width:22px;text-align:center}
.detail{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:26px;min-height:300px}
.section-title{font-size:22px;margin-bottom:5px}
.subtitle{color:var(--text-2);font-size:13px;margin-bottom:20px}
.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:20px}
.info-card{border:1px solid var(--border);border-radius:8px;padding:15px;background:#fff}
.info-card h3{font-size:16px;margin-bottom:8px}
.info-card p,.info-card li{font-size:13px;line-height:1.55;color:var(--text-2)}
ul,ol{padding-left:20px;margin:8px 0}.compact li{margin:5px 0}
.step-row{display:flex;align-items:flex-start;gap:12px;padding:12px 2px;border-bottom:1px solid var(--border)}
.step-row:last-child{border-bottom:none}
.checkbox{width:20px;height:20px;border:1.5px solid var(--text-2);border-radius:5px;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.checkbox.checked{background:var(--accent);border-color:var(--accent)}
.checkbox svg{width:12px;height:12px;opacity:0}.checkbox.checked svg{opacity:1}
.step-text{font-size:14px;line-height:1.5;cursor:pointer}.step-text.done{color:var(--text-2);text-decoration:line-through}
.progress-line{display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin:14px 0 6px}
.progress-track{height:6px;background:var(--accent-soft);border-radius:99px;overflow:hidden;margin-bottom:16px}
.progress-fill{height:100%;background:var(--accent);transition:width .2s}
.field{margin-bottom:14px}.field label{display:block;font-size:12px;color:var(--text-2);margin-bottom:6px}
input,textarea,select{width:100%;font:14px Inter,sans-serif;padding:10px 12px;border:1px solid var(--border);border-radius:7px;background:var(--bg);color:var(--text)}
textarea{min-height:120px;resize:vertical;line-height:1.5}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}
.btn{font:14px Inter,sans-serif;font-weight:500;padding:9px 15px;border-radius:7px;border:1px solid var(--border);background:#fff;color:var(--text);cursor:pointer}
.btn:hover{background:var(--accent-soft);border-color:var(--accent)}
.btn-primary{background:var(--accent);border-color:var(--accent);color:#fff}.btn-primary:hover{background:var(--accent-dark)}
.btn-danger{color:var(--danger);border-color:var(--danger-soft)}
.btn-small{padding:6px 9px;font-size:12px}
.ticket{border:1px solid var(--border);border-radius:8px;padding:14px;margin-top:10px;background:#fff}
.ticket-head{display:flex;justify-content:space-between;gap:10px;align-items:center}
.ticket-code{font-weight:700;color:var(--accent)}.ticket-meta{font-size:12px;color:var(--text-2)}
.status{padding:4px 8px;border-radius:99px;background:var(--warning-soft);color:var(--warning);font-size:11px;font-weight:600}
.timeline{border-left:2px solid var(--accent-soft);margin:15px 0 0 7px;padding-left:16px}
.event{position:relative;margin-bottom:14px}.event:before{content:"";position:absolute;left:-23px;top:4px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.event strong{font-size:13px}.event p{margin:3px 0;color:var(--text-2);font-size:12px;line-height:1.45}
.empty{color:var(--text-2);font-size:14px;line-height:1.6;padding:10px 2px}
.notice{padding:12px 14px;border-radius:8px;background:var(--warning-soft);font-size:13px;line-height:1.5;margin:12px 0}
.kpi{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}.kpi span{padding:8px 11px;border:1px solid var(--border);border-radius:7px;background:#fff;font-size:12px}
.hidden{display:none!important}
@media(max-width:800px){.layout{grid-template-columns:1fr}.sidebar{border-right:none;border-bottom:1px solid var(--border);padding:0 0 15px}.cards,.grid3{grid-template-columns:1fr}.header{display:block}}
</style>
</head>
<body>
<div class="shell">
  <header class="header">
    <div>
      <span class="badge">SCC CHECK</span>
      <h1>Procedimentos & Acompanhamento</h1>
      <p>Manual operacional, checklists e histórico de cada ticket por código do cliente.</p>
    </div>
  </header>
  <div class="layout">
    <aside class="sidebar">
      <div class="nav-title">Menu</div>
      <div class="nav-item active" data-page="procedures"><span class="nav-icon">✓</span> Procedimentos</div>
      <div class="nav-item" data-page="tickets"><span class="nav-icon">▣</span> Meus tickets</div>
      <div class="nav-item" data-page="newticket"><span class="nav-icon">＋</span> Novo acompanhamento</div>
      <div class="nav-title" style="margin-top:22px">Processos</div>
      <div id="procedureNav"></div>
    </aside>
    <main id="app" class="detail"></main>
  </div>
</div>

<script>
const SUPABASE_URL='https://tjiicekoxususpxiqgov.supabase.co';
const SUPABASE_ANON_KEY='sb_publishable_coapQ-pz9z_Zc-BzcqeWXQ_Qw0KxFfY';

// ====== CONFIGURAÇÃO DO SUPABASE ======
// Substitua pelos dados do SEU projeto (Supabase > Project Settings > API).
const SUPABASE_URL='https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY='SUA-CHAVE-ANON-AQUI';
const TICKETS_TABLE='tickets';
const supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

const procedures=[
 {id:'alteracao',title:'Alteração cadastral',intro:'Procedimento completo de alteração cadastral conforme fluxo operacional: troca de CNPJ, troca de representante legal e troca de razão social.',
  sections:[
   ['Fluxo de análise',[
    'Fazer a pré-análise do CRM.',
    'Entrar em contato com o cliente.',
    'Realizar a análise definitiva: Receita Federal, Serasa Filtro e Relatório Básico.',
    'Consultar a documentação necessária.',
    'Em troca de CNPJ, verificar as negativações vinculadas ao cadastro.',
    'Escalar à Gestão de Contas quando necessário.'
   ]],
   ['Confecção e assinatura',[
    'Confeccionar o adendo conforme a alteração solicitada.',
    'Enviar o adendo para assinatura.',
    'Acompanhar a assinatura até a conclusão.'
   ]],
   ['Após assinatura',[
    'Atualizar o CRM.',
    'Atualizar a Loja.',
    'Registrar todas as ligações e etapas realizadas.',
    'Encerrar o ticket somente após concluir o fluxo.'
   ]]
 ]},
 {id:'aditivo',title:'Confecção de aditivo',intro:'Formalização de alterações contratuais solicitadas pela Gestão de Contas.',
  sections:[
   ['Objetivo',[
    'Formalizar mudança de plano.',
    'Formalizar alteração de valores.',
    'Formalizar alterações cadastrais que exijam aditivo.'
   ]],
   ['Quando utilizar',[
    'Utilizar sempre que houver solicitação da Gestão de Contas para formalizar uma negociação ou alteração contratual.'
   ]],
   ['Responsáveis',[
    'Aurélio.',
    'Patrícia.',
    'Sugestão futura: Suporte Nível 2 SCC Check / AutoList.'
   ]],
   ['Analisar o cadastro',[
    'Verificar na Receita Federal: Razão Social, Responsável Legal e Endereço.',
    'Se houver alteração cadastral, incluir a mudança na Cláusula 1ª do aditivo.'
   ]],
   ['Elaborar o aditivo',[
    'Utilizar o modelo padrão.',
    'Atualizar os dados do cliente.',
    'Atualizar o plano contratado.',
    'Atualizar os valores negociados.',
    'Atualizar informações cadastrais, quando houver.',
    'Salvar o arquivo editável e exportar em PDF.'
   ]],
   ['Enviar para assinatura',[
    'No CRM: Maleta → Arquivos Anexados → Novo Anexo.',
    'Nome do arquivo: Aditivo.',
    'Anexar o PDF.',
    'Marcar Solicitar Assinatura.',
    'Informar Responsável Legal ou Procurador.',
    'Informar WhatsApp com DDD entre parênteses e sem hífen.'
   ]],
   ['Acompanhar assinatura',[
    'Registrar na planilha: código do cliente, tipo do documento e data do envio.',
    'Acompanhar diariamente.',
    'Após 3 dias úteis sem assinatura, contatar o cliente e identificar o motivo.',
    'Se houver contraproposta ou discordância, devolver ao Gerente de Contas.',
    'Após a assinatura, realizar a precificação e informar o Gerente de Contas.'
   ]],
   ['SLA e pontos de controle',[
    'SLA: até 1 hora útil após o recebimento do e-mail da Gestão de Contas para envio do aditivo para assinatura.',
    'Assinatura eletrônica via Clicksign.',
    'Não exige certificado digital.',
    'Possui validade jurídica.',
    'Oportunidade de melhoria: dupla conferência da precificação — um colaborador precifica e outro valida antes da conclusão.'
   ]]
 ]},
 {id:'desconto',title:'Desconto devido a adicionais',intro:'Fluxo para calcular, validar, solicitar e registrar descontos relacionados a adicionais.',
  sections:[
   ['Cálculo e double check',[
    'Calcular os valores de todos os adicionais.',
    'Fazer double check dos valores para evitar erro de precificação.',
    'O valor do desconto não pode ser menor que o VCM do cliente + R$ 5,50 de manutenção de links.'
   ]],
   ['Quando o desconto não passa de R$ 150,00',[
    'Depois de somar e validar os valores, enviar e-mail para Evelyn, do Financeiro, com Aurélio em cópia, utilizando o template já estabelecido.',
    'Ir até a planilha de cancelamento e registrar o cliente para que os adicionais sejam deletados do perfil.',
    'Após o registro, concluir o fluxo.'
   ]],
   ['Quando o desconto passa de R$ 150,00',[
    'É necessário aditivo de permanência de 12 meses.',
    'O aditivo é confeccionado pelo Aurélio.',
    'Aurélio envia o documento para o atendente.',
    'O atendente coloca o arquivo no CRM e envia para o WhatsApp do Representante Legal para assinatura pelo Clicksign.',
    'Após a assinatura, registrar no CRM o valor do desconto e a data da assinatura.',
    'Solicitar ao Aurélio o registro da permanência de 12 meses.',
    'Enviar e-mail ao Financeiro para ajuste da fatura.'
   ]]
 ]},
 {id:'ticket',title:'Registro e acompanhamento do ticket',intro:'Use este processo para garantir que cada atendimento fique rastreável pelo código do cliente.',
  sections:[
   ['Registro inicial',[
    'Cadastrar o código do cliente.',
    'Informar o tipo de procedimento.',
    'Registrar data e observações iniciais.'
   ]],
   ['Durante o atendimento',[
    'Marcar cada etapa conforme ela for executada.',
    'Registrar contatos, ligações, documentos, assinaturas e encaminhamentos.',
    'Registrar qualquer contraproposta, discordância ou escalonamento.'
   ]],
   ['Encerramento',[
    'Conferir se todas as etapas foram concluídas.',
    'Registrar o resultado final.',
    'Informar a data de conclusão.',
    'Encerrar o acompanhamento somente depois do registro completo.'
   ]]
 ]}
];

let state={progress:{},tickets:[]};
let currentPage='procedures';
let selectedProcedure='alteracao';
let selectedTicket=null;
let ticketsLoading=true;
let ticketsError=null;

function saveProgress(){
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state.progress));}catch(e){}
}
function loadProgress(){
 try{state.progress=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(e){state.progress={}}
}

// ====== TICKETS NO SUPABASE ======
function rowToTicket(row){
 return {id:row.id,code:row.code,procedure:row.procedure,date:row.date,notes:row.notes,progress:row.progress||[],events:row.events||[]};
}
function ticketToRow(t){
 return {id:t.id,code:t.code,procedure:t.procedure,date:t.date,notes:t.notes,progress:t.progress||[],events:t.events||[]};
}
async function loadTicketsFromCloud(){
 ticketsLoading=true;ticketsError=null;
 if(currentPage==='tickets')render();
 const {data,error}=await supabaseClient.from(TICKETS_TABLE).select('*').order('created_at',{ascending:false});
 ticketsLoading=false;
 if(error){ticketsError=error.message;state.tickets=[];}
 else{state.tickets=(data||[]).map(rowToTicket);}
 render();
}
async function cloudInsertTicket(t){
 const {error}=await supabaseClient.from(TICKETS_TABLE).insert(ticketToRow(t));
 return error;
}
async function cloudUpdateTicket(t){
 const {error}=await supabaseClient.from(TICKETS_TABLE).update(ticketToRow(t)).eq('id',t.id);
 return error;
}
async function cloudDeleteTicket(id){
 const {error}=await supabaseClient.from(TICKETS_TABLE).delete().eq('id',id);
 return error;
}
// Mantém os tickets sincronizados quando outra pessoa/aba altera algo na nuvem.
supabaseClient
 .channel('tickets-realtime')
 .on('postgres_changes',{event:'*',schema:'public',table:TICKETS_TABLE},()=>{loadTicketsFromCloud();})
 .subscribe();
function allSteps(p){return p.sections.flatMap(s=>s[1])}
function getProg(id){
 const n=allSteps(procedures.find(p=>p.id===id)).length;
 state.progress[id]=state.progress[id]||[];
 return Array.from({length:n},(_,i)=>!!state.progress[id][i]);
}
function toggle(id,i){const a=getProg(id);a[i]=!a[i];state.progress[id]=a;saveProgress();render()}
function pct(id){const a=getProg(id);return a.length?Math.round(a.filter(Boolean).length/a.length*100):0}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function setPage(p){currentPage=p;render()}
function selectProcedure(id){selectedProcedure=id;currentPage='procedures';render()}

function renderNav(){
 document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.page===currentPage));
 document.getElementById('procedureNav').innerHTML=procedures.map(p=>`
  <div class="nav-item ${currentPage==='procedures'&&selectedProcedure===p.id?'active':''}" data-proc="${p.id}">
   <span class="nav-icon">•</span>${esc(p.title)}
  </div>`).join('');
 document.querySelectorAll('[data-proc]').forEach(x=>x.onclick=()=>selectProcedure(x.dataset.proc));
 document.querySelectorAll('[data-page]').forEach(x=>x.onclick=()=>setPage(x.dataset.page));
}

function renderProcedure(){
 const p=procedures.find(x=>x.id===selectedProcedure);
 const a=getProg(p.id), done=a.filter(Boolean).length,total=a.length;
 let idx=0;
 const sections=p.sections.map(sec=>{
  const title=sec[0],items=sec[1];
  const rows=items.map(text=>{
   const i=idx++,checked=a[i];
   return `<div class="step-row">
    <div class="checkbox ${checked?'checked':''}" data-toggle="${p.id}" data-idx="${i}">
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="step-text ${checked?'done':''}" data-toggle="${p.id}" data-idx="${i}">${esc(text)}</div>
   </div>`;
  }).join('');
  return `<div class="info-card"><h3>${esc(title)}</h3>${rows}</div>`;
 }).join('');
 return `<h2 class="section-title">${esc(p.title)}</h2><div class="subtitle">${esc(p.intro)}</div>
 <div class="kpi"><span>${done} de ${total} etapas concluídas</span><span>${pct(p.id)}% concluído</span></div>
 <div class="progress-track"><div class="progress-fill" style="width:${pct(p.id)}%"></div></div>
 <div class="cards">${sections}</div>
 <div class="actions"><button class="btn" id="resetProc">Reiniciar checklist</button><button class="btn btn-primary" id="createFromProc">Criar acompanhamento deste procedimento</button></div>`;
}

function renderNewTicket(){
 return `<h2 class="section-title">Novo acompanhamento</h2>
 <div class="subtitle">Crie um registro pelo código do cliente para acompanhar como o processo foi realizado.</div>
 <div class="grid3">
  <div class="field"><label>Código do cliente *</label><input id="tCode" placeholder="Ex.: 49047"></div>
  <div class="field"><label>Procedimento *</label><select id="tProc">${procedures.map(p=>`<option value="${p.id}">${esc(p.title)}</option>`).join('')}</select></div>
  <div class="field"><label>Data</label><input id="tDate" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
 </div>
 <div class="field"><label>Observações iniciais</label><textarea id="tNote" placeholder="Descreva o motivo, solicitação do cliente ou contexto do ticket."></textarea></div>
 <div class="actions"><button class="btn btn-primary" id="saveTicket">Criar acompanhamento</button><button class="btn" id="cancelTicket">Cancelar</button></div>`;
}

function renderTickets(){
 if(ticketsLoading)return `<h2 class="section-title">Meus tickets</h2><div class="subtitle">Acompanhe todos os processos por código do cliente.</div><div class="empty">Carregando tickets da nuvem...</div>`;
 if(ticketsError)return `<h2 class="section-title">Meus tickets</h2><div class="subtitle">Acompanhe todos os processos por código do cliente.</div><div class="notice">Não foi possível carregar os tickets da nuvem: ${esc(ticketsError)}<br>Verifique a configuração do Supabase (URL e chave anon) no início do código.</div>`;
 if(!state.tickets.length)return `<h2 class="section-title">Meus tickets</h2><div class="subtitle">Acompanhe todos os processos por código do cliente.</div><div class="empty">Nenhum acompanhamento cadastrado. Crie um novo para começar.</div>`;
 const q=(document.getElementById('ticketSearch')?.value||'').toLowerCase();
 const arr=state.tickets.filter(t=>(t.code+' '+t.procedure+' '+t.notes).toLowerCase().includes(q));
 return `<h2 class="section-title">Meus tickets</h2><div class="subtitle">Cada código de cliente possui seu próprio histórico de etapas, contatos e conclusão.</div>
 <div class="field"><label>Pesquisar por código do cliente ou procedimento</label><input id="ticketSearch" value="${esc(q)}" placeholder="Digite o código do cliente..."></div>
 <div>${arr.map(t=>{
  const p=procedures.find(x=>x.id===t.procedure), a=t.progress||[], total=allSteps(p).length,done=a.filter(Boolean).length;
  return `<div class="ticket"><div class="ticket-head"><div><div class="ticket-code">Cliente: ${esc(t.code)}</div><div class="ticket-meta">${esc(p.title)} · criado em ${esc(t.date||'')}</div></div><span class="status">${done}/${total} etapas</span></div>
  ${t.notes?`<p class="ticket-meta" style="margin:10px 0">${esc(t.notes)}</p>`:''}
  <div class="actions"><button class="btn btn-small btn-primary" data-open-ticket="${t.id}">Abrir acompanhamento</button><button class="btn btn-small btn-danger" data-delete-ticket="${t.id}">Excluir</button></div></div>`;
 }).join('')}</div>`;
}

function renderTicketDetail(){
 const t=state.tickets.find(x=>x.id===selectedTicket); if(!t)return renderTickets();
 const p=procedures.find(x=>x.id===t.procedure), steps=allSteps(p), a=Array.from({length:steps.length},(_,i)=>!!(t.progress||[])[i]);
 let idx=0;
 const groups=p.sections.map(sec=>`<div class="info-card" style="margin-top:12px"><h3>${esc(sec[0])}</h3>${sec[1].map(text=>{const i=idx++,c=a[i];return `<div class="step-row"><div class="checkbox ${c?'checked':''}" data-ticket-toggle="${t.id}" data-idx="${i}"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="step-text ${c?'done':''}" data-ticket-toggle="${t.id}" data-idx="${i}">${esc(text)}</div></div>`}).join('')}</div>`).join('');
 const done=a.filter(Boolean).length,total=steps.length,percent=total?Math.round(done/total*100):0;
 return `<h2 class="section-title">Ticket — Cliente ${esc(t.code)}</h2><div class="subtitle">${esc(p.title)} · checklist exclusivo deste ticket</div>
 <div class="notice"><strong>Checklist do ticket:</strong> cada marcação fica salva somente neste acompanhamento. Você pode voltar pelo código do cliente e continuar de onde parou.</div>
 <div class="kpi"><span>Cliente: ${esc(t.code)}</span><span>${done} de ${total} etapas</span><span>${percent}% concluído</span><span>Aberto em ${esc(t.date||'')}</span></div>
 <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
 <h3 style="margin-top:22px">Processo com checklist</h3><div>${groups}</div>
 <div class="actions"><button class="btn" id="resetTicket">Reiniciar checklist deste ticket</button></div>
 <div class="field" style="margin-top:24px"><label>Adicionar registro ao histórico</label><textarea id="eventText" placeholder="Ex.: Cliente contatado por WhatsApp; aguardando assinatura..."></textarea></div>
 <div class="actions"><button class="btn btn-primary" id="addEvent">Registrar ocorrência</button><button class="btn" id="backTickets">Voltar aos tickets</button></div>
 <h3 style="margin-top:28px">Histórico do ticket</h3><div class="timeline">${(t.events||[]).slice().reverse().map(e=>`<div class="event"><strong>${esc(e.date)}</strong><p>${esc(e.text)}</p></div>`).join('')||'<div class="empty">Ainda não há ocorrências registradas.</div>'}</div>`;
}
function render(){
 renderNav();
 const app=document.getElementById('app');
 if(currentPage==='procedures')app.innerHTML=renderProcedure();
 else if(currentPage==='newticket')app.innerHTML=renderNewTicket();
 else if(currentPage==='tickets')app.innerHTML=selectedTicket?renderTicketDetail():renderTickets();

 document.querySelectorAll('[data-toggle]').forEach(x=>x.onclick=()=>toggle(x.dataset.toggle,Number(x.dataset.idx)));
 const reset=document.getElementById('resetProc');if(reset)reset.onclick=()=>{state.progress[selectedProcedure]=[];saveProgress();render()};
 const create=document.getElementById('createFromProc');if(create)create.onclick=()=>{currentPage='newticket';render();document.getElementById('tProc').value=selectedProcedure};

 const saveT=document.getElementById('saveTicket');if(saveT)saveT.onclick=async()=>{
  const code=document.getElementById('tCode').value.trim();
  const proc=document.getElementById('tProc').value;
  if(!code){alert('Informe o código do cliente.');return}
  const pp=procedures.find(x=>x.id===proc); const t={id:'T'+Date.now(),code,procedure:proc,date:document.getElementById('tDate').value,notes:document.getElementById('tNote').value.trim(),progress:allSteps(pp).map(()=>false),events:[]};
  t.events.push({date:new Date().toLocaleString('pt-BR'),text:'Acompanhamento criado.'});
  state.tickets.unshift(t);selectedTicket=t.id;currentPage='tickets';render();
  const error=await cloudInsertTicket(t);
  if(error){alert('Não foi possível salvar na nuvem: '+error.message);state.tickets=state.tickets.filter(x=>x.id!==t.id);selectedTicket=null;render();}
 };
 const cancel=document.getElementById('cancelTicket');if(cancel)cancel.onclick=()=>setPage('tickets');

 document.querySelectorAll('[data-open-ticket]').forEach(x=>x.onclick=()=>{selectedTicket=x.dataset.openTicket;currentPage='tickets';render()});
 document.querySelectorAll('[data-delete-ticket]').forEach(x=>x.onclick=async()=>{
  if(!confirm('Excluir este acompanhamento?'))return;
  const id=x.dataset.deleteTicket, removed=state.tickets.find(t=>t.id===id);
  state.tickets=state.tickets.filter(t=>t.id!==id);render();
  const error=await cloudDeleteTicket(id);
  if(error){alert('Não foi possível excluir na nuvem: '+error.message);if(removed)state.tickets.unshift(removed);render();}
 });
 const search=document.getElementById('ticketSearch');if(search)search.oninput=()=>renderTicketsInPlace(search.value);
 document.querySelectorAll('[data-ticket-toggle]').forEach(x=>x.onclick=async()=>{
  const t=state.tickets.find(t=>t.id===x.dataset.ticketToggle);if(!t)return;
  t.progress=t.progress||[];t.progress[Number(x.dataset.idx)]=!t.progress[Number(x.dataset.idx)];
  t.events=t.events||[];t.events.push({date:new Date().toLocaleString('pt-BR'),text:(t.progress[Number(x.dataset.idx)]?'Concluída: ':'Reaberta: ')+stepsFor(t)[Number(x.dataset.idx)]});
  render();
  const error=await cloudUpdateTicket(t);
  if(error)alert('Não foi possível salvar essa alteração na nuvem: '+error.message);
 });
 const resetTicket=document.getElementById('resetTicket');if(resetTicket)resetTicket.onclick=async()=>{
  const t=state.tickets.find(t=>t.id===selectedTicket);if(!t||!confirm('Reiniciar todas as etapas deste ticket?'))return;
  const p=procedures.find(p=>p.id===t.procedure);t.progress=allSteps(p).map(()=>false);t.events=t.events||[];t.events.push({date:new Date().toLocaleString('pt-BR'),text:'Checklist do ticket reiniciado.'});render();
  const error=await cloudUpdateTicket(t);
  if(error)alert('Não foi possível salvar essa alteração na nuvem: '+error.message);
 };
 const add=document.getElementById('addEvent');if(add)add.onclick=async()=>{
  const text=document.getElementById('eventText').value.trim();if(!text)return;
  const t=state.tickets.find(t=>t.id===selectedTicket);t.events=t.events||[];t.events.push({date:new Date().toLocaleString('pt-BR'),text});render();
  const error=await cloudUpdateTicket(t);
  if(error)alert('Não foi possível salvar essa alteração na nuvem: '+error.message);
 };
 const back=document.getElementById('backTickets');if(back)back.onclick=()=>{selectedTicket=null;render()};
}
function stepsFor(t){return allSteps(procedures.find(p=>p.id===t.procedure))}
function renderTicketsInPlace(q){
 const container=document.getElementById('app');
 // Keep the current search value while rebuilding the page.
 container.innerHTML=renderTickets();
 const input=document.getElementById('ticketSearch');if(input){input.value=q;input.focus();input.setSelectionRange(q.length,q.length)}
 document.querySelectorAll('[data-open-ticket]').forEach(x=>x.onclick=()=>{selectedTicket=x.dataset.openTicket;render()});
 document.querySelectorAll('[data-delete-ticket]').forEach(x=>x.onclick=async()=>{
  if(!confirm('Excluir este acompanhamento?'))return;
  const id=x.dataset.deleteTicket, removed=state.tickets.find(t=>t.id===id);
  state.tickets=state.tickets.filter(t=>t.id!==id);render();
  const error=await cloudDeleteTicket(id);
  if(error){alert('Não foi possível excluir na nuvem: '+error.message);if(removed)state.tickets.unshift(removed);render();}
 });
}
loadProgress();render();loadTicketsFromCloud();
</script>
</body>
</html>
