import "./../style/output.css";
import H12 from "@library/h12";

@Component
class App extends H12 {
    constructor() {
        super();
    }
    async init() {
        
    }
    async render() {
        return <>
            <div class="w-full h-full overflow-auto scroll relative">
                <div class="h-full p-6 flex justify-center items-center">
                    <label class="text-xl">H12 Application</label>
                </div>
            </div>
        </>;
    }
};

// Render application
H12.Render(App, ".app");