// components for tarot game
import './App.scss';
// components for game
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './logo.svg';

//START MY GAME
function MyGame(){
	
//DECLARE GLOBAL VARIABLES

//birthdate variables
const [getMonth, setMonth] = useState("");
const [getDay, setDay] = useState("");
var n = "";

//horoscope variables
var yourSign = useRef();

//re-route variable
const navigate = useNavigate();
	
//END GLOBAL VARIABLES
	
	
//B-DAY FORM ROUTE
function BirthForm()
{	
//month and date loops
	let monthObj = {
        monthArray: []
    };
    for (var m=0; m<12; m++){
        monthObj.monthArray[m] = m+1;
    }

    let optionItems = monthObj.monthArray.map((item) =>
        <option key={item}>{item}</option>
    );
	
	let dayObj = {
        dayArray: []
    };
    for (var d=0; d<31; d++){
        dayObj.dayArray[d] = d+1;
    }

    let dayOptItems = dayObj.dayArray.map((item) =>
        <option key={item}>{item}</option>
    );

//get month and date values
function handleMonth(e)
{
	e.preventDefault();
	setMonth(e.target.value);
}//end handleMonth()
	
function handleDay(e)
{
	e.preventDefault();
	setDay(e.target.value);
	SetSigns();
}//end handleDay()


return (
<>
<h1>Learn About Your Sign</h1>

<form>
<h3>Enter your date of birth</h3>
<br />
<Form.Select value={getMonth} onChange={handleMonth}>
	<option>Month</option>
	{optionItems}
</Form.Select>
<Form.Select value={getDay} onChange={handleDay}>
	<option>Day</option>
	{dayOptItems}
</Form.Select>
<br /><br />
<Button variant="light" onClick={(e)=>
				 {
				 handleMonth(e);
				handleDay(e);
				 navigate('/horoscope');
				}}>Enter</Button>
</form>
</>
);
};//end BirthForm()

//CALCULATE SIGNS
var fullDay = getMonth + getDay;

//make all dates 3 digits
if(getDay > 0 && getDay < 10){
	fullDay = getMonth + 0 + getDay;
	};

//assign signs based on dates
function SetSigns(){
	if (fullDay > 320 && fullDay < 420)
	{
		yourSign.current = "aries";
	}
	else if (fullDay > 419 && fullDay < 521)
	{
		yourSign.current = "taurus";
	}
	else if (fullDay > 520 && fullDay < 621)
	{
		yourSign.current = "gemini";
	}
	else if (fullDay > 620 && fullDay < 723)
	{
		yourSign.current = "cancer";
	}
	else if (fullDay > 722 && fullDay < 823)
	{
		yourSign.current = "leo";
	}
	else if (fullDay > 822 && fullDay < 923)
	{
		yourSign.current = "virgo";
	}
	else if (fullDay > 922 && fullDay < 1023)
	{
		yourSign.current = "libra";
	}
	else if (fullDay > 1022 && fullDay < 1122)
	{
		yourSign.current = "scorpio";
	}
	else if (fullDay > 1121 && fullDay < 1222)
	{
		yourSign.current = "sagittarius";
	}
	else if (fullDay > 1221 && fullDay < 120)
	{
		yourSign.current = "capricorn";
	}
	else if (fullDay > 119 && fullDay < 219)
	{
		yourSign.current = "aquarius";
	}
	else if (fullDay > 218 && fullDay < 321)
	{
		yourSign.current = "pisces";
	};
};//end SetSigns()

//START GET HOROSCOPE
function GetHoroscope(){

//horoscope state variables
const [myHoroscope, setHoroscope] = useState();
const [num, setNum] = useState("0");
const [compTitle, setCompTitle] = useState();
const [myComp, setComp] = useState();
const [myTarot, setTarot] = useState();
const [myCardName, setCardName] = useState();
const [loaded, setLoaded] = useState(false);

	
//variables for API
var myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", "e0adf98328msh129416da2581babp18c4afjsnc7f4df8262f6",
				 "X-RapidAPI-Host", "horoscope-astrology.p.rapidapi.com"
				);

var requestOptions = {
  method: 'GET',
  headers: myHeaders
};
	
//call API - About Sign
useEffect(() => {
fetch(`https://horoscope-astrology.p.rapidapi.com/sign?s=${yourSign.current}`, requestOptions)
	.then((response) => response.json())
	.then((result) => setHoroscope(result.about));
}, []);


var signArray=['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

function RandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getRandoNum = () =>{
	setNum(RandomNum(0, signArray.length));
	//call API - Compatiability

fetch(`https://horoscope-astrology.p.rapidapi.com/affinity?sign1=${yourSign.current}&sign2=${signArray[num]}`, requestOptions)
	.then((response) => response.json())
	.then((result) => setComp(result[0].header)
		 );	
setCompTitle(dispSign + " & " + signArray[num] + " Compatibility");
}

//call API - Tarot Card on button click
function getTarotCard(tarotEvt){
	tarotEvt.preventDefault();
	
	//API call
	fetch('https://horoscope-astrology.p.rapidapi.com/tarotcard', requestOptions)
	.then((response) => response.json())
	.then((result) => 	  
	{
	setCardName(JSON.stringify(result.res[0].name).replace(/['"]+/g, '').replace('Clubs', 'Wands').replace('Disks', 'Pentacles'));	
	setTarot(result.res[0].desc);	
})
}//end getTarotCard()

//correct img URL for usage
var cardImgUrl = `https://www.trustedtarot.com/img/cards/${myCardName}.png`
var finalImgUrl = cardImgUrl.replace(/\s+/g, '-').toLowerCase();

//make sign uppercase
var mySign = yourSign.current;
var dispSign = mySign.toUpperCase();
	
return(
<>
<h1>{dispSign}</h1>
<p>{myHoroscope}</p>
<Button variant="light" onClick={(tarotEvt)=>
				 {
				 getTarotCard(tarotEvt);
				}}>Get Tarot Card</Button>

<Button variant="light" onClick={getRandoNum}>Get Compatability</Button>

<hr />
<img 
style={loaded ? {} : { display: 'none' }}
onLoad={() => setLoaded(true)}
onError={tarotEvt => {tarotEvt.target.src = './404.png'}}
src={finalImgUrl} 
width="20%"
></img>
<br />
<h4>{myCardName}</h4>
<p>{myTarot}</p>
<h4>{compTitle}</h4>
<p>{myComp}</p>

</>
);
};//end GetHoroscope()

//START OF ROUTES
function MyRoutes()
{
	return (
		<div>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/horoscope" element={<Horoscope />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
		</div>
	);
};//end MyRoutes()

function Nav()
{
	return (
		  <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
		Home
		</Navbar.Brand>
        </Container>
      </Navbar>
	);
};//end Nav()

function Header()
{
	return (
	<div className='header'>
	<Nav />
	</div>
	);
};//end Header()

function Home()
{
	return (
		<div className='page'>
		<Header />
		<BirthForm />
		</div>
	);
};//end Home()

function Horoscope()
{
	return (
		<div className='page'>
		<Header />
		<GetHoroscope />
		</div>
	);
};//end Horoscope()


function NotFound()
{
	return (
		<div className='page'>
		<Header />
		<h1>The stars aren't aligning...try returning home</h1>
		</div>
	);
};//end NotFound()

return (
<>	
	<MyRoutes />
</>
);
};//end MyGame()

export function MyApp()
{
		return <MyGame  />  
};
