import { useState, useEffect } from 'react'

import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

import './App.css'

type CurrentLocation = {
	iss_position: {
		latitude: string
		longitude: string
	}
	message: string
	timestamp: number
}

function App() {
	const [errorMsg, setErrorMsg] = useState('')
	const [currentLocation, setCurrentLocation] =
		useState<CurrentLocation | null>(null)

	useEffect(() => {
		fetchCurrentLocation()
	}, [])

	const fetchCurrentLocation = async () => {
		const res = await fetch('http://api.open-notify.org/iss-now.json')
		if (res.ok) {
			const locationData = await res.json()
			console.log(locationData)
			setCurrentLocation(locationData)
		} else {
			// TODO: handle error
		}
	}

	if (!currentLocation) return <h1>Loading...</h1> // TODO: make this into a loading component

	return (
		<div className='App'>
			<p>
				Last location recorded at:{' '}
				{dayjs(currentLocation.timestamp).format('h:mm A')}{' '}
				{dayjs().isBetween(
					`${dayjs().format('YYYY')}-3-12`,
					`${dayjs().format('YYYY')}-11-5`,
					'day',
					'[]'
				)
					? 'EDT'
					: 'EST'}
			</p>
			<p>Latitude: {currentLocation.iss_position.latitude}</p>
			<p>Longitude: {currentLocation.iss_position.longitude}</p>

			<img className='world-map' src='./worldmap.jpg' alt='world map' />
		</div>
	)
}

export default App
