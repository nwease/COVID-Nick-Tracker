import React, {useState, useEffect} from 'react';
import './App.css';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';

function App() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        setCountry(countryCode);

        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/countries/all' :
            `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
    }

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((res) => res.json())
                .then((data) => {
                    const countries = data.map((country) => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2,
                        }
                    ))

                    setCountries(countries);
                })
        }

        getCountriesData();
    }, [])

  return (
    <div className='app'>
        <div className='app__left'>
            <div className='app__header'>
                <h1>
                    WORLD CORONA TRACKER
                </h1>

                <FormControl className='app_dropdown'>
                    <Select variant='outlined' value={country} onChange={onCountryChange}>
                        <MenuItem value='worldwide'>
                            Worldwide
                        </MenuItem>

                        {
                            countries.map(country => (
                                <MenuItem value={country.value}>
                                    {country.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>

            <div className='app__stats'>
                <InfoBox title='Coronavirus Cases' cases={456} total={2000} />
                <InfoBox title='Coronavirus Recovered' cases={456} total={3000} />
                <InfoBox title='Coronavirus Deaths' cases={456} total={4000} />
            </div>

            <Map />
        </div>

        <Card className='app__right'>
            <CardContent>
                <h3>
                    Live Cases by Country
                </h3>

                <h3>
                    Worldwide New Cases
                </h3>
                <Table />
            </CardContent>
        </Card>
    </div>
  );
}

export default App;
