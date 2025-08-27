function generateInsights(selectedMonths, dataMonths) {
  let insights = [];
  if (selectedMonths.length < 2) {
    insights.push({ tipo: '', icon: '📊', title: 'Selecione mais meses', description: 'Compare pelo menos 2 meses para gerar insights.' });
    return insights;
  }
  const first = dataMonths[selectedMonths[0]];
  const last = dataMonths[selectedMonths[selectedMonths.length - 1]];
  const variacao = ((last.conversao - first.conversao) / first.conversao) * 100;
  const firstMonthName = first.name === "Marco" ? "Março" : first.name;
  const lastMonthName = last.name === "Marco" ? "Março" : last.name

  if (Math.abs(variacao) > 5) {
    insights.push({
      tipo: variacao > 0 ? 'positive' : 'negative',
      icon: variacao > 0 ? '📈' : '⚠️',
      title: 'Variação de Conversão',
      description: `Mudança de ${(variacao > 0 ? '+' : '') + variacao.toFixed(1)}% na conversão de ${firstMonthName} para ${lastMonthName}.`
    });
  }
  const variacaoBuscas = ((last.totalBuscas - first.totalBuscas) / first.totalBuscas) * 100;
  if (variacaoBuscas > 10) {
    insights.push({
      tipo: 'positive',
      icon: '🚀',
      title: 'Crescimento de Buscas',
      description: `O volume de buscas cresceu ${variacaoBuscas.toFixed(1)}% no período.`
    });
  } else if (variacaoBuscas < -10) {
    insights.push({
      tipo: 'negative',
      icon: '📉',
      title: 'Queda nas Buscas',
      description: `O volume de buscas diminuiu ${Math.abs(variacaoBuscas).toFixed(1)}% no período.`
    });
  }
  const variacaoTicket = ((last.ticketMedio - first.ticketMedio) / first.ticketMedio) * 100;
  if (variacaoTicket > 5) {
    insights.push({
      tipo: 'positive',
      icon: '💰',
      title: 'Aumento do Ticket Médio',
      description: `O ticket médio aumentou ${variacaoTicket.toFixed(1)}%.`
    });
  }
  insights.push({
    tipo: '',
    icon: '💡',
    title: 'Oportunidade Identificada',
    description: 'Termos como "lenço umedecido" têm alta conversão constante e merecem destaque em campanhas.'
  });
  return insights;
}
