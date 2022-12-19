//https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid= 81e17d0acead41d60663c0187635ee22

import React ,{useEffect, useState}  from "react";
import  Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Indore");
  const [ tempInfo , setTempInfo] =  useState({});
  
const getWeatherInfo = async()=>{
  try{
    let url = ` https://api.openweathermap.org/data/2.5/weather?q= ${searchValue}&units=metric&appid=81e17d0acead41d60663c0187635ee22`;
    const res = await fetch(url);
    const data =   await res.json();
    console.log(data);

    const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
     

      const myNewWeatherInfo = {
        temp,  
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

   

  }catch (error){
    console.log(error);
  }
 };    


useEffect (  ()=>{getWeatherInfo(); }, [] );





  return (
    <>
      <div className="wrap">
        <div className="search"></div>
        <input
          type="search"
          placeholder="search...."
          autoFocus
          id="search"
          className="searchTerm"
          value={searchValue}
          onChange={ (e) =>setSearchValue(e.target.value)}
        />
        <button className="searchButton" type="button" onClick={getWeatherInfo} >
          Search
        </button>
      </div>
  
      <Weathercard  tempInfo ={ tempInfo}/>


    </>
  );
};

export default Temp;
