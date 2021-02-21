import { useState } from 'react';

import { Button, TimePicker, Row, ProgressBar, Tabs, Tab, Autocomplete } from 'react-materialize';

import axios from 'axios';

function Form(props) {

    var [ time, setTime ] = useState({})
    var [ loading, setLoading ] = useState(false)
    const [ result, setResult ] = useState({})

    const fetch = () => {
        setLoading(true)
        axios.post(props.api, time)
        .then((response) => {
            setLoading(false)
            if ( response.status === 200 ) {
                let data = response.data
                setResult({
                    dayTime: {
                        hour: data.dayTime.hour,
                        minute: data.dayTime.minute
                    },
                    nocturnalTime: {
                        hour: data.nocturnalTime.hour,
                        minute: data.nocturnalTime.minute
                    }
                })
            }
        })
        .catch(error => {
            setLoading(false)
            console.log(error)
            alert(error)
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
        if ( loading ) {
            return (
                <ProgressBar />
            )
        }
    }

    const renderResults = () => {
        if ( result.dayTime && result.nocturnalTime ) {
            return (
                <div>
                    <Autocomplete title='Período diurno' value={`${result.dayTime.hour} hora(s) e ${result.dayTime.minute} minuto(s)`} disabled></Autocomplete>
                    <Autocomplete title='Período noturno' value={`${result.nocturnalTime.hour} hora(s) e ${result.nocturnalTime.minute} minuto(s)`} disabled></Autocomplete>
                </div>
            )
        } else {
            return (
                <div>
                    <Autocomplete title='Período diurno' value={`00 : 00`} disabled></Autocomplete>
                    <Autocomplete title='Período noturno' value={`00 : 00`} disabled></Autocomplete>
                </div>
            )
        }
    }

    var period = {}

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
                                    onSelect: (value, minute) => {
                                        period = {...time, ...period, entry: {hour: value, minute: minute}}
                                    },
                                    onCloseEnd: () => setTime(period)
                                }}
                            />
                            <TimePicker
                                label='Horário de saída'
                                options={{
                                    twelveHour: false,
                                    onSelect: (value, minute) => period = {...time, ...period, departure: {hour: value, minute: minute}},
                                    onCloseEnd: () => setTime(period)
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
                            {renderResults()}
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
