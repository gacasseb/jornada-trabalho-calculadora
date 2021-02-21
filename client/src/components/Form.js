import { useState } from 'react';
import { TextInput, Button, Switch, TimePicker, Row, Preloader, ProgressBar, Tabs, Tab, Autocomplete } from 'react-materialize';

import axios from 'axios';

function Form(props) {

    const [ state, setState ] = useState({
        loading: false
    })

    const fetch = () => {

        if ( validate(time) ) {
            setState({
                loading: true
            })
            axios.post('http://localhost:4000/count-hours', time)
            .then((response) => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
        }
    }

    // Faz uma validação required
    const validate = () => {
        if ( time.entry && time.departure ) {
            if ( time.entry.hour == 0 ) time.entry.hour = 24
            if ( time.departure.hour == 0 ) time.departure.hour = 24

            return true
        }
            
        return false
    }

    const renderLoading = () => {
        if ( state.loading ) {
            return (
                <ProgressBar />
            )
        }
    }

    var time = {}

    return (
        <div>
            <Tabs>
                <Tab title='Calculadora' className='tab-content'>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Row>
                            <TimePicker
                                label='Horário de entrada'
                                options={{
                                    defaultTime: '00',
                                    twelveHour: false,
                                    onSelect: (value, minute) => time = {...time, entry: {hour: value, minute: minute}},
                                }}
                            />
                            <TimePicker
                                label='Horário de saída'
                                options={{
                                    twelveHour: false,
                                    onSelect: (value, minute) => time = {...time, departure: {hour: value, minute: minute}},
                                }}
                            />
                        </Row>
                    </div>
                    <Button type="submit" onClick={fetch}>Calcular períodos</Button>
                </Tab>
                <Tab title='Resultados' className='tab-content'>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Row>
                            <Autocomplete title='Período diurno' disabled></Autocomplete>
                            <Autocomplete title='Período noturno' disabled></Autocomplete>
                        </Row>
                    </div>
                </Tab>
            </Tabs>
            <div style={{position: 'relative', bottom: '-120px'}}>
                {renderLoading()}
            </div>
        </div>                                
    );
}

export default Form
