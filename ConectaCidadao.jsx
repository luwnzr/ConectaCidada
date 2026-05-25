import React, { useState, useEffect, useRef } from "react";

// ─── SVG Icon System ──────────────────────────────────────────────
const ICON_PATHS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  list: "M4 6h16M4 10h16M4 14h16M4 18h16",
  book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.75 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  chevronRight: "M9 5l7 7-7 7",
  arrowLeft: "M10 19l-7-7m0 0l7-7m-7 7h18",
  mapPin: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  check: "M5 13l4 4L19 7",
  checkCircle: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  xCircle: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  heartPulse: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  scale: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  brain: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  tooth: "M12 3C9.5 3 8 5 8 7c0 1.5.4 2.7 1.1 3.6C8.4 11.7 8 12.9 8 14c0 2.8 1.3 5.2 2.7 6.6.4.4.9.4 1.3 0 .3-.3.5-.8.5-1.4v-1.8c0-.8.6-1.4 1.3-1.4h.4c.7 0 1.3.6 1.3 1.4v1.8c0 .6.2 1.1.5 1.4.4.4.9.4 1.3 0 1.4-1.4 2.7-3.8 2.7-6.6 0-1.1-.4-2.3-1.1-3.4.7-.9 1.1-2.1 1.1-3.6 0-2-1.5-4-4-4z",
  graduationCap: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
  users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  ambulance: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0M9 10h1m4-3v3",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  fingerprint: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4",
  messageSquare: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  thumbUp: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
  gift: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
  logOut: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  navigation: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  x: "M6 18L18 6M6 6l12 12",
};

const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.75 }) => {
  const d = ICON_PATHS[name] || ICON_PATHS.info;
  const segments = d.split(/(?= M)/);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {segments.map((seg, i) => <path key={i} d={seg.trim()} />)}
    </svg>
  );
};

// Google "G" logo SVG
const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ─── Colors ───────────────────────────────────────────────────────
const C = {
  navy: "#0f2557", navyLight: "#1a3a7a", blue: "#1d5bbf", blueLight: "#e8f0fd",
  gold: "#c8922a", white: "#ffffff", surface: "#f5f7fc", border: "#dde3f0",
  borderLight: "#edf0f8", gray: "#8896b3", grayMid: "#5a6a8a", text: "#0d1b3e",
  textSub: "#4a5578", success: "#0d7a5f", successBg: "#e6f6f2", danger: "#c0392b",
  dangerBg: "#fdf0ef", purple: "#5b35b0", purpleBg: "#f0ebfc", teal: "#0b7285",
  tealBg: "#e6f5f8", amber: "#b05a00", amberBg: "#fef3e2", green: "#1a6b3c", greenBg: "#e8f5ee",
};

const CATEGORIES = [
  { id: "saude",      label: "Saúde",          icon: "heartPulse",   color: C.danger,  bg: C.dangerBg,  border: "#f5c6c3" },
  { id: "juridico",   label: "Jurídico",        icon: "scale",        color: C.navy,    bg: C.blueLight, border: "#c5d3f0" },
  { id: "psicologia", label: "Psicologia",      icon: "brain",        color: C.purple,  bg: C.purpleBg,  border: "#d4c4f5" },
  { id: "odontologia",label: "Odontologia",     icon: "tooth",        color: C.teal,    bg: C.tealBg,    border: "#b0d9e0" },
  { id: "educacao",   label: "Educação",        icon: "graduationCap",color: C.amber,   bg: C.amberBg,   border: "#f5d5a0" },
  { id: "assistencia",label: "Assist. Social",  icon: "users",        color: C.green,   bg: C.greenBg,   border: "#a8d8bc" },
];

// lat/lng coords for Brasília area
const SERVICES = [
  { id:1, category:"saude",       name:"UBS Asa Norte",                    address:"SQN 313, Bloco A — Asa Norte, Brasília-DF",            phone:"(61) 3321-1234", hours:"Seg–Sex: 07h às 19h", status:"aberto", rating:4.2, gratuito:true,  lat:-15.7539, lng:-47.9123, services:["Consulta clínica geral","Vacinação","Pré-natal","Exames básicos"], description:"Unidade Básica de Saúde com atendimento integral à população do Plano Piloto." },
  { id:2, category:"saude",       name:"CAPS Taguatinga",                  address:"QNL 7, Conjunto C — Taguatinga, Brasília-DF",          phone:"(61) 3451-5678", hours:"Seg–Sex: 08h às 17h", status:"aberto", rating:4.5, gratuito:true,  lat:-15.8347, lng:-48.0530, services:["Saúde mental","Atendimento psiquiátrico","Grupos terapêuticos"], description:"Centro de Atenção Psicossocial com equipe multidisciplinar especializada." },
  { id:3, category:"juridico",    name:"Defensoria Pública do DF",         address:"SEPN 515, Bloco C — Asa Norte, Brasília-DF",           phone:"(61) 3103-0600", hours:"Seg–Sex: 08h às 18h", status:"aberto", rating:4.0, gratuito:true,  lat:-15.7628, lng:-47.8920, services:["Atendimento cível","Criminal","Direito de família","Habitação"], description:"Assistência jurídica gratuita e integral para cidadãos de baixa renda." },
  { id:4, category:"juridico",    name:"Núcleo de Prática Jurídica UnB",   address:"Campus Darcy Ribeiro, ICC Norte — Brasília-DF",        phone:"(61) 3107-2800", hours:"Seg–Sex: 09h às 17h", status:"aberto", rating:3.9, gratuito:true,  lat:-15.7636, lng:-47.8700, services:["Casos simples","Orientação jurídica","Mediação"], description:"Atendimento supervisionado por professores doutores da UnB." },
  { id:5, category:"psicologia",  name:"UCB — Psicologia Gratuita",        address:"EPTC, Taguatinga — Brasília-DF",                      phone:"(61) 3356-9000", hours:"Seg–Sex: 08h às 20h", status:"aberto", rating:4.7, gratuito:true,  lat:-15.8284, lng:-48.0421, services:["Terapia individual","Terapia de casal","Atendimento infantil"], description:"Psicoterapia gratuita com vagas limitadas, por alunos supervisionados." },
  { id:6, category:"odontologia", name:"CEO Taguatinga",                   address:"Área Especial 34, Setor C Norte — Taguatinga, DF",    phone:"(61) 3351-2150", hours:"Seg–Sex: 07h às 19h", status:"aberto", rating:4.3, gratuito:true,  lat:-15.8215, lng:-48.0498, services:["Restauração","Periodontia","Cirurgia oral","Endodontia"], description:"Centro de Especialidades Odontológicas com atendimento 100% pelo SUS." },
  { id:7, category:"educacao",    name:"SENAC Asa Sul",                    address:"CLN 407, Bloco D — Asa Sul, Brasília-DF",             phone:"(61) 3213-8700", hours:"Seg–Sáb: 07h às 22h", status:"aberto", rating:4.4, gratuito:false, lat:-15.8065, lng:-47.8975, services:["Informática","Gastronomia","Beleza e estética","Administração"], description:"Cursos técnicos com bolsas de estudo disponíveis." },
  { id:8, category:"educacao",    name:"Sec. Desenvolvimento Econômico",   address:"Brasília-DF (diversas unidades)",                     phone:"(61) 3315-9000", hours:"Seg–Sex: 08h às 17h", status:"aberto", rating:4.1, gratuito:true,  lat:-15.7941, lng:-47.8825, services:["Qualificação profissional","Empreendedorismo","Tecnologia"], description:"Cursos gratuitos de qualificação para a população do DF." },
  { id:9, category:"assistencia", name:"CRAS Ceilândia Norte",             address:"QNN 7, Conjunto E — Ceilândia, Brasília-DF",          phone:"(61) 3373-4567", hours:"Seg–Sex: 08h às 17h", status:"aberto", rating:4.0, gratuito:true,  lat:-15.7934, lng:-48.1065, services:["CadÚnico","Bolsa Família","Orientação familiar","Benefícios sociais"], description:"Centro de Referência de Assistência Social para famílias vulneráveis." },
];

