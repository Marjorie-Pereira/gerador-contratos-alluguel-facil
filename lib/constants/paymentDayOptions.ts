export const paymentDayOptions = Array.from({ length: 28 }, (_, index) => {
  const value = index + 1;
  return {
    value: value.toString(),
    label: `Dia ${value}` 
  };
});

export const securityDepositOptions = [
  {
    label: '1 mês', value:'1'
  },
  {
    label: '2 meses', value:'2'
  },
  {
    label: '3 meses', value:'3'
  },
  {
    label: 'Nenhum', value:'nenhum'
  }
]