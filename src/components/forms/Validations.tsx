const validateEntity = async (values) => {
    
    const errors = {};
    if(values.endDate <= values.startDate && values.endDate){
      errors.endDate = "End Date can't be previous or equals to Start Date";
    }
  
    if(values.ptoEndDate < values.ptoStartDate){
      errors.ptoEndDate = "End Date can't be previous Start Date";
    }

    // Validar paymentInformation - SIEMPRE validar si existe el array
    if (values.paymentInformation && Array.isArray(values.paymentInformation) && values.paymentInformation.length > 0) {
      const paymentErrors = [];
      
      for (let i = 0; i < values.paymentInformation.length; i++) {
        const payment = values.paymentInformation[i];
        const error = {};
        
        // Para cada elemento del array, validar platform y country
        if (payment) {
          // Validar platform
          const platformEmpty = !payment.platform || payment.platform === '' || (typeof payment.platform === 'string' && payment.platform.trim() === '');
          if (platformEmpty) {
            error.platform = 'Platform is required';
          }
          
          // Validar country
          const countryEmpty = !payment.country || payment.country === '' || (typeof payment.country === 'string' && payment.country.trim() === '');
          if (countryEmpty) {
            error.country = 'Country is required';
          }
        }
        
        if (Object.keys(error).length > 0) {
          paymentErrors[i] = error;
        }
      }
      
      if (paymentErrors.length > 0) {
        errors.paymentInformation = paymentErrors;
      }
    }

    return errors;
  }

export default validateEntity;