const GUIDES = [
  { id:1, title:"Como acessar o Bolsa Família",    category:"assistencia", icon:"gift",        steps:["Compareça ao CRAS mais próximo ou acesse o aplicativo Caixa Tem","Realize o cadastro no CadÚnico com CPF e comprovante de renda familiar","Aguarde análise e aprovação pelo Ministério do Desenvolvimento Social","Documentos: RG, CPF, comprovante de residência e certidões de nascimento dos filhos"] },
  { id:2, title:"Atendimento psicológico gratuito", category:"psicologia",  icon:"brain",       steps:["Procure uma UBS ou CAPS próximo à sua residência","Solicite encaminhamento para atendimento psicológico com o clínico geral","Aguarde agendamento ou busque clínicas-escola de universidades públicas","Documentos: RG ou CPF e cartão SUS (emitido gratuitamente na UBS)"] },
  { id:3, title:"Como elaborar um currículo",       category:"educacao",    icon:"book",        steps:["Inclua nome completo, telefone de contato e e-mail profissional","Liste experiências de trabalho em ordem cronológica inversa","Informe formação escolar, cursos e certificações relevantes","Destaque competências alinhadas às vagas desejadas"] },
  { id:4, title:"Assistência jurídica gratuita",    category:"juridico",    icon:"scale",       steps:["Dirija-se à Defensoria Pública do DF (atendimento 100% gratuito)","Apresente documentos pessoais: RG, CPF e comprovante de renda","Explique sua situação ao atendente para ser encaminhado ao setor correto","Pode ser necessário agendar horário ou aguardar fila de atendimento"] },
];

const EMERGENCIES = [
  { id:1, name:"SAMU",              number:"192", icon:"ambulance",      color:C.danger,  bg:"#fff5f5", desc:"Atendimento médico de emergência" },
  { id:2, name:"CAPS Emergência",   number:"156", icon:"brain",          color:C.purple,  bg:"#f8f5ff", desc:"Apoio psicológico urgente" },
  { id:3, name:"Delegacia da Mulher",number:"180",icon:"shield",          color:"#9b2c6b", bg:"#fdf2f8", desc:"Denúncia e proteção contra violência" },
  { id:4, name:"CVV",               number:"188", icon:"messageSquare",  color:C.success, bg:"#f0faf6", desc:"Apoio emocional imediato 24h" },
  { id:5, name:"Corpo de Bombeiros",number:"193", icon:"alert",          color:"#b84000", bg:"#fff8f0", desc:"Emergências de incêndio e resgate" },
  { id:6, name:"Polícia Militar",   number:"190", icon:"shield",         color:C.navy,    bg:"#f0f4ff", desc:"Segurança pública" },
];

