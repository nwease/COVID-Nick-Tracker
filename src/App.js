import React, {useState, useEffect} from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import Header from './components/Header';

function App() {

    const [countries, setCountries] = useState([]);

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
        <div className='app__header'>
            <h1>
                WORLD CORONA TRACKER
            </h1>

            <FormControl className='app_dropdown'>
                <Select variant='outlined' value='abc'>
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

                    {/*<MenuItem value='worldwide'>*/}
                    {/*    Worldwide*/}
                    {/*</MenuItem>*/}

                    {/*<MenuItem value='worldwide'>*/}
                    {/*    Worldwide*/}
                    {/*</MenuItem>*/}
                </Select>
            </FormControl>

            <Header />
        </div>

    {/*TITLE*/}

    {/*INFOBOX*/}
    {/*INFOBOX*/}
    {/*INFOBOX*/}

    {/*TABLE*/}
    {/*GRAPH*/}

    {/*MAP*/}
    </div>
  );
}

export default App;
