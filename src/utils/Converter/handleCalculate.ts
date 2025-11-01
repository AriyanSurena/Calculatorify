import type { Dispatch, SetStateAction } from "react";
import convertArea from "./convertArea";
import { convertLength } from "./convertLength";
import convertTemperature from "./convertTemperature";
import convertVolume from "./convertVolume";
import convertMass from "./convertMass";
import convertDataSize from "./convertData";
import convertSpeed from "./convertSpeed";
import convertTime from "./convertTime";
import convertPressure from "./convertPressure";
import convertEnergy from "./convertEnergy";
import convertForce from "./convertForce";
import convertPower from "./convertPower";
import convertAngle from "./convertAngle";
import convertDensity from "./convertDensity";
import convertFlowRate from "./convertFlowRate";
import convertFrequency from "./convertFrequency";

/** Handles unit conversion based on the selected unit type
 * @param selectedUnitType The type of unit to convert (e.g., Area, Length, etc.) (String)
 * @param from Source unit (String)
 * @param to Destination unit (String)
 * @param convertFromUnit The value to be converted (Number)
 * @param setConvertToUnit React state setter to update the converted value (Dispatch<SetStateAction<number | undefined>>)
 */
function handleCalculate(
    selectedUnitType: string,
    convertFromUnit: string,
    convertToUnit: string,
    converterValue: number,
    setConvertToUnit: Dispatch<SetStateAction<number | undefined>>,
) {
    switch (selectedUnitType) {
        case "Area": {
            setConvertToUnit(convertArea(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Length": {
            setConvertToUnit(convertLength(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Temperature": {
            setConvertToUnit(convertTemperature(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Volume": {
            setConvertToUnit(convertVolume(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Mass": {
            setConvertToUnit(convertMass(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Data": {
            setConvertToUnit(convertDataSize(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Speed": {
            setConvertToUnit(convertSpeed(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Time": {
            setConvertToUnit(convertTime(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Pressure": {
            setConvertToUnit(convertPressure(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Energy": {
            setConvertToUnit(convertEnergy(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Force": {
            setConvertToUnit(convertForce(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Power": {
            setConvertToUnit(convertPower(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Angle": {
            setConvertToUnit(convertAngle(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Density": {
            setConvertToUnit(convertDensity(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Flow Rate": {
            setConvertToUnit(convertFlowRate(convertFromUnit, convertToUnit, converterValue));
        } break;
        case "Frequency": {
            setConvertToUnit(convertFrequency(convertFromUnit, convertToUnit, converterValue));
        } break;
        default: {
            throw new Error('Unknown unit type');
        }
    }
}

export default handleCalculate;