/** Converts temperature from Celsius (°C) to the specified destination unit
 * @param unit Unit Type as String (String)
 * @param valueInCelsius Number value in Celsius to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const celsiusToUnit = (unit: string, valueInCelsius: number): number => {
    switch (unit) {
        // Return Celsius (°C) as is
        case 'Celsius (°C)': {
            return valueInCelsius;
        }
        // Convert Celsius (°C) to Fahrenheit (°F)
        case 'Fahrenheit (°F)': {
            return (valueInCelsius * 9/5) + 32;
        }
        // Convert Celsius (°C) to Kelvin (K)
        case 'Kelvin (K)': {
            return valueInCelsius + 273.15;
        }
        // Convert Celsius (°C) to Rankine (°R)
        case 'Rankine (°R)': {
            return (valueInCelsius + 273.15) * 9/5;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown temperature unit');
        }
    }
};

/** Converts temperature from the specified source unit to Celsius (°C)
 * @param unit Unit Type as String (String)
 * @param value Number value in the source unit to convert to Celsius (Number)
 * @returns Converted value in Celsius (°C) (Number)
 */
const temperatureToCelsius = (unit: string, value: number): number => {
    switch (unit) {
        // Return Celsius (°C) as is
        case 'Celsius (°C)': {
            return value;
        }
        // Convert Fahrenheit (°F) to Celsius (°C)
        case 'Fahrenheit (°F)': {
            return (value - 32) * 5/9;
        }
        // Convert Kelvin (K) to Celsius (°C)
        case 'Kelvin (K)': {
            return value - 273.15;
        }
        // Convert Rankine (°R) to Celsius (°C)
        case 'Rankine (°R)': {
            return (value * 5/9) - 273.15;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown temperature unit');
        }
    }
};

/** Temperature Unit Conversion Function
 * @param from Source Unit (String)
 * @param to Destination Unit (String)
 * @param value The Value To Be Converted (Number)
 * @returns Returns The Result Of The Conversion Of Units Of Temperature (Number)
 */
const convertTemperature = (from: string, to: string, value: number): number => {
    // Convert source unit to Celsius (°C)
    const inCelsius = temperatureToCelsius(from, value);

    // Convert Celsius to target unit
    const result = celsiusToUnit(to, inCelsius);

    return result;
};

export default convertTemperature;