// ─── Phone frame ──────────────────────────────────────────────────
function PhoneFrame({ children }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", minHeight:"100vh", background:"#0a1a4a", padding:"24px 16px", fontFamily:"'Inter','Segoe UI',system-ui,sans-serif" }}>
      <div style={{ width:"390px", minHeight:"844px", background:C.surface, borderRadius:"40px", overflow:"hidden", boxShadow:"0 48px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.08)", display:"flex", flexDirection:"column" }}>
        <div style={{ background:C.navy, padding:"10px 28px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ color:"rgba(255,255,255,0.9)", fontSize:"13px", fontWeight:600 }}>09:41</span>
          <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
            {[3,4,5].map(h => <div key={h} style={{ width:"3px", height:`${h+3}px`, background:"rgba(255,255,255,0.8)", borderRadius:"1px" }} />)}
            <div style={{ width:"14px", height:"7px", border:"1.5px solid rgba(255,255,255,0.8)", borderRadius:"2px", marginLeft:"4px", position:"relative" }}>
              <div style={{ position:"absolute", right:"-4px", top:"1px", width:"3px", height:"4px", background:"rgba(255,255,255,0.5)", borderRadius:"0 1px 1px 0" }} />
              <div style={{ width:"60%", height:"100%", background:"rgba(255,255,255,0.8)", borderRadius:"1px" }} />
            </div>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────
function AppHeader({ title, subtitle, onBack, right }) {
  return (
    <div style={{ background:C.navy, padding:onBack ? "14px 18px" : "20px 20px 16px", position:"sticky", top:0, zIndex:10 }}>
      {onBack ? (
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button onClick={onBack} style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:"10px", width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <Icon name="arrowLeft" size={17} color="#fff" />
          </button>
          <div style={{ flex:1 }}>
            <div style={{ color:"#fff", fontWeight:700, fontSize:"17px", letterSpacing:"-0.3px" }}>{title}</div>
            {subtitle && <div style={{ color:"rgba(255,255,255,0.55)", fontSize:"12px", marginTop:"1px" }}>{subtitle}</div>}
          </div>
          {right}
        </div>
      ) : (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:"22px", letterSpacing:"-0.5px" }}>{title}</div>
            {subtitle && <div style={{ color:"rgba(255,255,255,0.6)", fontSize:"13px", marginTop:"3px" }}>{subtitle}</div>}
          </div>
          {right}
        </div>
      )}
    </div>
  );
}

function PrimaryBtn({ children, onClick, disabled, icon }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:"100%", background:disabled ? C.border : C.navy, color:disabled ? C.gray : "#fff", border:"none", borderRadius:"14px", padding:"15px 20px", fontWeight:700, fontSize:"15px", cursor:disabled ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", letterSpacing:"-0.2px", fontFamily:"inherit" }}>
      {icon && <Icon name={icon} size={17} color={disabled ? C.gray : "#fff"} />}
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick, icon, color = C.navy, customIcon }) {
  return (
    <button onClick={onClick} style={{ width:"100%", background:"#fff", color, border:`1.5px solid ${color}30`, borderRadius:"14px", padding:"13px 20px", fontWeight:600, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", fontFamily:"inherit" }}>
      {customIcon || (icon && <Icon name={icon} size={17} color={color} />)}
      {children}
    </button>
  );
}

function FormField({ label, type="text", value, onChange, placeholder, icon, helper }) {
  return (
    <div style={{ marginBottom:"18px" }}>
      {label && <label style={{ display:"block", fontWeight:600, color:C.text, marginBottom:"7px", fontSize:"13px" }}>{label}</label>}
      <div style={{ position:"relative" }}>
        {icon && <div style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", opacity:0.45 }}><Icon name={icon} size={17} color={C.text} /></div>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width:"100%", padding:icon ? "14px 14px 14px 44px" : "14px 16px", border:`1.5px solid ${C.border}`, borderRadius:"12px", fontSize:"15px", color:C.text, background:"#fff", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
      </div>
      {helper && <p style={{ fontSize:"12px", color:C.gray, marginTop:"5px" }}>{helper}</p>}
    </div>
  );
}

function StatusPill({ open, small }) {
  return (
    <span style={{ background:open ? C.successBg : C.dangerBg, color:open ? C.success : C.danger, padding:small ? "3px 9px" : "4px 12px", borderRadius:"20px", fontSize:small ? "11px" : "12px", fontWeight:700, display:"inline-flex", alignItems:"center", gap:"5px" }}>
      <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:open ? C.success : C.danger }} />
      {open ? "Aberto" : "Fechado"}
    </span>
  );
}

// ─── Interactive Map Component ────────────────────────────────────
// Uses OpenStreetMap tiles + custom drawn pins (no API key needed)
function ServiceMap({ services, onSelect, selectedId }) {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  // Brasília bounding box
  const bounds = { minLat: -15.95, maxLat: -15.68, minLng: -48.18, maxLng: -47.82 };

  const project = (lat, lng, W, H) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * W;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * H;
    return { x, y };
  };

  const catColor = (catId) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat ? cat.color : C.navy;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    // Draw map background (stylized)
    ctx.fillStyle = "#e8eef4";
    ctx.fillRect(0, 0, W, H);

    // Grid lines (fake streets)
    ctx.strokeStyle = "#d0d8e4";
    ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 28) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
    }
    for (let j = 0; j < H; j += 28) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
    }

    // Main "roads" (diagonals like Brasília's design)
    ctx.strokeStyle = "#c5cfe0";
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, H * 0.5); ctx.lineTo(W, H * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W * 0.5, 0); ctx.lineTo(W * 0.5, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W * 0.2, 0); ctx.lineTo(W * 0.8, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W * 0.8, 0); ctx.lineTo(W * 0.2, H); ctx.stroke();

    // Water body (Lago Paranoá approximation)
    ctx.fillStyle = "#b8d4e8";
    ctx.beginPath();
    ctx.ellipse(W * 0.72, H * 0.42, W * 0.09, H * 0.14, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9ec4da";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Label
    ctx.fillStyle = "#7ba8c0";
    ctx.font = "bold 9px Inter, sans-serif";
    ctx.fillText("Lago Paranoá", W * 0.66, H * 0.42);

    // Draw pins
    services.forEach(s => {
      const { x, y } = project(s.lat, s.lng, W, H);
      const isSelected = s.id === selectedId;
      const isHov = s.id === hovered;
      const col = catColor(s.category);

      // Shadow
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = isSelected ? 10 : 5;
      ctx.shadowOffsetY = 2;

      // Pin body
      const r = isSelected ? 14 : 10;
      ctx.fillStyle = isSelected ? col : (isHov ? col : "#fff");
      ctx.strokeStyle = col;
      ctx.lineWidth = isSelected ? 2.5 : 2;
      ctx.beginPath();
      ctx.arc(x, y - r, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pin tail
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(x - 4, y - r * 0.4);
      ctx.lineTo(x + 4, y - r * 0.4);
      ctx.lineTo(x, y + 4);
      ctx.closePath();
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Dot inside pin
      ctx.fillStyle = isSelected ? "#fff" : col;
      ctx.beginPath();
      ctx.arc(x, y - r, r * 0.38, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [services, selectedId, hovered]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = mx * scaleX, cy = my * scaleY;

    for (const s of services) {
      const { x, y } = project(s.lat, s.lng, canvas.width, canvas.height);
      const r = 16;
      if (Math.hypot(cx - x, cy - (y - r)) < r + 4) {
        onSelect(s);
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const cy = (e.clientY - rect.top) * (canvas.height / rect.height);
    let found = null;
    for (const s of services) {
      const { x, y } = project(s.lat, s.lng, canvas.width, canvas.height);
      if (Math.hypot(cx - x, cy - (y - 12)) < 18) { found = s.id; break; }
    }
    setHovered(found);
  };

  return (
    <div style={{ position:"relative" }}>
      <canvas
        ref={canvasRef}
        width={720} height={380}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        style={{ width:"100%", height:"190px", cursor:"pointer", borderRadius:"0 0 0 0", display:"block" }}
      />
      {/* Legend */}
      <div style={{ position:"absolute", bottom:"8px", left:"8px", background:"rgba(255,255,255,0.92)", borderRadius:"10px", padding:"6px 10px", boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
        {CATEGORIES.slice(0,3).map(cat => (
          <div key={cat.id} style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"2px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:cat.color }} />
            <span style={{ fontSize:"10px", color:C.textSub, fontWeight:600 }}>{cat.label}</span>
          </div>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:"8px", right:"8px", background:"rgba(255,255,255,0.92)", borderRadius:"10px", padding:"6px 10px", boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}>
        {CATEGORIES.slice(3).map(cat => (
          <div key={cat.id} style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"2px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:cat.color }} />
            <span style={{ fontSize:"10px", color:C.textSub, fontWeight:600 }}>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: Login ────────────────────────────────────────────────
function LoginScreen({ navigate }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.navy, padding:"44px 28px 60px", textAlign:"center" }}>
        <div style={{ width:"72px", height:"72px", borderRadius:"20px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.18)", margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="users" size={32} color="#fff" strokeWidth={1.5} />
        </div>
        <div style={{ color:"#fff", fontSize:"24px", fontWeight:800, letterSpacing:"-0.6px" }}>Conecta <span style={{ color:"#f0c060" }}>Cidadão</span></div>
        <div style={{ color:"rgba(255,255,255,0.55)", fontSize:"13px", marginTop:"6px" }}>Plataforma de Serviços Públicos Gratuitos</div>
      </div>

      <div style={{ background:"#fff", margin:"0 16px", borderRadius:"20px", padding:"28px 24px 24px", boxShadow:"0 -4px 32px rgba(15,37,87,0.14)", marginTop:"-24px", zIndex:1 }}>
        <p style={{ fontWeight:700, color:C.text, fontSize:"18px", marginBottom:"20px", letterSpacing:"-0.3px" }}>Entrar na plataforma</p>
        <FormField label="CPF" icon="user" value={cpf} onChange={setCpf} placeholder="000.000.000-00" />
        <FormField label="Senha" type="password" icon="lock" value={senha} onChange={setSenha} placeholder="Sua senha de acesso" />
        <div style={{ textAlign:"right", marginBottom:"20px", marginTop:"-8px" }}>
          <button onClick={() => navigate("esqueci")} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:"13px", fontWeight:600, fontFamily:"inherit" }}>Esqueci minha senha</button>
        </div>
        <PrimaryBtn onClick={() => navigate("home")}>Acessar plataforma</PrimaryBtn>

        <div style={{ display:"flex", alignItems:"center", gap:"12px", margin:"18px 0" }}>
          <div style={{ flex:1, height:"1px", background:C.border }} />
          <span style={{ color:C.gray, fontSize:"12px" }}>ou continue com</span>
          <div style={{ flex:1, height:"1px", background:C.border }} />
        </div>

        {/* Gmail button */}
        <button onClick={() => navigate("home")} style={{ width:"100%", background:"#fff", color:"#3c4043", border:"1.5px solid #dadce0", borderRadius:"14px", padding:"13px 20px", fontWeight:600, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", fontFamily:"inherit", boxShadow:"0 1px 3px rgba(0,0,0,0.08)" }}>
          <GoogleIcon size={18} />
          Continuar com Google
        </button>

        <div style={{ textAlign:"center", marginTop:"20px", fontSize:"14px", color:C.textSub }}>
          Não possui cadastro?{" "}
          <button onClick={() => navigate("cadastro")} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontWeight:700, fontSize:"14px", fontFamily:"inherit" }}>Criar conta</button>
        </div>
      </div>
      <div style={{ padding:"20px", textAlign:"center" }}>
        <span style={{ color:C.gray, fontSize:"11px" }}>ConectaCidadão v1.0 — Distrito Federal</span>
      </div>
    </div>
  );
}

// ─── SCREEN: Cadastro ─────────────────────────────────────────────
function CadastroScreen({ navigate }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div style={{ flex:1 }}>
      <AppHeader title="Criar conta" subtitle="Cadastro gratuito para cidadãos" onBack={() => navigate("login")} />
      <div style={{ padding:"20px 20px 40px" }}>
        <div style={{ background:C.blueLight, borderRadius:"12px", padding:"14px 16px", marginBottom:"24px", display:"flex", gap:"10px", alignItems:"flex-start", border:`1px solid ${C.border}` }}>
          <Icon name="info" size={17} color={C.blue} />
          <p style={{ color:C.blue, fontSize:"13px", margin:0, lineHeight:1.5 }}>Seu cadastro garante acesso personalizado a todos os serviços da plataforma.</p>
        </div>
        <FormField label="Nome completo" icon="user" value={nome} onChange={setNome} placeholder="Como consta no documento" />
        <FormField label="CPF" icon="fingerprint" value={cpf} onChange={setCpf} placeholder="000.000.000-00" />
        <FormField label="E-mail" type="email" icon="mail" value={email} onChange={setEmail} placeholder="seu@email.com" />
        <FormField label="Senha" type="password" icon="lock" value={senha} onChange={setSenha} placeholder="Mínimo 8 caracteres" helper="Use letras maiúsculas, números e símbolos" />
        <FormField label="Confirmar senha" type="password" icon="lock" value={confirm} onChange={setConfirm} placeholder="Repita a senha criada" />
        <PrimaryBtn onClick={() => navigate("login")}>Criar minha conta</PrimaryBtn>
        <p style={{ textAlign:"center", marginTop:"14px", fontSize:"12px", color:C.gray, lineHeight:1.5 }}>
          Ao criar a conta, você concorda com os <span style={{ color:C.blue, fontWeight:600 }}>Termos de Uso</span> e <span style={{ color:C.blue, fontWeight:600 }}>Política de Privacidade</span>.
        </p>
      </div>
    </div>
  );
}

// ─── SCREEN: Esqueci Senha ────────────────────────────────────────
function EsqueciScreen({ navigate }) {
  const [cpf, setCpf] = useState("");
  const [nova, setNova] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div style={{ flex:1 }}>
      <AppHeader title="Redefinir senha" onBack={() => navigate("login")} />
      <div style={{ padding:"28px 20px 40px" }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ width:"64px", height:"64px", background:C.blueLight, borderRadius:"18px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", border:`1.5px solid ${C.border}` }}>
            <Icon name="lock" size={28} color={C.navy} strokeWidth={1.5} />
          </div>
          <p style={{ fontWeight:700, fontSize:"18px", color:C.text, margin:"0 0 6px" }}>Recuperar acesso</p>
          <p style={{ color:C.textSub, fontSize:"14px", margin:0, lineHeight:1.5 }}>Informe seu CPF e defina uma nova senha</p>
        </div>
        <FormField label="CPF" icon="user" value={cpf} onChange={setCpf} placeholder="000.000.000-00" />
        <FormField label="Nova senha" type="password" icon="lock" value={nova} onChange={setNova} placeholder="Mínimo 8 caracteres" />
        <FormField label="Confirmar nova senha" type="password" icon="lock" value={confirm} onChange={setConfirm} placeholder="Repita a nova senha" />
        <PrimaryBtn onClick={() => navigate("login")}>Redefinir senha</PrimaryBtn>
        <div style={{ textAlign:"center", marginTop:"16px" }}>
          <button onClick={() => navigate("login")} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontWeight:600, fontSize:"14px", fontFamily:"inherit" }}>Voltar para o login</button>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: Home ─────────────────────────────────────────────────
function HomeScreen({ navigate, setSelectedCategory, onLogout }) {
  const available = SERVICES.filter(s => s.status === "aberto").length;

  return (
    <div style={{ flex:1 }}>
      <div style={{ background:C.navy, padding:"18px 20px 28px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
          <div>
            <p style={{ color:"#fff", fontWeight:800, fontSize:"20px", margin:0, letterSpacing:"-0.4px" }}>Conecta Cidadão</p>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", margin:"3px 0 0" }}>Distrito Federal</p>
          </div>
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <div style={{ background:C.successBg, borderRadius:"20px", padding:"6px 12px", display:"flex", alignItems:"center", gap:"6px" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:C.success }} />
              <span style={{ fontSize:"12px", fontWeight:700, color:C.success }}>{available} abertos</span>
            </div>
            <button onClick={onLogout} title="Sair" style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:"10px", width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <Icon name="logOut" size={17} color="#fff" />
            </button>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          {[
            { icon:"mapPin",   label:"Locais disponíveis",  sub:"Ver no mapa",        screen:"lista" },
            { icon:"calendar", label:"Agendamentos",         sub:"Meus agendamentos",  screen:"lista" },
            { icon:"book",     label:"Guias e orientações",  sub:"Passo a passo",      screen:"guias" },
            { icon:"alert",    label:"Emergência",           sub:"SAMU, Polícia, CVV", screen:"emergencia" },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.screen)} style={{ background:"rgba(255,255,255,0.09)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"14px", padding:"14px", textAlign:"left", cursor:"pointer", fontFamily:"inherit" }}>
              <div style={{ marginBottom:"10px", opacity:0.85 }}><Icon name={item.icon} size={20} color="#fff" strokeWidth={1.6} /></div>
              <div style={{ color:"#fff", fontWeight:700, fontSize:"13px" }}>{item.label}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"11px", marginTop:"2px" }}>{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:"20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
          <p style={{ fontWeight:700, color:C.text, fontSize:"16px", margin:0 }}>Categorias de serviço</p>
          <button onClick={() => navigate("lista")} style={{ background:"none", border:"none", color:C.blue, fontSize:"13px", fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:"3px", fontFamily:"inherit" }}>
            Ver todos <Icon name="chevronRight" size={14} color={C.blue} />
          </button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginBottom:"20px" }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); navigate("lista"); }} style={{ background:"#fff", border:`1.5px solid ${cat.border}`, borderRadius:"16px", padding:"16px 8px 12px", textAlign:"center", cursor:"pointer", fontFamily:"inherit" }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:cat.bg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                <Icon name={cat.icon} size={20} color={cat.color} strokeWidth={1.75} />
              </div>
              <div style={{ fontSize:"11px", fontWeight:700, color:cat.color, lineHeight:1.3 }}>{cat.label}</div>
            </button>
          ))}
        </div>

        <button onClick={() => navigate("emergencia")} style={{ width:"100%", background:C.navy, border:"none", borderRadius:"16px", padding:"16px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:"14px", textAlign:"left", fontFamily:"inherit" }}>
          <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Icon name="alert" size={22} color="#fff" strokeWidth={1.6} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ color:"#fff", fontWeight:700, fontSize:"14px" }}>Central de Emergência</div>
            <div style={{ color:"rgba(255,255,255,0.55)", fontSize:"12px", marginTop:"2px" }}>SAMU 192 · CVV 188 · Polícia 190</div>
          </div>
          <Icon name="chevronRight" size={16} color="rgba(255,255,255,0.4)" />
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: Lista (with Map) ─────────────────────────────────────
function ListaScreen({ navigate, selectedCategory, setSelectedCategory, setSelectedService }) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" | "map"
  const [mapSelected, setMapSelected] = useState(null);

  const filtered = SERVICES.filter(s =>
    (!selectedCategory || s.category === selectedCategory) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.services.some(sv => sv.toLowerCase().includes(search.toLowerCase())))
  );

  const handleMapSelect = (s) => {
    setMapSelected(s);
  };

  const goToDetail = (s) => {
    setSelectedService(s);
    navigate("detalhe");
  };

  return (
    <div style={{ flex:1 }}>
      <AppHeader title="Serviços disponíveis" subtitle={`${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}`} onBack={() => navigate("home")}
        right={
          <div style={{ display:"flex", background:"rgba(255,255,255,0.1)", borderRadius:"10px", padding:"3px" }}>
            {[{id:"list",icon:"list"},{id:"map",icon:"map"}].map(v => (
              <button key={v.id} onClick={() => { setViewMode(v.id); setMapSelected(null); }} style={{ background:viewMode===v.id ? "rgba(255,255,255,0.2)" : "transparent", border:"none", borderRadius:"8px", padding:"6px 10px", cursor:"pointer", display:"flex", alignItems:"center" }}>
                <Icon name={v.icon} size={16} color="#fff" />
              </button>
            ))}
          </div>
        }
      />

      {/* Search */}
      <div style={{ background:"#fff", padding:"12px 16px", borderBottom:`1px solid ${C.borderLight}` }}>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)" }}><Icon name="search" size={16} color={C.gray} /></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou serviço..."
            style={{ width:"100%", padding:"11px 12px 11px 38px", border:`1.5px solid ${C.border}`, borderRadius:"12px", fontSize:"14px", outline:"none", boxSizing:"border-box", fontFamily:"inherit", color:C.text, background:C.surface }} />
        </div>
      </div>

      {/* Category chips */}
      <div style={{ padding:"10px 12px", overflowX:"auto", display:"flex", gap:"7px", background:"#fff", borderBottom:`1px solid ${C.borderLight}` }}>
        <button onClick={() => setSelectedCategory(null)} style={{ padding:"7px 14px", borderRadius:"20px", border:`1.5px solid ${!selectedCategory ? C.navy : C.border}`, cursor:"pointer", whiteSpace:"nowrap", fontWeight:600, fontSize:"12px", background:!selectedCategory ? C.navy : "#fff", color:!selectedCategory ? "#fff" : C.textSub, fontFamily:"inherit" }}>Todos</button>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)} style={{ padding:"7px 12px", borderRadius:"20px", border:`1.5px solid ${selectedCategory===cat.id ? cat.color : C.border}`, cursor:"pointer", whiteSpace:"nowrap", fontWeight:600, fontSize:"12px", background:selectedCategory===cat.id ? cat.bg : "#fff", color:selectedCategory===cat.id ? cat.color : C.textSub, display:"flex", alignItems:"center", gap:"5px", fontFamily:"inherit" }}>
            <Icon name={cat.icon} size={12} color={selectedCategory===cat.id ? cat.color : C.gray} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* MAP VIEW */}
      {viewMode === "map" && (
        <div style={{ flex:1 }}>
          <div style={{ background:C.surface, borderBottom:`1px solid ${C.borderLight}` }}>
            <ServiceMap services={filtered} onSelect={handleMapSelect} selectedId={mapSelected?.id} />
          </div>
          {/* Selected pin card */}
          {mapSelected ? (
            <div style={{ padding:"14px 16px" }}>
              {(() => {
                const cat = CATEGORIES.find(c => c.id === mapSelected.category);
                return (
                  <div style={{ background:"#fff", border:`1.5px solid ${C.borderLight}`, borderRadius:"16px", padding:"16px", boxShadow:"0 4px 16px rgba(15,37,87,0.1)" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                      <div style={{ flex:1, paddingRight:"10px" }}>
                        <p style={{ fontWeight:700, color:C.text, fontSize:"15px", margin:"0 0 5px" }}>{mapSelected.name}</p>
                        <div style={{ background:cat?.bg, borderRadius:"6px", padding:"3px 8px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                          <Icon name={cat?.icon} size={11} color={cat?.color} />
                          <span style={{ fontSize:"11px", fontWeight:700, color:cat?.color }}>{cat?.label}</span>
                        </div>
                      </div>
                      <StatusPill open={mapSelected.status === "aberto"} small />
                    </div>
                    <div style={{ color:C.textSub, fontSize:"12px", marginBottom:"12px", display:"flex", alignItems:"center", gap:"6px" }}>
                      <Icon name="mapPin" size={13} color={C.gray} /> {mapSelected.address}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                      <button onClick={() => goToDetail(mapSelected)} style={{ background:C.navy, color:"#fff", border:"none", borderRadius:"12px", padding:"11px", fontWeight:700, fontSize:"13px", cursor:"pointer", fontFamily:"inherit" }}>Ver detalhes</button>
                      <button onClick={() => { const q = encodeURIComponent(mapSelected.address); window.open(`https://www.google.com/maps/dir/?api=1&destination=${q}`,"_blank"); }} style={{ background:C.blueLight, color:C.navy, border:`1.5px solid ${C.border}`, borderRadius:"12px", padding:"11px", fontWeight:600, fontSize:"13px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", fontFamily:"inherit" }}>
                        <Icon name="navigation" size={14} color={C.navy} /> Rota
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div style={{ padding:"20px", textAlign:"center" }}>
              <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                <Icon name="mapPin" size={24} color={C.blue} strokeWidth={1.5} />
              </div>
              <p style={{ fontWeight:600, color:C.text, margin:"0 0 4px" }}>Toque em um marcador</p>
              <p style={{ color:C.gray, fontSize:"13px", margin:0 }}>Selecione um local no mapa para ver os detalhes</p>
            </div>
          )}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div style={{ padding:"14px 16px", flex:1 }}>
          {filtered.map(s => {
            const cat = CATEGORIES.find(c => c.id === s.category);
            return (
              <button key={s.id} onClick={() => goToDetail(s)} style={{ width:"100%", background:"#fff", border:`1.5px solid ${C.borderLight}`, borderRadius:"16px", padding:"16px", marginBottom:"10px", cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                  <div style={{ flex:1, paddingRight:"10px" }}>
                    <p style={{ fontWeight:700, color:C.text, fontSize:"15px", margin:"0 0 5px" }}>{s.name}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                      <div style={{ background:cat?.bg, borderRadius:"6px", padding:"3px 8px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                        <Icon name={cat?.icon} size={12} color={cat?.color} />
                        <span style={{ fontSize:"11px", fontWeight:700, color:cat?.color }}>{cat?.label}</span>
                      </div>
                      {s.gratuito && <span style={{ background:"#fffbeb", color:"#92400e", padding:"3px 8px", borderRadius:"6px", fontSize:"11px", fontWeight:700, border:"1px solid #fde68a" }}>GRATUITO</span>}
                    </div>
                  </div>
                  <StatusPill open={s.status === "aberto"} small />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px", color:C.textSub, fontSize:"12px" }}>
                    <Icon name="mapPin" size={13} color={C.gray} /> {s.address}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px", color:C.textSub, fontSize:"12px" }}>
                    <Icon name="clock" size={13} color={C.gray} /> {s.hours}
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"10px", paddingTop:"10px", borderTop:`1px solid ${C.borderLight}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
                    {[1,2,3,4,5].map(n => <Icon key={n} name="star" size={13} color={n <= Math.floor(s.rating) ? C.gold : C.border} />)}
                    <span style={{ fontSize:"12px", color:C.textSub, marginLeft:"4px" }}>{s.rating}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"4px", color:C.blue, fontSize:"12px", fontWeight:600 }}>
                    Ver detalhes <Icon name="chevronRight" size={14} color={C.blue} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: Detalhe ──────────────────────────────────────────────
function DetalheScreen({ navigate, service }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [atendido, setAtendido] = useState(null);
  const [gratuito, setGratuito] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const cat = CATEGORIES.find(c => c.id === service?.category);
  if (!service) return null;

  const openDirections = () => {
    const q = encodeURIComponent(service.address + ", Brasília, DF, Brasil");
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${q}`, "_blank");
  };

  return (
    <div style={{ flex:1 }}>
      <AppHeader title={service.name} subtitle={cat?.label} onBack={() => navigate("lista")} />
      <div style={{ padding:"0 0 36px" }}>
        <div style={{ background:"#fff", padding:"14px 20px", borderBottom:`1px solid ${C.borderLight}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <StatusPill open={service.status === "aberto"} />
          {service.gratuito && (
            <span style={{ background:C.successBg, color:C.success, padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:700, display:"flex", alignItems:"center", gap:"5px" }}>
              <Icon name="checkCircle" size={13} color={C.success} /> Gratuito
            </span>
          )}
        </div>

        <div style={{ padding:"14px 20px", background:C.blueLight, borderBottom:`1px solid ${C.border}` }}>
          <p style={{ margin:0, fontSize:"14px", color:C.navyLight, lineHeight:1.6 }}>{service.description}</p>
        </div>

        <div style={{ background:"#fff", padding:"0 20px" }}>
          {[
            { icon:"mapPin", label:"Endereço", value:service.address },
            { icon:"phone",  label:"Telefone", value:service.phone },
            { icon:"clock",  label:"Horário",  value:service.hours },
          ].map((item, i) => (
            <div key={item.label} style={{ display:"flex", gap:"14px", padding:"14px 0", borderBottom:i < 2 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={item.icon} size={17} color={C.grayMid} strokeWidth={1.75} />
              </div>
              <div>
                <p style={{ fontSize:"11px", color:C.gray, fontWeight:600, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.04em" }}>{item.label}</p>
                <p style={{ fontSize:"14px", color:C.text, fontWeight:600, margin:0 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding:"16px 20px", background:C.surface, margin:"8px 0" }}>
          <p style={{ fontWeight:700, color:C.text, fontSize:"14px", margin:"0 0 12px" }}>Serviços oferecidos</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {service.services.map(sv => (
              <div key={sv} style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"6px", background:cat?.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name="check" size={11} color={cat?.color} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize:"14px", color:C.textSub }}>{sv}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:"0 20px", display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
          {[1,2,3,4,5].map(n => <Icon key={n} name="star" size={18} color={n <= Math.floor(service.rating) ? C.gold : C.border} />)}
          <span style={{ fontSize:"14px", color:C.textSub, fontWeight:600 }}>{service.rating} / 5</span>
        </div>

        {/* Action buttons */}
        <div style={{ padding:"16px 20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          <PrimaryBtn icon="phone" onClick={() => window.open(`tel:${service.phone.replace(/\D/g,"")}`,"_self")}>Ligar</PrimaryBtn>
          <button onClick={openDirections} style={{ background:C.blueLight, color:C.navy, border:`1.5px solid ${C.border}`, borderRadius:"14px", padding:"13px 12px", fontWeight:600, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"7px", fontFamily:"inherit" }}>
            <Icon name="navigation" size={16} color={C.navy} /> Como chegar
          </button>
        </div>

        {/* Feedback */}
        <div style={{ margin:"0 16px", background:"#fff", borderRadius:"16px", border:`1.5px solid ${C.border}`, overflow:"hidden" }}>
          {feedbackDone ? (
            <div style={{ padding:"24px", textAlign:"center" }}>
              <div style={{ width:"52px", height:"52px", borderRadius:"16px", background:C.successBg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                <Icon name="checkCircle" size={26} color={C.success} strokeWidth={1.5} />
              </div>
              <p style={{ fontWeight:700, color:C.text, fontSize:"16px", margin:"0 0 6px" }}>Obrigado pela avaliação!</p>
              <p style={{ color:C.textSub, fontSize:"13px", margin:0 }}>Sua contribuição ajuda outros cidadãos.</p>
            </div>
          ) : (
            <>
              <div style={{ padding:"16px 18px", borderBottom:`1px solid ${C.borderLight}`, display:"flex", alignItems:"center", gap:"12px", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:C.amberBg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon name="thumbUp" size={18} color={C.amber} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p style={{ fontWeight:700, color:C.text, fontSize:"14px", margin:0 }}>Colaboração Cidadã</p>
                    <p style={{ color:C.gray, fontSize:"12px", margin:0 }}>Avalie este serviço público</p>
                  </div>
                </div>
                {!feedbackOpen && (
                  <button onClick={() => setFeedbackOpen(true)} style={{ background:C.navy, color:"#fff", border:"none", borderRadius:"10px", padding:"8px 14px", fontSize:"13px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Avaliar</button>
                )}
              </div>
              {feedbackOpen && (
                <div style={{ padding:"18px" }}>
                  <p style={{ fontWeight:600, color:C.text, fontSize:"13px", marginBottom:"10px", marginTop:0 }}>Você conseguiu ser atendido?</p>
                  <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
                    {["Sim","Não"].map(v => (
                      <button key={v} onClick={() => setAtendido(v)} style={{ flex:1, padding:"10px", borderRadius:"10px", border:`1.5px solid ${atendido===v ? C.blue : C.border}`, background:atendido===v ? C.blueLight : "#fff", color:atendido===v ? C.navy : C.textSub, fontWeight:600, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", fontFamily:"inherit" }}>
                        <Icon name={v==="Sim" ? "checkCircle" : "xCircle"} size={16} color={atendido===v ? C.blue : C.gray} /> {v}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontWeight:600, color:C.text, fontSize:"13px", marginBottom:"10px", marginTop:0 }}>O serviço continua gratuito?</p>
                  <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
                    {["Sim","Não"].map(v => (
                      <button key={v} onClick={() => setGratuito(v)} style={{ flex:1, padding:"10px", borderRadius:"10px", border:`1.5px solid ${gratuito===v ? C.success : C.border}`, background:gratuito===v ? C.successBg : "#fff", color:gratuito===v ? C.success : C.textSub, fontWeight:600, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", fontFamily:"inherit" }}>
                        <Icon name={v==="Sim" ? "checkCircle" : "xCircle"} size={16} color={gratuito===v ? C.success : C.gray} /> {v}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontWeight:600, color:C.text, fontSize:"13px", marginBottom:"10px", marginTop:0 }}>Como foi o atendimento?</p>
                  <div style={{ display:"flex", gap:"5px", marginBottom:"16px" }}>
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => setRating(n)} style={{ background:"none", border:"none", cursor:"pointer", padding:"2px" }}>
                        <Icon name="star" size={26} color={n <= rating ? C.gold : C.border} />
                      </button>
                    ))}
                  </div>
                  <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Comentário adicional (opcional)..." rows={3}
                    style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${C.border}`, borderRadius:"12px", fontSize:"13px", resize:"none", outline:"none", boxSizing:"border-box", color:C.text, fontFamily:"inherit", marginBottom:"14px" }} />
                  <PrimaryBtn onClick={() => setFeedbackDone(true)}>Enviar avaliação</PrimaryBtn>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: Guias ────────────────────────────────────────────────
function GuiasScreen({ navigate }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const cat = CATEGORIES.find(c => c.id === selected.category);
    return (
      <div style={{ flex:1 }}>
        <AppHeader title={selected.title} onBack={() => setSelected(null)} />
        <div style={{ padding:"20px" }}>
          <div style={{ background:cat?.bg, borderRadius:"16px", padding:"20px", marginBottom:"24px", border:`1.5px solid ${cat?.border}`, display:"flex", gap:"14px", alignItems:"center" }}>
            <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name={selected.icon} size={24} color={cat?.color} strokeWidth={1.6} />
            </div>
            <div>
              <p style={{ fontWeight:700, color:cat?.color, fontSize:"15px", margin:"0 0 3px" }}>{selected.title}</p>
              <p style={{ color:cat?.color, fontSize:"12px", margin:0, opacity:0.7 }}>{selected.steps.length} etapas · {cat?.label}</p>
            </div>
          </div>
          <div style={{ background:"#fff", borderRadius:"16px", border:`1.5px solid ${C.borderLight}`, overflow:"hidden" }}>
            {selected.steps.map((step, i) => (
              <div key={i} style={{ display:"flex", gap:"14px", padding:"16px 18px", borderBottom:i < selected.steps.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ width:"28px", height:"28px", borderRadius:"8px", background:C.navy, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:"#fff", fontWeight:800, fontSize:"13px" }}>{i+1}</span>
                </div>
                <p style={{ flex:1, fontSize:"14px", color:C.textSub, lineHeight:1.55, margin:"3px 0 0" }}>{step}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"20px" }}>
            <PrimaryBtn icon="mapPin" onClick={() => navigate("lista")}>Buscar serviços disponíveis</PrimaryBtn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex:1 }}>
      <AppHeader title="Guias e orientações" subtitle="Como acessar serviços públicos" onBack={() => navigate("home")} />
      <div style={{ padding:"16px" }}>
        <div style={{ background:C.surface, borderRadius:"12px", padding:"14px 16px", marginBottom:"18px", display:"flex", gap:"10px", alignItems:"flex-start", border:`1px solid ${C.border}` }}>
          <Icon name="info" size={17} color={C.grayMid} />
          <p style={{ fontSize:"13px", color:C.textSub, margin:0, lineHeight:1.5 }}>Tutoriais passo a passo com documentos necessários para acessar cada serviço público.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {GUIDES.map(g => {
            const cat = CATEGORIES.find(c => c.id === g.category);
            return (
              <button key={g.id} onClick={() => setSelected(g)} style={{ background:"#fff", border:`1.5px solid ${C.borderLight}`, borderRadius:"16px", padding:"16px 18px", textAlign:"left", cursor:"pointer", display:"flex", gap:"14px", alignItems:"center", fontFamily:"inherit" }}>
                <div style={{ width:"46px", height:"46px", borderRadius:"13px", background:cat?.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${cat?.border}` }}>
                  <Icon name={g.icon} size={22} color={cat?.color} strokeWidth={1.6} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:700, color:C.text, fontSize:"14px", margin:"0 0 4px" }}>{g.title}</p>
                  <p style={{ color:C.gray, fontSize:"12px", margin:0 }}>{cat?.label} · {g.steps.length} etapas</p>
                </div>
                <Icon name="chevronRight" size={17} color={C.gray} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: Emergência ───────────────────────────────────────────
function EmergenciaScreen({ navigate }) {
  return (
    <div style={{ flex:1 }}>
      <AppHeader title="Central de Emergência" subtitle="Acione os serviços abaixo" onBack={() => navigate("home")} />
      <div style={{ padding:"16px" }}>
        <div style={{ background:"#fff5f5", border:`1.5px solid #fca5a5`, borderRadius:"14px", padding:"14px 16px", marginBottom:"18px", display:"flex", gap:"12px", alignItems:"flex-start" }}>
          <Icon name="alert" size={19} color={C.danger} />
          <p style={{ fontSize:"13px", color:"#7f1d1d", margin:0, lineHeight:1.55 }}>
            <strong>Situação de risco?</strong> Acione os serviços abaixo imediatamente. Use apenas em emergências reais.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {EMERGENCIES.map(em => (
            <div key={em.id} style={{ background:"#fff", border:`1.5px solid ${C.borderLight}`, borderRadius:"16px", padding:"16px", display:"flex", alignItems:"center", gap:"14px" }}>
              <div style={{ width:"46px", height:"46px", borderRadius:"13px", background:em.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${em.color}22` }}>
                <Icon name={em.icon} size={22} color={em.color} strokeWidth={1.6} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, color:C.text, fontSize:"14px", margin:"0 0 3px" }}>{em.name}</p>
                <p style={{ color:C.gray, fontSize:"12px", margin:0 }}>{em.desc}</p>
              </div>
              <a href={`tel:${em.number}`} style={{ background:em.color, color:"#fff", borderRadius:"12px", padding:"10px 16px", fontWeight:800, fontSize:"19px", textDecoration:"none", letterSpacing:"-0.5px", flexShrink:0 }}>{em.number}</a>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"16px", background:"#fffbeb", borderRadius:"12px", padding:"14px 16px", border:"1px solid #fde68a" }}>
          <p style={{ fontWeight:700, color:"#78350f", fontSize:"13px", margin:"0 0 4px", display:"flex", alignItems:"center", gap:"6px" }}>
            <Icon name="info" size={15} color="#78350f" /> Importante
          </p>
          <p style={{ color:"#92400e", fontSize:"12px", margin:0, lineHeight:1.55 }}>O uso indevido sobrecarrega os serviços e prejudica quem realmente precisa. Ligue apenas em emergências reais.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────
function TabBar({ screen, navigate }) {
  const tabs = [
    { id:"home",       icon:"home",  label:"Início" },
    { id:"lista",      icon:"map",   label:"Serviços" },
    { id:"guias",      icon:"book",  label:"Guias" },
    { id:"emergencia", icon:"alert", label:"Emergência" },
  ];
  const active = tabs.some(t => t.id === screen) ? screen : "home";
  return (
    <div style={{ background:"#fff", borderTop:`1px solid ${C.borderLight}`, display:"flex", paddingBottom:"8px" }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => navigate(tab.id)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", padding:"10px 4px 6px", display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", fontFamily:"inherit" }}>
            <div style={{ width:"40px", height:"32px", borderRadius:"10px", background:isActive ? C.blueLight : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name={tab.icon} size={20} color={isActive ? C.navy : C.gray} strokeWidth={isActive ? 2 : 1.75} />
            </div>
            <span style={{ fontSize:"10px", fontWeight:isActive ? 700 : 500, color:isActive ? C.navy : C.gray }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = (s) => setScreen(s);
  const authScreens = ["login","cadastro","esqueci"];

  const handleLogout = () => {
    setScreen("login");
    setSelectedCategory(null);
    setSelectedService(null);
  };

  const renderScreen = () => {
    switch (screen) {
      case "login":      return <LoginScreen navigate={navigate} />;
      case "cadastro":   return <CadastroScreen navigate={navigate} />;
      case "esqueci":    return <EsqueciScreen navigate={navigate} />;
      case "home":       return <HomeScreen navigate={navigate} setSelectedCategory={setSelectedCategory} onLogout={handleLogout} />;
      case "lista":      return <ListaScreen navigate={navigate} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSelectedService={setSelectedService} />;
      case "detalhe":    return <DetalheScreen navigate={navigate} service={selectedService} />;
      case "guias":      return <GuiasScreen navigate={navigate} />;
      case "emergencia": return <EmergenciaScreen navigate={navigate} />;
      default:           return <HomeScreen navigate={navigate} setSelectedCategory={setSelectedCategory} onLogout={handleLogout} />;
    }
  };

  return (
    <PhoneFrame>
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflowY:"auto" }}>
        {renderScreen()}
      </div>
      {!authScreens.includes(screen) && <TabBar screen={screen} navigate={navigate} />}
    </PhoneFrame>
  );
}
