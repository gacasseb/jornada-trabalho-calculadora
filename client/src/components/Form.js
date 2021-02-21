import { useState } from 'react';

import { TextInput, Button, Switch, TimePicker, Row, Preloader, ProgressBar, Tabs, Tab, Autocomplete, Toast } from 'react-materialize';

import axios from 'axios';

function Form(props) {

    const [ state, setState ] = useState({
        loading: false
    })

    const fetch = () => {
        setState({
            loading: true
        })
        axios.post('http://localhost:4000/count-hours', time)
        .then((response) => {
            setState({
                loading: false
            })
            console.log(response.data)
        })
        .catch(error => {
            setState({
                loading: false
            })
            console.log(error)
        })
    }

    /**
     * Do the required validation of entry hour and departure hour
     */
    const validate = () => {
        if ( time.entry && time.departure ) {
            if ( time.entry.hour == 0 ) time.entry.hour = 24
            if ( time.departure.hour == 0 ) time.departure.hour = 24

            return true
        }
            
        return false
    }

    /**
     * Render loading bar
     */
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
                    <Button type="submit" onClick={() => {
                        if ( validate() ) {
                            fetch()
                        } else {
                            alert('Insira o horário de entrada e horário de saída')
                        }
                    }}> Calcular períodos </Button>
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
