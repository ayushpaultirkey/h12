import H12 from "../../library/h12/build.js";

@Component
class App extends H12.Component {
    constructor() {
        super();
        this.element = {};
        this.wait = false;
    }
    async init() {
        
        this.Set("{visible}", "block");
        this.Set("{dvisible}", "none");

        const _response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&forecast_days=1");
        const _json = await _response.json();
        
        this.Set("{visible}", "none");
        this.Set("{dvisible}", "flex");
        this.Set("{lat}", _json.latitude);
        this.Set("{lon}", _json.longitude);
        this.Set("{temp}", _json.current_weather.temperature);
        this.Set("{ws}", _json.current_weather.windspeed);
        this.Set("{wd}", _json.current_weather.winddirection);
        this.Set("{time}", _json.current_weather.time);

    }
    async render() {

        return <>
            <div>
                <label style="display: {visible};">Loading</label>
                <div style="display: {dvisible}; flex-direction: column;">
                    <label>Latitude: {lat}</label>
                    <label>Longitude: {lon}</label>
                    <label>Temperature: {temp}</label>
                    <label>Wind Speed: {ws}</label>
                    <label>Wind Direction: {wd}</label>
                    <label>Time: {time}</label>
                </div>
            </div>
        </>;

    }
}

H12.Component.Render(<App args />, ".app");