import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';
/*import "bootstrap/dist/css/bootstrap.min.css";*/

function Calendar() {
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const handleDataSelecionada = (date) => {
    setDataSelecionada(date);
  };

  return (
    <div className="mb-3">
        <div className="form-label">
        <DatePicker
            selected={dataSelecionada}
            onChange={handleDataSelecionada}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Ex: 13/07/2023"
            locale={ptBR}
          />
      </div>
    </div>
  );
}

export default Calendar;
