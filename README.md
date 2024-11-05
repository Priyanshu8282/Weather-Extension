# Weather Extension 🌤️
A Chrome extension that displays the current weather conditions (temperature, wind speed, and humidity) for a specified city. Built with React and powered by the OpenWeatherMap API.

# Table of Contents
- Features
- Setup Instructions
- Usage
- Technologies

## Features
- Displays the current temperature, wind speed, and humidity for the chosen location.
- Lightweight and easy to use in a Chrome browser.
## Setup Instructions
1. Get an API Key
- Sign up at OpenWeatherMap (or another weather API provider).
- Obtain an API key to use in the extension.
2. Clone the Repository
``` bash

git clone https://github.com/Priyanshu8282/Weather-Extension.git
cd weather-extension 
```
3. Install Dependencies
Install the necessary dependencies:

 ``` bash
npm install 
```

4. Configure API Key
In the src directory, create a .env file and add your API key

5. Build the Extension
To create a production build for the Chrome extension    
``` bash
Copy code
npm run build
```
This will generate a dist folder containing the extension files.

6. Load the Extension in Chrome
- Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode" (top-right corner).
- Click on "Load unpacked" and select the dist folder.
- The extension should now be loaded, and the weather popup will be accessible via the extension icon in the browser toolbar.

## Usage
- Click on the extension icon to open the weather popup.
- Enter a city name to see the current weather conditions.
## Technologies
- React: For building the user interface.
- OpenWeatherMap API: For fetching weather data.
- Vite: For fast bundling and development.
