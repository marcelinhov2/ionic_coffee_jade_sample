class SearchTime extends Constant
  constructor: ->
    return [
      {
        interval: 1
        label: "Hoje"
      }
      {
        interval: 7
        label: "Semana anterior"
      }
      {
        interval: 15
        label: "Últimos 15 dias"
      }
      {
        interval: 30
        label: "Mês anterior"
      }
    ]