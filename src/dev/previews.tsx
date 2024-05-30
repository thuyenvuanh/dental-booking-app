import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import AppointmentView from "../components/Appointment/View.tsx";
import BookCalendar from "../components/BookCalendar/BookCalendar.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AppointmentView">
                <AppointmentView/>
            </ComponentPreview>
            <ComponentPreview path="/BookCalendar">
                <BookCalendar/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;