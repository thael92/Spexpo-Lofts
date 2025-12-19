import ICAL from 'ical.js';

export interface CalendarEvent {
  startDate: Date;
  endDate: Date;
  summary: string;
}

/**
 * Fetches and parses iCal data from a given URL.
 * Handles potential CORS issues by using a local proxy or public fallbacks.
 */
export const fetchICalEvents = async (url: string): Promise<CalendarEvent[]> => {
  if (!url) return [];
  
  try {
    // Lista de candidatos para a busca (Proxy Local -> Proxies CORS Públicos -> Direto)
    const fetchCandidates: string[] = [];
    
    if (url.includes('airbnb.com')) {
      try {
        const urlObj = new URL(url);
        const path = urlObj.pathname.startsWith('/') ? urlObj.pathname : `/${urlObj.pathname}`;
        // Proxy local do Vite (funciona apenas em ambiente de desenvolvimento)
        fetchCandidates.push(`/ical-proxy${path}${urlObj.search}`);
      } catch (e) {}
    }
    
    // Proxies CORS públicos como fallback para produção/estático
    fetchCandidates.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    fetchCandidates.push(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    
    // Busca direta (último recurso, pode falhar por CORS)
    fetchCandidates.push(url);

    let text = '';
    let success = false;

    for (const fetchUrl of fetchCandidates) {
      try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
          text = await response.text();
          // Validação básica se o conteúdo parece um iCal
          if (text.includes('BEGIN:VCALENDAR')) {
            success = true;
            break;
          }
        }
      } catch (err) {
        // Tenta o próximo candidato em caso de erro de rede
        continue;
      }
    }

    if (!success) {
      console.warn('Não foi possível obter dados iCal válidos de nenhuma das URLs candidatas. Retornando disponibilidade vazia.');
      return [];
    }

    const jcalData = ICAL.parse(text);
    const vcalendar = new ICAL.Component(jcalData);
    const vevents = vcalendar.getAllSubcomponents('vevent');
    
    return vevents.map(vevent => {
      const event = new ICAL.Event(vevent);
      return {
        startDate: event.startDate.toJSDate(),
        endDate: event.endDate.toJSDate(),
        summary: event.summary || 'Ocupado'
      };
    });
  } catch (error) {
    console.warn('Erro crítico ao processar dados iCal:', error);
    return [];
  }
};