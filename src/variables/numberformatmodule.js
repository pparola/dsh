const nFormat=
{
    fn: (n) => {
      return new Intl.NumberFormat('es-CO').format(Number(n));      
    },
    fcurrency: (n) => {
        return new Intl.NumberFormat('es-CO',{style:"currency", currency:'COP',minimumFractionDigits:0,maximumFractionDigits:0}).format(Number(n));;
      },
    currencySetting: { locale: 'es-CO',currencyCode:'COP', minimumFractionDigits:0, maximumFractionDigits:0} 
};

export {
    nFormat
}